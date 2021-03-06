const express = require('express');
const mongoose= require('mongoose');
const morgan =require('morgan');
const blogRoutes= require('./routes/blogRoutes');

// Express app
const app = express();


// connect to mongoDB Atlas
const dbURI ='mongodb+srv://mua-wallace:12345@cluster0.qb4t8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then((result)=> app.listen(5000))
   .catch((err)=> console.log(err));




// register view engine
 app.set('view engine' , 'ejs');

 // midleware and static files
 app.use(express.static('public'));
 app.use(express.urlencoded({ extended: true}));
 app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about' , { title : 'About'});
});

// blog routes
app.use( '/blogs', blogRoutes);
 
 // 404 page
app.use( '/404', (req, res) => {
    res.render('404',  { title : '404'});
});