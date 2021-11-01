import React from 'react';
import RegCSS from './registrazione.module.css';
import { useState } from 'react';
import Axios from 'axios';

import { validNome, validCognome, validEmail, validPassword, validNumTel } from '../../components/Regexp';


function Registrazione(){
  
  //Parte relativa al passaggio dei dati al backend
  const [nome, setNome] = useState('');
  const [cognome, setCog] = useState('');
  const [eta, setEta] = useState(0);
  const [email, setEmail] = useState('');
  const [numtel, setNumTel] = useState('');
  const [password, setPass] = useState('');

  const [nomeErr, setNomeErr] = useState(false);
  const [cognomeErr, setCognomeErr] = useState(false);
  const [etaErr, setEtaErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [numErr, setNumErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const aggiungiCliente = () => {

    if(nomeErr===false && cognomeErr===false && etaErr===false && emailErr===false && numErr===false && passErr===false){

      Axios.post("https://hgroup.herokuapp.com/registrazione", { 
      nome: nome,
      cognome: cognome,
      eta: eta,
      email: email,
      numtel: numtel,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      if(response.data=="Valori Inseriti"){ 
      window.alert("Registrazione avvenuta con successo!");
      window.location.replace("/");
      } 
      if(response.data==="Valori Non Inseriti"){
        window.alert("Registrazione non confermata, ritenta con un'altra email!");
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    } else {
      window.alert("Qualche campo non e' valido!");
    }

    //console.log(nome + cognome + eta + email + numtel + password);

  }

  function controllaNome(){
    if(!validNome.test(nome)){
        setNomeErr(true);
    } else {
        setNomeErr(false);
    }
  }

  function controllaCognome(){
    if(!validCognome.test(cognome)){
        setCognomeErr(true);
    } else {
        setCognomeErr(false);
    }
  }

  function controllaEta(){
    if(eta<14||eta>100){
      setEtaErr(true);
    } else {
      setEtaErr(false);
    }
  }

  function controllaEmail(){
    if(!validEmail.test(email)){
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
  }

  function controllaNumTel(){
    if(!validNumTel.test(numtel)){
      setNumErr(true);
    } else {
      setNumErr(false);
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
  <div className={RegCSS.reg}> 
  <div className={RegCSS.containereg}>
    <div className={RegCSS.titlereg}>Registrazione</div>

   <div className={RegCSS.contentreg}>

      <form className={RegCSS.formreg}> 

        <div className={RegCSS.userdetails}>
          
          <div className={RegCSS.inputbox}>
            <span className={RegCSS.details}>Nome</span>
            <input type="text" placeholder="Inserisci il nome" required onChange={(event) => {setNome(event.target.value);}} onBlur={controllaNome}/>
          </div>

          <div className={RegCSS.inputbox}>
            <span className={RegCSS.details}>Cognome</span>
            <input type="text" placeholder="Inserisci il cognome" required onChange={(event) => {setCog(event.target.value);}} onBlur={controllaCognome}/>
          </div>

          <div className={RegCSS.inputbox}>
            <span className={RegCSS.details}>Eta</span>
            <input type="number" placeholder="Inserisci l'eta'" required onChange={(event) => {setEta(event.target.value);}} onBlur={controllaEta}/>
          </div>

          <div className={RegCSS.inputbox}>
            <span className={RegCSS.details}>Email</span>
            <input type="email" placeholder="Inserisci la E-mail" required onChange={(event) => {setEmail(event.target.value);}} onBlur={controllaEmail}/>
          </div>

          <div className={RegCSS.inputbox}>
            <span className={RegCSS.details}>Numero di Telefono</span>
            <input type="tel" placeholder="Inserisci il Numero di Telefono" required onChange={(event) => {setNumTel(event.target.value);}} onBlur={controllaNumTel}/>
          </div>

          <div className={RegCSS.inputbox}>
            <span className={RegCSS.details}>Password</span>
            <input type="password" placeholder="Inserisci la Password" required onChange={(event) => {setPass(event.target.value);}} onBlur={controllaPass}/>
          </div>

        </div>

        <div className={RegCSS.button}>
          <input type="button" value="Conferma" onClick={aggiungiCliente} disabled={!(nome&&cognome&&eta&&email&&numtel&&password)}/>
        </div>

        <div>
          <p className={RegCSS.errormessage}>
          {(nomeErr||cognomeErr||etaErr||emailErr||numErr||passErr) && "I seguenti campi sono invalidi:"}
          {nomeErr && " Nome "} {cognomeErr && " Cognome "} {etaErr && " Eta "} {emailErr && " Email "}{numErr && " Numero "}{passErr && " Password "}
          </p>
          </div>

      </form>
    </div>
  </div>
  </div>
  </>

);

}

export default Registrazione;
