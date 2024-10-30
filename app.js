const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env'}) 

require('./config/passport')(passport)

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} 

app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
    })
)   

app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)) 