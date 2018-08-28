import * as Interfaces from '../constantes/Interfaces';

let sessionObject: Interfaces.SessionObject = {
  accessToken: '',
  role: '',
  status: 0,
  tokenType: ''
};

function getToken(): string {

  if (localStorage.getItem('sessionObject') !== null) {
    sessionObject = JSON.parse('' + localStorage.getItem('sessionObject'));
    return sessionObject.tokenType + ' ' + sessionObject.accessToken;
  }

  return '';
}

export function get(URL: string) {
  // este metodo hace que, para mayor comodidad, al mandar llamar una petición
  // del tipo GET, ya no sea necesario estár pidiendo que el resultado se con-
  // vierta a JSON y acepta cualquier tipo de respuesta.

  return fetch (URL, {
    method: 'GET',
    headers: {'Content-Type' : 'application/json', 'Authorization': getToken() }
  }).then( function( response: any ) {
    return response.json();
  });
}

export function getWithObject(URL: string, object: any) {

  return fetch(URL ,  {
    method: 'POST',
    headers: {'Content-Type' : 'application/json', 'Authorization': getToken() },
    body: JSON.stringify(object)}).then(function( response: any ) {
      return response.json();
    });

}

export function post(URL: string, object: any) {

  return fetch(URL ,  {
    method: 'POST',
    headers: {'Content-Type' : 'application/json', 'Authorization': getToken() },
    body: JSON.stringify(object)});

}

export function put(URL: string, object: any) {

  return fetch(URL ,  {
    method: 'PUT',
    headers: {'Content-Type' : 'application/json', 'Authorization': getToken() },
    body: JSON.stringify(object)});

}

export function del(URL: string, object: any) {

  return fetch(URL ,  {
    method: 'DELETE',
    headers: {'Content-Type' : 'application/json', 'Authorization': getToken() },
    body: JSON.stringify(object)});

}
