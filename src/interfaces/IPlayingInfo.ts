export default interface IPlayingInfo {
  isPlaying: boolean;
  item?: {
    name: string;
    artist: string;
  };
}
