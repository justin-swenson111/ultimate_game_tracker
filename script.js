let playerCount= 0;
let players = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack"];
let games = [
    "League of Legends",
    "Dota 2",
    "Counter-Strike: Global Offensive",
    "Fortnite",
    "Overwatch",
    "Valorant",
    "Apex Legends",
    "Call of Duty: Warzone",
    "PUBG",
    "Rocket League",
    "Hearthstone",
    "Super Smash Bros.",
    "Street Fighter V",
    "Tekken 7",
    "FIFA 23"
];

let leaderboard = new Map();
let popularGame = [];

let playerMap = new Map();

function createPlayer(name) {
    playerCount++;
    let games = new Set();
    const player = {
        name: name,
        id: playerCount,
        games: games,
        scores: [],
        average: []
    };
    playerMap.set(name, player);
    return player;
}

function addGame(playerId, game) {
    if (playerMap.has(playerId)) {
        let player = playerMap.get(playerId);
        if (!player.games.has(game)) {
            player.games.add(game);
        }
        else{
            console.log(`Game ${game} already exists for player ${playerId}`);
        }
    }
}

function playedGame(playerId, game,score) {
    if (playerMap.has(playerId)) {
        let player = playerMap.get(playerId) 
        if (player.games.has(game)) {
            let round = 1;
            for (let i in player.scores) {
                if (player.scores[i][0] == game ) {
                    round ++;
                }    
            }
            player.scores.push([game,round,score])
        }
    }
}

function makeAverage(playerId, game) {
    if (playerMap.has(playerId)) {
        let player = playerMap.get(playerId);
        if (player.games.has(game)) {
            let average = 0;
            let count = 0;
            for (let i in player.scores) {
                if (player.scores[i][0] == game) {
                    average += player.scores[i][2];
                    count++;
                }    
            }
            player.average.push([game, Math.round(average/count)]);
        
        }
        else {
            console.log(`Game ${game} does not exist for player ${playerId}`);
        }
    }

}

function CreateGameLeaderboard(game){
    players = []
    for (let [key, value] of playerMap) {
        if (value.games.has(game)) {
            let average = 0;
            for (let i in value.average) {
                if (value.average[i][0] == game) {
                    average = value.average[i][1];
                }    
            }
            players.push([value.name, average])
        }
    }
    players.sort((a, b) => b[1] - a[1]);
    return players
}

function CreateLeaderboard() {
    for (game in games){
        gameLead = CreateGameLeaderboard(games[game]);
        if (gameLead.length > 0) {
            leaderboard.set(games[game], gameLead);
        }
    }
    for (let [key, value] of leaderboard) {
        console.log(key+": ");
        for (let i in value) {
            console.log( (parseInt(i)+1)+ ". " + value[i][0] + " - " + value[i][1]);
        }
        console.log("");
    }
}

function PopularGame(){
    for (game in games){
        let appear = 0
        for (let [key, value] of playerMap){
            if (value.games.has(games[game])) {
                appear++;
            }
        }
        popularGame.push([games[game], appear])
    }
    popularGame.sort((a, b) => b[1] - a[1]);
}


//create players
for (let i in players) {
    createPlayer(players[i]);
}

//setting random games for players
for (let i in players) {
    for (let i = 0; i < (Math.floor(Math.random() * 4)+2); i++) {
        addGame(players[i], games[Math.floor(Math.random() * games.length)]);
    }
}

//deleting players with no games seleceted
for (let [key, value] of playerMap) {
    if (value.games.size === 0) {
        playerMap.delete(key);
    }
}

//adding a random number of rounds played and random scores for each game for each player
for (let [key,value] of playerMap) {
    for (let game of value.games) {
        for (let i = 0; i < (Math.floor(Math.random() * 2)+1); i++) {
            playedGame(key, game, Math.floor(Math.random() * 100));
        }
        makeAverage(key, game);
    }
}

//create player summary
console.log(`
Player summary:`)
for (let [key,value] of playerMap){
    console.log(`   
        ${value.name}:
    `)
    console.log(`Games:
        `)
    for (let game of value.games) {
        console.log(game, " - ", value.scores.filter(score => score[0] == game).length, " rounds played");
        console.log(`   highest score: ` + Math.max(...value.scores.filter(score => score[0] == game).map(score => score[2])));
    }
}



PopularGame();

console.log(`
    Most popular games:
    `)
for (let i in popularGame) {
    console.log( (parseInt(i)+1)+ ". " + popularGame[i][0] + " - " + popularGame[i][1]);
}


//create leaderboard
console.log(`
    Highest average scores per game:
    `)
CreateLeaderboard();


