import axios from "axios";
import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import TrackPlayer, {Capability, State, usePlaybackState} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";


const {width, height} = Dimensions.get('window');
const baseUrl = 'https://mazefm-backend.herokuapp.com';

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
    var myAlbumLogo = '../assets/images/Ruby_On_Rails_Logo.svg.png';

    const [myArtist, setMyArtist] = useState("Artist");
    const [myTitle, setMyTitle] = useState("Title");

    const onTrackChanged = async (newTrack) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        TrackPlayer.updateMetadataForTrack(currentTrack, {
            title: newTrack.title,
            artist: newTrack.artist
        });
        setMyArtist(newTrack.artist);
        setMyTitle(newTrack.title);

        // const albumResponse = await axios.get(`${baseUrl}/dashboard/search-album-for-track?track=${myTitle}&artist=${myArtist}`);   
        //     if(albumResponse.status === 200) {
        //         myAlbumLogo = albumResponse.data.url;
        //         console.log(myAlbumLogo);
        //     }
        //     else {
        //         myAlbumLogo = '../assets/images/Ruby_On_Rails_Logo.svg.png';
        //     }
    }

    useEffect(() => {
        let isMounted = true;
        setUpTrackPlayer().then(() => {
            if(!isMounted) {
                return;
            }
            setMyArtist("Artist");
            setMyTitle("Title");
        });
        TrackPlayer.addEventListener('playback-metadata-received', onTrackChanged);
        
        return () => {
            isMounted = false;
            // removeEventListener('playback-metadata-received',onTrackChanged);
            TrackPlayer.destroy();
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
            </View>
            <View style={styles.bottomContainer}>
                <View style= {styles.musicControls}>
                    <Image style={{width:64, height: 64, resizeMode:"contain"}}  source={{uri: myAlbumLogo}} />
                    <View style={{marginTop: 15, alignItems: "center"}}>
                        <Text style={styles.title} numberOfLines={1} changeFontSizeToFit={true}>{myTitle}</Text>
                        <Text style={styles.artist}>{myArtist}</Text>
                    </View>
                    <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                        <Ionicons name={playbackState === State.Playing ?  "ios-pause-circle" : "ios-play-circle"} size={75} color="#FFD369" />
                    </TouchableOpacity>
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
        width: "80%",
        justifyContent: 'space-between',
        marginTop: 15
    }
});