const express = require('express');
// Express app
const app = express();

// register view engine
 app.set('view engine' , 'ejs');

// Listen for request
app.listen(3000);


app.get( '/', (req, res) => {
    const blogs = [
        {title: 'the importance of Mathematics', snippet: 'lorem '},
        {title: 'the importance of History', snippet: 'lorem'},
        {title: 'the importance of Geology', snippet: 'lorem'}
    ];
    res.render('index' , { title : 'Home', blogs});
})
app.get( '/', (req, res) => {
    const blogs = [
        {title: 'the importance of Mathematics', snippet: 'lorem '},
        {title: 'the importance of History', snippet: 'lorem'},
        {title: 'the importance of Geology', snippet: 'lorem'}
    ]
})
app.get( '/about', (req, res) => {
    res.render('about' , { title : 'About'});
})
   // redirects
app.get( '/blogs/create', (req, res) => {
    res.render('create' ,  { title : 'Create a new Page'});
})

 // 404 page
app.get( '/404', (req, res) => {
    res.render('404',  { title : '404'});
});