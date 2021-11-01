import Menu from './components/menu';
import Footer from './components/footer';
import Home from './pagine/home/home';
import Regi from './pagine/registrazione/registrazione';
import Login from './pagine/login/login';
import Pren from './pagine/prenotazione/userform';
import Profilo from './pagine/gestisciprofilo/profilo';
import GestPren from './pagine/gestisciprenotazione/gestisciprenotazione';
import Patente from './pagine/gestisciprofilo/aggrimpatente';
import Documento from './pagine/gestisciprofilo/aggrimdocumento';
import Carta from './pagine/gestisciprofilo/aggrimcarta';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";



function App() {
  //Per fare le parti relative all'amministratore e al lavoratore
  //posso mettere un if che mi richiama 3 funzioni return differenti

  // Con exact in route si renderizza solo la path richiesta

  function PrivateRoute(props){
    return(
      <Route path={props.path} render={data => localStorage.getItem('login') ? (
        <props.component {...data}></props.component>):
        (<Redirect to={{pathname:'/'}}></Redirect>)}></Route>
    )
  }

  return (
    <div className="App">

<Router>

      <header id="header">
        <Menu />
      </header>

        <Switch>
          
          <Route exact path="/" component={Home} exact/>

          <PrivateRoute exact path="/profilo" component={Profilo}/>
          
          <Route exact path="/registrati" component={Regi}/>

          <Route exact path="/accedi" component={Login}/>

          <PrivateRoute exact path="/prenota" component={Pren}/>

          <PrivateRoute exact path="/gestprenotazione" component={GestPren}/>

          <PrivateRoute exact path="/profilo/documenti" component={Documento}/>

          <PrivateRoute exact path="/profilo/patenti" component={Patente}/>

          <PrivateRoute exact path="/profilo/carte" component={Carta}/>

        </Switch>

    </Router>

      <div className="footer">
      <footer>
      <Footer />
      </footer>
      </div>

    </div>
  );
}


export default App;

