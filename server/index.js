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

app.get("/bicyclestops", (req, res) => {
    db.query("SELECT * FROM bicycleStops", (err, result) => {
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

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});