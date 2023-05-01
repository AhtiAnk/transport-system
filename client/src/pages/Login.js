import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import Axios from "axios";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginStatus, setLogginStatus] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
        Axios.post("http://localhost:3001/users", {
            loginEmail: data.email,
            loginPassword: data.password
        }, {
            headers: {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : "POST, GET, OPTIONS",
              'Access-Control-Allow-Headers' : "x-requested-with, Content-Type, origin, authorization, accept, client-security-token",
            }
        }).then((response) => {
            if(response.data.message){
                setLogginStatus(response.data.message);
            }
            else {
                setLogginStatus("Logimine õnnestus")
            }
        });
    };

    return (
        <div className='bg  d-flex align-items-center'>
            <div className='container py-3'>
                <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row justify-content-md-center"> 
                        <div className="col-md-4 shadow p-5 rounded">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                                {...register("email", { required: "Palun sisesta email" })}
                                />
                            {errors.email && <span>{errors.email.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Parool</label>
                                <input type="password" className="form-control" id="password" 
                                {...register("password", { required: "Palun sisesta parool" })}
                                />
                            {errors.password && <span>{errors.password.message}</span>}
                            </div>
                            <div className="d-grid col-md-3 mx-auto">
                                <button type="submit" className="btn btn-primary text-nowrap">Logi sisse</button>
                            </div>    
                        </div>
                    </div>        
                </form>
            </div>
            <div className='position-absolute bottom-0 fs-6 fw-light'>
                <a href="https://www.freepik.com/free-vector/white-gray-geometric-pattern-background-vector_18240979.htm#query=website%20background%20pattern&position=45&from_view=keyword&track=robertav1_2_sidr">Image by rawpixel.com</a> on Freepik
            </div>
        </div>
    )
}

export default Login