const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const path = require("path");

//Config
    //Template Engine

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    //Pasta Public
    app.use(express.static(path.join(__dirname,"public")));

//Rotas, não utilizei o "router" pelo projeto ser pequeno, mas poderia

//cadastro
app.get('/cad', function(req, res){
    res.render('form');
})

//lista de registros
app.get('/lista', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts});
    })
})

//formulário
app.post('/formu', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/lista');
    }).catch(function(erro){
        res.send("Ocorreu um " + erro);
    })
    
})

//deletar
app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id' : req.params.id} }).then(function(){
        res.redirect('/lista');
        }).catch(function(erro){
    res.send("Ocorreu um " + erro + " na exclusão");
            })
})

//editar
app.get('/edit/:id', (req, res)=> {
    Post.findOne({_id:req.params.id}).then((posts)=> {
        Post.destroy({where: {'id' : req.params.id} })
        res.render('edit', {posts: posts});
    })
}) 

app.listen(8091, function(){
    console.log("Servidor rodando na porta 8091!!!");
});