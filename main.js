"use strict";

const express = require("express"), 
router = express.Router(),
app = express(),
homeController = require("./controllers/homeController"),
errorController = require("./controllers/errorController"),
subscribersController = require("./controllers/subscribersController"),
usersController = require("./controllers/usersController"),
coursesController = require("./controllers/coursesController"),
methodOverride = require("method-override"),
layouts = require("express-ejs-layouts"), 

mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/confetti_cuisine",
    {useNewUrlParser: true}
    );

mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
    express.urlencoded({
        extended: false
    })
);
router.use(express.json());
router.use(layouts);
router.use(express.static("public"));

router.use(methodOverride("_method", {methods : ["POST", "GET"]}));

router.get("/", homeController.index);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/create", subscribersController.new);
router.get("/subscribers/create", subscribersController.create, subscribersController.redirectView);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.get("/subscribers/:id/update", subscribersController.update, subscribersController.redirectView);
router.get("/subscribers/:id/delete", subscribersController.delete, subscribersController.redirectView);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/create", usersController.new);
router.get("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.get("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/create", coursesController.new);
router.get("/courses/create", coursesController.create, coursesController.redirectView);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit);
router.get("/courses/:id/update", coursesController.update, coursesController.redirectView);
router.get("/courses/:id/delete", coursesController.delete, coursesController.redirectView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`)
});