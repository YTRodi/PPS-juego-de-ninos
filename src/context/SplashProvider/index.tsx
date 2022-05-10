import React, { useCallback, useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { useFadeAnim } from '../../hooks';
import { BASE_FADE_ANIMATION_TIME } from '../../hooks/useFadeAnim';
import AppLogo from '../../components/AppLogo';

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

  const onLoadStart = useCallback(() => fadeAnimation.show(), []);
  const onLoadEnd = useCallback(() => {
    setTimeout(async () => {
      fadeAnimation.hide(({ finished }) => finished && setAppIsReady(true));
    }, BASE_FADE_ANIMATION_TIME);
  }, []);

  useEffect(() => {
    fadeAnimation.show();
  }, []);

  return (
    <View style={styles.container}>
      {appIsReady && children}
      {!isSplashAnimationComplete && (
        <View style={styles.splash}>
          <Animated.Image
            source={require('../../../assets/images/background.png')}
            style={styles.backgroundImage}
          />

          <Animated.View style={fadeAnimation.style}>
            <Headline style={styles.title}>Rodi Yago</Headline>
          </Animated.View>
          <AppLogo
            animated
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}
            styles={fadeAnimation.style}
          />
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
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    opacity: 0.3,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lottieContainer: {
    height: 300,
  },
});

export default SplashProvider;

// TODO:
// OK - #1 Resolver estos comentarios: https://classroom.google.com/c/NDc5ODEwNTEwMTkz/a/NDk5NTk3MDg3NzY3/details
// #2 Luego resolver estos comentarios: https://classroom.google.com/c/NDc5ODEwNTEwMTkz/a/NDk5NTg2MDEzNzgw/details
// #3 Revisar la descripción de esta tarea e implementar: https://classroom.google.com/c/NDc5ODEwNTEwMTkz/a/NDc5ODEwNTEwMjI4/details
// #4 Resolver más comentarios!: https://classroom.google.com/c/NDc5ODEwNTEwMTkz/a/NDc5ODEwNTEwMjI5/details
