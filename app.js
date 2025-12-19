const express= require('express')
const app = express();
const mongoose = require('mongoose');
const engine = require("ejs-mate");
const path = require('path');
const methodOverride = require("method-override");
const ExpressError = require('./utils/ExpressError.js');

const listings  = require("./routes/listingRoute.js")
const reviews = require("./routes/reviewRoute.js")  

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
main().then(()=>{
    console.log("connected database")
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL)
}
app.use(express.json());     // JSON body ke liye
app.use(express.urlencoded({ extended: true }));  // form-data ke liye
app.engine("ejs",engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hi i am root");

});

app.use('/listings',listings);
app.use('/listings/:id/reviews',reviews);


app.use((req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"} =err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render('error.ejs',{message});
})
app.listen(8080,()=>{
    console.log('server is listning to port http://localhost:8080')
});
