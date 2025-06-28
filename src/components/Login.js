import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
const [crandital,setCrandital]=useState({email:"",password:""});
let navigate = useNavigate();


const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
               body: JSON.stringify({email:crandital.email,password:crandital.password}),
        });
        const json = await response.json();
        console.log(json);   
        if (json.success){
            //redirect 
            localStorage.setItem('token',json.authtoken);
            alert("Login Successfully");
            navigate("/home");
           
            }
            else{
                alert("invalid crandital");
            }
    }

    const onChange = (e) => {
    setCrandital({ ...crandital, [e.target.name]: e.target.value });
  };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={crandital.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={crandital.password} 
                    onChange={onChange}name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
