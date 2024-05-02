const express = require('express');
const path = require('path')
const app = express();

require("./mongodb");

const userdata = require("./model");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});


app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'login.html'));
});

app.get('/services',(req,res)=>{
    res.sendFile(path.join(__dirname,'services.html'));
});
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'about.html'));
});
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'contact.html'));
});



app.post('/signup',async (req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    

    const newUser = new userdata({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
    })

   await newUser.save().then(()=>{
        console.log('saved');
        res.sendFile(path.join(__dirname,'index.html'));
    }).catch(error => {
        console.error('Error saving user:', error);
        res.status(500).send('Error signing up user');
    });
})




app.post('/login',async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        // console.log(`${email} and password is ${password}`);
        const userEmail = await userdata.findOne({email:email});

       if(userEmail.password === password){
        res.status(201).sendFile(path.join(__dirname,'index.html'));
       }else{
        res.send('email or password is not matching');
       }


    }catch(err){
       res.send(err);
    }
})



app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});



// index.html   -> /
// login.html   ->login