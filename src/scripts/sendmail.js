const form = document.querySelector('.contact-form');
const resultContainer = document.querySelector('.submit-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);

    fetch("/src/scripts/sendmail.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success)
        {
            resultContainer.innerText = "Obrigado por entrar em contato! Sua mensagem foi enviada.";
            return true;
        }

        if (data.empty)
        {
            const emptyFields = data.empty.join(', ');
            resultContainer.innerText += `Por favor, preencha os campos: ${emptyFields}\n`;
        }

        if (data.invalidEmail)
        {
            resultContainer.innerText += "Por favor, use um email válido.";
        }

        if (data.fail)
        {
            resultContainer.innerText = "Houve um erro enviando a mensagem, tente novamente.";
        }
    })
    .catch(error => {
        console.error("Fetch error: ", error);
        resultContainer.innerText = "Houve um erro enviando a mensagem, tente novamente.";
    });
});