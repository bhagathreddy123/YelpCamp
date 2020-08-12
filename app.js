var express = require("express");
var app = express();
app.set("view engine", "ejs")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
	res.render("landing");
});

 var campgrounds = [
  {name: "Iceland", image: "https://pixabay.com/get/55e0d1404e50ae14f1dc84609620367d1c3ed9e04e507440722d7fd6924bcd_340.jpg"},
  {name: "Nature", image: "https://pixabay.com/get/54e5d4414356a814f1dc84609620367d1c3ed9e04e507440722d7bd3934acd_340.jpg"},
  {name: "recreation", image: "https://pixabay.com/get/52e8d6414854ad14f1dc84609620367d1c3ed9e04e507440722d7fd6924bcd_340.jpg"},
  {name: "Tent camping Sea", image: "https://pixabay.com/get/52e8d6414854af14f1dc84609620367d1c3ed9e04e507440722d7fd6924bcd_340.jpg"}
    ];

app.get("/campgrounds", function(req,res){
 
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
 });

app.get("/campgrounds/new", function(req,res){
	res.render("new");
});

app.listen(3000,function(){
	console.log("my first node application");
});