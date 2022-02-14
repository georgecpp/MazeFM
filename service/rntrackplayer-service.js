import TrackPlayer from "react-native-track-player";

const trackStructure = {
    id: 69420,
    url: 'http://3.69.41.7:8000/stream',
    title: 'Maze.fm'
}

module.exports = async function () {
    TrackPlayer.addEventListener('remote-play', () => 
    TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => 
    TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => {
        TrackPlayer.stop();
    });

    // TrackPlayer.addEventListener('playback-metadata-received', async e => {
    //     const currentTrack = await TrackPlayer.getCurrentTrack();
    //     TrackPlayer.updateMetadataForTrack(currentTrack, {
    //         title: e.title,
    //         artist: e.artist
    //     });
    // });
};