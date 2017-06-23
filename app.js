const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.engine('mustache', mustacheExpress() );
app.set('view engine', 'mustache')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.listen(3000, function () {
  console.log('Successfully started express application!')
});

const todo = []
const complete = []

app.get('/', function (req, res) {
  res.render('home', {
    todoArray: todo,
    completeArray: complete
  })
})

app.post('/', function (req, res) {
  todo.push(req.body.text)
  res.redirect('/')
})

app.post('/list', function (req, res) {
  let pop = req.body.complete
  complete.push(pop)
  todo.splice(todo.indexOf(pop), 1)
  res.redirect('/')
})
