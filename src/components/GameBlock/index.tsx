import { useMemo } from 'react';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { blockColors as bc } from '../../styles';
import Touchable from '../Touchable';

interface Props {
  text: string;
  colors?: string[];
  onPress?: (event: GestureResponderEvent) => void;
}

const GameBlock = ({ text, colors = [], onPress }: Props) => {
  const blockColors = useMemo(
    () => [...bc, ...colors, '#D31F20', '#F0D22E'],
    []
  );
  const random = Math.random() * blockColors.length;
  const randomIndex = Math.floor(random);
  const randomColor = useMemo(() => blockColors[randomIndex], []);

  return (
    <Touchable onPress={onPress}>
      <View style={{ ...styles.container, borderColor: randomColor }}>
        <Headline style={{ ...styles.text, color: randomColor }}>
          {text}
        </Headline>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    paddingHorizontal: 8,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default GameBlock;
