import React from 'react';
import { useState } from 'react';
import UserCSS from './gestiscipre.module.css';
import Axios from 'axios';
import { validNumCarta, validScad, validCV } from '../../components/Regexp';


function Carta(){
    
    const [page, setPage] = useState(1);

    const [carta, setNumCarta] = useState('');
    const [scadenza, setDataS] = useState('');
    const [codiceCV, setCodiceCV] = useState('');

    const [cartaScelta, setCarScelta] = useState('');

    const [listaCar, setListaCar] = useState([]);  

    const [numErr, setNumErr] = useState(false);
    const [dataErr, setDataErr] = useState(false);
    const [cvErr, setCvErr] = useState(false);

    function vaiAgg(){
        setPage(page => 2); 
    }

    function vaiRim(){
        setPage(page => 3);
        listaCarte();
    }

    function vaiIndietro(){
        setPage(page => 1);
    }

    const listaCarte = () => {
            Axios.post("https://hgroup.herokuapp.com/listaCarte", {
             email: localStorage.getItem('email'),  
            }).then((response) => {
                console.log(response);
                setListaCar(response.data);
            });
        
    }


    const aggCarta = () => {
        
        if((numErr===false)&&(dataErr===false)&&(cvErr===false)){
            
            Axios.post("https://hgroup.herokuapp.com/aggcarta", {
                email: localStorage.getItem('email'),
                carta: carta,
                scadenza: scadenza,
                cv: codiceCV,
            }).then((response) => { 
                if(response.data==="Carta Aggiunta"){
                window.alert("Carta Aggiunta all'account!");
                window.location.replace("/profilo/carte");
                }
                });

          } else {
              alert("Alcuni campi sono invalidi!");
          }
    };

    function bottoneEli(car){
        setCarScelta(car);
        rimCarta();
    }

    const rimCarta = () => {
        Axios.post("https://hgroup.herokuapp.com/rimcarta", {
            email: localStorage.getItem('email'), 
            carta: cartaScelta,
        }).then((response) => {
            if(response.data==="Carta Rimossa"){
                window.alert("Carta rimossa con successo!");
            }
        });
    };

    function controllaNumCarta(){
        if(!validNumCarta.test(carta)){
            setNumErr(true);
        } else {
            setNumErr(false);
        }
    }

    function controllaDataS(){
        if(!validScad.test(scadenza)){
            setDataErr(true);
        } else {
            setDataErr(false);
        }
    }

    function controllaCV(){
        if(!validCV.test(codiceCV)){
            setCvErr(true);
        } else {
            setCvErr(false);
        }
    }

    return(
    <>
     <div className={UserCSS.container}> 
     <div className={UserCSS.contform}>

     <div className={UserCSS.titlereg}>Gestisci Carte</div>

     <div className={UserCSS.content}>

      <div className={UserCSS.formpre}> 

        <div className={UserCSS.userdetails}>
          {page === 2 && <AggiungiCarta setNumCarta={setNumCarta} setDataS={setDataS} setCodiceCV={setCodiceCV} carta={carta} scadenza={scadenza} codiceCV={codiceCV} controllaNumCarta={controllaNumCarta} controllaDataS={controllaDataS} controllaCV={controllaCV} numErr={numErr} dataErr={dataErr} cvErr={cvErr}/>}
          {page === 3 && <RimuoviCarta/>}
        </div>

         {page === 1 && <PaginaUno/>}

         <div className={UserCSS.button}>
          {page === 2 && <input type="button" value="Indietro" onClick={vaiIndietro}/>}
          {page === 2 && <input type="button" value="Aggiungi" onClick={aggCarta}/>}
          {page === 3 && <input type="button" value="Indietro" onClick={vaiIndietro}/>}
        </div>

        { page === 2 &&
        <div>
          <p className={UserCSS.errormessage}>
          {(numErr||dataErr||cvErr) && "I seguenti campi sono invalidi:"}
          {numErr && " NumeroCarta "} {dataErr && " DataScadenza "} {cvErr && " CV2 "}
          </p>
        </div>
        }

      </div>
    </div>
  </div>
  </div>

</>
);

function PaginaUno(){ 
    return(
    <>
        <div className={UserCSS.button}>
          <input type="button" value="Aggiungi Carta" onClick={vaiAgg}/>
        </div>
        <div className={UserCSS.button}>
          <input type="button" value="Rimuovi Carta" onClick={vaiRim}/>
        </div>
    </>
    );
}


function RimuoviCarta(){
    return(
        <div className={UserCSS.contmezziform}>
             {listaCar.map((val, key) => {
                return(
                    <div className={UserCSS.contmezzi} key={val.carta}>
                        <span className="details">Numero Carta: <p>{val.carta}</p> </span>
                        <span className="details">Scadenza: <p>{val.scadenza}</p>  </span>
                        <span className="details">CV2: <p>{val.cv}</p> </span>
                        <input type="radio" class="btn-check" name="btnradio" id={val.carta} autocomplete="off" onClick={ (e) => {bottoneEli(val.carta)}}/>
                        <label class="btn btn-outline-primary" for={val.carta}>Elimina</label>
                    </div>
                )
            })}
        </div> 
    );
}
}

function AggiungiCarta({setNumCarta, setDataS, setCodiceCV, carta, scadenza, codiceCV, controllaNumCarta, controllaDataS, controllaCV, numErr, dataErr, cvErr}){

    return(
        <>
        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>Numero Carta</span>
        <input type="text" placeholder="Inserisci il numero della carta" required onChange={(e) => {setNumCarta(e.target.value)}} onBlur={controllaNumCarta()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>Scadenza</span>
        <input type="text" placeholder="Inserisci la data di validità" required onChange={(e) => {setDataS(e.target.value)}} onBlur={controllaDataS()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>CV2</span>
        <input type="text" placeholder="Inserisci il CV2" required onChange={(e) => {setCodiceCV(e.target.value)}} onBlur={controllaCV()}/>
        </div>

        <div class="container">
         <div class="row">
      <div class="col-sm">
     Numero Carta: {carta}
     </div>
      <div class="col-sm">
     Scadenza: {scadenza}
     </div>
     <div class="col-sm">
      CV2: {codiceCV}
     </div>
   </div>
    </div>

    </>
    );


}

export default Carta;
