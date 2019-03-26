var express = require('express')
var bodyParser = require('body-parser');
var fetch = require('isomorphic-fetch')
var app = express()

// Load in the right json object based on the player ID
const playerID = 203506
async function nbaFetch(playerID){
    let result = await fetch('https://stats.nba.com/stats/playerdashboardbygeneralsplits?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerID=' + playerID + '&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&VsConference=&VsDivision=', {
        mode: 'cors',
        method: "GET",
        headers: {
            
        "accept-encoding": "Accepflate, sdch",
        "accept-language": "he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4",
        "cache-control": "max-age=0",
        connection: "keep-alive",
        host: "stats.nba.com",
        referer: "http://stats.nba.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36"
        },
    })

    let nbaFileStruct = await result.json()
    
    return nbaFileStruct
}

// Server instance

app.use('/', async function (req, res, next) {
    try {
        let result = await nbaFetch(playerID)

        // Grab all the values I want and add the fantasy multipliers
        var points = result.resultSets[0].rowSet[0][26]
        var rebounds = result.resultSets[0].rowSet[0][18]*1.5
        var assists = result.resultSets[0].rowSet[0][19]*1.5
        var tov = result.resultSets[0].rowSet[0][20]*-2
        var steals = result.resultSets[0].rowSet[0][21]*2
        var blocks = result.resultSets[0].rowSet[0][22]*2
        var games = result.resultSets[0].rowSet[0][2]
    
        // Add multiplied results into a single array
        var total = [points+rebounds+assists+steals+blocks+tov, (points+rebounds+assists+steals+blocks+tov)/games]

        // Send result to client
        res.send(total)
      }
      catch(error) {
        console.error(error);
      }

    
})

app.listen(3001, console.log("I'm a server and I am listening on port 3001"))