var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema );


// Campground.create(
//   {
//     name: "Nature",
//     image: "https://pixabay.com/get/54e5d4414356a814f1dc84609620367d1c3ed9e04e507440722d7bd3934acd_340.jpg",
//     description: "testing mongo node"
//   }, function(err,campground){
//     if(err){
//       console.log(err);
//     }
//     else {
//       console.log("Newly created");
//       console.log(campground);
//     }
//   });



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
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }
    else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  });
 
});

app.post("/campgrounds", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description}
  Campground.create(newCampground, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }
    else {
      res.redirect("/campgrounds");    }
  });
  
 });

app.get("/campgrounds/new", function(req,res){
	res.render("new");
});

app.get("/campgrounds/:id", function(req,res){
  
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }
    else {
      res.render("show",{campground: campground});
    }
  });
 
});

app.listen(3000,function(){
	console.log("my first node application");
});