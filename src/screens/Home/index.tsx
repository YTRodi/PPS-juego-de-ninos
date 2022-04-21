import { ScrollView, View, StyleSheet } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { FullPageSpinner } from '../../components';
import { useAsync } from '../../hooks';
import { useAuth } from '../../context/AuthProvider';
import { mapAuthError } from '../../helpers';

function Home() {
  const { bottom } = useSafeAreaInsets();
  const { user, logout } = useAuth();
  const { isLoading, isError, error, run } = useAsync();
  const toast = useToast();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    const errorMessage = mapAuthError(error);
    toast.show(errorMessage, { type: 'danger' });
  }

  return (
    <ScrollView style={{ paddingBottom: bottom }}>
      <View style={styles.container}>
        <Title>Información del usuario:</Title>
        <Paragraph>{JSON.stringify(user, null, 2)}</Paragraph>
        <Button
          mode='contained'
          onPress={() => run(logout())}
          disabled={isLoading}
          loading={isLoading}
        >
          Salir
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
});

export default Home;
