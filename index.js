const loginURL = 'http://127.0.0.1:8000/users/login/';
const mainURL = 'http://127.0.0.1:8000/VersionPagos/services/';

async function login(email, password) {
  // Enviar la solicitud de inicio de sesión al servidor
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

  const response = await fetch(loginURL, options);

  // Si la solicitud de inicio de sesión tuvo éxito, verificar si el usuario existe en la base de datos
  if (response.ok) {
    console.log('Login request successful');

    // Hacer una solicitud adicional al servidor para verificar si el usuario existe en la base de datos
    const data = await response.json();
    if (data.userExists) {
      console.log('User exists in database');

      // El usuario existe, por lo que el inicio de sesión tuvo éxito
      Swal.fire({
        title: 'Bienvenido',
        text: 'Has iniciado sesión con éxito',
        icon: 'success'
      });
      window.location = mainURL;
    } else {
      console.log('User does not exist in database');

      // El usuario no existe, por lo que el inicio de sesión falló
      Swal.fire({
        title: 'Error',
        text: 'Nombre de usuario o contraseña incorrectos',
        icon: 'error'
      });
    }
  } else {
    console.log('Login request failed');

    // La solicitud de inicio de sesión falló
    Swal.fire({
      title: 'Error',
      text: 'Se ha producido un error al intentar iniciar sesión',
      icon: 'error'
    });
  }
  

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






