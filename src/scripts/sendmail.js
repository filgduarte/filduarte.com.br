const form = document.querySelector('.contact-form');
const resultContainer = document.querySelector('.submit-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const isEnglish = window.location.href.includes('/en');

    fetch("./sendmail.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
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
                                        : "Houve um erro enviando a mensagem, tente novamente.";
        }
    })
    .catch(error => {
        console.error("Fetch error: ", error);
        resultContainer.innerText = isEnglish
                                    ? "There was an error with the 'send message' request. =("
                                    : "Houve um erro ao solicitar o envio da mensagem. =(";
    });
});