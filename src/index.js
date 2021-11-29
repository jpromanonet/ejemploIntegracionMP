const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// SDK de Mercado Pago
const mercadopago = require('mercadopago');
const { func } = require('assert-plus');

app.use(bodyParser.urlencoded({ extended: false}));

// Agregar credenciales
mercadopago.configure({
    access_token: 'APP_USR-6623451607855904-111502-1f258ab308efb0fb26345a2912a3cfa5-672708410'
})

// Rutas
app.post('/checkout/', (req, res) => {
    // Crear objeto producto
    let preference = {
        items: [
            {
                title:req.body.title,
                unit_price: parseInt(req.body.price),
                quantity: 1,
            }
        ]
    };

    mercadopago.preferences.create(preference)
    .then(function(response) {
        res.redirect(response.body.init_point);
    }).catch(function(error){
        console.log(error);
    });
});