import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

interface Props {
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const Touchable: React.FC<Props> = ({
  disabled,
  onPress,
  style = {},
  children,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.3}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Touchable;
