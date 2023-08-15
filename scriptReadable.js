
const formReq = document.querySelector('.form')
formReq.addEventListener('submit', async (e) => {
    document.querySelector('.loader').classList.remove('invisible');
    document.querySelector('.loader').classList.add('active');
    document.querySelector('.container').classList.add('invisible');

    e.preventDefault();
    const datosEnvio = {
        type: document.querySelector('#type').value,
        host: document.querySelector('#host').value,
        method: document.querySelector('#method').value
    }
    const respuesta = {}

    try {
        const result = await fetch(`${datosEnvio.type}://${datosEnvio.host}/api/test`,
            {
                method: datosEnvio.method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
        if (result.ok) {
            respuesta.status = 'OK';
            respuesta.message = 'La conexión fue satisfactoria'
        } else if (result.status === 404) {
            respuesta.status = 'FAILED';
            respuesta.message = 'Recurso no encontrado'
        } else if (result.status === 401) {
            respuesta.status = 'FAILED';
            respuesta.message = 'Acceso no autorizado'
        } else {
            respuesta.status = 'FAILED';
            respuesta.message = 'Error en la solicitud'
        }
    } catch (err) {
        respuesta.status = 'FAILED';
        respuesta.message = err
    }
    document.querySelector('h2').innerText = respuesta.status
    document.querySelector('p').innerText = respuesta.message
    document.querySelector('.loader').classList.remove('active');
    document.querySelector('.loader').classList.add('invisible');
    document.querySelector('.container').classList.remove('invisible');
})