document.getElementById("confirm-purchase").addEventListener("click", function(event) {
    event.preventDefault(); 
    validarPago();
});

function validarPago() {
    Swal.fire({
        title: '¿Quieres confirmar el pago?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Acepto',
        denyButtonText: 'Modificar',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: 'Confirmado!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
        }).then(() => {
            window.location.href = '../pages/fin.html';
        });
            } else if (result.isDenied) {
                Swal.fire('Los cambios no fueron guardados', '', 'info');
        }
    });
    }