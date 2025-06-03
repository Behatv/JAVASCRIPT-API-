const contenedor = document.getElementById('atractivos_contenedor');
const boton = document.getElementById('cargarAtractivos');

const geoapifyKey = "bff140f9e4f442e8bb35fe1f1e25b20f";

function obtenerMapaEstatico(latitud, longitud) {
  return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=300&height=200&center=lonlat:${longitud},${latitud}&zoom=16&marker=lonlat:${longitud},${latitud};type:material;color:%23ff0000;size:medium&apiKey=${geoapifyKey}`;
}

boton.addEventListener("click", function () {
  const latitud = -33.4489;
  const longitud = -70.6693;

  const url = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${longitud},${latitud},5000&limit=5&apiKey=${geoapifyKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("No se pudo obtener la ubicación");
      return response.json();
    })
    .then(data => {
      const lugares = data.features;

      const tarjetas = lugares.map(lugar => {
        const nombre = lugar.properties.name || "Sin nombre";
        const ciudad = lugar.properties.city || "Ciudad desconocida";
        const pais = lugar.properties.country || "País desconocido";
        const lat = lugar.geometry.coordinates[1];
        const lon = lugar.geometry.coordinates[0];
        const imagenMapa = obtenerMapaEstatico(lat, lon);

        return `
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${imagenMapa}" class="img-fluid rounded-start" alt="Mapa de ${nombre}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${nombre}</h5>
                  <p class="card-text">${ciudad}, ${pais}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      contenedor.innerHTML = tarjetas.join("");
    })
    .catch(error => {
      console.error("Error al obtener la ubicación o el mapa:", error);
      contenedor.innerHTML = `<li class="list-group-item text-danger">No se pudo obtener la información</li>`;
    });
});
