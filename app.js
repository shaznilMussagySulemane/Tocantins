const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const bodyparser = require("body-parser")
const app = express();

const route_index = require('./routes/index.js')
const route_users = require('./routes/users.js')

// Configurar o Passport

// Configuração EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use(session({
  secret: '@krypthontech12345_2024*', // Altere para um segredo forte
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

// Sessão
app.use(session({
  secret: 'krypthontecksecret12345',
  resave: false,
  saveUninitialized: false,
}));

// Flash
app.use(flash());

// Variáveis globais para mensagens
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Rotas
app.use('/', route_index);
app.use('/auth', route_users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
