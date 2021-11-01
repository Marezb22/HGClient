import UserCSS from './userform.module.css';
import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { validNome, validCognome, validPatente, validCartaID, validNumCarta, validScad, validCV } from '../../components/Regexp';


function UserForm(){
 
    //Per capire a che pagina saremo aumenteremo o diminuiremo questo valore.

    const [page, setPage] = useState(1);

    //Dati Prenotazione

    const [dataRil, setDataRil] = useState('');
    const [orarioRil, setOrarioRil] = useState('');
    const [dataRit, setDataRit] = useState('');
    const [orarioRit, setOrarioRit] = useState('');

    const [tipMezzo, setTipologiaMezzo] = useState('');

    const [mezzoScelto, setMezzoScelto] = useState('');

    const [nomeC, setNomeC] = useState('');
    const [cognomeC, setCognomeC] = useState('');
    const [documentoC, setDoc] = useState('');
    const [patenteC, setPat] = useState('');

    const [oretot, setOreTot] = useState('');

    const [numCarta, setNumCarta] = useState('');
    const [dataScad, setDataS] = useState('');
    const [codiceCv, setCV2] = useState('');

    const [prezzoTot, setPrezzo] = useState('');

    const [viaRiconsegna, setRiconsegna] = useState('');
    const [destinazione, setDest] = useState('');
    const [autista, setAutista] = useState(false);
 
    //Lista dei Mezzi Disponibili

    const [listaMezzi, setListaMezzi] = useState([]);
    const [listaPat, setListaPat] = useState([]);
    const [listaDoc, setListaDoc] = useState([]);
    const [listaCar, setListaCarte] = useState([]); 

    function vaiAvanti(){
       if(page===7) return;
       setPage(page => page + 1); 
    }

    function vaiIndietro(){
        if(page===1) return;
        setPage(page => page - 1);  
    }

    const aggiungiPrenotazione = () => {

            Axios.post("https://hgroup.herokuapp.com/prenota", { 
          idmezzo: mezzoScelto,
          datarit: dataRit,
          orariorit: orarioRit,
          dataril: dataRil,
          orarioril: orarioRil,
          idcliente: localStorage.getItem('email'),
          documento: documentoC||patenteC,
          autista: autista,
          numcarta: numCarta,
          prezzotot: prezzoTot,
          riconsegna: viaRiconsegna,
          destinazione: destinazione
        })
        .then(function (response) {
          console.log(response);
          if(response.data==="Prenotazione Aggiunta!"){ 
            window.alert("Prenotazione aggiunta con successo!");
            window.location.replace("/");
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      }

      const bottoneConferma = () => {
        if((numErr===false)&&(dataErr===false)&&(cvErr===false)){
          aggiungiPrenotazione();
          aggCarta();
          if(tipMezzo==="auto"||tipMezzo==="moto"){
              if(autista===true){
                aggDocumento();
              } else {
                aggPatente();
              }
          } else {
            aggDocumento();
          }
        } else {
            alert("Alcuni campi sono invalidi!");
        }
      }

      const aggDocumento = () => {
        Axios.post("https://hgroup.herokuapp.com/aggdocumento", {
            email: localStorage.getItem('email'), 
            documento: documentoC,
            nome: nomeC,
            cognome: cognomeC, 
        });
    };

    const aggPatente = () => {
        Axios.post("https://hgroup.herokuapp.com/aggpatente", {
            email: localStorage.getItem('email'), 
            patente: patenteC,
            nome: nomeC,
            cognome: cognomeC, 
        });
    };

    const aggCarta = () => {
        Axios.post("https://hgroup.herokuapp.com/aggcarta", {
            email: localStorage.getItem('email'),
            carta: numCarta,
            scadenza: dataScad,
            cv: codiceCv,
        });
    };

    const catalogo = () => {
        Axios.post("https://hgroup.herokuapp.com/catalogo", {
            tipMezzo: tipMezzo,
            datarit: dataRit,
            orariorit: orarioRit,
            dataril: dataRil,
            orarioril: orarioRil
        }).then((response) => {
            console.log(response);
            setListaMezzi(response.data);
        });
    };

    const botCatalogo = () => {
        vaiAvanti();
        catalogo();
    };

    function mezzoS(idm, prezzo){
        setMezzoScelto(idm);
        if(autista===true){
            setPrezzo((prezzo*oretot)+(10*oretot));
        } else {
            setPrezzo(prezzo*oretot);
        }
    };

    const bottonePrimo = () => {
        if( {oretot}.oretot > 1 && oraRitErr===false){
            vaiAvanti();
        } else {
            alert("La prenotazione prevede almeno due ore di noleggio!");
        }
    }

    const bottoneTerzo = () => {
        vaiAvanti();
        listaDocumenti();
        listaPatenti();
        alert("Il prezzo totale verrebbe: " + prezzoTot + " euro.");
    }
    
    const bottoneQuarto = () => {
        if((nomeErr===false)&&(cognomeErr===false)&&(docErr===false)&&(patErr===false)){
            vaiAvanti();
        }
    }

    const bottoneSesto = () => {
        vaiAvanti();
        listaCarte();
    }

    const listaDocumenti = () => {
        Axios.post("https://hgroup.herokuapp.com/listaDoc", {
         email: localStorage.getItem('email'),  
        }).then((response) => {
            console.log(response);
            setListaDoc(response.data);
        });
    }

    const listaPatenti = () => {
        Axios.post("https://hgroup.herokuapp.com/listaPat", {
         email: localStorage.getItem('email'),  
        }).then((response) => {
            console.log(response);
            setListaPat(response.data);
        });
    }

    const listaCarte = () => {
        Axios.post("https://hgroup.herokuapp.com/listaCarte", {
         email: localStorage.getItem('email'),  
        }).then((response) => {
            console.log(response);
            setListaCarte(response.data);
        });
    }

    function bottoneSelP(patente, nome, cognome){
        setPat(patente);
        setNomeC(nome);
        setCognomeC(cognome);
    }

    function bottoneSelD(documento, nome, cognome){
        setDoc(documento);
        setNomeC(nome);
        setCognomeC(cognome);
    }

    function bottoneSelC(carta, scad, cv){ 
        setNumCarta(carta);
        setDataS(scad);
        setCV2(cv);
    }

    function bottoneAutista(){
        setTipologiaMezzo('auto');
        setAutista(true);
    }

    function bottoneAuto(){
        setTipologiaMezzo('auto');
        setAutista(false);
    }

    function bottoneMoto(){
        setTipologiaMezzo('moto');
        setAutista(false);
    }

    function bottoneMono(){
        setTipologiaMezzo('monopattino');
        setAutista(false);
    }

    function bottoneBici(){
        setTipologiaMezzo('bici');
        setAutista(false);    
    }

    function differenzaDate(){
        var dataUno = new Date({dataRit}.dataRit);
        var dataDue = new Date({dataRil}.dataRil);

        var dataAttuale = new Date();

        var t1 = dataUno.getTime();
        var t2 = dataDue.getTime();

        let part1 = parseInt( (t2-t1)/(3600*1000) );
        let part2 = parseInt(({orarioRit}.orarioRit).substring(0,2));
        let part3 = parseInt(({orarioRil}.orarioRil).substring(0,2));

        if(dataUno.getFullYear() === dataDue.getFullYear()){
            if(dataUno.getMonth() === dataDue.getMonth()){
                if(dataUno.getDate() === dataDue.getDate()){
                    var oreComplessive = ({orarioRil}.orarioRil).substring(0,2) - ({orarioRit}.orarioRit).substring(0,2);
                } else {
                   var oreComplessive = part1 - part2 + part3;
                }
            }
        }
        
        if(dataUno.getFullYear() === dataAttuale.getFullYear()){
            if(dataUno.getMonth() === dataAttuale.getMonth()){
                if(dataUno.getDate() === dataAttuale.getDate()){

                   if(dataAttuale.getHours()>part2){
                        setOraRitErr(true);
                    } else {
                        setOraRitErr(false);
                    }

                } else {
                    setOraRitErr(false);
                }
            } else {
                setOraRitErr(false);
            }
        } else {
            setOraRitErr(false);
        }

       // console.log(oreComplessive);
        setOreTot(oreComplessive);
    }

    //Aggiornamento campi dati

    function updateDataRit(data){
        setDataRit(data);
    }

    function updateDataRil(data){
        setDataRil(data);
    }

    function updateOrarioRit(data){
        setOrarioRit(data);
    }

    function updateOrarioRil(data){
        setOrarioRil(data);
    }

    function updateNome(data){
        setNomeC(data);
    }

    function updateCognome(data){
        setCognomeC(data);
    }

    function updateDocum(data){
        setDoc(data);
    }

    function updatePat(data){
        setPat(data);
    }

    function updateNumCarta(data){
        setNumCarta(data);
    }

    function updateDataS(data){
        setDataS(data);
    }

    function updadateCV(data){
        setCV2(data);
    }

    // Sistemazione Campi dei dati
    
    const [nomeErr, setNomeErr] = useState(false);
    const [cognomeErr, setCognomeErr] = useState(false);
    const [patErr, setPatErr] = useState(false);
    const [docErr, setDocErr] = useState(false);
    const [numErr, setNumErr] = useState(false);
    const [dataErr, setDataErr] = useState(false);
    const [cvErr, setCvErr] = useState(false);
    const [oraRitErr, setOraRitErr] = useState(false);
    
    function controllaNome(){
        if(!validNome.test(nomeC)){
            setNomeErr(true);
        } else {
            setNomeErr(false);
        }
    }

    function controllaCognome(){
        if(!validCognome.test(cognomeC)){
            setCognomeErr(true);
        } else {
            setCognomeErr(false);
        }
    }

    function controllaDocumento(){
        if(!validCartaID.test(documentoC)){
            setDocErr(true);
        } else {
            setDocErr(false);
        }
    }

    function controllaPatente(){
        if(!validPatente.test(patenteC)){
            setPatErr(true);
        } else {
            setPatErr(false);
        }
    }

    function controllaNumCarta(){
        if(!validNumCarta.test(numCarta)){
            setNumErr(true);
        } else {
            setNumErr(false);
        }
    }

    function controllaDataS(){
        if(!validScad.test(dataScad)){
            setDataErr(true);
        } else {
            setDataErr(false);
        }
    }

    function controllaCV(){
        if(!validCV.test(codiceCv)){
            setCvErr(true);
        } else {
            setCvErr(false);
        }
    }
        
        

return(
<> 
<div className={UserCSS.container}> 
  <div className={UserCSS.contform}>

  <div className={UserCSS.titlereg}>Prenotazione</div>
  <div className={UserCSS.progressbar}>
  <progress max='6' value={page}/>
  </div>

   <div className={UserCSS.content}>

      <form className={UserCSS.formpre} action="#"> 

        <div className={UserCSS.userdetails}>
         {page === 1 && (<PaginaUno aggDataRil={updateDataRil} aggDataRit={updateDataRit} aggOraRil={updateOrarioRil} aggOraRit={updateOrarioRit} dataRit={dataRit} orarioRit={orarioRit} dataRil={dataRil} orarioRil={orarioRil} differenzaDate={differenzaDate}/>)}
         {page === 2 && <PaginaDue/>}
         {page === 3 && <PaginaTre/>}
         {page === 4 && <PaginaQuattro aggNome={updateNome} aggCognome={updateCognome} aggDoc={updateDocum} aggPat={updatePat} tipMezzo={tipMezzo} autista={autista} nomeC={nomeC} cognomeC={cognomeC} documentoC={documentoC} patenteC={patenteC} listaDoc={listaDoc} bottoneSelD={bottoneSelD} listaPat={listaPat} bottoneSelP={bottoneSelP} nomeErr={nomeErr} cognomeErr={cognomeErr} docErr={docErr} patErr={patErr} controllaNome={controllaNome} controllaCognome={controllaCognome} controllaDocumento={controllaDocumento} controllaPatente={controllaPatente}/>}
         {page === 5 && <PaginaCinque/>}
         {page === 6 && <PaginaSei/>}
         {page === 7 && <PaginaSette aggNumCarta={updateNumCarta} aggDataS={updateDataS} aggCV2={updadateCV} listaCar={listaCar} bottoneSelC={bottoneSelC} numCarta={numCarta} dataScad={dataScad} codiceCv={codiceCv} controllaNumCarta={controllaNumCarta} controllaDataS={controllaDataS} controllaCV={controllaCV} numErr={numErr} dataErr={dataErr} cvErr={cvErr}/>}
        </div>

        <div className={UserCSS.button}>
          {page === 2 && <input type="button" value="Avanti" onClick={botCatalogo} disabled={!tipMezzo}/>}
          {page === 1 && <input type="button" value="Avanti" onClick={bottonePrimo} disabled={!(dataRit&&dataRil&&orarioRit&&orarioRil)} />}
          {page === 3 && <input type="button" value="Avanti" onClick={bottoneTerzo} disabled={!mezzoScelto}/>}
          {page === 4 && <input type="button" value="Avanti" onClick={bottoneQuarto} disabled={!(nomeC&&cognomeC&&(patenteC||documentoC))}/>}
          {page === 5 && <input type="button" value="Avanti" onClick={vaiAvanti} disabled={!viaRiconsegna}/>}
          {page === 6 && <input type="button" value="Avanti" onClick={bottoneSesto}/>}
          {page !== 1 && <input type="button" value="Indietro" onClick={vaiIndietro}/>}
          {page === 7 && <input type="button" value="Conferma" onClick={bottoneConferma} disable={!(numCarta&&dataScad&&codiceCv)}/>}
        </div>

        { page === 4 &&
        <div>
          <p className={UserCSS.errormessage}>
          {(nomeErr||cognomeErr||patErr||docErr) && "I seguenti campi sono invalidi:"}
          {nomeErr && " Nome "} {cognomeErr && " Cognome "} {patErr && " Patente "} {docErr && " Documento "}
          </p>
        </div>
        }

        { page === 7 &&
        <div>
          <p className={UserCSS.errormessage}>
          {(numErr||dataErr||cvErr) && "I seguenti campi sono invalidi:"}
          {numErr && " NumeroCarta "} {dataErr && " DataScadenza "} {cvErr && " CV "}
          </p>
        </div>
        }

      </form>
    </div>
  </div>
  </div>

</>
);

function PaginaDue(){
    return(
        <div className={UserCSS.selMezzo}> 
            <p> Seleziona la Tipologia del Mezzo: </p>

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                 <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onClick={(event)=> {bottoneAuto()}}/>
                 <label class="btn btn-outline-primary" for="btnradio1">Auto</label>

                 <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={(event)=> {bottoneMoto()}}/>
                 <label class="btn btn-outline-primary" for="btnradio2">Moto</label>

                 <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" onClick={(event)=> {bottoneBici()}}/>
                 <label class="btn btn-outline-primary" for="btnradio3">Bici</label>

                 <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" onClick={(event)=> {bottoneMono()}}/>
                 <label class="btn btn-outline-primary" for="btnradio4">Monopattino</label>

                 <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" onClick={(event)=> {bottoneAutista()}}/>
                 <label class="btn btn-outline-primary" for="btnradio5">Auto + Autista</label>
            </div>
        </div>

    );
}

function PaginaTre(){
    return(
        <div className={UserCSS.contmezziform}>
            {listaMezzi.map((val, key) => {
                return(
                    <div className={UserCSS.contmezzi} key={val.idmezzo}>
                        <span className="details">ID: <p>{val.idmezzo}</p> </span>
                        <span className="details">Marchio: <p>{val.marchio}</p> </span>
                        <span className="details">Modello: <p>{val.modello}</p> </span>
                        <span className="details">Cilindrata: <p>{val.cilindrata}</p> </span>
                        <span className="details">Prezzo: <p>{val.prezzo}</p>  </span>
                        <span className="details">Posizione: <p>{val.posizione}</p>  </span>
                        <input type="radio" class="btn-check" name="btnradio" id={val.idmezzo} autocomplete="off" onClick={(event)=> {mezzoS(val.idmezzo, val.prezzo)}}/>
                        <label class="btn btn-outline-primary" for={val.idmezzo}>Seleziona</label>
                    </div>
                )
            })}
        </div>
    );
    
}

function PaginaCinque(){
    if(autista===false){
        return(
            <>
            <p>Seleziona il parcheggio dove riconsegnare il mezzo oppure un fuori stallo </p>
    
            <div className={UserCSS.inputbox}>
                <input type="button" value="Via Roma, 52" onClick={(e) => {setRiconsegna('Via Roma, 52')}}/>
            </div>
            <div className={UserCSS.inputbox}>
                <input type="button" value="Viale Strasburgo, 324" onClick={(e) => {setRiconsegna('Viale Strasburgo, 324')}}/>
            </div>
            <div className={UserCSS.inputbox}>
                <input type="button" value="Corso Calatafimi, 224" onClick={(e) => {setRiconsegna('Corso Calatafimi, 224')}}/>
            </div>
            <div className={UserCSS.inputbox}>
                <input type="button" value="Piazza Cairoli, 15" onClick={(e) => {setRiconsegna('Piazza Cairoli, 15')}}/>
            </div>
    
            <div className={UserCSS.inputbox}>
                <span className="details">Fuori Stallo</span>
                <input type="text" placeholder="Dove desireri rilasciare il mezzo?" required onBlur={(event) => {setRiconsegna(event.target.value);}}/>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-sm">
                       Via Riconsegna: {viaRiconsegna}
                    </div>
                </div>
            </div>

            </>
            
        );
    } else {
        return(
            <>
            <p>Seleziona il parcheggio dove riconsegnare il mezzo oppure un fuori stallo </p>
    
            <div className={UserCSS.inputbox}>
                <input type="button" value="Via Roma, 52" onClick={(e) => {setRiconsegna('Via Roma, 52')}}/>
            </div>
            <div className={UserCSS.inputbox}>
                <input type="button" value="Viale Strasburgo, 324" onClick={(e) => {setRiconsegna('Viale Strasburgo, 324')}}/>
            </div>
            <div className={UserCSS.inputbox}>
                <input type="button" value="Corso Calatafimi, 224" onClick={(e) => {setRiconsegna('Corso Calatafimi, 224')}}/>
            </div>
            <div className={UserCSS.inputbox}>
                <input type="button" value="Piazza Cairoli, 15" onClick={(e) => {setRiconsegna('Piazza Cairoli, 15')}}/>
            </div>
    
            <div className={UserCSS.inputbox}>
                <span className="details">Fuori Stallo</span>
                <input type="text" placeholder="Dove desireri rilasciare il mezzo?" required onBlur={(event) => {setRiconsegna(event.target.value);}}/>
            </div>

            <div className={UserCSS.inputbox}>
                <span className="details">Destinazione</span>
                <input type="text" placeholder="Dove deve arrivare l'autista?" required onBlur={(event) => {setDest(event.target.value);}}/>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-sm">
                       Via Riconsegna: {viaRiconsegna}
                    </div>
                    <div class="col-sm">
                       Destinazione: {destinazione}
                    </div>
                </div>
            </div>
            </>
        );
    }
    
}

function PaginaSei(){
    return(
        <>
        <h4>Riepilogo</h4>
        <div class="container">
         <div class="row">
      <div class="col-sm">
        Nome: {nomeC}
     </div>
      <div class="col-sm">
       Cognome: {cognomeC}
     </div>
     <div class="col-sm">
      Mezzo Scelto: {mezzoScelto}
     </div>
   <div class="col-sm">
      Prezzo Totale: {prezzoTot}
     </div>
   </div>
   <div class="row">
     <div class="col-sm">
      Data Ritiro: {dataRit}
     </div>
     <div class="col-sm">
     Orario Ritiro: {orarioRit}
     </div>
     <div class="col-sm">
     Data Rilascio: {dataRil}
     </div>
     <div class="col-sm">
      Orario Rilascio: {orarioRil}
     </div>
   </div>
    </div>
    </>
    );
}

} 

function PaginaUno({aggDataRil, aggDataRit, aggOraRil, aggOraRit, dataRit, orarioRit, dataRil, orarioRil, differenzaDate}){ 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + '-' + dd;

    return(
    <>
        <div className={UserCSS.inputbox}>
        <span className="details">Data Ritiro</span>
        <input type="date" min={today} onChange={(event) => {aggDataRit(event.target.value);}} onMouseOut={differenzaDate}/>
        </div>

        <div className={UserCSS.inputbox}>
            <span className="details">Ora  Ritiro</span>
            <input type="time" required onChange={(event) => {aggOraRit(event.target.value);}} onMouseLeave={differenzaDate}/>
        </div>

        <div className={UserCSS.inputbox}>
            <span className="details">Data Rilascio</span>
            <input type="date" min={dataRit} required onChange={(event) => {aggDataRil(event.target.value);}} onMouseOut={differenzaDate}/>
        </div>

        <div className={UserCSS.inputbox}>
            <span className="details">Ora Rilascio</span>
            <input type="time" required onChange={(event) => {aggOraRil(event.target.value);}} onMouseLeave={differenzaDate}/>
        </div>

        <div class="container">
         <div class="row">
         <div class="col-sm">
      Data Ritiro: {dataRit}
     </div>
     <div class="col-sm">
      Ora Ritiro: {orarioRit}
     </div>
      <div class="col-sm">
     Data Rilascio: {dataRil}
     </div>
      <div class="col-sm">
     Ora Rilascio: {orarioRil}
     </div>
   </div>
    </div>
    </>
    );
}

function PaginaQuattro({aggNome, aggCognome, aggDoc, aggPat, tipMezzo, autista, nomeC, cognomeC, documentoC, patenteC, listaDoc, bottoneSelD, listaPat, bottoneSelP, nomeErr, cognomeErr, docErr, patErr, controllaNome, controllaCognome, controllaDocumento, controllaPatente}){
    if(tipMezzo === 'monopattino' || tipMezzo === 'bici' || autista === true){
    return(
        <>
        <div className={UserCSS.inputbox}>
        <span className="details">Nome</span>
        <input type="text" placeholder="Inserisci il nome" required onChange={(event) => {aggNome(event.target.value);}} onBlur={controllaNome()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className="details">Cognome</span>
        <input type="text" placeholder="Inserisci il cognome" required onChange={(event) => {aggCognome(event.target.value);}} onBlur={controllaCognome()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className="details">Documento</span>
        <input type="text" placeholder="Inserisci il numero del documento" required onChange={(event) => {aggDoc(event.target.value);}} onBlur={controllaDocumento()}/>
        </div>
        

        <div class="container">
         <div class="row">
      <div class="col-sm">
     Nome: {nomeC}
     </div>
      <div class="col-sm">
     Cognome: {cognomeC}
     </div>
     <div class="col-sm">
      Documento: {documentoC}
     </div>
   </div>
    </div>

    <div className={UserCSS.contmezziform}>
             {listaDoc.map((val, key) => {
                return(
                    <div className={UserCSS.contmezzi} key={val.documento}>
                        <span className="details">Codice Documento: <p>{val.documento}</p> </span>
                        <span className="details">Nome: <p>{val.nome}</p>  </span>
                        <span className="details">Cognome: <p>{val.cognome}</p> </span>
                        <input type="radio" class="btn-check" name="btnradio" id={val.documento} autocomplete="off" onClick={ (e) => {bottoneSelD(val.documento, val.nome, val.cognome)}}/>
                        <label class="btn btn-outline-primary" for={val.documento}>Usa Questo</label>
                    </div>
                )
            })}
        </div> 
    </>
    );
    } else {
        return(
            <>
            <div className={UserCSS.inputbox}>
            <span className="details">Nome</span>
            <input type="text" placeholder="Inserisci il nome" required onChange={(event) => {aggNome(event.target.value);}} onBlur={controllaNome()}/>

            </div>
    
            <div className={UserCSS.inputbox}>
            <span className="details">Cognome</span>
            <input type="text" placeholder="Inserisci il cognome" required onChange={(event) => {aggCognome(event.target.value);}} onBlur={controllaCognome()}/>
            </div>
    
            <div className={UserCSS.inputbox}>
            <span className="details">Patente</span>
            <input type="text" placeholder="Inserisci il numero della patente" required onChange={(event) => {aggPat(event.target.value);}} onBlur={controllaPatente()}/>
            </div>
    
            <div class="container">
             <div class="row">
          <div class="col-sm">
         Nome: {nomeC}
         </div>
          <div class="col-sm">
         Cognome: {cognomeC}
         </div>
         <div class="col-sm">
         Patente: {patenteC}
         </div>
       </div>
        </div>
    
        <div className={UserCSS.contmezziform}>
                 {listaPat.map((val, key) => {
                    return(
                        <div className={UserCSS.contmezzi} key={val.patente}>
                            <span className="details">Codice Patente: <p>{val.patente}</p> </span>
                            <span className="details">Nome: <p>{val.nome}</p>  </span>
                            <span className="details">Cognome: <p>{val.cognome}</p> </span>
                            <input type="radio" class="btn-check" name="btnradio" id={val.patente} autocomplete="off" onClick={ (e) => {bottoneSelP(val.patente, val.nome, val.cognome)}}/>
                            <label class="btn btn-outline-primary" for={val.patente}>Usa Questo</label>
                        </div>
                    )
                })}
            </div> 
        </>
        );
    }
}

function PaginaSette({aggNumCarta, aggDataS, aggCV2, listaCar, bottoneSelC, numCarta, dataScad, codiceCv, controllaNumCarta, controllaDataS, controllaCV, numErr, dataErr, cvErr}){
    return(
        <>
        <div className={UserCSS.inputbox}>
        <span className="details">Numero Carta</span>
        <input type="text" placeholder="Inserisci il numero della carta" required onChange={(event) => {aggNumCarta(event.target.value);}} onBlur={controllaNumCarta()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className="details">Data Scadenza</span>
        <input type="text" placeholder="Inserisci la data di valità" required onChange={(event) => {aggDataS(event.target.value);}} onBlur={controllaDataS()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className="details">CV2</span>
        <input type="text" placeholder="Inserisci il CV2" required onChange={(event) => {aggCV2(event.target.value);}} onBlur={controllaCV()}/>
        </div>

        <div class="container">
         <div class="row">
      <div class="col-sm">
     Numero: {numCarta}
     </div>
      <div class="col-sm">
     Data: {dataScad}
     </div>
     <div class="col-sm">
      CV2: {codiceCv}
     </div>
   </div>
    </div>

    <div className={UserCSS.contmezziform}>
                 {listaCar.map((val, key) => {
                    return(
                        <div className={UserCSS.contmezzi} key={val.carta}>
                            <span className="details">Numero Carta: <p>{val.carta}</p> </span>
                            <span className="details">Scadenza: <p>{val.scadenza}</p> </span>
                            <span className="details">CV: <p>{val.cv}</p> </span>
                            <input type="radio" class="btn-check" name="btnradio" id={val.carta} autocomplete="off" onClick={ (e) => {bottoneSelC(val.carta, val.scadenza, val.cv)}}/>
                            <label class="btn btn-outline-primary" for={val.carta}>Usa Questa</label>
                        </div>
                    )
                })}
            </div> 

    </>
    );
}


export default UserForm;