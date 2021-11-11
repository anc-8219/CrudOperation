var express=require("express");
var app=express();
var port=660;
var ejs= require('ejs');
app.set('view engine','ejs');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/crud");

var Schema = new mongoose.Schema({
    Name:String,
    Roll_No:Number,
    Branch:String,
    Hobbies:String,
});
//COLLECTION CREATION
//Here,User is a name of collection,should be of capital letter bcz it acts as a class->k/a pascal convention
var User = new mongoose.model("User",Schema);
//for parsering JSON to js object
app.use (express.urlencoded ({extended:true}));

app.get("/",function(req,res){
    res.render("home");
})

app.get("/getdetails",function(req,res){
    User.find({},function (err, allDetails){
        if(err){
            console.log(err);
        }else {
            console.log(allDetails);
            res.render("index", { details:allDetails});
        }
    })
});


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/home.html");
});
app.get("/login",(req,res)=>{
    res.sendFile(__dirname + "/form.html");
});

app.post("/",(req,res)=>{
    let nUser = new User({
        Name:req.body.name,
        Roll_No:req.body.number,
        Branch:req.body.branch,
        Hobbies:req.body.hobbies
    });
    nUser.save();
    res.send("Saved");
});
app.post("/del",function(req,res){
    console.log(req.body)
    User.deleteOne({_id : req.body.submit},function(err,result){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/index")
        }
    })
});

 
app.listen(port,()=>{
    console.log("server listening on port" + port);

});