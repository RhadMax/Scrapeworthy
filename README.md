# Scrapeworthy
---

### Description
A UCSD Extension Coding Bootcamp homework assignment using NodeJS, ExpressJS and Express-Handlebars,mongoDB, mongoose and also Heroku as a deployment platform with a little help from the mLab provision to make use of a remote noSQL database.

---

### Purpose
This project is another chance to practice using a number of technologies and methodologies that I have learned while attending the bootcamp. In particular it was useful for me as a chance to build a file framework from the ground up, as I made use of no boilerplate code for this assignment. It was very useful in firming up my comfort level with handlebars and linking up files set up in an MVC format. It was also our first introduction to scraping websites for data which was an interesting new tech to explore.

---

### Overview

This application is a web scraper at its core. It then takes the data scraped and formats it to a viewable interface and allows users to tag articles as saved, which flags them and thereby filters what articles can be viewed at either the home route or the saved articles route. Users can also further interact with articles once they are marked saved by either removing their saved status or by opening up a notes interface where they can see any existing notes for that article or leave new notes. There are also buttons along the navbar to either clear the articles or prompt the app to scrape for new articles.

---

### Usage

As it is hosted on the Heroku cloud, simply navigate to the site at this link:

The app can be found [here] (https://scrapeworthy.herokuapp.com/)

Once at the site, users can find the navigation links as well as the buttons to scrape new articles or clear existing articles along the navbar at the top. Searching for new articles will clear the old ones as well. If any articles are found, they can be viewed lower on the page, and the buttons to interact with articles can be found within the card representing each article. If on the main page a user can choose to save an article to their saved collection, or if viewing the saved page, one can remove an article from saved or open the notes interface where notes can be added or deleted for that article.

---

### Technologies
This application makes use of the following technologies:

1. Javascript
2. NodeJS
3. GitHub
4. Heroku Cloud Hosting Platform
5. npm Packages
    * express
    * axios
    * express-handlebars
    * cheerio
    * mongoose
6. mLab via Heroku using mongoDB

---

### Credits 
This application was developed by me, Max Patten. I made use of skills and references taught to and provided to me by the UCSD Extension Full Stack Coding Bootcamp. The description of its intended functionality were provided to me by the Bootcamp along with reference material. In this particular project I chose to make use of very minimal references in the form of copy pasta and just modeled my styling after the assignment example. There was no real startercode and so I am pleased to have gotten it working with almost every line written manually and following MVC with the use of seperate views for html, unlike the example given.