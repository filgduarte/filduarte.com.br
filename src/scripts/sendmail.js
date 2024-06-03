const form = document.querySelector('.contact-form');
const resultContainer = document.querySelector('.submit-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const isEnglish = window.location.href.includes('/en');
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch("./sendmail.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject)
    })
    .then(response => response.json())
    .then(data => {
        resultContainer.innerText = '';
        if (data.invalidRequest) {
            resultContainer.innerText = isEnglish
            ? "Invalid request method."
            : "Método de requisição inválido.";

            return false;
        }

        if (data.invalidJson) {
            resultContainer.innerText = isEnglish
            ? "Invalid JSON format."
            : "Formato de JSON inválido.";

            return false;
        }

        if (data.success)
        {
            resultContainer.innerText = isEnglish
                                        ? "Thank you for getting in touch! Your message has been sent."
                                        : "Obrigado por entrar em contato! Sua mensagem foi enviada.";
            return true;
        }

        if (data.empty)
        {
            const emptyFields = data.empty.join(', ');
            resultContainer.innerText += isEnglish
                                        ? `Please, fill in the fields: ${emptyFields}\n`
                                        : `Por favor, preencha os campos: ${emptyFields}\n`;
        }

        if (data.invalidEmail)
        {
            resultContainer.innerText += isEnglish
                                        ? "Please use a valid email address."
                                        : "Por favor, use um email válido.";
        }

        if (data.fail)
        {
            resultContainer.innerText = isEnglish
                                        ? "There was an error sending the message, please try again."
                                        : "Não foi possível enviar a sua mensagem, tente novamente.";
        }
    })
    .catch(error => {
        console.error("Fetch error: ", error);
        resultContainer.innerText = isEnglish
                                    ? "There was an error with the 'send message' request. =("
                                    : "Houve um erro ao solicitar o envio da mensagem. =(";
    });
});