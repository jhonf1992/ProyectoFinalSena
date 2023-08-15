const express = require('express');
const router = express.Router();

const connection = require('./database/db.js');


// Visualizar registros
// router.get('/dashboard', (req, res) =>{
    
//     connection.query('SELECT * FROM producto', (error, results) =>{
//         if (error) {
//             console.log(error);
//         } else {
//             res.render('dashboard', {results:results})
//         }
//     })
// });

// Dashboard con comprobacion de seguridad

router.get('/dashboard', (req, res) =>{
    if (req.session.loggedin) {
        console.log(req.session.loggedin + ' yo soy loggedin');
        connection.query('SELECT * FROM producto', (error, results) =>{
            if (error) {
                console.log(error);
            } else {
                res.render('dashboard', {results:results})
                login = true
                console.log(login);
            }
        });
    } else {
        res.render('login', {
            login: false,
            name: 'Debe iniciar session',
            
        }); 
    }
});

module.exports = router;



// Crear registros 

// router.get('/create', (req, res) =>{

//     res.render('dashboardCreate')
// })

// Crear registo con validacion 

router.get('/create', (req, res) =>{
    if(req.session.loggedin){
        console.log(req.session.loggedin + 'Yo soy loggedin');
        res.render('dashboardCreate')
        login = true
        console.log(login + ' Desde Create Dashboard');
    }else{
        res.render('login', {
            login: false,
            name: 'Debe iniciar session',
            
        })
    }
    
})

const crud = require('./controllers/crud');
router.post('/save', crud.save); //CREAR PRODUCTO



// Editar registros

router.get('/edit/:idproducto', (req, res) =>{
    const idproducto = req.params.idproducto;
    connection.query('SELECT * FROM producto WHERE idproducto=?', [idproducto], (error, results) =>{
        if (error) {
            console.log(error);
        } else {
            res.render('dashboardEdit', {producto:results[0]});
        }
    })
})


// Editar con validacion
router.get('/edit/:idproducto', (req, res) =>{
    if (req.session.loggedin) {
        console.log(req.session.loggedin + ' Yo soy loggedin');
        const idproducto = req.params.idproducto;
        connection.query('SELECT * FROM producto WHERE idproducto=?', [idproducto], (error, results) =>{
        if (error) {
            console.log(error);
        } else {
            res.render('dashboardEdit', {producto:results[0]});
            login = true
            console.log(login + ' Soy login desde Edit Dahs');
        }
    })
    }else{
        res.render('login', {
            login: false,
            name: 'Debe iniciar session',
            
        })
    }
    
})


router.post('/update', crud.update); // EDITAR PRODUCTO

// ELIMINAR PRODUCTO

router.get('/delete/:idproducto', (req, res) =>{
    const idproducto = req.params.idproducto;
    connection.query('DELETE FROM producto WHERE idproducto=?', [idproducto], (error, results) =>{
        if (error) {
            console.log(error);
        } else {
            res.redirect('/dashboard');
        }
    })
})