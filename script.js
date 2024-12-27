// script.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formReserva');
    const reservasTable = document.getElementById('reservasTable').getElementsByTagName('tbody')[0];

    // Cargar las reservas desde LocalStorage
    function cargarReservas() {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservasTable.innerHTML = '';
        reservas.forEach((reserva, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reserva.nombre}</td>
                <td>${reserva.fecha}</td>
                <td>${reserva.hora}</td>
                <td><button class="delete" onclick="eliminarReserva(${index})">Eliminar</button></td>
            `;
            reservasTable.appendChild(row);
        });
    }

    // Guardar las reservas en LocalStorage
    function guardarReservas(reservas) {
        localStorage.setItem('reservas', JSON.stringify(reservas));
    }

    // Agregar nueva reserva
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;

        if (nombre && fecha && hora) {
            const nuevaReserva = { nombre, fecha, hora };
            const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            reservas.push(nuevaReserva);
            guardarReservas(reservas);
            cargarReservas();
            form.reset();
        }
    });

    // Eliminar reserva
    window.eliminarReserva = function (index) {
        const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.splice(index, 1);
        guardarReservas(reservas);
        cargarReservas();
    }

    // Inicializar la carga de reservas
    cargarReservas();
});
