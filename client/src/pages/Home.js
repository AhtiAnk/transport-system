import React from 'react'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

function Home() {
    const [buildings, setBuildings] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();


    const getBuildings = () => {
        Axios.get("http://localhost:3001/buildings").then((response) => {
        setBuildings(response.data);
        });
    };

    useEffect(() => {
        getBuildings();
    },[])

    const onSubmit = data => {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${data.startLocation}&destination=${data.endLocation}&&travelmode=${data.method}`, '_blank');
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