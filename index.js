const express = require('express')
const layouts = require('express-ejs-layouts')

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
	res.render('profile/index')
  })

// Listen on a port

app.listen(3000, () => {
	console.log('Listening to the smooth sounds of port 3000')
})
