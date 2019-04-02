var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var chalk = require('chalk');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
// var fs = require('fs');
var request = process.argv.slice(3).join("+");

// Search for concerts using Axios and Bands in Town API
if (command === 'concert-this') {
    if (request === "") {
        console.log(chalk.red('Enter artist/band name'));
    } else {
        bandInTownSearch();
    }
} else

    // Search for the movie information using Axios and OMDB API
    if (command === 'movie-this') {
        if (request === "") {
            omdbSearch("Mr. Nobody");
        } else {
            omdbSearch(request);
        }
    } else

        // Search for songs information using Spotify API
        if (command === 'spotify-this-song') {
            if (request === "") {
                spotifySearch("The Sign Ace of Base");
            } else {
                spotifySearch(request);
            }
        } else {
            console.log(chalk.inverse.cyan("To use LIRI type one of these commands:"));
            console.log(chalk.inverse.cyan("\r 'concert-this' <artist/band name>"));
            console.log(chalk.inverse.cyan("\r 'spotify-this-song' <song (and artist) name>"));
            console.log(chalk.inverse.cyan("\r 'movie-this' <movie name>"));
        }

function omdbSearch(request) {
    axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=6564191").then(
        function (response) {
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Year);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);
        }
    );
}

function bandInTownSearch() {
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(
        function (response) {
            console.log("\r\n");
            console.log(chalk.inverse.bold('Upcoming ' + response.data[0].lineup[0] + ' concerts:'));
            for (i = 0; i < response.data.length; i++) {
                console.log("Name of the venue: " + response.data[i].venue.name);
                console.log("Venue location: " + response.data[i].venue.country + " " +
                    response.data[i].venue.region + " " + response.data[i].venue.city);
                var date = moment(response.data[i].datetime).format("MM-DD-YYYY");
                console.log("Date of the Event: " + date);
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