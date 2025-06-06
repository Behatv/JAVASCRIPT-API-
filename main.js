//PAGINA INICIO

const botones = document.querySelectorAll(".boton_click_js");

botones.forEach((botones) => { // foreach para recorrer cada boton
    botones.addEventListener('click', (evento) => {
        evento.preventDefault();
        console.log("se hizo click en el boton");
    });
});


const div_de_la_imagem_inicio = document.querySelectorAll(".imagen_desaparece_js");

div_de_la_imagem_inicio.forEach((div_de_la_imagem_inicio) => {
    const imagen = div_de_la_imagem_inicio.querySelector("img"); // Busca la imagen dentro del div
    if (imagen) {
        imagen.addEventListener('load', () => {
        });

        setTimeout(() => {
            imagen.src = imagen.dataset.src;
        }, 5000);
    }
});

const doble_boton = document.querySelector(".boton_dobleclick_js");
const mensaje_dclick = document.querySelector(".mensaje_dobleclick");

doble_boton.addEventListener('dblclick', (evento) => {
    evento.preventDefault();
    mensaje_dclick.textContent = '¡Doble clic presionado!';
    mensaje_dclick.style.color = 'green';
    console.log("Se hizo doble click");

    setTimeout(() => {
        mensaje_dclick.textContent = '';
    }, 5000);
});



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


