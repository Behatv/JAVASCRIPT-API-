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