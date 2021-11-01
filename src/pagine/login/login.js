import React from 'react';
import LogCSS from './login.module.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import { validEmail, validPassword } from '../../components/Regexp';

function Login(){

  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const [loginStatus, setLoginStatus] = useState('');
  Axios.defaults.withCredentials=true;

  const autenticazione = () => {

    if(emailErr===false && passErr===false){

      Axios.post('https://hgroup.herokuapp.com/login', {
        email: email,
        password: password,
      }).then((response) => {
      
        if(response.data.message!=null){
          setLoginStatus(response.data.message);
        } 

        if(response.data.message!="Email o password sbagliata!"&&response.data.message!="L'email non esiste nel sistema!")
        { 
          localStorage.setItem('email',response.data[0].email);
          localStorage.setItem('login', true);
          window.alert("Login avvenuto con successo!");
          window.location.replace("/");
        }

      });
    } else {
      window.alert("Alcuni campi sono invalidi!");
    }
  
  };

    //errore qui
    useEffect(() => {
      Axios.get("https://hgroup.herokuapp.com/login").then((response) => {
        if (response.data.loggedIn == true) { 
          /*localStorage.setItem('email',response.data.user[0].email);
          localStorage.setItem('login',response.data.loggedIn); */
          setLoginStatus(response.data.user[0].nome); //Fa spuntare il nome quando logga
        }
      });
    }, []);  
 
    function controllaEmail(){
      if(!validEmail.test(email)){
        setEmailErr(true);
      } else {
        setEmailErr(false);
      }
    }
  
    function controllaPass(){
      if(!validPassword.test(password)){
        setPassErr(true);
      } else {
        setPassErr(false);
      }
    }

  return(
  <>
  <div className={LogCSS.log}>
    <div className={LogCSS.wrapper}>
      <div className={LogCSS.title}>Login</div>

      <form action="#">
        <div className={LogCSS.field}>
          <input type="text" required onChange={(event) => {setEmail(event.target.value);}} onBlur={controllaEmail}/>
          <label>Email</label>
        </div>
        <div className={LogCSS.field}>
          <input type="password" required onChange={(event) => {setPass(event.target.value);}} onBlur={controllaPass}/>
          <label>Password</label>
        </div>
        <div className={LogCSS.field}>
          <input type="button" value="Login" onClick={autenticazione} disabled={!(email&&password)}/>
        </div>
        <div className={LogCSS.field}>
          <p className={LogCSS.errormessage}>{loginStatus}</p>
          <p className={LogCSS.errormessage}>
          {(emailErr||passErr) && "Campi invalidi:"}
          {emailErr && " Email "} {passErr && " Password "}
          </p>
        </div>
        <div className={LogCSS.signuplink}>Non sei registrato? <a href="/registrati">Registrati Adesso</a></div>
      </form>
    </div>

  </div>
  </>
  );

}

export default Login;
