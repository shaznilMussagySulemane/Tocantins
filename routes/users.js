const express = require('express')
const router = express.Router();
const axios = require("axios")
const localStorage = require("localStorage")


// Middleware para proteger rotas
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Por favor, faça login para acessar esta página.');
    res.redirect('/users/login');
}

// Página Inicial (pública)
router.get('/signin', (req, res) => {
    res.render('signin', { title: 'ERCOB', isLogged: true });
});

router.get('/signup', (req, res) => {
    res.render('signup', { title: 'ERCOB', isLogged: true });
});

router.get('/signout', (req, res) => {
    localStorage.clear()
    res.redirect("/")
});

router.post("/signin", async (req, res) => {
    const data = req.body

    await axios.post("http://127.0.0.1:5000/api/login", data)
        .then((value) => {
            switch (value.data.code) {
                case 102:
                    localStorage.setItem("userToken", value.data.token)
                    res.json({ msg: "Conta logada com sucesso", code: 102 })

                    // res.render("home", { isLogged: true })
                    break;
                case 200:
                    // console.log("User not found");             
                    res.json({ msg: "Usuário não encontrado", code: 200 })
                    break;
                case 201:
                    // console.log("Invalid data");                    
                    res.json({ msg: "Dados inválidos", code: 201 })
                    break;
                default:
                    break;
            }

        })
        .catch((err) => {
            console.log("Catch", err);

            res.status(500).json({ msg: "Servidor: Falha ao logar conta", code: 103 })
        })
})

router.post("/signup", async (req, res) => {
    const data = req.body

    console.log(data);


    await axios.post("http://localhost:5000/api/inscricoes", data)
        .then((value) => {
            console.log(value.data);

            switch (value.data.code) {
                case 100:
                    console.log("Passed");

                    res.status(201).json({ msg: "Inscrição criada com sucesso!", code: 100 })
                    break;
                case 101:
                    console.log("CPF ou Email já cadastrado");
                    res.json({ msg: "CPF ou Email já cadastrado", code: 101 })
                    break;
                default:
                    break;
            }
        })
        .catch((err) => {
            console.log("BAD", err);

            res.status(500).json({ msg: "Servidor: Falha ao criar conta", code: 101 })
        })

})

module.exports = router;