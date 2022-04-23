import { useRef } from 'react';
import { Animated } from 'react-native';

interface Props {
  hidden?: boolean;
  duration?: number;
  showDuration?: number;
  hideDuration?: number;
}

export const BASE_FADE_ANIMATION_TIME = 1200;

function useFadeAnim({
  hidden = true,
  duration = BASE_FADE_ANIMATION_TIME,
  showDuration,
  hideDuration,
}: Props = {}) {
  const fadeAnim = useRef(new Animated.Value(hidden ? 0 : 1)).current;

  function show() {
    return Animated.timing(fadeAnim, {
      toValue: 1,
      duration: showDuration || duration,
      useNativeDriver: true,
    }).start();
  }

  function hide() {
    return Animated.timing(fadeAnim, {
      toValue: 0,
      duration: hideDuration || duration,
      useNativeDriver: true,
    }).start();
  }

  return {
    show,
    hide,
    style: {
      opacity: fadeAnim,
    },
  };
}

export default useFadeAnim;
