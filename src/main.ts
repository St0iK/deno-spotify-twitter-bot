import { TwitterApi } from "https://deno.land/x/deno_twitter_api@v1.1.0/mod.ts";
import { log } from "./log.ts";
import { SPOTIFY_OATH_TOKEN, twitterKeys } from "../config.ts";
import IPlayingInfo from "./interfaces/IPlayingInfo.ts";

const main = async () => {
  log.info("Starting Spotify Twitter App");

  let currentPlayingInfo: IPlayingInfo = { isPlaying: false };

  setInterval(async () => {
    const playingInfo = await getCurrentSong(
      "https://api.spotify.com/v1/me/player",
      SPOTIFY_OATH_TOKEN,
    );

    console.log({ playingInfo });

    if (
      playingInfo.isPlaying &&
      playingInfo.item?.name !== currentPlayingInfo.item?.name
    ) {
      log.info("Playing a different song");
      // set current playing info
      currentPlayingInfo = playingInfo;


      let twitterApi = new TwitterApi(twitterKeys);
      // send a tweet with the currently playing song
      let postResult = await twitterApi.post("statuses/update.json", {
        status: `🎵 Currently playing: ${playingInfo.item.name} from ${playingInfo.item.artist}. Check it out: ${playingInfo.item.url}`
      });
    }
  }, 1000);
};

/**
 * Get the current playing information from Spotify
 * @param url 
 */
const getCurrentSong = async (
  url: string,
  token: string,
): Promise<IPlayingInfo> => {
  try {
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const { is_playing: isPlaying, item } = await res.json();
    return {
      isPlaying: isPlaying,
      item: {
        name: item.name,
        artist: item.artists[0].name,
        url: item.external_urls.spotify,
      },
    };
  } catch (e) {
    log.error(e);
    log.info("No songs playing at the moment");
    return {
      isPlaying: false,
    };
  }
};

export default main;
