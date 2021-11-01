//Controlla Email
export const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]{3,50}@[a-zA-Z0-9.-]{3,30}.[a-zA-Z]{2,5}$');

//Controlla Password
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

//Controlla Nome
export const validNome = new RegExp('^[a-zA-Z]{3,50}$');

//Controlla Cognome 
export const validCognome = new RegExp('^[a-zA-Z]{3,50}$');

//Controlla Patente
export const validPatente = new RegExp('^([a-zA-Z]{2})([1-9]{7})([a-zA-Z]{1})$');

//Controlla Carta D'identità
export const validCartaID = new RegExp('^([a-zA-Z]{2})([0-9]{7})$');

//Controlla Numero Carta
export const validNumCarta = new RegExp('^([0-9]{4}).*([0-9]{4}).*([0-9]{4}).*([0-9]{4})$');

//Controlla Scadenza
export const validScad = new RegExp('^[0-9]{2}/[0-9]{2}$');

//Controlla CV
export const validCV = new RegExp('^[0-9]{3}$');

//Controlla Numero Telefono
export const validNumTel = new RegExp('^3[0-9]{9}$');