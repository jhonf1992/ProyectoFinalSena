const express = require('express');
const router = express.Router();

const connection = require('./database/db.js');


// Visualizar registros
router.get('/dashboard', (req, res) =>{
    
    connection.query('SELECT * FROM producto', (error, results) =>{
        if (error) {
            console.log(error);
        } else {
            res.render('dashboard', {results:results})
        }
    })
});

module.exports = router;



// Crear registros 

router.get('/create', (req, res) =>{
    res.render('dashboardCreate')
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