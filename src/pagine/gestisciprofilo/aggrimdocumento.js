import React from 'react';
import { useState } from 'react';
import UserCSS from './gestiscipre.module.css';
import Axios from 'axios';
import { validNome, validCognome, validCartaID} from '../../components/Regexp';

function Documento(){
    
    const [page, setPage] = useState(1);

    const [nome, setNomeD] = useState('');
    const [cognome, setCognomeD] = useState('');
    const [codiceDoc, setDoc] = useState('');

    const [docScelto, setDocScelto] = useState('');

    const [listaDoc, setListaDoc] = useState([]);  

    const [nomeErr, setNomeErr] = useState(false);
    const [cognomeErr, setCognomeErr] = useState(false);
    const [docErr, setDocErr] = useState(false);

    function vaiAgg(){
        setPage(page => 2); 
    }

    function vaiRim(){
        setPage(page => 3);
        listaDocumenti();
    }

    function vaiIndietro(){
        setPage(page => 1);
    }

    const listaDocumenti = () => {
            Axios.post("https://hgroup.herokuapp.com/listaDoc", {
             email: localStorage.getItem('email'),  
            }).then((response) => {
                console.log(response);
                setListaDoc(response.data);
            });
        
    }


    const aggDocumento = () => {

        if((nomeErr===false)&&(cognomeErr===false)&&(docErr===false)){
            
            Axios.post("https://hgroup.herokuapp.com/aggdocumento", {
           email: localStorage.getItem('email'), 
            documento: codiceDoc,
            nome: nome,
            cognome: cognome, 
        }).then((response) => { 
            if(response.data==="Documento Aggiunto"){
            window.alert("Documento Aggiunto all'account!");
            window.location.replace("/profilo/documenti");
            }
            });

        } else {
            window.alert("Qualche campo è invalido!");
        }
    };

    function bottoneEli(doc){
        setDocScelto(doc);
        rimDocumento();
    }

    const rimDocumento = () => {
        Axios.post("https://hgroup.herokuapp.com/rimdocumento", {
            email: localStorage.getItem('email'), 
            documento: docScelto,
        }).then((response) => {
            if(response.data==="Documento Rimosso"){
                window.alert("Documento Rimosso con successo!");
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

    function controllaDocumento(){
        if(!validCartaID.test(codiceDoc)){
            setDocErr(true);
        } else {
            setDocErr(false);
        }
    }




    return(
    <>
     <div className={UserCSS.container}> 
     <div className={UserCSS.contform}>

     <div className={UserCSS.titlereg}>Gestisci Documenti</div>

     <div className={UserCSS.content}>

      <div className={UserCSS.formpre}> 

        <div className={UserCSS.userdetails}>
          {page === 2 && <AggiungiDocumento setNomeD={setNomeD} setCognomeD={setCognomeD} setDoc={setDoc} controllaNome={controllaNome} controllaCognome={controllaCognome} controllaDocumento={controllaDocumento} nomeErr={nomeErr} cognomeErr={cognomeErr} docErr={docErr} nome={nome} cognome={cognome} codiceDoc={codiceDoc}/>}
          {page === 3 && <RimuoviDocumento/>}
        </div>

         {page === 1 && <PaginaUno/>}

         <div className={UserCSS.button}>
          {page === 2 && <input type="button" value="Indietro" onClick={vaiIndietro}/>}
          {page === 2 && <input type="button" value="Aggiungi" onClick={aggDocumento}/>}
          {page === 3 && <input type="button" value="Indietro" onClick={vaiIndietro}/>}
        </div>
        
        {page === 2 &&
        <div>
          <p className={UserCSS.errormessage}>
          {(nomeErr||cognomeErr||docErr) && "I seguenti campi sono invalidi:"}
          {nomeErr && " Nome "} {cognomeErr && " Cognome "} {docErr && " Documento "}
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
          <input type="button" value="Aggiungi Documento" onClick={vaiAgg}/>
        </div>
        <div className={UserCSS.button}>
          <input type="button" value="Rimuovi Documento" onClick={vaiRim}/>
        </div>
    </>
    );
}


function RimuoviDocumento(){
    return(
        <div className={UserCSS.contmezziform}>
             {listaDoc.map((val, key) => {
                return(
                    <div className={UserCSS.contmezzi} key={val.documento}>
                        <span className="details">Codice Documento: <p>{val.documento}</p> </span>
                        <span className="details">Nome: <p>{val.nome}</p>  </span>
                        <span className="details">Cognome: <p>{val.cognome}</p> </span>
                        <input type="radio" class="btn-check" name="btnradio" id={val.documento} autocomplete="off" onClick={ (e) => {bottoneEli(val.documento)}}/>
                        <label class="btn btn-outline-primary" for={val.documento}>Elimina</label>
                    </div>
                )
            })}
        </div> 
    );
}
}

function AggiungiDocumento({setNomeD, setCognomeD, setDoc, controllaNome, controllaCognome, controllaDocumento, nomeErr, cognomeErr, docErr, nome, cognome, codiceDoc}){

    return(
        <>
        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>Nome</span>
        <input type="text" placeholder="Inserisci il nome" required onChange={(e) => {setNomeD(e.target.value)}} onBlur={controllaNome()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>Cognome</span>
        <input type="text" placeholder="Inserisci il cognome" required onChange={(e) => {setCognomeD(e.target.value)}} onBlur={controllaCognome()}/>
        </div>

        <div className={UserCSS.inputbox}>
        <span className={UserCSS.details}>Documento</span>
        <input type="text" placeholder="Inserisci il numero del documento" required onChange={(e) => {setDoc(e.target.value)}} onBlur={controllaDocumento()}/>
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
      Documento: {codiceDoc}
     </div>
   </div>
    </div>

    </>
    );


}

export default Documento;
