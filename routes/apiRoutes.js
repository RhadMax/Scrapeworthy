var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = app => {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.pcgamer.com/news/").then(function (response) {
            var $ = cheerio.load(response.data);
            $("div.listingResult").each(function (i, element) {
                var result = {};

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
                        console.log("Something went wrong retrieving articles with scraper.");
                    });
            });
            res.status(200).send("Scrape Complete");
        });
    });
};