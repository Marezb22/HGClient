import React from 'react';
import { useState } from 'react';
import ProfiloCSS from './registrazione.module.css';
import Axios from 'axios';
import { validNome, validCognome, validPassword, validNumTel} from '../../components/Regexp';

function Profilo(){ 

  //Parte relativa al passaggio dei dati al backend
  const [nome, setNome] = useState('');
  const [cognome, setCog] = useState('');
  const [numtel, setNumTel] = useState('');
  const [password, setPass] = useState('');

  const [nomeErr, setNomeErr] = useState(false);
  const [cognomeErr, setCognomeErr] = useState(false);
  const [telErr, setTelErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  const modificaNome = () => {

    if(nomeErr===false){
      Axios.post('https://hgroup.herokuapp.com/modnome', {
        email: localStorage.getItem('email'),
        nome: nome,
      }).then((response) => { 
        if(response.data==="Valore Aggiornato"){
          window.alert("Valore aggiornato con successo!");
        }
        });
    } else {
      window.alert("Campo Nome non corretto! Almeno 3 lettere.");
    }

    };

  const modificaCognome = () => {

    if(cognomeErr===false){
      Axios.post('https://hgroup.herokuapp.com/modcognome', {
        email: localStorage.getItem('email'),
        cognome: cognome,
      }).then((response) => { 
        if(response.data==="Valore Aggiornato"){
          window.alert("Valore aggiornato con successo!");
        }
        });
    } else {
      window.alert("Campo Cognome non corretto! Almeno 3 lettere.");
    }
  
  };


  const modificaNumTel = () => {

    if(telErr===false){
      Axios.post('https://hgroup.herokuapp.com/modnumero', {
      email: localStorage.getItem('email'),
      numtel: numtel,
    }).then((response) => { 
      if(response.data==="Valore Aggiornato"){
        window.alert("Valore aggiornato con successo!");
      }
      });
    } else {
      window.alert("Campo Numero di Telefono non corretto! es. 3292534967");
    }
    

  };

  const modificaPassword = () => {

    if(passErr===false){
      Axios.post('https://hgroup.herokuapp.com/modpass', {
      email: localStorage.getItem('email'),
      password: password,
    }).then((response) => { 
      if(response.data==="Valore Aggiornato"){
        window.alert("Valore aggiornato con successo!");
      }
      });
    } else {
      window.alert("Campo Password non corretto! Almeno 5 lettere ed un numero.");
    }
    
  };

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

  function controllaNumTel(){
    if(!validNumTel.test(numtel)){
      setTelErr(true);
    } else {
      setTelErr(false);
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
    <div className={ProfiloCSS.reg}> 
    <div className={ProfiloCSS.containereg}>
      <div className={ProfiloCSS.titlereg}>Profilo</div>

      <div>
      <p> Email: {localStorage.getItem('email')}</p>
      </div>

     <div className={ProfiloCSS.contentreg}>
  
        <div className={ProfiloCSS.formreg} > 
  
          <div className={ProfiloCSS.userdetails}>
            
            <div className={ProfiloCSS.inputbox}>
              <span className="details">Nome</span>
              <input type="text" placeholder="Inserisci il nome" required onChange={(event) => {setNome(event.target.value);}} onBlur={controllaNome}/>
                <div className={ProfiloCSS.radiobutton}>
                 <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={modificaNome} disabled={!nome}/>
                 <label className="btn btn-outline-primary" htmlFor="btnradio1">Modifica Nome</label>
                </div>
            </div>
            <div className={ProfiloCSS.inputbox}>
              <span className={ProfiloCSS.details}>Cognome</span>
              <input type="text" placeholder="Inserisci il cognome" required onChange={(event) => {setCog(event.target.value);}} onBlur={controllaCognome}/>
              <div className={ProfiloCSS.radiobutton}>
                 <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={modificaCognome} disabled={!cognome}/>
                 <label className="btn btn-outline-primary" htmlFor="btnradio2">Modifica Cognome</label>
                </div>
            </div>
  
            
            <div className={ProfiloCSS.inputbox}>
              <span className={ProfiloCSS.details}>Numero di Telefono</span>
              <input type="tel" placeholder="Inserisci il Numero di Telefono" required onChange={(event) => {setNumTel(event.target.value);}} onBlur={controllaNumTel}/>
              <div className={ProfiloCSS.radiobutton}>
                 <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" onClick={modificaNumTel} disabled={!numtel}/>
                 <label className="btn btn-outline-primary" htmlFor="btnradio5">Modifica Num. Telefono</label>
                </div>
            </div>
  
            <div className={ProfiloCSS.inputbox}>
              <span className={ProfiloCSS.details}>Password</span>
              <input type="password" placeholder="Inserisci la Password" required onChange={(event) => {setPass(event.target.value);}} onBlur={controllaPass}/>
              <div className={ProfiloCSS.radiobutton}>
                 <input type="radio" className="btn-check" name="btnradio" id="btnradio6" autoComplete="off" onClick={modificaPassword} disabled={!password}/>
                 <label className="btn btn-outline-primary" htmlFor="btnradio6">Modifica Password</label>
                </div>
            </div>

            <div className={ProfiloCSS.inputbox}>
              <div className={ProfiloCSS.radiobutton}>
                 <a className="btn btn-primary" href="/profilo/patenti">Aggiungi/Rimuovi Patente</a>
              </div>
            </div>

            <div className={ProfiloCSS.inputbox}>
              <div className={ProfiloCSS.radiobutton}>
                <a className="btn btn-primary" href="/profilo/documenti">Aggiungi/Rimuovi Documento</a>
                </div>
            </div>
    
            <div className={ProfiloCSS.inputbox}>
              <div className={ProfiloCSS.radiobutton}>
                <a className="btn btn-primary" href="/profilo/carte">Aggiungi/Rimuovi Carta</a>
                </div>
            </div>
  
          </div>
  
        </div>
      </div>
    </div>
    </div>
    </>
  
  );

}

export default Profilo;