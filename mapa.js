window.onload = () => {
  const infoUbicacion = document.getElementById("infoUbicacion");
  const mapaContenedor = document.getElementById("mapaContenedor");


  fetch("https://api.geoapify.com/v1/ipinfo?apiKey=4de04ea914184d1380005995b6c9aac8")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo obtener la ubicación");
      return response.json();
    })
    .then(data => {

      console.log("Datos obtenidos:", data);
      
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

      const mapa = L.map(mapaContenedor).setView([locacion.latitude, locacion.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapa);

      L.marker([locacion.latitude, locacion.longitude])
        .addTo(mapa)
        .bindPopup("Ubicación aproximada")
        .openPopup();
    })
    .catch(error => {
      console.error("Error al obtener la ubicación:", error);
      infoUbicacion.innerHTML = `<li class="list-group-item text-danger">No se pudo obtener la ubicación</li>`;
    });
};
