const env = Deno.env.toObject();
// https://developer.spotify.com/console/get-user-player/?market=&additional_types=
export const SPOTIFY_OATH_TOKEN = env.SPOTIFY_OATH_TOKEN || "";
export const APP_PORT = env.APP_PORT || 4000;
export const DB_PATH = env.DB_PATH || "./db/users.json";

export const twitterKeys = {
  consumerApiKey: env.consumerApiKey,
  consumerApiSecret: env.consumerApiSecret,
  accessToken: env.accessToken,
  accessTokenSecret: env.accessTokenSecret,
};
