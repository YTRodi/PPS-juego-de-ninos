import { Animated, Image } from 'react-native';
import Constants from 'expo-constants';
const sourceIcon = require('../../../assets/images/icon.png');

interface Props {
  animated?: boolean;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  styles?: any;
}

function AppLogo({ animated = false, ...rest }: Props) {
  if (animated) {
    return (
      <Animated.Image
        source={sourceIcon}
        fadeDuration={0}
        style={{
          width: 100,
          height: 100,
          resizeMode: Constants?.manifest?.splash?.resizeMode || 'contain',
          ...rest.styles,
        }}
        {...rest}
      />
    );
  }

  return (
    <Image
      source={sourceIcon}
      style={{ width: 80, height: 80, ...rest.styles }}
    />
  );
}

export default AppLogo;
