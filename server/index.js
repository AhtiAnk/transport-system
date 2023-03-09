const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "transport-system",
});

app.get("/buildings", (req, res) => {
    db.query("SELECT * FROM buildings", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

const link = "https://gis.tartulv.ee/arcgis/rest/services/Linnatransport/LI_rattaringluse_parklad_avaandmed/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

const getBicycleStops = () => {
    axios.get(link)
    .then(result => {

        result.data.features.forEach(element => {
            //console.log(element.properties.Asukoht)
            //console.log(typeof element.geometry.coordinates[0])
            db.query(`INSERT INTO bicycleStops (address, x_coordinate, y_coordinate) VALUES ('${element.properties.Asukoht}', ${element.geometry.coordinates[0]}, ${element.geometry.coordinates[1]})`, (err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    })
    .catch(error => {
        console.log(error);
    })
  };

//getBicycleStops();  

/* app.get("/bicyclesStops", (req, res) => {
    const link = "https://gis.tartulv.ee/arcgis/rest/services/Linnatransport/LI_rattaringluse_parklad_avaandmed/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
    //https://dev.to/isalevine/three-ways-to-retrieve-json-from-the-web-using-node-js-3c88
    https.get(link, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            console.log(data);
        });

    }).on("error", (error) => {
        console.error(error.message);
    });
}); */

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});