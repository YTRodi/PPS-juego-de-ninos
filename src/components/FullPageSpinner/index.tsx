import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

interface Props {
  title?: string;
  color?: keyof typeof Colors;
}

function FullPageSpinner({ title, color }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' animating color={color} />
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 16,
  },
});

export default FullPageSpinner;
