
/* ===== Contacto y Políticas de Seguridad (Integrante 3) ===== */
document.addEventListener('DOMContentLoaded', () => {
    // --- Formulario de contacto ---
    const form = document.getElementById('contact-form');

    if (form) {
        const status = document.getElementById('form-status');
        const mensaje = document.getElementById('mensaje');
        const counter = document.getElementById('char-counter');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        // Cada validador devuelve '' si es válido o el texto del error
        const validators = {
            nombre: (f) => f.nombre.value.trim().length >= 3 ? '' : 'Ingresa tu nombre (mínimo 3 caracteres).',
            correo: (f) => emailRegex.test(f.correo.value.trim()) ? '' : 'Ingresa un correo electrónico válido.',
            asunto: (f) => f.asunto.value !== '' ? '' : 'Selecciona un asunto.',
            mensaje: (f) => f.mensaje.value.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.',
            privacidad: (f) => f.privacidad.checked ? '' : 'Debes aceptar el aviso de privacidad.'
        };

        const showError = (name, text) => {
            const errorEl = document.getElementById(`error-${name}`);
            const group = form.elements[name].closest('.form-group');
            errorEl.textContent = text;
            group.classList.toggle('has-error', text !== '');
        };

        const validateField = (name) => {
            const text = validators[name](form.elements);
            showError(name, text);
            return text === '';
        };

        // Validación en tiempo real al salir de cada campo
        Object.keys(validators).forEach((name) => {
            const field = form.elements[name];
            field.addEventListener('blur', () => validateField(name));
            field.addEventListener('input', () => {
                if (field.closest('.form-group').classList.contains('has-error')) {
                    validateField(name);
                }
            });
        });

        // Contador de caracteres
        mensaje.addEventListener('input', () => {
            counter.textContent = `${mensaje.value.length} / ${mensaje.maxLength}`;
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            status.textContent = '';
            status.className = 'form-status';

            let firstInvalid = null;
            Object.keys(validators).forEach((name) => {
                if (!validateField(name) && !firstInvalid) {
                    firstInvalid = form.elements[name];
                }
            });

            if (firstInvalid) {
                firstInvalid.focus();
                status.textContent = 'Revisa los campos marcados e inténtalo de nuevo.';
                status.classList.add('error');
                return;
            }

            // Simulación de envío (sin backend en este proyecto académico)
            const nombre = form.nombre.value.trim().split(' ')[0];
            status.textContent = `¡Gracias, ${nombre}! Tu mensaje fue enviado. Te responderemos pronto.`;
            status.classList.add('success');
            form.reset();
            counter.textContent = `0 / ${mensaje.maxLength}`;
        });
    }

    // --- Acordeón de políticas: solo un apartado abierto a la vez ---
    const policyItems = document.querySelectorAll('.policy-item');
    policyItems.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (item.open) {
                policyItems.forEach((other) => {
                    if (other !== item) other.open = false;
                });
            }
        });
    });
});
