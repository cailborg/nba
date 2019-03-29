# NBA Stats Scraper

## Introduction
I built this specifically to automate the scoring process for the custom NBA fantasy league my friends and I participate in.
I saw there was a [python script](https://github.com/seemethere/nba_py) to scrape data from [stats.nba.com](stats.nba.com) but I wanted to build something that worked in javascript


## Usage
Run `npm install` for dependencies
Run `npm start` to start the server


## Notes
Due to stats.nba.com not actually having an API and having to scrape the page, the more teams/players you add, the more fetch requests it makes so it can timeout. Haven't solved this yet.
This is a server-side application only at the moment, but am aiming to build a front end for it at some point.