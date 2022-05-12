import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate ,Navigate, Outlet} from "react-router-dom";
import swal from 'sweetalert';
import Swal from 'sweetalert2';



    function SProtectedRoute () {
        const Swal = require('sweetalert2');
	const navigate = useNavigate();
      
        
        const [Authentificated , setAuthentificated] = useState(false);
        const [loading , setloading] = useState(true);

        useEffect(()=> {
            axios.get( `/api/checkingAuthenticated`).then(res => {
                if(res.status ===  200)
                {
                    setAuthentificated(true);
                }
                setloading(false);
            });
            return() =>{
                    setAuthentificated(false)
            };
        } , []);
        

        axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
            if(err.response.status ===  401 )
            {
                Swal.fire("Non autorisé!" , "vous n'êtes pas autorisé","warning");
                navigate('/login');
            }
            return Promise.reject(err);
        }     
        
        
        );
       



        if(loading){
            return <h2>Loading...</h2>
        }
    
   

      if(Authentificated && localStorage.getItem('role')=='service_formation'){
            return <Outlet/>  
      }else if(Authentificated && (localStorage.getItem('role')=='chef_dept' ||localStorage.getItem('role')=='encadrant' ||localStorage.getItem('role')=='stagiaire' || localStorage.getItem('role')=='coordinateur')){
        Swal.fire("Interdit!" ,"vous n'êtes pas service de formation" ,"warning"); //error.response.data.message
        return <Navigate to ="/Page403"/>
      }else{
        Swal.fire("Non autorisé!" , "vous n'êtes pas autorisé","warning");
        return <Navigate to ="/login"/>
      }
   
   


     

        }
export default SProtectedRoute
 