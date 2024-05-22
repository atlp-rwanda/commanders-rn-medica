import CallsCard from '@/components/chats/voiceCard';
import { Text, View, Image, TouchableOpacity, Dimensions, Animated, Pressable, Easing } from 'react-native';
import { phone } from '@/assets/icons/phone';
import Svg, { Line, SvgXml } from 'react-native-svg';
import { moreTransparent } from '@/assets/icons/more';
import { back } from '@/assets/icons/userprofile/icons';
import Button from '@/components/buttonModified';
import { useCallback, useEffect, useRef, useState } from 'react';
import { play } from "@/assets/icons/playBtn";
import { download } from '@/assets/icons/download';
import { deleteRed } from '@/assets/icons/delete';
import { router } from 'expo-router';
import { AVPlaybackSource, AVPlaybackStatus, AVPlaybackStatusSuccess, Audio } from "expo-av";
import { Sound } from 'expo-av/build/Audio';

const { width } = Dimensions.get('window');
const WAVEFORM_ELEMENTS_COUNT = 50;
export default function SingleCall() {
    const [hidden, setHidden] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number | any>(1);
    const [sound, setSound] = useState<Sound | null>(null);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const [waveformHeights, setWaveformHeights] = useState<number[]>([]);

    const generateWaveformHeights = () => {
        return Array.from({ length: WAVEFORM_ELEMENTS_COUNT }, () => Math.random() * 50 + 10);
    };
    const handleLoad= async()=>{
        const { sound } = await Audio.Sound.createAsync(require('@/assets/Travis-Mafia.mp3'));
        setSound(sound);
        await sound.loadAsync(require('@/assets/Travis-Mafia.mp3'));
        const status = await sound.getStatusAsync();
        if (status.isLoaded){
            setDuration(status.durationMillis);
        }
    }
    const handlePlay = useCallback(async () => {
        await sound?.setRateAsync(1.0, false);
        await sound?.playAsync();
        setIsPlaying(true);
        setHidden(true);
        sound?.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded) {
                setPosition(status.positionMillis);
                setDuration(status.durationMillis);
            }
        });

    }, [sound]);
    const handlePause = useCallback(async () => {
        await sound?.pauseAsync();
        setIsPlaying(false);
    }, [sound]);

    const handleStop = useCallback(async () => {
        await sound?.stopAsync();
        setHidden(false)
        setIsPlaying(true);
    }, [sound]);
    const handleResume = useCallback(async () => {
        await sound?.playAsync();
        setIsPlaying(true);
    }, [sound]);
    const handleProgress = useCallback(async () => {
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
                setPosition(status.positionMillis);
                setDuration(status.durationMillis);
            }
        }
    }, [sound]);
    const handleSeek = useCallback(async (newPosition: number) => {
        await sound?.setPositionAsync(newPosition);
    }, [sound]);

    const formatTime = (millis: number) => {
        const minutes = Math.floor(millis / 60 / 1000);
        const seconds= Math.round(((millis/60/1000)-minutes)*60);
        return seconds<10? `${minutes} minutes and 0${seconds} seconds`:`${minutes} minutes and ${seconds} seconds`;;
    }
    useEffect(()=>{
        handleLoad();
    },[])
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            handleProgress();
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current as any);
        };
    }, [handleProgress]);

    useEffect(() => {
        if (position && duration) {
            Animated.timing(progressAnim, {
                toValue: (position / duration) * width,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start();
        }
    }, [position, duration]);

    useEffect(() => {
        setWaveformHeights(generateWaveformHeights());
    }, [sound]);

    return (
        <>
            <View className={`${visible ? '' : 'hidden'} absolute w-[100%] right-0 `}>
                <View className="w-[100%]">
                    <View className="w-[50%] relative top-[75px] left-[45%] p-4 pl-2 bg-white rounded-xl">
                        <TouchableOpacity className="flex-row pl-3 gap-2 py-1 pb-2 justify-start">
                            <SvgXml xml={download} />
                            <Text className="font-UrbanistMedium" > Download Audio</Text>
                        </TouchableOpacity>
                        <View className="ml-3 pb-1 border-b-[0.5px] border-grey opacity-40" />
                        <TouchableOpacity className="flex-row pl-3  justify-start gap-2 pt-3" onPress={() => { setVisible(false) }} >
                            <SvgXml xml={deleteRed} stroke={'#F75555'} />
                            <Text className="font-UrbanistMedium text-[#F75555]">Delete Audio</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className='w-1/1 pt-10 mx-4 z-[-1]'>
                <View className='flex-row items-center justify-between mb-4'>
                    <View className='flex-row items-center justify-center'>
                        <SvgXml xml={back} onPress={() => router.back()} />
                        <Text className="text-[24px] font-UrbanistBold px-4"></Text>
                    </View>
                    <View className='flex-row items-center justify-center gap-3 mx-1'>
                        <SvgXml xml={moreTransparent} onPress={() => setVisible(!visible)} />
                    </View>
                </View>

                <CallsCard
                    name='Dr Dustin Bugingo'
                    type='Voice call'
                    date='Today'
                    time='14:00 PM'
                    image={require('@/assets/doctors/doc1.png')}
                    icon={phone}
                />
                <View className='border-[1px] border-[#EEEEEE] my-5' />
                <View>
                    <Text className='font-UrbanistMedium px-3 text-[15px]'>{formatTime(duration)} of voice calls have been recorded.</Text>
                </View>
                {!hidden ?
                    (<View className='py-10'>
                        <Button title='Play Audio Recordings' icon={play} onPress={handlePlay} />
                    </View>) :
                    <View>
                        <View className='flex-row w-[200px] gap-[1px] items-center mt-5 mb-5'>
                            {waveformHeights.map((height, index) => {
                                const barWidth = width * 0.75 / WAVEFORM_ELEMENTS_COUNT;
                                const barProgress = progressAnim.interpolate({
                                    inputRange: [0, (index ) / WAVEFORM_ELEMENTS_COUNT * width],
                                    outputRange: [0, 1],
                                    extrapolate: 'clamp',
                                });
                                const backgroundColor = barProgress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['#E9F0FF','#246BFD']
                                });
                                return (
                                    <Pressable
                                        key={index}
                                        onPress={() => handleSeek((index / WAVEFORM_ELEMENTS_COUNT) * duration)}
                                    >
                                        <Animated.View

                                            style={{
                                                height,
                                                width: barWidth,
                                                borderRadius: 20,
                                                backgroundColor,
                                                // backgroundColor: progressAnim.interpolate({
                                                //     inputRange: [0, width],
                                                //     outputRange: index <= (position / duration) * WAVEFORM_ELEMENTS_COUNT ? ['#246BFD', '#5089FF'] : ['#E9F0FF', '#E9F0FF'],
                                                //     extrapolate: 'clamp',
                                                // }),
                                            }}
                                        />
                                    </Pressable>
                                );
                            })}
                        </View>

                        {/* <Image source={require("@/assets/images/chat/waves.png")} className='w-full' resizeMode='contain' /> */}
                        <View className='flex-row gap-x-2 mr-3'>
                            <View className='w-1/2'>
                                <Button title='Stop' color='reducedblue' textColor='lightblue' onPress={handleStop} />
                            </View>
                            <View className='w-1/2' >
                                <Button title={isPlaying ? 'Pause' : 'Play'} onPress={isPlaying ? handlePause : handleResume} />
                            </View>
                        </View>
                    </View>
                }
            </View>
        </>
    )
};
