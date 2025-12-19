const express=require('express')
const app= express();
const session = require('express-session');


const sessionOptions ={
    secret:"mysupersecret",
    resave:false,
    saveUninitialized:true

}
app.use(session(sessionOptions));
app.get('/register',(req,res)=>{
    let {name="anonymous"} =req.query;
    req.session.name = name;
    // res.send(`Welcome aboard , ${name}`);
    res.redirect('/hello');
});
app.get('/hello',(req,res)=>{
    res.send(`hello ${req.session.name || 'Guest'}`);
});


app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
   