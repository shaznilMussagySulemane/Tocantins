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

    await axios.post("http://127.0.0.1:4000/signin", data)
        .then((value) => {
            switch (value.data.key) {
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
                    // res.json({ msg: "Outros" })
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
    

    await axios.post("http://localhost:4000/signup", data)
        .then((value) => {
            res.status(201).json({ msg: "Conta criada com sucesso", code: 100 })
        })
        .catch((err) => {
            res.status(500).json({ msg: "Servidor: Falha ao criar conta", code: 101 })
        })

})

module.exports = router;