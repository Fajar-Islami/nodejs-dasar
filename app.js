const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// Connect to mongoDB
const dbURI = 'mongodb+srv://fajarIslami07:6JWZ7jmeDxpefDWY@cluster0.scvuy.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    // listen for requests
    app.listen(3000, () => {
      console.log('Konek ke Database');
      console.log('Konek PORT 3000');
    }),
  )
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// Middleware & static files
app.use(express.static('public')); //Membuat folder public bisa diakses/ root
app.use(express.urlencoded({ extended: true })); // mengambil data dari form
app.use(morgan('dev')); // untuk menampilkan log

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
