window.onload = () => {
  const infoUbicacion = document.getElementById("infoUbicacion");
  const mapaContenedor = document.getElementById("mapaContenedor");

  if (!infoUbicacion || !mapaContenedor) {
    console.error("Faltan elementos en el HTML con id 'infoUbicacion' o 'mapaContenedor'");
    return;
  }

  fetch("https://api.geoapify.com/v1/ipinfo?apiKey=4de04ea914184d1380005995b6c9aac8")
    .then(response => {
      if (!response.ok) throw new Error("No se pudo obtener la ubicación");
      return response.json();
    })
    .then(data => {

      console.log("Datos obtenidos:", data);
      
      const country = data.country;
      const city = data.city;
      const state = data.state;
      const location = data.location;

     infoUbicacion.innerHTML = `
        <li class="list-group-item bg-primary text-white"><strong>País:</strong> ${country?.name || "N/A"}</li>
        <li class="list-group-item bg-success text-white"><strong>Ciudad:</strong> ${city?.name || "N/A"}</li>
        <li class="list-group-item bg-warning"><strong>Región:</strong> ${state?.name || "N/A"}</li>
        <li class="list-group-item bg-info text-white"><strong>Latitud:</strong> ${location?.latitude}</li>
        <li class="list-group-item bg-secondary text-white"><strong>Longitud:</strong> ${location?.longitude}</li>
      `; 

    })
