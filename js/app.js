// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []; // Arreglo vacío para agregar nuestros tweets


// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });

}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación...
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio...');

        return // evita que se ejecuten más líneas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj]

    // Una vez agregado vamos a crear HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar Mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina el mensaje después de 2 segundos
    setTimeout(() => {
        contenido.remove();
    },2000)
}

function crearHTML() {
    // Limpia
    limpiarHTML();

    // Agrega
    if(tweets.length > 0){
        tweets.forEach( tweet => {
            // Agregar un botón de eliminar
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('LI');

            // Añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // Insertarlo en el HTML
            listaTweets.appendChild(li);

        })
    }

    sincronizarStorage();
}

// Agrega los tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

// limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}