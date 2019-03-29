var fetch = require('isomorphic-fetch')

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

    let dashboardFileStruct = await playerdashboardbygeneralsplits.json()
    var points = dashboardFileStruct.resultSets[0].rowSet[0][26]
    var rebounds = dashboardFileStruct.resultSets[0].rowSet[0][18]*1.5
    var assists = dashboardFileStruct.resultSets[0].rowSet[0][19]*1.5
    var tov = dashboardFileStruct.resultSets[0].rowSet[0][20]*-2
    var steals = dashboardFileStruct.resultSets[0].rowSet[0][21]*2
    var blocks = dashboardFileStruct.resultSets[0].rowSet[0][22]*2
    var total = points+rebounds+assists+steals+blocks+tov
    // console.log(total)
    return total
    
}

const teams = [
    {
        name: 'byron',
        players: ["201935", "203081", "203497", "202331", "203078", "1627750"]
    },
    {
        name: 'moir',
        players: ["203507", "1626157", "202696", "1626156", "203500", "202710"]
    },
    {
        name: 'cail',
        players: ["203083", "203999", "203994", "201950", "202699", "202339"]
    },
    {
        name: 'boyd',
        players: ["1627732", "201942", "202681", "201566", "1629029", "202355"]
    },
    {
        name: 'mick',
        players: ["203076", "202695", "200746", "203944", "203897", "1627741"]
    },
    {
        name: 'tex',
        players: ["201142", "1629028", "201188", "201939", "1628378", "203468"]
    },
    {
        name: 'trev',
        players: ["203954", "201933", "202691", "1628369", "203991", "200794"]
    },
    {
        name: 'scott',
        players: ["2544", "1628368", "202689", "202683", "203114", "203506"]
    }
];
// Loop over each of the teams & player IDs and push to our Output array
const playerLoop = async function(teams) {
    await teams.map(function(team) {
        // Looping over the array of players should fill this array with results
        let output = []
        Promise.all(team.players.map(async (playerID) => {
            let contents = await nbaFetch(playerID)
            output.push(contents)
            // Wait till all the iterations have completed and process the results
        })).then(function() {
            // Sort numerically and remove smallest number
            output.sort(function(a, b){return b-a});
            output.pop();
            // Calculate sum of remaining numbers
            let sum = output.reduce( (a, b) => { return a + b}, 0);
            console.log(team.name, sum)
        }, function(err) {
            // error occurred
        });
    });
}

// // Loop over each of the player IDs and push to our Output array
//  async function playerLoop(teamID) {   
//     let output = []
//     await Promise.all(teamID.map(async (playerID) => {
//       let contents = await nbaFetch(playerID)
//       output.push(contents)
//     })).then(function() {
//         // Sort numerically and remove smallest number
//         output.sort(function(a, b){return b-a});
//         output.pop();
//         // Calculate sum of remaining numbers
//         let sum = output.reduce( (a, b) => { return a + b}, 0);
//         console.log(sum)
//     }, function(err) {
//         // error occurred
//     });
//   }

  

  playerLoop(teams)
  // playerLoop(mick)
  // playerLoop(cail)