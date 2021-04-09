const express = require("express"), app = express(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
subscribersController = require("./controllers/subscribersController"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"), 
mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true});

mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.use(methodOverride("_method", {methods : ["POST", "GET"]}));

app.get("/", (req, res) => {
    res.render("index");
});


app.get("/courses", homeController.showCourses);
//app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribers", subscribersController.saveSubscriber);

//app.get("/contact", homeController.showSignUp);
//app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});