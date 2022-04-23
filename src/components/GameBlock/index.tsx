import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import { blockColors as bc } from '../../styles';

interface Props {
  text: string;
  colors?: string[];
}

const GameBlock = ({ text, colors = [] }: Props) => {
  const blockColors = useMemo(
    () => [...bc, ...colors, '#D31F20', '#F0D22E'],
    []
  );
  const random = Math.random() * blockColors.length;
  const randomIndex = Math.floor(random);
  const randomColor = useMemo(() => blockColors[randomIndex], []);

  return (
    <View style={{ ...styles.container, borderColor: randomColor }}>
      <Headline style={{ ...styles.text, color: randomColor }}>{text}</Headline>
    </View>
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
