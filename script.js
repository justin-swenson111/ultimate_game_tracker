// Initialize player count
let playerCount = 0;

// List of player names
let players = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack"];

// List of games
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

// Initialize leaderboard and popular game tracking
let leaderboard = new Map();
let popularGame = [];

// Map to store player data
let playerMap = new Map();

// Function to create a player
function createPlayer(name) {
    playerCount++;
    let games = new Set(); // Set to store unique games for the player
    const player = {
        name: name,
        games: games,
        scores: [], // Array to store scores for games
        average: [] // Array to store average scores for games
    };
    playerMap.set(name, player); // Add player to the map
    const playerID = playerMap.get(name);
    alert(`Player ${name} created`);
    playerID.games = Array.from(player.games);
    localStorage.setItem("playerMap", JSON.stringify(Array.from(playerMap.entries())));
    playerID.games = new Set(player.games);
    return player;
}

// Function to add a game to a player's list
function addGame(playerId, game) {
    if (playerMap.has(playerId)) {
        let player = playerMap.get(playerId);
        if (!player.games.has(game)) {
            player.games.add(game); // Add game if not already present
            alert(`Game ${game} added for player ${playerId}`);
            player.games = Array.from(player.games);
            localStorage.setItem("playerMap", JSON.stringify(Array.from(playerMap.entries())));
            player.games = new Set(player.games);


        } else {
            alert(`Game ${game} already exists for player ${playerId}`);
        }
    }
}

// Function to record a game played by a player with a score
function playedGame(playerId, game, score) {
    if (playerMap.has(playerId)) {
        let player = playerMap.get(playerId);
        if (player.games.has(game)) {
            let round = 1;
            for (let i in player.scores) {
                if (player.scores[i][0] == game) {
                    round++;
                }
            }
            player.scores.push([game, round, score]); // Add game, round, and score
        
            // Convert the Set to an array before saving
            player.games = Array.from(player.games);
        
            // Save the updated playerMap to localStorage
            player.games = Array.from(player.games);
            localStorage.setItem("playerMap", JSON.stringify(Array.from(playerMap.entries())));
            player.games = new Set(player.games);
        
            alert(`Game ${game} played by player ${playerId} with score ${score}`);
        
            // Convert the array back to a Set after saving
        
            // console.log(playerMap.get(playerId).scores); // Log scores for debugging
        }
    }
}

// Function to calculate and store the average score for a game
function makeAverage(playerId, game) {
    if (playerMap.has(playerId)) {
        let player = playerMap.get(playerId);
        for (let i in player.average){
            if (player.average[i][0] == game) {
                player.average.splice(i, 1); // Remove the existing entry for the game
            }
        }
        if (player.games.has(game)) {
            let average = 0;
            let count = 0

            for (let i in player.scores) {
                if (player.scores[i][0] == game) {
                    average += player.scores[i][2];
                    count++;
                }
            }
            if (count == 0) {
                return;
            }
            player.average.push([game, Math.round(average / count)]); // Store average score
            player.games = Array.from(player.games);
            localStorage.setItem("playerMap", JSON.stringify(Array.from(playerMap.entries())));
            player.games = new Set(player.games);


        } else {
            // console.log(`Game ${game} does not exist for player ${playerId}`);
        }
    }
}

// Function to create a leaderboard for a specific game
function CreateGameLeaderboard(game) {
    players = [];
    for (let [key, value] of playerMap) {
        if (value.games.has(game)) {
            let average = 0;
            if (value.average.length != 0) {

                for (let i in value.average) {
                    if (value.average[i][0] == game) {
                        average = value.average[i][1];
                    }
                }
            }


            players.push([value.name, average]); // Add player and their average score
        }
    }
    players.sort((a, b) => b[1] - a[1]); // Sort players by score
    return players;
}

// Function to create a leaderboard for all games
function CreateLeaderboard() {
    for (game in games) {
        gameLead = CreateGameLeaderboard(games[game]);
        if (gameLead.length > 0) {
            leaderboard.set(games[game], gameLead); // Add game leaderboard to the map
        }
    }
}

// Function to determine the most popular games
function PopularGame() {
    for (game in games) {
        let appear = 0;
        for (let [key, value] of playerMap) {
            if (value.games.has(games[game])) {
                appear++;
            }
        }
        popularGame.push([games[game], appear]); // Add game and its popularity count
    }
    popularGame.sort((a, b) => b[1] - a[1]); // Sort games by popularity
}




// // Create players
// for (let i in players) {
//     createPlayer(players[i]);
// }

// // Assign random games to players
// for (let i in players) {
//     for (let i = 0; i < (Math.floor(Math.random() * 4) + 2); i++) {
//         addGame(players[i], games[Math.floor(Math.random() * games.length)]);
//     }
// }

// // Remove players with no games selected
// for (let [key, value] of playerMap) {
//     if (value.games.size === 0) {
//         playerMap.delete(key);
//     }
// }

// // Add random scores and rounds for each game for each player
// for (let [key, value] of playerMap) {
//     for (let game of value.games) {
//         for (let i = 0; i < (Math.floor(Math.random() * 2) + 1); i++) {
//             playedGame(key, game, Math.floor(Math.random() * 100));
//         }
//         makeAverage(key, game); // Calculate average score
//     }
// }

// // Display player summary
// console.log(`
// Player summary:`);
// for (let [key, value] of playerMap) {
//     console.log(`   
//         ${value.name}:
//     `);
//     console.log(`Games:
//         `);
//     for (let game of value.games) {
//         console.log(game, " - ", value.scores.filter(score => score[0] == game).length, " rounds played");
//         console.log(`   highest score: ` + Math.max(...value.scores.filter(score => score[0] == game).map(score => score[2])));
//     }
// }

// // Determine and display the most popular games
// PopularGame();
// console.log(`
//     Most popular games:
//     `);
// for (let i in popularGame) {
//     console.log((parseInt(i) + 1) + ". " + popularGame[i][0] + " - " + popularGame[i][1] + " players played this game");
// }

// // Create and display the leaderboard
// console.log(`
//     Highest average scores per game:
//     `);
// CreateLeaderboard();

// // Display overall highest average scores
// console.log(`
//     highest average scores overall:
//     `);

// let avg = [];

// for (let [key, value] of playerMap) {
//     let num = 0;
//     let len = 0;
//     for (let i in value.average) {
//         num += value.average[i][1];
//         len++;
//     }
//     num = Math.round(num / len);
//     avg.push([key, num]);
// }
// avg.sort((a, b) => b[1] - a[1]);
// for (let i in avg) {
//     console.log((parseInt(i) + 1) + ". " + avg[i][0] + " - " + avg[i][1]);
// }

