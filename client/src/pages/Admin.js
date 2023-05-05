import React from 'react'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import ReadRow from '../components/ReadRow';
import EditRow from '../components/EditRow';

function Admin({loginStatus}) {
    const [buildings, setBuildings] = useState([]);
    const [editRowId, setEditRowId] = useState(null);
    const [editBuildingFormData, setEditBuildingFormData] = useState({
        name: "",
        address: "",
        x_coordinate: "",
        y_coordinate: ""
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    //Funktsioon andmebaasist hoonete võtmiseks hooned
    const getBuildings = () => {
        Axios.get("http://localhost:3001/buildings").then((response) => {
        setBuildings(response.data);
        });
    };

    useEffect(() => {
        getBuildings();
    },[])

    //Uue hoone lisamine
    const onSubmit = data => {
        Axios.post("http://localhost:3001/addBuilding", {
            name: data.name,
            address: data.address,
            x_coordinate: data.x_coordinate,
            y_coordinate: data.y_coordinate
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        window.location.reload();  
    };

    const editBuildingFormSubmit = (e) => {
        e.preventDefault();

        const editedBuilding = {
            id: editRowId,
            name: editBuildingFormData.name,
            address: editBuildingFormData.address,
            x_coordinate: editBuildingFormData.x_coordinate,
            y_coordinate: editBuildingFormData.y_coordinate
        }

        const newBuildings = [...buildings];

        const index = buildings.findIndex((building) => building.id === editRowId);

        newBuildings[index] = editedBuilding;

        Axios.post("http://localhost:3001/editBuilding", {
            id: editRowId,
            name: editedBuilding.name,
            address: editedBuilding.address,
            x_coordinate: editedBuilding.x_coordinate,
            y_coordinate: editedBuilding.y_coordinate
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        setBuildings(newBuildings);
        setEditRowId(null);
    }

    const editBuildingFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newFormData = {...editBuildingFormData};
        newFormData[fieldName] = fieldValue;

        setEditBuildingFormData(newFormData);
    };
    //"Muuda nupu vajutus"
    const handleEditButtonClick = (e, building) => {
        e.preventDefault();
        setEditRowId(building.id)

        const formData = {
            name: building.name,
            address: building.address,
            x_coordinate: building.x_coordinate,
            y_coordinate: building.y_coordinate
        };

        setEditBuildingFormData(formData);
    };
    //"Katkesta nupu vajutus"
    const handleCancelButtonClick = () => {
        setEditRowId(null);
    };
    //"Kustuta" nupu vajutus
    const handleDeleteButtonClick = (e, buildingId) => {
        const newBuildings = [...buildings]
        const index = buildings.findIndex((building) => building.id === buildingId);

        newBuildings.splice(index, 1);

        setBuildings(newBuildings);

        Axios.post("http://localhost:3001/deleteBuilding", {
            id: buildingId,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
        });
    };
        
    return (
        <div className="container py-5">
{/* Uue hoone lisamise vorm */}
            <div className="container shadow p-3 my-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-md-center"> 
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Hoone nimi</label>
                            <input type="text" className="form-control" id="name"
                            {...register("name", { required: "Palun sisesta nimi" })}
                            />
                        {errors.name && <span>{errors.name.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Aadress</label>
                            <input type="text" className="form-control" id="address" 
                            {...register("address", { required: "Palun sisesta address" })}
                            />
                        {errors.address && <span>{errors.address.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="x_coordinate" className="form-label">Pikkuskraad</label>
                            <input type="text" className="form-control" id="x_coordinate" 
                            {...register("x_coordinate", { required: "Palun sisesta pikkuskraad" })}
                            />
                        {errors.x_coordinate && <span>{errors.x_coordinate.message}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="y_coordinate" className="form-label">Laiuskraad</label>
                            <input type="text" className="form-control" id="y_coordinate" 
                            {...register("y_coordinate", { required: "Palun sisesta laiuskraad" })}
                            />
                        {errors.y_coordinate && <span>{errors.y_coordinate.message}</span>}
                        </div>


                        <div className="d-grid col-md-3 mx-auto">
                            <button type="submit" className="btn btn-primary text-nowrap">Lisa Hoone</button>
                        </div>    
                    </div>
                </div>        
            </form>
{/* Hoonete tabel */}
            </div>
            <form onSubmit={editBuildingFormSubmit}>
                <table className="table my-5">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nimi</th>
                        <th scope="col">Aadress</th>
                        <th scope="col">Pikkuskraad</th>
                        <th scope="col">Laiuskraad</th>
                        <th scope="col">Operatsioonid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buildings.map((building) => {
                            return <>
                                {editRowId === building.id ? 
                                <EditRow building={building} 
                                    editBuildingFormData={editBuildingFormData}
                                    editBuildingFormChange={editBuildingFormChange}
                                    handleCancelButtonClick={handleCancelButtonClick}
                                /> 
                                : 
                                <ReadRow building={building}
                                    handleEditButtonClick={handleEditButtonClick}
                                    handleDeleteButtonClick={handleDeleteButtonClick}
                                />}
                                
                                
                            </>
                            })}       
                    </tbody>
                    </table>
                </form>
        </div>
  )
}

export default Admin