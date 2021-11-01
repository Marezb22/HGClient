import React from 'react';
import HomeCSS from './home.module.css';

function Home(){
    return(
        <>
         <section className={HomeCSS.informazioni}>

<div className="container">
    <div className="row justify-content-center">
        <div className="col-12 col-lg-6">
            <div>
                <div>
                    <h3>
                        <strong className={HomeCSS.title}>Cosa è HopelessNoleggio?</strong>
                    </h3>
                    <p className="infohome">
                        HopelessNoleggio è un servizio a pagamento, utilizzabile solo a Palermo e dintorni, che permettete il noleggio 
                        di mezzi come AutoMobili, Motocicli ed anche Monopattini e Biciclette.
                    </p>
                </div>
            </div>
        </div>

        <div id={HomeCSS.qualita} className={HomeCSS.vl && "col-12 col-lg-6"}>

            <div>
                <div className="icon-box">
                    <span></span>
                </div>
                <div className={HomeCSS.textbox}>
                    <h4>
                        <strong>Affidabilità</strong>
                    </h4>
                    <p>La nostra priorità è soddisfare ogni cliente ed ottimizzare ogni singola prenotazione.
                        Per ogni dubbio non esitare a contattare il nostro servizio clienti, 24/7
                    </p>
                </div>
            </div>

            <div>
                <div className="icon-box">
                    <span></span>
                </div>
                <div className={HomeCSS.textbox}>
                    <h4>
                        <strong>No-sovrapprezzo</strong>
                    </h4>
                    <p>Non ti verrà mai chiesto un sovrapprezzo a fine noleggio, l'importante è rispettare i 
                        termini di rilascio del mezzo. 
                    </p>
                </div>
            </div>

            <div>
                <div className="icon-box">
                    <span></span>
                </div>
                <div className={HomeCSS.textbox}>
                    <h4>
                        <strong>Auto/Moto uniche</strong>
                    </h4>
                    <p>Abbiamo una vasta scelta di auto e moto, anche le meno ricercate, controlla il nostro catalogo.
                    </p>
                </div>
            </div>

        </div>
    </div>
</div>
</section> 


<section className={HomeCSS.mezzihome}>

<div className={HomeCSS.padbot && "container"}> 
  <div className="row justify-content-center">
      <div className="col-12 col-md-9">
          <h3><strong className={HomeCSS.title}>I nostri mezzi</strong></h3>
          <h4 className={HomeCSS.texth}>
              Offriamo ai nostri clienti una vasta scelta di mezzi: diversi modelli di Auto, 
              motocicli di qualsiasi cilindrata adatti ad ogni avventura e anche delle Bicicliette o Monopattini
              per muoversi in tranquillità in città.
          </h4> 
      </div>
  </div>
</div>
</section>


<section>
<div className="container">
  <div>
      <div className="col-12">
          <div className={HomeCSS.centraele}>
              <img src="/immagini/home/automotohome.png" alt="AutoMotoHome" className="img-fluid"/>
          </div>
      </div>
  </div>
</div>
</section>


<section className={HomeCSS.mezzi2home}>

<div className={HomeCSS.padbot && "container"}>
  <div>
      <div className="col-12">
          <div className={HomeCSS.centraele}> 
              <img src="/immagini/home/mezzi.png" alt="MezziHome" className="img-fluid"/>
          </div>
      </div>
      <hr/>
      <div className="col-12">
          <div>
              <p>
                  E' possibile noleggiare monopattini e biciclette con solo un tuo documento d'identità valido!

                  Troverai sempre il veicolo adatto alle tue esigenze!

                  Noleggi giornalieri, settimanali o mensili. Periodo di noleggio NON flessibile!
                </p>
          </div>
      </div>
  </div>
</div>
</section>


<section>

<div className="container">
  <div>
      <div className="col-12">
          <div className={HomeCSS.centraele}>
          <h2><strong><a href="/" className={HomeCSS.prenota}>PRENOTA ORA UN MEZZO!</a></strong></h2>
          <h4>Forniamo un servizio di autonoleggio di Prima Scelta, contraddistinto dalla diffusione capillare dei nostri 
              centri di noleggio e dalla varietà dei modelli di autoveicoli/motocicli offerti. Il nostro unico scopo è 
              soddisfare sia le vostre esigenze che le vostre possibilità di spesa.
          </h4>
          </div>
      </div>
  </div>
</div>
</section>

        </>

    );
}

export default Home;