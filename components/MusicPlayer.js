import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import TrackPlayer, {Capability, State, usePlaybackState} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";

const {width, height} = Dimensions.get('window');

TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [Capability.Play, Capability.Stop],
    compactCapabilities: [Capability.Play, Capability.Stop]
});

const trackStructure = {
    id: 69420,
    url: 'http://3.69.41.7:8000/stream',
    title: 'Maze.fm'
}

const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(trackStructure);
    }
    catch(e) {
      console.log(e);
    }
}

const togglePlayback = async(playbackState) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if(playbackState === State.Playing) {
        await TrackPlayer.stop();
        if(currentTrack === null || currentTrack === undefined) {
            await TrackPlayer.reset();
            await TrackPlayer.add(trackStructure);
        }
    }
    else {
        await TrackPlayer.play();
    }
    
}

const MusicPlayer = () => {

    const playbackState = usePlaybackState();

    const [myArtist, setMyArtist] = useState("Artist");
    const [myTitle, setMyTitle] = useState("Title");

    useEffect(() => {
        let isMounted = true;
        setUpTrackPlayer().then(() => {
            if(isMounted) {
                setMyArtist("Artist");
                setMyTitle("Title");
                TrackPlayer.addEventListener('playback-metadata-received', async e => {
                    const currentTrack = await TrackPlayer.getCurrentTrack();
                    TrackPlayer.updateMetadataForTrack(currentTrack, {
                        title: e.title,
                        artist: e.artist
                    });
            
                    setMyArtist(e.artist);
                    setMyTitle(e.title);
                });
            }
        });
        return () => {
            isMounted = false;
            TrackPlayer.destroy();
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
            </View>
            <View style={styles.bottomContainer}>
                 <View style= {styles.musicControls}>
                    <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                        <Ionicons name={playbackState === State.Playing ?  "ios-pause-circle" : "ios-play-circle"} size={75} color="#FFD369" />
                    </TouchableOpacity>
                    <View style={{marginTop: 15, alignItems: "center"}}>
                        <Text style={styles.title} numberOfLines={1} changeFontSizeToFit={true}>{myTitle}</Text>
                        <Text style={styles.artist}>{myArtist}</Text>
                    </View>
                </View>
            </View>   
        </SafeAreaView>
    );
};

export default MusicPlayer;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831'
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        borderTopColor: 'white',
        borderTopWidth: 1,
        width: width,
        alignItems: 'flex-start',
        paddingBottom: 10,
        paddingLeft: 25,
        backgroundColor: '#121821'
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width: '80%'
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: 'center',
        color: '#EEEEEE',
    },
    artist: {
        fontSize: 16,
        fontWeight: "200",
        textAlign: 'center',
        color: '#EEEEEE'
    },
    musicControls: {
        flexDirection: "row", 
        width: "60%",
        justifyContent: 'space-between',
        marginTop: 15
    }
});