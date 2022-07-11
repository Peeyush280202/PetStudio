const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact');
const port = 80;

// DEFINE MONGOOSE SCHEMA

const contactSchema = new mongoose.Schema({
    name: String,
    petname: String,
    phone: String,
    email: String,
    address: String,
  });
const contact = mongoose.model('contact', contactSchema);  


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
    // console.log(alert("Make sure to use Desktop for better Experience"))    
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send(" <h1> Form submitted successfully , We will contact you soon.</h1>")
    }).catch(()=>{
        res.send(400).send("Please Check Your Internet connection")
    })
})

app.get('/shop', (req, res)=>{
    const params = {}
    res.status(200).render('shop.pug', params)
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});