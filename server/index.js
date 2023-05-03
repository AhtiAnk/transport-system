const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require('bcrypt');

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

app.post("/users", (req, res) => {
    try {

        const saltRounds = 12;
    
        db.query("SELECT * FROM users WHERE email = ?", [req.body.loginEmail], (err, result) => {
            if (err) {
                req.send({err: err});
            } else {
                
                bcrypt.compare(req.body.loginPassword, result[0].password).then(function(re) {
                    console.log(re)
                    if (result.length > 0 && re) {
                        res.send(result);
                    }
                    else {
                        res.send({message: "Vale e-mail või parool"})
                    }
                });

            }
        });

    } catch(e) {
        console.log(e)
    } 
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

//Uue hoone lisamine
app.post("/addBuilding", (req, res) => {
    try {
        db.query(`INSERT INTO buildings (name, address, x_coordinate, y_coordinate) 
                    VALUES ('${req.body.name}', '${req.body.address}', ${req.body.x_coordinate}, ${req.body.y_coordinate})`, (err, result) => {
            if (err) {
                console.log(err);
            }
        });

    } catch(e) {
        console.log(e)
    } 
});

//Hoone muutmine
app.post("/editBuilding", (req, res) => {
    try {
        db.query(`UPDATE buildings SET name='${req.body.name}',
                                        address='${req.body.address}', 
                                        x_coordinate=${req.body.x_coordinate}, 
                                        y_coordinate=${req.body.y_coordinate} 
                                        WHERE id=${req.body.id}`,
                                        (err, result) => {
            if (err) {
                console.log(err);
            }
        });

    } catch(e) {
        console.log(e)
    } 
});

//Hoone kustutamine
app.post("/deleteBuilding", (req, res) => {
    try {
        db.query(`DELETE FROM buildings WHERE id= ${req.body.id} `, (err, result) => {
            if (err) {
                console.log(err);
            }
        });

    } catch(e) {
        console.log(e)
    } 
});

//Link rattaringluse parklate andmete saamiseks
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