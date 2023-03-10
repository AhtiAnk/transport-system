import React from 'react'
import { useForm } from "react-hook-form";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
    };

    return (
        <div className='container py-5'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-md-center"> 
                    <div className="col-md-4">
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
                            <button type="submit" className="btn btn-primary">Logi sisse</button>
                        </div>    
                    </div>
                </div>        
            </form>
        </div>
    )
}

export default Login