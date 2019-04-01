var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
const moment = require('moment');

// var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
// var fs = require('fs');
var request = process.argv.slice(3).join("+");



// Search for concerts using Axios and Bands in Town API
if (command === 'concert-this') {
    console.log(request);
    bandInTownSearch();
}

// Search for the movie information using Axios and OMDB API
if (command === 'movie-this') {
    if (request === "") {
        omdbSearch("Mr. Nobody");
    } else {
        omdbSearch(request);
    }
}

function omdbSearch(request) {
    axios.get("http://www.omdbapi.com/?t=" + request + "&y=&plot=short&apikey=6564191").then(
        function (response) {
            console.log("Title of the movie: " + response.data.Title);//+
            console.log("Year the movie came out: " + response.data.Year);//+
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);//+
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);//+
            console.log("Country where the movie was produced: " + response.data.Country);//+
            console.log("Language of the movie: " + response.data.Language);//+
            console.log("Plot of the movie: " + response.data.Plot);//+
            // console.log("\r\n");
            console.log("Actors in the movie: " + response.data.Actors);//+
        }
    );
}

function bandInTownSearch() {
    axios.get("https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp").then(
        function (response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("Name of the venue: " + response.data[i].venue.name);
                console.log("Venue location: " + response.data[i].venue.country + " " +
                    response.data[i].venue.region + " " + response.data[i].venue.city);
                const date = moment(response.data[i].datetime).format("MM-DD-YYYY");
                console.log("Date of the Event: " + date);
            }
        }
    )
}