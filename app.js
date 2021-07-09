const express = require('express');
const mongoose =require('mongoose');
const morgan =require('morgan');
const Blog=  require('./models/blog');


// Express app
const app = express();


// connect to mongoDB
const dbURI ='mongodb+srv://mua-wallace:12345@cluster0.qb4t8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then((result)=> app.listen(3000))
   .catch((err)=> console.log(err));




// register view engine
 app.set('view engine' , 'ejs');

 // midleware and static files
 app.use(express.static('public'));
 app.use(express.urlencoded({extended: true}));
 app.use(morgan('dev'));

 app.get('/add-blog', (req, res)=>{
    const blog = new Blog({
        title: 'new blog 1',
        snippet: 'about my new blog 1',
        body: 'more about my new blog 1'
    });
    blog.save()
     .then((result) =>{
         res.send(result)
     }) 
     .catch((err) =>{
         console.log(err)
     });     
}) ;


app.get('/all-blogs', (req,res)=>{
    Blog.find()
        .then((result) =>{
            res.send(result)
        })
            .catch((err) =>{
                console.log(err);
            });

});
app.get('/single-blog', (req,res)=>{
    Blog.findById()
        .then((result) =>{
            res.send(result)
        })
            .catch((err) =>{
                console.log(err);
            });

});






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