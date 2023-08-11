const {urlencoded} = require('express');
const express = require('express');
const app = express();
const router = express.Router();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path:"./env/.env"});

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

const bcryptjs = require('bcryptjs');

const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const connection = require('./database/db.js');


app.get('/login', (req, res) =>{
    res.render('login');
});


// app.get('/index', (req, res) =>{
//     res.render('index');
// });


// Metodo para el registro

app.post('/login', async (req, res) =>{
    const user = req.body.user;
    const name = req.body.name;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', {User:user, Nombre:name, Pass:passwordHaash}, async(error, results) =>{
        if (error) {
            console.log(error);
        } else {
            res.render('login', {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "Successful Registration!",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 1500,
                ruta: 'login'
            })
        }
    })
})

// Autenticacion del login

app.post('/auth', async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if (user && pass) {
        connection.query('SELECT * FROM users WHERE user = ?', [user], async(error, results) =>{
            if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].Pass))) {
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: 'Usuario y/o contraseña incorrectos',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer:false,
                    ruta: 'login'
                });
            } else {
                req.session.loggedin = true; // Creamos esta variable para saber si hay un usuario conectado
                req.session.name = results[0].Nombre;
                res.render('login', {
                    alert: true,
                    alertTitle: 'Conexion exitosa',
                    alertMessage: '!!Login Correcto !!',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer:1500,
                    ruta: ''
                });
            }
        })
    } else {
        res.render('login', {
            alert: true,
            alertTitle: 'Advertencia',
            alertMessage: '!Por favor ingrese un usuario y contraseña!',
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        });
    }
})

// // Autenticacion de las paginas

app.get('/', (req, res) =>{
    if(req.session.loggedin){
        res.render('index', {
            login: true,
            name: req.session.Nombre
        });
    }else{
        res.render('login', {
            login: false,
            name: 'Debe iniciar session',
            
        })
    }
})


app.get('/contacto', (req, res) =>{
    if(req.session.loggedin){
        res.render('contacto', {
            login: true,
            name: req.session.Nombre
        });
    }else{
        res.render('login', {
            login: false,
            name: 'Debe iniciar session',
            
        })
    }
})
app.get('/nosotros', (req, res) =>{
    if(req.session.loggedin){
        res.render('nosotros', {
            login: true,
            name: req.session.Nombre
        });
    }else{
        res.render('login', {
            login: false,
            name: 'Debe iniciar session',
            
        })
    }
})
// app.get('/productos', (req, res) =>{
//     if(req.session.loggedin){
//         res.render('productos', {
//             login: true,
//             name: req.session.Nombre
//         });
//     }else{
//         res.render('login', {
//             login: false,
//             name: 'Debe iniciar session',
            
//         })
//     }
// })

// // logout

app.get('/logout', (req, res) =>{
    req.session.destroy(() =>{
        res.redirect('/');
    })
})



//ROUTER: VAMOS A ASIGNAR LAS RUTAS PARA EL CRUD

app.get('/productos', (req, res) =>{
    
    connection.query('SELECT * FROM producto', (error, results)=>{
        if (error) {
            throw error; // tambien se puede usar console.log('El error es : ' + error); es lo mismo    
        } else {
            res.render('productos', {results:results});
        }
    });
});

// app.get('/productos', (req, res) =>{
//     if(req.session.loggedin){
//         res.render('productos', {
//             login: true,
//             name: req.session.Nombre
//         });
//     }else{
//         res.render('login', {
//             login: false,
//             name: 'Debe iniciar session',
            
//         })
//     }
// })

module.exports = router;

app.listen(3000, (req, res) => {
    console.log('SERVER RUNNING IN THE http://localhost:3000');
});