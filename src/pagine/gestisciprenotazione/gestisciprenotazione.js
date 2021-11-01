import React from 'react';
import { useState } from 'react';
import UserCSS from './gestiscipre.module.css';
import Axios from 'axios';


function GestPren(){
    
    const [page, setPage] = useState(1);
    const [listaPren, setListaPren] = useState([]);
    const [mezzoScelto, setMezzoScelto] = useState('');

    function vaiAvanti(){
        if(page===2) return;
        setPage(page => page + 1); 
     }

    const prenotazioniEffettuate = () => {
        Axios.post("https://hgroup.herokuapp.com/preneffettuate", {
         email: localStorage.getItem('email'),  
        }).then((response) => {
            console.log(response);
            setListaPren(response.data);
        });
    };

    const bottone = () => {
        vaiAvanti();
        prenotazioniEffettuate();
    };

    function bottoneEli(mez){
        setMezzoScelto(mez);
        rimPren();
    }

    const rimPren = () => {
        Axios.post("https://hgroup.herokuapp.com/rimprenotazione", {
            idcliente: localStorage.getItem('email'), 
            idmezzo: mezzoScelto,
        }).then((response) => {
            if(response.data==="Prenotazione Rimossa"){
                window.alert("Prenotazione Rimossa con successo!");
            }
        });
    };


    return(
    <>
     {prenotazioniEffettuate}
     <div className={UserCSS.container}> 
     <div className={UserCSS.contform}>

     <div className={UserCSS.titlereg}>Gestisci Prenotazione</div>

     <div className={UserCSS.content}>

      <div className={UserCSS.formpre}> 

        <div className={UserCSS.userdetails}>
          {page === 2 && <PaginaDue/>}
        </div>

         {page === 1 && <PaginaUno/>}

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
          <input type="button" value="Visualizza le Prenotazioni" onClick={bottone}/>
        </div>
    </>
    );
}

function PaginaDue(){
    return(
        <div className={UserCSS.contmezziform}>
             {listaPren.map((val, key) => {
                return(
                    <div className={UserCSS.contmezzi} key={val.idmezzo}>
                        <span className="details">ID Mezzo: <p>{val.idmezzo}</p> </span>
                        <span className="details">Data Rilascio: <p>{val.dataril}</p> </span>
                        <span className="details">Data Ritiro: <p>{val.datarit}</p> </span>
                        <span className="details">Orario Rilascio: <p>{val.orarioril}</p> </span>
                        <span className="details">Orario Ritiro: <p>{val.orariorit}</p> </span>
                        <span className="details">Prezzo Totale: <p>{val.prezzotot}</p>  </span>
                        <input type="radio" class="btn-check" name="btnradio" id={val.idmezzo} autocomplete="off" onClick={ (e) => {bottoneEli(val.idmezzo)}}/>
                        <label class="btn btn-outline-primary" for={val.idmezzo}>Elimina</label>
                    </div>
                )
            })}
        </div>
    );
}
}

export default GestPren;
