document.getElementById("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries()); // Converte para um objeto

    console.log(data);
    

    // try {
    //     // Envia os dados para a API com fetch
    //     const response = await fetch("https://exemplo.com/api", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data)
    //     });

    //     if (response.ok) {
    //         const result = await response.json();
    //         alert("Dados enviados com sucesso!");
    //     } else {
    //         alert("Erro ao enviar os dados.");
    //     }
    // } catch (error) {
    //     console.error("Erro:", error);
    //     alert("Falha na conexão.");
    // }
});