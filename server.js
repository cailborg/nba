var express = require('express')
var fetch = require('isomorphic-fetch')
var app = express()

async function nbaFetch(){
    let result = await fetch('https://stats.nba.com/stats/playerdashboardbygeneralsplits?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerID=201935&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&VsConference=&VsDivision=', {
        mode: 'cors',
        method: "GET", // *GET, POST, PUT, DELETE, etc.
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
app.use('/', async function (req, res, next) {
    let result = await nbaFetch().catch(error => console.log(error))
    var test = (JSON.stringify(result.resultSets[0].rowSet[0][26]))
    // res.send(JSON.stringify(result.resultSets[0].rowSet[0]))
    res.send(test)
    
})

app.listen(3001, console.log("I'm a server and I am listening on port 3001"))