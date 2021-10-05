//How to setup an api can be found at https://expressjs.com/en/starter/installing.html
//How to instaal uuid, bodyparser etc. can be found from https://www.npmjs.com/ search bar - search for the needed module 
//Test POST and PUT etc. in Postman

const express = require('express');
var bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy


const app = express();
const port = 3000;

app.use(bodyParser.json());


const deliveryTypes = [
    {deliveryTypeId: 1, name: "Shipping"},
    {deliveryTypeId: 2, name: "Pickup"}
]

//const dateOfPosting = new Date(2021, 09, 13);
var d = new Date();
var dateOfPosting = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); 

let postings = [
    {postingId: uuidv4(), title: "Adidas superstar", description: "Nice shoes", 
    category: "Shoes", location: "Oulu", image: {imageId: uuidv4(), testString: "Test"}, 
    price: 65.05, postingDate: dateOfPosting, deliveryType: deliveryTypes[0], 
    firstName: "Eero", lastName: "Erkkilä", email: "eeroerkkila@yahoo.com",
    phoneNumber: "0401231231", userId: "123asd"},

    {postingId: uuidv4(), title: "Nike superstar", description: "Nicer shoes", 
    category: "Shoes", location: "Kemi", image: {imageId: uuidv4(), testString: "Testii"}, 
    price: 65.04, postingDate: dateOfPosting, deliveryType: deliveryTypes[1], 
    firstName: "Eero", lastName: "Erkkilä", email: "eeroerkkila@yahoo.com",
    phoneNumber: "0401231231", userId: "123asd"},

    {postingId: uuidv4(), title: "Kylpytakki", description: "Komia", 
    category: "Clothing", location: "Oulu", image: {imageId: uuidv4(), testString: "Tests"}, 
    price: 22.45, postingDate: dateOfPosting, deliveryType: deliveryTypes[0], 
    firstName: "Kalle", lastName: "Kalliala", email: "kallekalliala@msn.com",
    phoneNumber: "0401231232", userId: "666asd"}
]

let users = [

]


//----------- Authentication and signup-------------//

passport.use(new BasicStrategy(
    (username, password, done) => {
        console.log('credential check, username: ' + username + ' password: ' + password);

        const searchResult = users.find(user => ((username = users.username ) && (password = users.password)))
        if (searchResult != undefined) {
            done(null, searchResult); //credential match
        } else {
            done(null, false); //no credential match
        }
    }
))

app.get('/protectedResource', passport.authenticate('basic', {session: false}), (req, res) => {

    res.send("Succesfully accessed protected resource");
});

app.post('/signup', (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    users.push(newUser);
    res.sendStatus(201);
})


//----------- Requests -------------//
app.get('/', (req, res) => {
    res.send('Hieno verkkokauppa')
});

app.get('/posting', (req, res) => {
    console.log("This is GET all postings");
    res.json(postings);
});

app.get('/posting/:id', (req, res) => {
    console.log("This is GET posting by id");
    const posting = postings.find(d => d.postingId === req.params.id);
    if(posting === undefined){
        res.sendStatus(404);
    } else {
        res.json(posting);
    }
});

app.get('/posting/category/:category', (req, res) => {
    console.log("This is GET posting by category");
    let categoryString = String(req.params.category);

    const searchResult = [];
    postings.forEach(element => {
        if (element.category === categoryString){
            searchResult.push(element);
        }
    });
    if(searchResult.length == 0){
        res.sendStatus(404);
    } else {
        res.json(searchResult);
    }
});

app.get('/posting/location/:location', (req, res) => {
    console.log("This is GET posting by location");
    let locationString = String(req.params.location);

    const searchResult = [];
    postings.forEach(element => {
        if (element.location === locationString){
            searchResult.push(element);
        }
    });
    if(searchResult.length == 0){
        res.sendStatus(404);
    } else {
        res.json(searchResult);
    }
});
app.get('/posting/date/:date', (req, res) => {
    console.log("This is GET posting by date");
    let dateString = String(req.params.date);

    const searchResult = [];
    postings.forEach(element => {
        if (element.postingDate === dateString){
            searchResult.push(element);
        }
    });
    if(searchResult.length == 0){
        res.sendStatus(404);
    } else {
        res.json(searchResult);
    }
});

app.post('/posting', (req, res) => {
    console.log(req.body);
    //postings.push({id: uuidv4(), title: req.body.title});
    //res.sendStatus(201);

    postings.push({postingId: uuidv4(), title: req.body.title, description: req.body.description, 
    category: req.body.category, location: req.body.location, 
    price: req.body.price, postingDate: req.body.date, deliveryType: deliveryTypes.find(x => x.deliveryTypeId === req.body.deliveryTypeId), 
    firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email,
    phoneNumber: req.body.phoneNumber, userId: req.body.userId})
    
    res.sendStatus(201);
});

app.put('/posting/:id', (req, res) => {
    console.log("Modify posting by id");
    const index = postings.findIndex(d => d.postingId === req.params.id);
    if(index === -1){
        res.sendStatus(404);
    } else {
        postings[index].title = req.body.title;
        postings[index].description = req.body.description;
        postings[index].category = req.body.category;
        postings[index].location = req.body.location;
        postings[index].price = req.body.price;
        postings[index].postingDate = req.body.postingDate;
        postings[index].deliveryType = deliveryTypes.find(x => x.deliveryTypeId === req.body.deliveryTypeId);
        postings[index].firstName = req.body.firstName;
        postings[index].lastName = req.body.lastName;
        postings[index].email = req.body.email;
        postings[index].phoneNumber = req.body.phoneNumber;
        postings[index].userId = req.body.userId;

        res.sendStatus(200);
    }
});

app.delete('/posting/:id', (req, res) => {
    console.log("DELETE posting by id");
    const index = postings.findIndex(d => d.postingId === req.params.id);
    if(index === -1){
        res.sendStatus(404);
    } else {
        postings.splice(index, 1);
        res.sendStatus(200);
    }
});

//-----Upload an image----//

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    res.sendStatus(200);
  })
  
  app.post('/photos/upload', upload.array('photos', 4), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.files);
    res.sendStatus(200);
  })
  
  const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
  app.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
    //
    // e.g.
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
