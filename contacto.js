

const formulariosContacto = document.querySelectorAll(".formulario_Contacto_js");

formulariosContacto.forEach((formulario) => {
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombre = formulario.querySelector('input[name="nombre"]').value;
        const apellido = formulario.querySelector('input[name="apellido"]').value;
        const email = formulario.querySelector('input[name="correo_electronico"]').value;
        const telefono = formulario.querySelector('input[name="telefono"]').value;
        const usuario = formulario.querySelector('input[name="usuario"]').value;
        const elegir_op = formulario.querySelector('select[name="elegir_op"]').value;

        if (!nombre || !apellido || !email || !telefono || !usuario || !elegir_op) {
            alert("Por favor, completa todos los campos");
            return;
        }
        if (telefono.length < 6) {
            alert('El telefono no existe');
            return;
        }

        const fondo = document.getElementById("fondo_general");

        fondo.innerHTML = `
            <div style="text-align: center; color: #003366; padding: 50px;">
                <h2>¡Gracias, ${nombre} ${apellido}!</h2>
                <p>Te contactaremos pronto a ${email}.</p>
                
            </div>
        `;
    });
});

//https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial/Basic_animations

var img = new Image();

// Variables de usuario - personalizar estas para cambiar la imagen cuando inicie el desplazamiento
// dirección y velocidad.

img.src = "imagenes/prueba efecto js.jpg"; // URL de la imagen
var CanvasXSize = 1000;
var CanvasYSize = 1000;
var speed = 20; //más bajo es más rápido
var scale = 1.05;
var y = -4.5; //desplazamiento vertical

// Programa principal

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

img.onload = function () {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > CanvasXSize) {
    // imagen más grande que canvas
    x = CanvasXSize - imgW;
  }
  if (imgW > CanvasXSize) {
    // ancho de imagen más grande que canvas
    clearX = imgW;
  } else {
    clearX = CanvasXSize;
  }
  if (imgH > CanvasYSize) {
    // altura de la imagen más grande que canvas
    clearY = imgH;
  } else {
    clearY = CanvasYSize;
  }

  // obtener contexto de canvas
  ctx = document.getElementById("canvas").getContext("2d");

  // establecer frecuencia de actualización
  return setInterval(draw, speed);
};

function draw() {
  ctx.clearRect(0, 0, clearX, clearY); // clear the canvas

  // si la imagen es <= tamaño de Canvas
  if (imgW <= CanvasXSize) {
    // reiniciar, comenzar desde el principio
    if (x > CanvasXSize) {
      x = -imgW + x;
    }
    // dibujar image1 adicional
    if (x > 0) {
      ctx.drawImage(img, -imgW + x, y, imgW, imgH);
    }
    // dibujar image2 adicional
    if (x - imgW > 0) {
      ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  }

  // la imagen es > tamaño de Canvas
  else {
    // reiniciar, comenzar desde el principio
    if (x > CanvasXSize) {
      x = CanvasXSize - imgW;
    }
    // dibujar image adicional
    if (x > CanvasXSize - imgW) {
      ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }
  // dibujar imagen
  ctx.drawImage(img, x, y, imgW, imgH);
  // cantidad para moverse
  x += dx;
}

//sadasdasdas



//.......................................................................................
//https://developer.mozilla.org/es/docs/Web/CSS/CSS_animations/Using_CSS_animations
var e = document.getElementById("watchme");
e.addEventListener("animationstart", listener, false);
e.addEventListener("animationend", listener, false);
e.addEventListener("animationiteration", listener, false);

e.className = "slidein";

function listener(e) {
  var l = document.createElement("li");
  switch (e.type) {
    case "animationstart":
      l.innerHTML = "Iniciado: tiempo transcurrido " + e.elapsedTime;
      break;
    case "animationend":
      l.innerHTML = "Finalizado: tiempo transcurrido " + e.elapsedTime;
      break;
    case "animationiteration":
      l.innerHTML = "Nueva iteración comenzó a los " + e.elapsedTime;
      break;
  }
  document.getElementById("output").appendChild(l);
}

//https://wpengine.com/resources/sticky-back-to-top-button-tutorial/

const scrollFunc = () => {
  // Get the current scroll value
  let y = window.scrollY;
  
  // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
  if (y > 0) {
    scrollToTopButton.className = "top-link show";
  } else {
    scrollToTopButton.className = "top-link hide";
  }
};

// When the button is clicked, run our ScrolltoTop function above!
scrollToTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
}