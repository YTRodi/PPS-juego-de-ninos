import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import AnimatedLottieView from 'lottie-react-native';
import Constants from 'expo-constants';
import { useFadeAnim } from '../../hooks';
import { BASE_FADE_ANIMATION_TIME } from '../../hooks/useFadeAnim';
import lottieSource from '../../../assets/lottie/lottie-video-game-console.json';

const defaultBackgroundColor = '#ffffff';

function SplashProvider({ children }: { children: React.ReactNode }) {
  const fadeAnimation = useFadeAnim();
  const [appIsReady, setAppIsReady] = useState(false);
  const [isSplashAnimationComplete, setIsSplashAnimationComplete] =
    useState(false);

  useEffect(() => {
    if (appIsReady) {
      setIsSplashAnimationComplete(true);
    }
  }, [appIsReady]);

  useEffect(() => {
    fadeAnimation.show();
  }, []);

  return (
    <View style={styles.container}>
      {appIsReady && children}
      {!isSplashAnimationComplete && (
        <View style={styles.splash}>
          <Animated.View style={fadeAnimation.style}>
            <Headline style={styles.title}>Rodi Yago</Headline>
          </Animated.View>
          <View style={styles.lottieContainer}>
            <AnimatedLottieView
              source={lottieSource}
              autoPlay
              loop={false}
              onAnimationFinish={() => {
                fadeAnimation.hide();
                setTimeout(() => {
                  setAppIsReady(true);
                }, BASE_FADE_ANIMATION_TIME);
              }}
            />
          </View>
          <Animated.View style={fadeAnimation.style}>
            <Headline style={styles.title}>División 4B</Headline>
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splash: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor:
      Constants.manifest?.splash?.backgroundColor || defaultBackgroundColor,
  },
  title: {
    textAlign: 'center',
  },
  lottieContainer: {
    height: 300,
  },
});

export default SplashProvider;
