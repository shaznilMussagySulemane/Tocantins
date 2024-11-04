const form = document.querySelector("form");
const signin = document.getElementById("form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");

// Function to display error messages
const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}

// Function to handle form submission
const handleFormData = async (e) => {
    e.preventDefault();    

    // Retrieving input elements
    const nomeInput = document.getElementById("nome");
    const apelidoInput = document.getElementById("apelido");
    const nomecrachaInput = document.getElementById("nomecracha");
    const emailInput = document.getElementById("email");
    const cpfInput = document.getElementById("cpf");
    const municipioInput = document.getElementById("municipio");
    const telefoneInput = document.getElementById("telefone");
    const segrehInput = document.getElementById("segreh");
    const passwordInput = document.getElementById("password");
    const concordaInput = document.getElementById("concorda");

    // Getting trimmed values from input fields
    const nome = nomeInput.value.trim();
    const apelido = apelidoInput.value.trim();
    const nomecracha = nomecrachaInput.value.trim();
    const email = emailInput.value.trim();
    const cpf = cpfInput.value.trim();
    const municipio = municipioInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const password = passwordInput.value.trim();
    const segreh = segrehInput.value;
    const concorda = concordaInput.checked;

    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Performing validation checks
    if (nome === "") {
        showError(nomeInput, "Digite seu nome");
    }
    if (apelido === "") {
        showError(apelidoInput, "Digite seu apelido");
    }
    if (nomecracha === "") {
        showError(nomecrachaInput, "Digite seu nome de cracha");
    }
    if (cpf === "") {
        showError(cpfInput, "Digite seu CPF");
    }
    if (municipio === "") {
        showError(municipioInput, "Digite seu municipio ou estado");
    }
    if (telefone === "") {
        showError(telefoneInput, "Digite seu telefone");
    }
    if (segreh === "") {
        showError(segrehInput, "Selecione...");
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Digite um email válido");
    }
    if (password === "") {
        showError(passwordInput, "Enter your password");
    }

    // Checking for any remaining errors before form submission

    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

    if (!concorda) {
        document.querySelector(".concorda").classList.add("erro")
        return
    }

    // Submitting the form

    // Dados a serem enviados
    const dados = {
        nome: nome,
        apelido: apelido,
        nomeCracha: nomecracha,
        cpf: cpf,
        email: email,
        telefone: telefone,
        senha: (password),
        municipioEstado: municipio,
        segrehEntidade: segreh,
        autorizoLGPD: concorda
    };

    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(dados) // Converte os dados para uma string JSON
        });

        if (response.ok) {
            const resposta = await response.json();

            console.log(resposta);
            
            if(resposta.code == 100) {
                console.log("All Ok");
                
                form.submit()
            }
            if(resposta.code == 101) {
                showError(emailInput, "CPF ou Email já cadastrado")
                showError(cpfInput, "CPF ou Email já cadastrado")
            }
            // console.log('Dados enviados com sucesso:', resposta);
        } else {
            // console.error('Erro ao enviar dados:', response.status);
        }
    } catch (error) {
        // console.error('Erro na requisição:', error);
    }

}

// Toggling password visibility
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});


// Handling form submission event
form.addEventListener("submit", handleFormData);
ntListener("submit", handleSignin)