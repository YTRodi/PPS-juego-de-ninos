import { StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';

interface Props {
  text: string;
  color: string;
}

const GameBlock = ({ text, color }: Props) => {
  return (
    <View style={{ ...styles.container, borderColor: color }}>
      <Headline style={{ ...styles.text, color: color }}>{text}</Headline>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    marginRight: 4,
    paddingHorizontal: 8,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default GameBlock;
