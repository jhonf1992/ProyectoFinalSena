const connection = require('../database/db')

// INGRESAR PRODUCTO

exports.save = (req, res) =>{
    const nombreproducto = req.body.nombreproducto;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const descripcion = req.body.descripcion;
    const fecharegistro = req.body.fecharegistro;
    const categoria = req.body.categoria;
    const imagenproducto = req.body.imagenproducto
    connection.query('INSERT INTO producto SET ?', {nombreproducto:nombreproducto, precio:precio, stock:stock, descripcion:descripcion, fecharegistro:fecharegistro, categoria:categoria, imagenproducto:'./resources/css/ImagenesFerreteria/'+ imagenproducto}, (error, results) =>{
        if (error) {
            console.log(error);
        } else {
            res.redirect('dashboard');
        }
    })
}

// EDITAR PRODUCTO
exports.update = (req,res) =>{
    const id = req.body.idproducto;
    const nombreproducto = req.body.nombreproducto;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const descripcion = req.body.descripcion;
    const fecharegistro = req.body.fecharegistro;
    const categoria = req.body.categoria;
    const imagenproducto = req.body.imagenproducto
    connection.query('UPDATE producto SET ? WHERE idproducto=?', [{nombreproducto:nombreproducto, precio:precio, stock:stock, descripcion:descripcion, fecharegistro:fecharegistro, categoria:categoria, imagenproducto:'./resources/css/ImagenesFerreteria/'+ imagenproducto}, id], (error, results) =>{
        if (error) {
            console.log(error);
        } else {
            res.redirect('dashboard');
        }
    })
}