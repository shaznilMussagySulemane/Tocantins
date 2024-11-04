const express = require('express')
const router = express.Router();
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
router.get('/', (req, res) => {
  const _token = localStorage.getItem("userToken")
  // const _token = "OK"
  console.log(_token);

  res.render('home', { title: "ERCOB", token: _token });
});

module.exports = router;