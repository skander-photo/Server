const baseUrl = 'http://localhost:5000/';

function makeFetchRequest(method, action, body, successCallback) {
  fetch(baseUrl+action, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  }).then(successCallback);
}
