window.addEventListener("DOMContentLoaded", (event) => {
    const sitiosRestaurante = '{{{sitiosRestaurante}}}'.split(',');
    sitiosRestaurante.forEach((sitio) => {
      document.getElementById(`sitioTuristico[${sitio}]`).checked = true
    });
  });  