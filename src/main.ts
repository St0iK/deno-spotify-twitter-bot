import { log } from "./log.ts";

const main = () => {
  log.info("Starting your Spotify Twitter App");

  // curl -X "GET" "https://api.spotify.com/v1/me/player" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer ------"
  // Get current playing song every x seconds, and store it
  // is it different?
  // send a tweet with the currently playing song
};

export default main;
