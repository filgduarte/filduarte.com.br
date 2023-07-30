const form = document.querySelector('.contact-form');
const resultContainer = document.querySelector('.submit-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);

    fetch("./sendmail.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success)
        {
            resultContainer.innerText = "Thank you for reaching out! Your message has been sent.";
            return true;
        }

        if (data.empty)
        {
            const emptyFields = data.empty.join(', ');
            resultContainer.innerText += `Please, fill the fields: ${emptyFields}<br>`;
        }

        if (data.invalidEmail)
        {
            resultContainer.innerText += "Please, use a valid email.";
        }

        if (data.fail)
        {
            resultContainer.innerText = "There was an error sending the message. Try again later.";
        }
    })
    .catch(error => {
        console.error("Fetch error: ", error);
        resultContainer.innerText = "There was an error sending the message. Try again later.";
    });
});