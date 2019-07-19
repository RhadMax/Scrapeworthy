var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = app => {
    app.get("/", (req, res) => {
        db.Article.find({
            saved: false
        }).then(data => {
            // console.log(data)
            res.render("index", {
            data: data
            });
        })
    });

    app.get("/saved", (req, res) => {
        db.Article.find({
            saved: true
        }).then(data => {
            // console.log(data)
            res.render("saved", {
            data: data
            });
        })
    });
};