var express = require("express"),
    router  = express.Router(),
    middleware = require("../middleware");
    
var Campground = require("../models/campground");
//index
router.get("/", function(req, res){
    //get all campground from db and render
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//add new (form)
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//create
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name,
        image = req.body.image,
        desc = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newCampground = {name:name, image:image, description: desc, author:author};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully created new campground!");
            res.redirect("/campgrounds");
        }
    });
});

//show
router.get("/:id", function(req, res){
    //find campground with id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT (form)
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });    
});

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground updated!");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Oops, something went wrong!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted!");
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;