window.onload = () => {
  const map = L.map('map').setView([20, 0], 2); // Vista global

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const cargarVuelos = () => {
    fetch('https://opensky-network.org/api/states/all')
      .then(response => {
        if (!response.ok) throw new Error('No se pudieron obtener los datos de vuelos');
        return response.json();
      })
      .then(data => {
        data.states.forEach(vuelo => {
          const lat = vuelo[6];
          const lon = vuelo[5];
          const nombre = vuelo[1];
          const altitud = vuelo[7];
          const enTierra_o_enVuelo = vuelo[8];

          // Mostrar solo si está en Sudamérica
          if (lat && lon && lat > -60 && lat < 20 && lon > -90 && lon < -30) {
            console.log(`Nombre: ${nombre}, Lat: ${lat}, Lon: ${lon}, Altitud: ${altitud} m`);

            L.marker([lat, lon])
              .addTo(map)
              .bindPopup(`
                ✈️ <strong>Vuelo:</strong> ${nombre || "Desconocido"}<br>
                📍  <strong>Ubicación:</strong> ${lat.toFixed(2)}, ${lon.toFixed(2)}<br> 
                🛬 <strong>Altitud:</strong> ${altitud.toFixed(0)}
                    <strong>Lugar:</strong> ${enTierra_o_enVuelo}
              `);
          }
        });
      })
      .catch(error => {
        console.error(`Error al cargar vuelos: ${error.message}`);
      });
  };

  // Cargar vuelos inicialmente
  cargarVuelos();

  // Recargar vuelos cada 60 segundos
  setInterval(() => {
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) map.removeLayer(layer);
    });
    cargarVuelos();
  }, 60000);
};
