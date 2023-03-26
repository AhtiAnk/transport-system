import React from 'react'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

function Home() {
    const [buildings, setBuildings] = useState([]);
    const [bicycleStops, setBicycleStops] = useState([]);
    const [startBuilding, setStartBuilding] = useState();
    const [endBuilding, setEndBuilding] = useState();
    const [travelMethod, setTravelMethod] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    //Võta andmebaasist hooned
    const getBuildings = () => {
        Axios.get("http://localhost:3001/buildings").then((response) => {
        setBuildings(response.data);
        });
    };
    //Võta andmebaasist rattaringluse punktid
    const getBicycleStops = () => {
        Axios.get("http://localhost:3001/bicyclestops").then((response) => {
        setBicycleStops(response.data);
        });
    };

    useEffect(() => {
        getBuildings();
    },[])

    useEffect(() => {
        //Kontroll, et lehe algsel laadimisel ei hakkaks seda osa tegema
        if (startBuilding) {            
            //Lähima rattaringluse peatuse kaugus võrdlemiseks
            let closestDistToStart = Number.MAX_VALUE;
            //Lähim rattaringluse peatus
            let startStop
    
            let closestDistToEnd = Number.MAX_VALUE;
            let endStop
            bicycleStops.forEach(stop => {
                //valem kauguse arvutamiseks √[(x2 − x1)2 + (y2 − y1)2]
                //Arvuta rattaringluse peatuse kaugus algus ja lõpppunktist
                let distToStart = Math.sqrt((startBuilding[0].x_coordinate - stop.x_coordinate)**2 + (startBuilding[0].y_coordinate - stop.y_coordinate)**2);
                let distToEnd = Math.sqrt((endBuilding[0].x_coordinate - stop.x_coordinate)**2 + (endBuilding[0].y_coordinate - stop.y_coordinate)**2);

                //Võrdle peatuse kaugust ja kui on lähemal uuenda peatus
                if (distToStart < closestDistToStart) {
                    closestDistToStart = distToStart;
                    startStop = stop
                };
    
                if (distToEnd < closestDistToEnd) {
                    closestDistToEnd = distToEnd;
                    endStop = stop
                };
            });
            if (startStop && endStop) {
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${startBuilding[0].address}&destination=${endBuilding[0].address}&&travelmode=${travelMethod}&waypoints=${startStop.y_coordinate}%2C${startStop.x_coordinate}%7c${endStop.y_coordinate}%2C${endStop.x_coordinate}`, '_blank');
            }
        }
    },[bicycleStops, startBuilding, endBuilding, travelMethod])

    const onSubmit = data => {
        //Kui transpordimeetod on driving2 ehk jalgratas, kasutades rattaringluse punkte
        if (data.method === "driving2") {
            
            getBicycleStops();

            //Leia valitud hoonete koordinaadid ja salvesta need
            const startLoc = buildings.filter(function (elem) {
                return elem.address === data.startLocation;
            });
            const endLoc = buildings.filter(function (elem) {
                return elem.address === data.endLocation;
            });

            setStartBuilding(startLoc);
            setEndBuilding(endLoc);
            setTravelMethod("driving");
        } else {
            window.open(`https://www.google.com/maps/dir/?api=1&origin=${data.startLocation}&destination=${data.endLocation}&&travelmode=${data.method}`, '_blank');
        }
    };
        
    return (
        <div className="container py-5">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-md-center"> 
                    <div className="col-md-4">
                        <select className="form-select"
                        {...register("startLocation", { required: "Palun vali alguspunkt" })}
                        >
                            <option key="" value="">Vali alguspunkt</option>

                            {buildings.map((val, key) => {
                            return <option key={val.id} value={val.address}>{val.name} | {val.address}</option>
                            })}

                        </select>
                        {errors.startLocation && <span>{errors.startLocation.message}</span>}
                    </div>
                </div>

                <br/>

                <div className="row justify-content-md-center"> 
                    <div className="col-md-4">
                        <select className="form-select"
                        {...register("endLocation", { required: "Palun vali lõpppunkt" })}
                        >
                            <option value="">Vali lõppunkt</option>

                            {buildings.map((val, key) => {
                            return <option key={val.id} value={val.address}>{val.name} | {val.address}</option>
                            })}
                            
                        </select>
                        {errors.endLocation && <span>{errors.endLocation.message}</span>}
                    </div>
                </div>

                <br/>
                
                <div className="row justify-content-md-center"> 
                    <div className="col-md-4">
                    <select className="form-select"
                    {...register("method", { required: "Palun vali liikumismeetod" })}
                    >
                        <option value="">Vali liikumise meetod</option>
                        <option value="walking">Kõndimine</option>
                        <option value="transit">Buss</option>
                        <option value="driving">Auto</option>
                        <option value="driving">Jalgratas (enda ratas)</option>
                        <option value="driving2">Jalgratas (rattaringlus)</option>
                    </select>
                    {errors.method && <span>{errors.method.message}</span>}
                    </div>
                </div>
                
                <div className="d-grid col-md-2 mx-auto">
                    <input type="submit" className="btn btn-primary my-3" value="Näita marsruuti"/>
                </div>
            </form>        
        </div>
  )
}

export default Home