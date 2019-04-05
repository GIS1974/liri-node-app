#L.I.R.I

##Overview
LIRI stans for Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.
LIRI searches for songs using Spotify API, for concerts using Bands in Town API and for movies using OMDB API.
It uses the following NPM packages: axios, chalk, dotenv, moment and node-spotify-api.

##How it works
LIRI uses these commands to retrieve data from APIs:
 1. 'concert-this' <artist/band name> -- search the Bands in Town API and render the following information about each event to the terminal:
* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")
Example of using concerts search command:
![Liri-concerts](/assets/images/liri-concerts.PNG)


 2. 'spotify-this-song' <song (and artist) name>
 3. 'movie-this' <movie name>
 4. 'do-what-it-says'




