import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import GameBlock from '../GameBlock';
import Separator from '../Separator';

interface Person {
  // id: number;
  name: string;
  email: string;
  password: string;
  // role: string;
  // gender: string;
}

interface Props {
  onSelectPerson: (person: Person) => void;
}

const HardcodedPersons = ({ onSelectPerson }: Props) => {
  const persons = useMemo<Person[]>(
    () => [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: '111111',
      },
      {
        name: 'Invitado',
        email: 'invitado@invitado.com',
        password: '222222',
      },
      {
        name: 'Usuario',
        email: 'usuario@usuario.com',
        password: '333333',
      },
      {
        name: 'Anonimo',
        email: 'anonimo@anonimo.com',
        password: '444444',
      },
      {
        name: 'Tester',
        email: 'tester@tester.com',
        password: '555555',
      },
    ],
    []
  );

  return (
    <View>
      <View style={styles.textContainer}>
        <Separator />
        <Paragraph style={styles.text}>inicia sesión como</Paragraph>
        <Separator />
      </View>

      <View style={styles.buttonContainer}>
        {persons.map((person, index) => (
          <View key={index} style={{ marginBottom: 8, marginHorizontal: 8 }}>
            <GameBlock
              text={person.name}
              onPress={() => onSelectPerson(person)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    marginHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});

export default HardcodedPersons;
