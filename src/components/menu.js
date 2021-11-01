import hglogo from '../images/hglogo.png';
import Axios from 'axios';


function Menu(){

  if(localStorage.getItem('login') === 'true'){
    return (
      <>
      <div id="logo">
      <img src={hglogo} className="hglogo" alt="img"/>
      <a href="/" id="home" className="logo">NoleggioHopeless</a>
      </div>

      <div id="toggle" onClick={ApriMenu}></div>
      <div id="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/profilo">Profilo</a></li>
          <li><a href="/gestprenotazione">GestisciPrenotazione</a></li>
          <li><a href="/prenota">Prenota</a></li>
          <li><a href="/" onClick={vaiVia}>Esci</a></li>
        </ul>
      </div> 
      </> 
    );
  } else {
    return (
      <>
      <div id="logo">
      <img src={hglogo} className="hglogo" alt="img"/>
      <a href="/" id="home" className="logo">NoleggioHopeless</a>
      </div>

      <div id="toggle" onClick={ApriMenu}></div>
      <div id="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/registrati">Registrazione</a></li>
          <li><a href="/accedi">Autenticazione</a></li> 
        </ul>
      </div> 
      </> 
    );
  }
/*
    return (
          <>
          <div id="logo">
          <img src={hglogo} className="hglogo" alt="img"/>
          <a href="/" id="home" className="logo">NoleggioHopeless</a>
          </div>
    
          <div id="toggle" onClick={ApriMenu}></div>
          <div id="navbar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/profilo">Profilo</a></li>
              <li><a href="/gestprenotazione">GestisciPrenotazione</a></li>
              <li><a href="/prenota">Prenota</a></li>
              <li><a href="/registrati">Registrazione</a></li>
              <li><a href="/accedi">Autenticazione</a></li> 
              <li><a href="/" onClick={vaiVia}>Esci</a></li>
            </ul>
          </div> 
          </> 
    );*/
}
function vaiVia(){
  Axios.get("http://localhost:3001/logout");
  localStorage.clear();
}

function ApriMenu(){
    
   // const header = document.getElementById('header');
    const toggle = document.getElementById('toggle');
    const navbar = document.getElementById('navbar');
  
    document.onclick=function(e){
      if(e.target.id !== 'header' && e.target.id !== 'toggle' && e.target.id !== 'navbar'){
        toggle.classList.remove('active');
        navbar.classList.remove('active');
      }
    }
  
    toggle.onclick = function(){
      toggle.classList.toggle('active');
      navbar.classList.toggle('active');
    }
  }

export default Menu;