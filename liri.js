var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var chalk = require('chalk');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var fs = require('fs');
var request = process.argv.slice(3).join("+");

function liriIt(command, request) {
    // Search for concerts using Axios and Bands in Town API
    if (command === 'concert-this') {
        if (request === "") {
            console.log(chalk.red('Enter artist/band name'));
        } else {
            bandInTownSearch();
        }
    } else
        // Search for the movie using Axios and OMDB API
        if (command === 'movie-this') {
            if (request === "") {
                omdbSearch("Mr. Nobody");
            } else {
                omdbSearch(request);
            }
        } else
            // Search for songs using Spotify API
            if (command === 'spotify-this-song') {
                if (request === "") {
                    spotifySearch("The Sign Ace of Base");
                } else {
                    spotifySearch(request);
                }
            } else
                // Search for the songs "I Want it That Way"
                if (command === 'do-what-it-says') {
                    doWhatItSays();
                }
                else {
                    console.log(chalk.inverse.cyan("To use LIRI type one of these commands:"));
                    console.log(chalk.inverse.cyan("\r 'concert-this' <artist/band name>"));
                    console.log(chalk.inverse.cyan("\r 'spotify-this-song' <song (and artist) name>"));
                    console.log(chalk.inverse.cyan("\r 'movie-this' <movie name>"));
                    console.log(chalk.inverse.cyan("\r 'do-what-it-says'"));
                }
}

liriIt(command, request);

function omdbSearch(request) {
    axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=6564191").then(
        function (response) {
            console.log("Movie title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country of production: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Short plot: " + response.data.Plot);
            console.log("Main actors: " + response.data.Actors);
        }
    );
}

function bandInTownSearch() {
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("\r\n");
            console.log(chalk.inverse.bold('Upcoming ' + response.data[0].lineup[0] + ' concerts:'));
            for (i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.country + " " +
                    response.data[i].venue.region + " " + response.data[i].venue.city);
                var date = moment(response.data[i].datetime).format("MM-DD-YYYY");
                console.log("Date: " + date);
                console.log("\r\n");
            }
        }
    )
}

function spotifySearch(request) {
    spotify.search({ type: 'track', query: request }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Artist(band): " + response.tracks.items[0].artists[0].name);
        for (i = 0; response.tracks.items.length; i++) {
            if (response.tracks.items[i].name === process.argv.slice(3)) {
                console.log("Song: " + response.tracks.items[i].name);
                break;
            } else {
                console.log("Song: " + response.tracks.items[0].name);
                break;
            }
        }
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("Preview on Spotify: " + response.tracks.items[0].preview_url);
    });
}

function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            var dataArr = data.split(",");
            liriIt(dataArr[0], dataArr[1]);
        }
    });
}