// variables
const email = document.getElementById('email');
const errorEmail = document.getElementById('email-error');
const asunto = document.getElementById('asunto');
const errorAsunto = document.getElementById('error-asunto');
const mensaje = document.getElementById('mensaje');
const errorMensaje = document.getElementById('error-mensaje');
const errorCampo = document.getElementById('error-campo');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');

// event Listener

eventListeners();

function eventListeners() {
     // Inicio de la aplicación y deshabilitar submit
     document.addEventListener('DOMContentLoaded', inicioApp);

     // Campos del formulario
     email.addEventListener('blur', validarCampo);
     asunto.addEventListener('blur', validarCampo);
     mensaje.addEventListener('blur', validarCampo);

     // Boton de enviar en el submit
     formularioEnviar.addEventListener('submit', enviarEmail);

     // Boton de reset
     resetBtn.addEventListener('click', resetFormulario);
}



// funciones
function inicioApp() {
     // deshabilitar el envio
     btnEnviar.disabled = true;
}
// Valida que el campo tengo algo escrito

function validarCampo() {
    
     // Se valida la longitud del texto y que no este vacio
     validarLongitud(this);

     // Validar unicamente el email
     if(this.type === 'email') {
          validarEmail(this);
     }

     let errores = document.querySelectorAll('.error');

     if(email.value !== '' && asunto.value !== '' && mensaje.value !== '' ) {
          if(errores.length === 0) {
               btnEnviar.disabled = false;
          }
     }
}

// Resetear el formulario 
function resetFormulario(e) {
     formularioEnviar.reset();
     e.preventDefault();
}

// Cuando se envia el correo
function enviarEmail(e) {
     // Spinner al presionar Enviar
     const spinnerGif = document.querySelector('#spinner');
     spinnerGif.style.display = 'block';

     // Gif que envia email
     const enviado = document.createElement('img');
     enviado.src = 'img/mail.gif';
     enviado.style.display = 'block';

     // Ocultar Spinner y mostrar gif de enviado

     setTimeout(function() {
          spinnerGif.style.display = 'none';

          document.querySelector('#loaders').appendChild( enviado );

          setTimeout(function() {
               enviado.remove();
               formularioEnviar.reset();
          }, 2000);
     }, 3000);

     e.preventDefault();
}

// Verifica la longitud del texto en los campos
function validarLongitud(campo) {

     if(campo.value.length > 0 ) {
          campo.style.borderBottomColor = 'green';
          campo.classList.remove('error');
          if(campo.id === "asunto" ? eliminarMensajeError(errorAsunto) : null);
          if(campo.id === "mensaje" ? eliminarMensajeError(errorMensaje) : null);
     } else {
          campo.style.borderBottomColor = 'red';
          campo.classList.add('error');
          if(campo.id === "asunto" ? mensajeError(errorAsunto) : null);
          if(campo.id === "mensaje" ? mensajeError(errorMensaje) : null);
     }
}

function validarEmail(campo) {
     const mensaje = campo.value;
     if(mensaje.indexOf('@') !== -1 ) {
          campo.style.borderBottomColor = 'green';
          campo.classList.remove('error');
          eliminarMensajeError(errorEmail);
     } else {
          campo.style.borderBottomColor = 'red';
          campo.classList.add('error');
          errorEmail.innerHTML = `
          <p> Correo invalido, por favor ingrese un correo existente </p>
      `;
     }
}

function mensajeError(e){
     e.innerHTML = `
          <p> El campo no puede estar vacio </p>
      `;
}

function eliminarMensajeError(e){
     while (e.firstChild) {
          e.removeChild(e.firstChild);
      }
}