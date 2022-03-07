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
    const [myAlbumLogo, setMyAlbumLogo] = useState('../assets/images/Ruby_On_Rails_Logo.svg.png');

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
            setMyAlbumLogo('../assets/images/Ruby_On_Rails_Logo.svg.png');
            return;
        })           
        return () => {
            isMounted = false;
        }
    }, [myTitle, myArtist]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
            </View>
            <View style={styles.bottomContainer}>
                <View style= {styles.musicControls}>
                    <Image style={{width:64, height: 64, resizeMode:"contain"}}  source={{uri: myAlbumLogo}} />
                    <View style={{marginTop: 15, alignItems: "center"}}>
                        {/* <Text style={styles.title} numberOfLines={1} changeFontSizeToFit={true}>{myTitle}</Text>
                        <Text style={styles.artist} numberOfLines={1} changeFontSizeToFit={true}>{myArtist}</Text> */}
                        <TextTicker shouldAnimateTreshold={10} duration={3000} marqueeOnMount={true} loop marqueeDelay={1000} style={styles.title}>{myTitle}</TextTicker>
                        <TextTicker shouldAnimateTreshold={10} duration={3000} marqueeOnMount={true} loop marqueeDelay={1000} style={styles.artist}>{myArtist}</TextTicker>
                    </View>
                    <TouchableOpacity onPress={() => togglePlayback(playbackState)}>
                        <Ionicons name={playbackState === State.Playing ?  "ios-pause-circle" : "ios-play-circle"} size={64} color="#FFD369" />
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