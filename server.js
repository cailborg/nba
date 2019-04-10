var fetch = require('isomorphic-fetch')

// Load in the right json object based on the player ID and calculate points

async function nbaFetch(playerID){
    let playerdashboardbygeneralsplits = await fetch('https://www.balldontlie.io/api/v1/stats?seasons[]=2018&per_page=100&player_ids[]=' + playerID + '&postseason=false', {
        mode: 'cors',
        method: "GET",
        headers: {     
        "accept-encoding": "Accepflate, sdch",
        "accept-language": "he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4",
        "cache-control": "max-age=0",
        connection: "keep-alive",
        },
    })

    let nbaFileStruct = await playerdashboardbygeneralsplits.json()
    let game = nbaFileStruct.data
// Loop through each game to grab each stat and push them into an array
    let assists = []
    let points = []
    let rebounds = []
    let tov = []
    let steals = []
    let blocks = []
      game.map(function(elem) {
        assists.push(elem.ast)
        points.push(elem.pts)
        rebounds.push(elem.reb)
        tov.push(elem.turnover)
        steals.push(elem.stl)
        blocks.push(elem.blk)
      });
// Reduce each array to its sum
    let sumPoints = points.reduce( (a, b) => { return a + b}, 0);
    let sumAssists = assists.reduce( (a, b) => { return a + b}, 0);
    let sumRebounds = rebounds.reduce( (a, b) => { return a + b}, 0);
    let sumSteals = steals.reduce( (a, b) => { return a + b}, 0);
    let sumBlocks = blocks.reduce( (a, b) => { return a + b}, 0);
    let sumTOV = tov.reduce( (a, b) => { return a + b}, 0);
// Add the results and the custom multipliers to get a total points for each player
    let total = sumPoints + sumAssists*1.5 + sumRebounds*1.5 + sumSteals*2 + sumBlocks*2 - sumTOV*2
    return total
}

// Team names and player IDs for each go here
const teams = [
    {
        name: 'Byron',
        players: ["192", "278", "176", "172", "37", "335"]
    },
    {
        name: 'Moir',
        players: ["15", "447", "460", "405", "3", "79"]
    },
    {
        name: 'Cail',
        players: ["137", "246", "349", "214", "200", "51"]
    },
    {
        name: 'Boyd',
        players: ["417", "125", "228", "472", "132", "474"]
    },
    {
        name: 'Mick',
        players: ["117", "274", "6", "387", "268", "210"]
    },
    {
        name: 'Tex',
        players: ["140", "22", "169", "115", "322", "303"]
    },
    {
        name: 'Trev',
        players: ["145", "189", "443", "434", "83", "318"]
    },
    {
        name: 'Scott',
        players: ["237", "161", "465", "253", "315", "101"]
    }
];

// Loop over each of the teams & player IDs and push to our Output array
const playerLoop = async function(teams) {
    return await Promise.all(teams.map(function(team) {
        // Looping over the array of players should fill this array with results
        let output = []
        return Promise.all(team.players.map(async (playerID) => {
            let contents = await nbaFetch(playerID)
            output.push(contents)
            // Wait till all the iterations have completed and process the results
        })).then(function() {
            // Sort numerically and remove smallest number
            output.sort(function(a, b){return b-a});
            output.pop();
            // Calculate sum of remaining numbers
            let sum = output.reduce( (a, b) => { return a + b}, 0);
            // console.log(team.name, sum)
            return team.name + sum
        }, function(err) {
            // error occurred
        });
    }));
}

//Return all the sums and then do something

async function main(){
    let value = await playerLoop(teams);
    console.log(value);
    console.log('success');
  };

//Trigger the function
main()