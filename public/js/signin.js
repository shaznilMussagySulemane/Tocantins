const signin = document.getElementById("form");

const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".input-field").appendChild(errorElement);
}

const handleSignin = async (e) => {
    e.preventDefault()

    console.log("Prevent");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Getting trimmed values from input fields
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Dados a serem enviados
    const dados = {
        email: email,
        senha: password,
    };

    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    if (!emailPattern.test(email)) {
        showError(emailInput, "Digite um email válido");
    }
    if (password === "") {
        showError(passwordInput, "Enter your password");
    }

    console.log(dados)

    try {
        const response = await fetch('/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(dados) // Converte os dados para uma string JSON
        });

        if (response.ok) {
            const resposta = await response.json();
            if(resposta.code == 102) {
                form.submit()
            }
        } else {
            console.error('Erro ao enviar dados:', response.status);
        }
    } catch (error) {
        // console.error('Erro na requisição:', error);
    }

}

signin.addEventListener("submit", handleSignin)
