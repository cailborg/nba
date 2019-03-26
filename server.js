var fetch = require('isomorphic-fetch')

// Looping over the array of players should fill this array with results
var output = []


// Load in the right json object based on the player ID and calculate points

async function nbaFetch(playerID){
    let playerdashboardbygeneralsplits = await fetch('https://stats.nba.com/stats/playerdashboardbygeneralsplits?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerID=' + playerID + '&PlusMinus=N&Rank=N&Season=2018-19&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&Split=general&VsConference=&VsDivision=', {
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
    let commonPlayerInfo = await fetch('https://stats.nba.com/stats/commonplayerinfo?LeagueID=&PlayerID=' + playerID, {
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

    let dashboardFileStruct = await playerdashboardbygeneralsplits.json()
    let profileFileStruct = await commonPlayerInfo.json()
    var points = dashboardFileStruct.resultSets[0].rowSet[0][26]
    var rebounds = dashboardFileStruct.resultSets[0].rowSet[0][18]*1.5
    var assists = dashboardFileStruct.resultSets[0].rowSet[0][19]*1.5
    var tov = dashboardFileStruct.resultSets[0].rowSet[0][20]*-2
    var steals = dashboardFileStruct.resultSets[0].rowSet[0][21]*2
    var blocks = dashboardFileStruct.resultSets[0].rowSet[0][22]*2
    var games = dashboardFileStruct.resultSets[0].rowSet[0][2]
    var name = profileFileStruct.resultSets[0].rowSet[0][3]
    // var total = [name, 'TOTAL', points+rebounds+assists+steals+blocks+tov, 'PPG', (points+rebounds+assists+steals+blocks+tov)/games]
    var total = points+rebounds+assists+steals+blocks+tov
    console.log('total', total)
    return total
    // console.log(total)
    // output.push(total)
}

    // Loop over each of the player IDs and push to our Output array
    var byron = ["201935", "203081", "203497", "202331", "203078", "1627750"];
    byron.forEach(function(entry) {
        nbaFetch(entry).then(function(result) {
            output.push(result)
        })
    });

    // Log the final output
    console.log('output', output)