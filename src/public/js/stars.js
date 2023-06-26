const stars = () => {
    document.querySelectorAll('.stars').forEach((el, index) => {
        const stars = [];
        const calificacion = parseInt(el.dataset.calificacion, 10) || 0;
        for(let i = 1; i <= calificacion; i+=1) {
            stars.push('&#9733;'); // Estrellas doradas
        }
        if (calificacion < 5) {
            for(let i = calificacion + 1; i <= 5; i+=1) {
                stars.push('&#x2606;'); // Estrellas sin marcar
            }
        }
        el.innerHTML = stars.join('');
    });
};

document.addEventListener("DOMContentLoaded", (event) => {
    stars();
});
