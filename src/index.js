const express = require('express');
//Requerimiento 1
const expressFileUpload = require('express-fileupload');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const port = 3000;

//STARTING SERVER
app.listen(port, console.log(`SERVER ON => ${port}`));

//SETTINGS
const configFileUpload = {
    //Requerimiento 2
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    //Requerimiento 3
    responseOnLimit: 'El archivo supera el peso limite permitido',
};

//INTEGRACIÓN MOTOR HANDLEBARS
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views', 'layouts'));

//CONFIGURACION HANDLEBARS
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'main',
        layoutsDir: app.get('views'),
        partialsDir: path.join(__dirname, 'views', 'components')
    })
);

//MIDDLEWARES
app.use(expressFileUpload(configFileUpload));
// app.use('/files', express.static(path.join(__dirname, 'files')));
//Bootstrap CSS
app.use('/css', express.static(path.join(__dirname, '..', '/node_modules/bootstrap/dist/css')));
//Assets
app.use('/assets', express.static(path.join(__dirname, '/assets')));
//Imagenes
app.use('/imgs', express.static(path.join(__dirname, 'public/imgs')));
//ROUTES
app.use(require('./routes'));