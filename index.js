const express = require('express')
const layouts = require('express-ejs-layouts')
var db = require('./models')

// Initialize dependencies
const app = express()

// Set-up and middleware
app.set('view engine', 'ejs')
app.use(layouts)
app.use('/', express.static('static'))
app.use(express.static(__dirname + '/public'))

// Routes

app.get('/', (req, res) => {
	res.render('home')
})

app.get('/profile', (req, res) => {
	res.render('users/index')
})

app.get('/newuser', (req,res) =>{
	res.render('users/newuser')
})

app.get('/gardens', (req, res) => {
	res.render('gardens/index')
})

app.get('/newGarden', (req, res) => {
	res.render('gardens/newGarden')
})

//list all plants
app.get('/plants', (req, res) => {
	db.plant.findAll()
	.then(plants => {
		res.render('plants/index', {plants})
	})
})

app.get('/plants/:id', function(req, res) {
	db.plant.findOne({
	  where: {id: req.params.id}
	}).then(function(plant) {
	  res.render('plants/show', {plant: plant})
	}).catch(function(error) {
	  console.log(error)
	  res.status(400).render('main/404')
	})
  })

// show single plant




// Listen on a port

app.listen(process.env.PORT || 3000, () => {
	console.log('Listening to the smooth sounds of port 3000')
})
