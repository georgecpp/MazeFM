import axios from "axios";
import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import TrackPlayer, {Capability, State, usePlaybackState} from "react-native-track-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import TextTicker from "react-native-text-ticker";


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


const MusicPlayer = () => {

    const playbackState = usePlaybackState();

    const [myArtist, setMyArtist] = useState("Artist");
    const [myTitle, setMyTitle] = useState("Title");
    const [myAlbumLogo, setMyAlbumLogo] = useState(null);

    const onTrackChanged = async (newTrack) => {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        TrackPlayer.updateMetadataForTrack(currentTrack, {
            title: newTrack.title,
            artist: newTrack.artist
        });
        setMyArtist(newTrack.artist);
        setMyTitle(newTrack.title);
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

    useEffect(() => {
        TrackPlayer.addEventListener('playback-metadata-received', onTrackChanged);
        return() => {
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        setUpTrackPlayer().then(() => {
            if(!isMounted) {
                return;
            }
            setMyArtist("Artist");
            setMyTitle("Title");
        });
        
        return () => {
            isMounted = false;
            TrackPlayer.destroy();
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        axios.get(`${baseUrl}/dashboard/search-album-for-track?track=${myTitle}&artist=${myArtist}`)
        .then((response) => {
            if(!isMounted) {
                return;
            }
            if(response.status === 200) {
                const url = response.data.url;
                setMyAlbumLogo(url);
            }
        }, (err) => {
            setMyAlbumLogo(null);
            return;
        })           
        return () => {
            isMounted = false;
        }
    }, [myTitle, myArtist]);

    return (
        <View style={styles.bottomContainer}>
            <View style= {styles.musicControls}>
                <Image style={{width:64, height: 64, resizeMode:"contain"}}  source={{uri: myAlbumLogo != null ? myAlbumLogo : 'https://cdn-icons-png.flaticon.com/512/6119/6119310.png'}} />
                <View style={{marginTop: 15, alignItems: "center", width: 150}}>
                    <TextTicker shouldAnimateTreshold={10} duration={3000} marqueeOnMount={true} loop marqueeDelay={1000} style={styles.title}>{myTitle}</TextTicker>
                    <TextTicker shouldAnimateTreshold={10} duration={3000} marqueeOnMount={true} loop marqueeDelay={1000} style={styles.artist}>{myArtist}</TextTicker>
                </View>
                <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                    <Ionicons name={playbackState === State.Playing ?  "ios-pause-circle" : "ios-play-circle"} size={64} color="#FFD369" />
                </TouchableOpacity>
            </View>
        </View>   
    );
};

export default MusicPlayer;


const styles = StyleSheet.create({
    bottomContainer: {
        position: 'relative',
        bottom: 0,
        elevation: 0,
        backgroundColor: '#121821',
        borderTopColor: 'white',
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
        paddingBottom: 10,
        paddingLeft: 25,
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width: '80%'
    },
    title: {
        fontSize: 16,
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
        width: "100%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 15
    }
});