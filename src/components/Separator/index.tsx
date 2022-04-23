import { StyleSheet, View } from 'react-native';

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 0.45,
    borderWidth: 0.45,
  },
});

export default Separator;
