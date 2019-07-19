var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = app => {
    app.get("/scrape", function (req, res) {
        db.Article.deleteMany({})
            .then(() => {
                axios.get("https://www.pcgamer.com/news/").then(function (response) {
                    var $ = cheerio.load(response.data);
                    var counter = 0;
                    $("div.listingResult").each(function (i, element) {
                        var result = {};
                        counter++;
                        result.title = $(element)
                            .find("h3")
                            .text();
                        result.link = $(element)
                            .find("a.article-link")
                            .attr("href");
                        let summary = $(element)
                            .find("p.synopsis")
                            .text();
                        summary = summary.replace(/news/, "")
                        summary = summary.replace(/News/, "")
                        summary = summary.replace(/NEWS/, "")
                        summary = summary.replace(/Deals/, "")
                        result.summary = summary
                        result.saved = false;

                        db.Article.create(result)
                            .then(function (dbArticle) {

                            })
                            .catch(function (err) {
                                console.log("Something went wrong retrieving articles with scraper. Some article(s) were lost.");
                            });

                    });
                    res.status(200).redirect("/");
                })
            });
    });

    app.put("/clear", (req, res) => {
        db.Article.deleteMany({})
            .then(function (data) {
                res.render("index", {
                    data: data
                });
            })
            .catch(function (err) {
                console.log("Something went wrong removing articles.");
            });
    });

    app.put("/save/:id", (req, res) => {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: true } })
            .then(function (data) {
                res.render("index", {
                    data: data
                });
            })
            .catch(function (err) {
                console.log("Something went wrong while adding article to saved list.");
            });
    });

    app.put("/unsave/:id", (req, res) => {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: false } })
            .then(function (data) {
                res.render("saved", {
                    data: data
                });
            })
            .catch(function (err) {
                console.log("Something went wrong while removing article from saved list.");
            });
    });

    app.get("/notes/:id", function (req, res) {
        db.Article.findOne({
            _id: req.params.id
        })
            .populate("note")
            .then(article => {
                res.json(article);
            })
    });

    app.post("/notes/add/:id", function (req, res) {
        let articleId = req.params.id;
        db.Note.create(req.body)
            .then(newNote => {
                return db.Article.findOneAndUpdate({ _id: articleId }, { $push: { note: newNote._id }}, { new: true })
            })
            .then(notedArticle => res.json(notedArticle))
            .catch(err => {console.log(err)})
    });

    app.delete("/delete/:id", function (req, res) {
        let noteId = req.params.id;
        db.Note.deleteOne({_id: noteId})
        .then(data => res.json(data))
        .catch(err => {console.log(err)})
    })
};