import React from 'react';
import { useState } from 'react';
import UserCSS from './gestiscipre.module.css';
import Axios from 'axios';
import { validNome, validCognome, validPatente } from '../../components/Regexp';


function Patente(){
    
    const [page, setPage] = useState(1);

    const [nome, setNomeP] = useState('');
    const [cognome, setCognomeP] = useState('');
    const [codicePat, setPat] = useState('');

    const [patScelta, setPatScelta] = useState('');

    const [listaPat, setListaPat] = useState([]);  

    const [nomeErr, setNomeErr] = useState(false);
    const [cognomeErr, setCognomeErr] = useState(false);
    const [patErr, setPatErr] = useState(false);

    function vaiAgg(){
        setPage(page => 2); 
    }

    function vaiRim(){
        setPage(page => 3);
        listaPatenti();
    }

    function vaiIndietro(){
        setPage(page => 1);
    }

    const listaPatenti = () => {
            Axios.post("https://hgroup.herokuapp.com/listaPat", {
             email: localStorage.getItem('email'),  
            }).then((response) => {
                console.log(response);
                setListaPat(response.data);
            });
        
    }


    const aggPatente = () => {

        if((nomeErr===false)&&(cognomeErr===false)&&(patErr===false)){

            Axios.post("https://hgroup.herokuapp.com/aggpatente", {
           email: localStorage.getItem('email'), 
            patente: codicePat,
            nome: nome,
            cognome: cognome, 
        }).then((response) => { 
            if(response.data==="Patente Aggiunta"){
            window.alert("Patente Aggiunta all'account!");
            window.location.replace("/profilo/patenti");
            }
            });
            
        } else {
            window.alert("Qualche campo è invalido!");
        }
    };

    function bottoneEli(pat){
        setPatScelta(pat);
        rimPatente();
    }

    const rimPatente = () => {
        Axios.post("https://hgroup.herokuapp.com/rimpatente", {
            email: localStorage.getItem('email'), 
            patente: patScelta,
        }).then((response) => {
            if(response.data==="Patente Rimossa"){
                window.alert("Patente rimossa con successo!");
            }
        });
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

    function controllaPatente(){
        if(!validPatente.test(codicePat)){
            setPatErr(true);
        } else {
            setPatErr(false);
        }
    }



    return(
    <>
     <div className={UserCSS.container}> 
     <div className={UserCSS.contform}>

     <div className={UserCSS.titlereg}>Gestisci Patenti</div>

     <div className={UserCSS.content}>

      <div className={UserCSS.formpre}> 

        <div className={UserCSS.userdetails}>
          {page === 2 && <AggiungiPatente setNomeP={setNomeP} setCognomeP={setCognomeP} setPat={setPat} nome={nome} cognome={cognome} codicePat={codicePat} controllaNome={controllaNome} controllaCognome={controllaCognome} controllaPatente={controllaPatente} nomeErr={nomeErr} cognomeErr={cognomeErr} patErr={patErr}/>}
          {page === 3 && <RimuoviPatente/>}
        </div>

         {page === 1 && <PaginaUno/>}

         <div className={UserCSS.button}>
          {page === 2 && <input type="button" value="Indietro" onClick={vaiIndietro}/>}
          {page === 2 && <input type="button" value="Aggiungi" onClick={aggPatente}/>}
          {page === 3 && <input type="button" value="Indietro" onClick={vaiIndietro}/>}
        </div>
        
        { page === 2 &&
        <div>
          <p className={UserCSS.errormessage}>
          {(nomeErr||cognomeErr||patErr) && "I seguenti campi sono invalidi:"}
          {nomeErr && " Nome "} {cognomeErr && " Cognome "} {patErr && " Patente "}
          </p>
        </div>
        }
        
      </div>
    </div>
  </div>
  </div>

</>
);

function PaginaUno(){ //Controllare questo bottone, fare utto al solo bottone avanti
    return(
    <>
        <div className={UserCSS.button}>
          <input type="button" value="Aggiungi Patente" onClick={vaiAgg}/>
        </div>
        <div className={UserCSS.button}>
          <input type="button" value="Rimuovi Patente" onClick={vaiRim}/>
        </div>
    </>
    );
}


function RimuoviPatente(){
    return(
        <div className={UserCSS.contmezziform}>
             {listaPat.map((val, key) => {
                return(
                    <div className={UserCSS.contmezzi} key={val.documento}>
                        <span className="details">Codice Patente: <p>{val.patente}</p> </span>
                        <span className="details">Nome: <p>{val.nome}</p>  </span>
                        <span className="details">Cognome: <p>{val.cognome}</p> </span>
                        <input type="radio" class="btn-check" name="btnradio" id={val.patente} autocomplete="off" onClick={ (e) => {bottoneEli(val.patente)}}/>
                        <label class="btn btn-outline-primary" for={val.patente}>Elimina</label>
                    </div>
                )
            })}
        </div> 
    );
}
}

function AggiungiPatente({setNomeP, setCognomeP, setPat, nome, cognome, codicePat, controllaNome, controllaCognome, controllaPatente, nomeErr, cognomeErr, patErr}){

    return(
        <>
        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>Nome</span>
        <input type="text" placeholder="Inserisci il nome" required onChange={(e) => {setNomeP(e.target.value)}} onBlur={controllaNome()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>Cognome</span>
        <input type="text" placeholder="Inserisci il cognome" required onChange={(e) => {setCognomeP(e.target.value)}} onBlur={controllaCognome()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>Patente</span>
        <input type="text" placeholder="Inserisci il numero della patente" required onChange={(e) => {setPat(e.target.value)}} onBlur={controllaPatente()}/>
        </div>

        <div class="container">
         <div class="row">
      <div class="col-sm">
     Nome: {nome}
     </div>
      <div class="col-sm">
     Cognome: {cognome}
     </div>
     <div class="col-sm">
      Patente: {codicePat}
     </div>
   </div>
    </div>

    </>
    );


}

export default Patente;
