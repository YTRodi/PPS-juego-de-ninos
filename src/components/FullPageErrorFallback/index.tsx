import { StyleSheet, View } from 'react-native';
import { Caption, Colors, Subheading, Title } from 'react-native-paper';
import IconButton from '../IconButton';

interface Props {
  error: Error | null;
}

function FullPageErrorFallback({ error }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <IconButton
          icon='alert-circle-outline'
          size={50}
          color={Colors.red400}
        />
        <Title>Oh oh... hubo un problema.</Title>
        <Subheading>Intenta recargar la app.</Subheading>
        <Caption style={styles.errorDetail}>{error?.message}</Caption>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorDetail: {
    textAlign: 'center',
  },
});

export default FullPageErrorFallback;
