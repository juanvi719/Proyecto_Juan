const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { registerUser, validateLogin, getRegisteredUser } = require('./src/auth/users');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/register', (req, res) => {
    const { gmail, password } = req.body;
    
    if (getRegisteredUser()) {
        return res.send('Ya existe un usuario registrado. Por favor inicia sesión.');
    }
    
    const result = registerUser(gmail, password);
    if (!result.success) {
        return res.send(`${result.message} <a href="/">Volver a intentar</a>`);
    }
    
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    const { gmail, password } = req.body;
    
    if (validateLogin(gmail, password)) {
        res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
    } else {
        res.send('Usuario o contraseña incorrectos. <a href="/login">Volver a intentar</a>');
    }
});

app.get('/user-info', (req, res) => {
    const user = getRegisteredUser();
    if (user) {
        res.json({ gmail: user.gmail });
    } else {
        res.json({ gmail: null });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});