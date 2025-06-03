
  const botones = document.querySelectorAll(".boton_click_js");

botones.forEach((botones) => { // foreach para recorrer cada boton
    botones.addEventListener('click', (evento) => {
        evento.preventDefault();
        console.log("se hizo click en el boton");
    });
});



  fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=rect%3A10.716463143326969%2C48.755151258420966%2C10.835314015356737%2C48.680903341613316&limit=20&apiKey=bff140f9e4f442e8bb35fe1f1e25b20f")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo obtener la ubicación");
      return response.json();
    })
    .then(data => {
      
      const pais = data.country;
      const ciudad = data.city;
      const region = data.state;
      const locacion = data.location;

      infoUbicacion.innerHTML = `
         <li class="list-group-item text-white bg-rojo"><strong>País:</strong> ${pais?.name || "N/A"}</li>
         <li class="list-group-item  text-white bg-verde"><strong>Ciudad:</strong> ${ciudad?.name.replace("Ã³", "ó")
          || "N/A"}</li>
         <li class="list-group-item text-white bg-amarillo"><strong>Región:</strong> ${region?.name || "N/A"}</li>
         <li class="list-group-item  text-white bg-azul-claro"><strong>Latitud:</strong> ${locacion?.latitude}</li>
         <li class="list-group-item  text-white bg-gris "><strong>Longitud:</strong> ${locacion?.longitude}</li>
       `; 

       //13 nivel de zoom
      const mapa = L.map(mapaContenedor).setView([locacion.latitude, locacion.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapa);

      L.marker([locacion.latitude, locacion.longitude])
        .addTo(mapa)
        .bindPopup("Ubicación ")
        .openPopup();
    })
    .catch(error => {
      console.error("Error al obtener la ubicación:", error);
      infoUbicacion.innerHTML = `<li class="list-group-item text-danger">No se pudo obtener la ubicación</li>`;
    });

