document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("JyJM_HtHP_yvhtGdz");

    const commissionForm = document.getElementById('commissionForm');
    const totalPriceElement = document.getElementById('totalPrice');
    const commissionTypeElement = document.getElementById('commissionType');
    const privacyOptionElement = document.getElementById('privacyOption');
    const additionalRevisionsElement = document.getElementById('additionalRevisions');
    const expeditedDeliveryElement = document.getElementById('expeditedDelivery');
    const additionalCharactersElement = document.getElementById('additionalCharacters');
    const basePrices = { portrait: 175, halfBody: 250, fullBody: 300 };

    function calculateTotal() {
        let totalPrice = basePrices[commissionTypeElement.value];

        privacyOptionElement.value = privacyOptionElement.checked ? 'Yes' : 'No';
        expeditedDeliveryElement.value = expeditedDeliveryElement.checked ? 'Yes' : 'No';

        if (privacyOptionElement.checked) totalPrice *= 1.8;
        totalPrice += parseInt(additionalRevisionsElement.value, 10) * 20;
        if (expeditedDeliveryElement.checked) totalPrice *= 1.5;

        const additionalCharacters = parseInt(additionalCharactersElement.value, 10);
        if (additionalCharacters > 0) {
            totalPrice += basePrices[commissionTypeElement.value] * 0.75 * additionalCharacters;
        }

        // Aquí asumimos que quieres calcular las características extra basadas en el precio total hasta ahora
        const extraFeatures = Array.from(document.querySelectorAll('input[name="extraFeatures"]:checked'))
            .map(el => el.value)
            .join(', ');
        totalPriceElement.value = `$${totalPrice.toFixed(2)}`;

        return extraFeatures; // Devolvemos esto para su uso en la función de envío
    }

    commissionForm.addEventListener('submit', event => {
        event.preventDefault();

        if (!commissionForm.checkValidity()) {
            alert('Please fill out all required fields correctly.');
            return;
        }

        // Aquí se recogen los valores calculados y se añaden a formProps
        const extraFeatures = calculateTotal();
        const formProps = {
            email: document.getElementById('email').value,
            commissionType: commissionTypeElement.value,
            description: document.getElementById('description').value,
            referenceLink: document.getElementById('referenceLink').value,
            privacyOption: privacyOptionElement.value,
            additionalRevisions: additionalRevisionsElement.value,
            expeditedDelivery: expeditedDeliveryElement.value,
            additionalCharacters: additionalCharactersElement.value,
            extraFeatures: extraFeatures, // Características extras como una cadena de texto
            totalPrice: totalPriceElement.value.replace('$', '') // Removemos el signo de dólar para el envío
        };

        emailjs.send('service_4w89iif', 'template_re9pc6b', formProps)
            .then(response => {
                console.log('SUCCESS!', response.status, response.text);
                Swal.fire('Success!', 'Your message has been sent!', 'success');
            }, error => {
                console.log('FAILED...', error);
                Swal.fire('Oops...', 'Failed to send the message. Please try again later.', 'error');
            });
    });
    // Crear el cuadro indicador
    const indicator = document.createElement('div');
    Object.assign(indicator.style, {
        position: 'fixed',
        top: '10px',
        right: '10px',
        width: '20px',
        height: '20px',
        backgroundColor: 'blue',
        zIndex: 1000,
    });

    // Añadir el cuadro al cuerpo del documento
    document.body.appendChild(indicator);

    commissionForm.addEventListener('change', calculateTotal);
    calculateTotal();
});
