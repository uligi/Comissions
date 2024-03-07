document.addEventListener('DOMContentLoaded', () => {
    let currentStepIndex = 0;
    const steps = document.querySelectorAll('.process-steps .step');
    const descriptions = document.querySelectorAll('.process-steps .step .step-description');

    function enterStep(index) {
        // Limpiar clases activas
        steps.forEach(step => step.classList.remove('active'));
        descriptions.forEach(desc => desc.classList.remove('active'));

        // Activar el paso y la descripción correspondiente
        if (steps[index]) {
            steps[index].classList.add('active');
            descriptions[index].classList.add('active');
        }
    }

    function nextStep() {
        enterStep(currentStepIndex);
        currentStepIndex = (currentStepIndex + 1) % steps.length;
    }

    // Empezar la animación automáticamente
    nextStep();
    setInterval(nextStep, 3000); // Cambia cada paso cada 3 segundos
    function changeLanguage(lang) {
        document.querySelectorAll("[data-translate]").forEach(el => {
            const key = el.getAttribute("data-translate");
            el.textContent = translations[lang][key] || "Translation not found";
        });
    }

});
