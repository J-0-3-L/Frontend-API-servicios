const loginURL = 'http://127.0.0.1:8000/users/login/';
const mainURL ="http://127.0.0.1:8000/VersionPagos/services/";

const container = document.querySelector ('.container');

async function getTasks() {
  const response = await fetch(mainURL);
  const data = await response.json();
  if (data.hasOwnProperty('container')){
      data.results.forEach((task) => {
      const taskHtml = renderTask(task);
                // container.innerHTML += renderTask(task);
      container.innerHTML += taskHtml;
      window.location = "detail.html";
  });                
  
  }
}

// Crea una función para iniciar sesión
function login(email, password) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  };

  return fetch(loginURL, options)
    .then(response => {

      if (response.ok) {
        // console.log('Inicio de sesión exitoso');// window.location = "detail.html";
        Swal.fire({
          title: 'Bienvenido',
          text: 'Has iniciado sesión con éxito',
          icon: 'success'});
        
        window.location = mainURL;

      } else {
        Swal.fire({
          title: 'Error',
          text: 'Nombre de usuario o contraseña incorrectos',
          icon: 'error'
        });
        // console.log('Error al iniciar sesión');
        // throw new Error('Error al iniciar sesión');
      }
    })
    .then(data => {
      console.log(data);
    })

    .catch(error => {
        console.error(error);
      });
}
window.addEventListener('load', () => {
  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
    });
  }
});
