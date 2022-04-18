const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

//RUTA RAIZ
router.get('/', (req, res) => {
    res.render('main', {
        layout: 'main'
    })
});
//RUTA IMAGEN
router.get('/imagen', (req, res) => {
    res.render('collage', {
        layout: 'collage'
    });
});
//Requerimiento 4
router.post('/imagen', (req, res) => {
    try {
        const { target_file } = req.files;
        const { posicion } = req.body;
        target_file.mv(path.join(__dirname, '..', 'public', 'imgs', `imagen-${posicion}.jpg`), (err) => {
            err ? res.send('Debe seleccionar un archivo') : res.redirect('/imagen');
        });
    } catch (err) {
        res.status = 500;
        res.send('<script>alert("Debe seleccionar una imagen");window.location.href="/";</script>');
    }
});
//Requerimiento 5
router.get('/deleteImg/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        console.log(nombre)
        await fs.unlink(path.join(__dirname, '..', 'public', 'imgs', nombre));
        res.redirect('/imagen');
    } catch (err) {
        res.status = 500;
        res.send('<script>alert("No seleccionaste una imagen");window.location.href="/imagen";</script>');
    }
});

module.exports = router;