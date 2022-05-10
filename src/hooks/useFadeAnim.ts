import { useRef } from 'react';
import { Animated } from 'react-native';

interface Props {
  hidden?: boolean;
  duration?: number;
  showDuration?: number;
  hideDuration?: number;
}

export const BASE_FADE_ANIMATION_TIME = 1200;

function useFadeAnimation({
  hidden = true,
  duration = BASE_FADE_ANIMATION_TIME,
  showDuration,
  hideDuration,
}: Props = {}) {
  const fadeAnimation = useRef(new Animated.Value(hidden ? 0 : 1)).current;

  function show(endCallback?: Animated.EndCallback) {
    return Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: showDuration || duration,
      useNativeDriver: true,
    }).start(endCallback);
  }

  function hide(endCallback?: Animated.EndCallback) {
    return Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: hideDuration || duration,
      useNativeDriver: true,
    }).start(endCallback);
  }

  return {
    show,
    hide,
    style: {
      opacity: fadeAnimation,
    },
  };
}

export default useFadeAnimation;
