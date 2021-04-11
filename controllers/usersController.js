"use strict";

const User = require("../models/User")

module.exports = {
    index: (req, res, next) => {
        User.find()
        .then(Users => {
            res.locals.Users = Users;
            next()
        })
        .catch(error => {
            console.log(`Error fetching User data: $error.message`);
            next(error);
        })
    },
    indexView: (req, res) => {
        res.render("/Users/index");
    },
    new: (req, res) => {
        res.render("/Users/new");
    },
    create: (req, res, next) => {
        let newUser = new User({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            zipCode = req.body.zipCode
        });
        User.create(newUser)
        .then(User => {
            res.locals.User = User;
            res.locals.redirect = "/Users";
            next();
        })
        .catch(error => {
            console.log(`Error saving User: ${error.message}`);
            next(error)
        })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res,next) => {
        let UserId = req.parem.id;
        User.findById(UserId)
        .then(User => {
            res.locals.User = User;
            next();
        })
        .catch(error => {
            console.log(`Error fetching User by ID: ${error.message}`);
        })
    },
    showView: (req, res) => {
        res.render(Users.show);
    },
    edit: (req, res, next) => {
        let UserId = req.parem.id;
        User.findById(UserId)
        .then(User => {
            res.render("/Users/edit", {User: User});
        })
        .catch(error => {
            console.log(`Error fetching User by ID: ${error.message}`);
            next(error);
        })
    },
    update: (req, res, next) => {
        let UserId = req.parem.id;
        let updatedUser = new User({
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            zipCode = req.body.zipCode
        });

        User.findByIdAndUpdate(UserId, updatedUser)
        .then(User => {
            res.locals.User = User;
            res.locals.redirect = "/Users/${User._id";
        })
        .catch(error => {
            console.log(`Error fetching User by ID: ${error.message}`);
            next(error);
        })
    }, 
    delete: (req, res, next) => {
        let UserId = req.parem.id;
        User.findByIdAndRemove(UserId, updatedUser)
        .then(()=> {
            res.locals.redirect = "/Users/${User._id";
            next();
        })
        .catch(error => {
            console.log(`Error fetching User by ID: ${error.message}`);
            next(error);
        })
    }
}