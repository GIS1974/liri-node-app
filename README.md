# L.I.R.I

## Overview
LIRI stands for Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.
LIRI searches for songs using Spotify API, for concerts using Bands in Town API and for movies using OMDB API.
It uses the following NPM packages: axios, chalk, dotenv, moment and node-spotify-api.

## How it works
LIRI uses these commands to retrieve data from APIs:
 1. **'concert-this' <artist/band name>** -- search the Bands in Town API and render the following information about each event to the terminal:
* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")

![Liri-concerts](/assets/images/liri-concerts.PNG)
*<p align="center">Example of using concerts search command</p>*

 2. **'spotify-this-song' <song (and artist) name>** -- search the Spotify API and render the following information about the song to the terminal:
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

![Liri-song](/assets/images/liri-song.PNG)
*<p align="center">Example of using song search command</p>*

 3. **'movie-this' <movie name>** -- search the OMDB API and render the following information about the movie to the terminal:
* Title of the movie
* Year the movie came out
* IMDB Rating of the movie
* Rotten Tomatoes Rating of the movie
* Country where the movie was produced
* Language of the movie
* Plot of the movie
* Actors in the movie

![Liri-movie](/assets/images/liri-movie.PNG)
*<p align="center">Example of using movie search command</p>*

 4. **'do-what-it-says'** -- LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands:

 ![Liri-diit](/assets/images/liri-doit.PNG)
*<p align="center">Example of using 'do-what-it-says' command</p>*

If no command provided user sees the following message:
 ![Liri-1](/assets/images/liri-1.PNG)