//npm init, npm i express mongoose

const express= require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+ '/recursos'));

const mustacheExpress = require('mustache-express');
app.engine('.mustache',mustacheExpress());
app.set('view engine', 'mustache');

//conexion
mongoose.connect('mongodb://uvwsk4nzavtd0joejaog:HtzRWfbZnEewHvYMECZz@b8siqpaf1c9sxah-mongodb.services.clever-cloud.com:27017/b8siqpaf1c9sxah',{useNewUrlParser:true,useUnifiedTopology:true});

const conection= mongoose.connection;

conection.once('open',()=>{
    console.log('conexion exitosa');
});

conection.on('error', (err)=>{
    console.log('Error de conexion', err);
});

//modelo
const Todo= mongoose.model('Todo',{text:String,completed:Boolean});

app.get('/',(req,res)=>{
   // res.json({response: 'success'});
    res.render('index',{titulo:'Hola  mundo'});
});

app.listen(3000, ()=>{
    console.log('Servidor conectado...')
})