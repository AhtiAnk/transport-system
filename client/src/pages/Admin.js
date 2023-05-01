import React from 'react'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

function Admin() {
    const [buildings, setBuildings] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    //Võta andmebaasist hooned
    const getBuildings = () => {
        Axios.get("http://localhost:3001/buildings").then((response) => {
        setBuildings(response.data);
        });
    };

    useEffect(() => {
        getBuildings();
    },[])

    const onSubmit = data => {
    };
        
    return (
        <div className="container py-5">
{/* Uue hoone lisamine */}
            <div className="container shadow p-3 my-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-md-center"> 
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="nimi" className="form-label">Hoone nimi</label>
                            <input type="text" className="form-control" id="nimi" aria-describedby="nimiHelp"
                            {...register("nimi", { required: "Palun sisesta nimi" })}
                            />
                        {errors.nimi && <span>{errors.nimi.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="aadress" className="form-label">Aadress</label>
                            <input type="text" className="form-control" id="aadress" 
                            {...register("aadress", { required: "Palun sisesta aadress" })}
                            />
                        {errors.aadress && <span>{errors.aadress.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="x_coord" className="form-label">Laiuskraad</label>
                            <input type="text" className="form-control" id="x_coord" 
                            {...register("x_coord", { required: "Palun sisesta laiuskraad" })}
                            />
                        {errors.x_coord && <span>{errors.x_coord.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="y_coord" className="form-label">Pikkuskraad</label>
                            <input type="text" className="form-control" id="y_coord" 
                            {...register("y_coord", { required: "Palun sisesta y_coord" })}
                            />
                        {errors.y_coord && <span>{errors.y_coord.message}</span>}
                        </div>

                        <div className="d-grid col-md-3 mx-auto">
                            <button type="submit" className="btn btn-primary text-nowrap">Lisa Hoone</button>
                        </div>    
                    </div>
                </div>        
            </form>
{/* Tabel */}
            </div>
            <table class="table my-5">
                <thead class="thead-light">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nimi</th>
                    <th scope="col">Aadress</th>
                    <th scope="col">Laiuskraad</th>
                    <th scope="col">Pikkuskraad</th>
                    <th scope="col">Operatsioonid</th>
                    </tr>
                </thead>
                <tbody>
                    {buildings.map((val, key) => {
                        return <tr>
                                    <th scope="row">{val.id}</th>
                                    <td>{val.name}</td>
                                    <td>{val.address}</td>
                                    <td>{val.x_coordinate}</td>
                                    <td>{val.y_coordinate}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary mx-1">Muuda</button>
                                        <button type="button" class="btn btn-danger">Kustuta</button>
                                    </td>
                                </tr>
                        })}       
                </tbody>
                </table>
        </div>
  )
}

export default Admin