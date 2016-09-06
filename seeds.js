var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {   
        name: "Yerin", 
        image: "https://pbs.twimg.com/media/CMi7NRwUkAAk0ui.png:large",
        description: "Hi <3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac massa ut orci aliquet rutrum. Curabitur molestie euismod iaculis. Praesent laoreet nisi quis volutpat consectetur. Donec nec est cursus, convallis ipsum euismod, vehicula nibh. Pellentesque vel facilisis diam, ut finibus nibh. Aenean et diam facilisis, facilisis neque in, egestas elit. Ut non hendrerit neque. Aliquam a consectetur odio. Nunc aliquet nisl purus, volutpat iaculis nulla aliquam vel. Nullam eget dignissim orci."
    },
    {   
        name: "Yuju", 
        image: "http://1.soompi.io/wp-content/uploads/2015/01/Yuju.jpg",
        description: "Hi <3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac massa ut orci aliquet rutrum. Curabitur molestie euismod iaculis. Praesent laoreet nisi quis volutpat consectetur. Donec nec est cursus, convallis ipsum euismod, vehicula nibh. Pellentesque vel facilisis diam, ut finibus nibh. Aenean et diam facilisis, facilisis neque in, egestas elit. Ut non hendrerit neque. Aliquam a consectetur odio. Nunc aliquet nisl purus, volutpat iaculis nulla aliquam vel. Nullam eget dignissim orci."
    },
    {   
        name: "SinB", 
        image: "http://data.whicdn.com/images/171936064/large.jpg",
        description: "Hi <3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac massa ut orci aliquet rutrum. Curabitur molestie euismod iaculis. Praesent laoreet nisi quis volutpat consectetur. Donec nec est cursus, convallis ipsum euismod, vehicula nibh. Pellentesque vel facilisis diam, ut finibus nibh. Aenean et diam facilisis, facilisis neque in, egestas elit. Ut non hendrerit neque. Aliquam a consectetur odio. Nunc aliquet nisl purus, volutpat iaculis nulla aliquam vel. Nullam eget dignissim orci."
    }
];

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //add a few comments
                    Comment.create(
                        {
                            text: "This grill is so kawaii!",
                            author: "Eunha"
                        }, 
                        function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment); 
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                }
                
            });
        });
    });
    
    //add a few comments
}

module.exports = seedDB;