const express = require('express');
const mongoose= require('mongoose');
const morgan =require('morgan');

const  Blog = require('./models/blog')

// Express app
const app = express();


// connect to mongoDB
const dbURI ='mongodb+srv://mua-wallace:12345@cluster0.qb4t8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then((result)=> app.listen(5000))
   .catch((err)=> console.log(err));




// register view engine
 app.set('view engine' , 'ejs');

 // midleware and static files
 app.use(express.static('public'));
 app.use(express.urlencoded({extended: true}));
 app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about' , { title : 'About'});
});
 
//blog route
app.get('/blogs', (req ,res)=>{
    Blog.find().sort({createdAt: -1})
     .then((result)=>{
         res.render('index', {title: 'All Blogs', blogs: result})
     })
     .catch((err)=>{
         console.log(err)
     })
});
app.post('/blogs', (req ,res)=>{
    const blog = new Blog(blog.body)
    blog.save()
     .then((result)=>{
         res.redirect('/blogs')
     })
     .catch((err)=>{
         console.log(err)
     })
})

app.get('/blogs/:id', (req, res)=>{
    const id = req.params.id;
    Blog.findById(id)
     .then((result)=>{
         res.render('details', { blog: result, title:'Blog Details'});
     })
      .catch((err)=>{
          console.log(err);
      }); 
})



app.get('/blogs/create', (req, res) => {
    res.render('create' ,  { title : 'Create a new Page'});
})

 // 404 page
app.use( '/404', (req, res) => {
    res.render('404',  { title : '404'});
});