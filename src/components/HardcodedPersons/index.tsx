import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import GameBlock from '../GameBlock';
import Separator from '../Separator';

interface Person {
  name: string;
  email: string;
  password: string;
}

interface Props {
  onSelectPerson: (person: Person) => void;
}

const genericPassword = 'Password1';

const HardcodedPersons = ({ onSelectPerson }: Props) => {
  const persons = useMemo<Person[]>(
    () => [
      {
        name: 'Scott',
        email: 'scottR@yopmail.com',
        password: genericPassword,
      },
      {
        name: 'Maggie',
        email: 'maggieR@yopmail.com',
        password: genericPassword,
      },
      {
        name: 'Luna',
        email: 'lunaR@yopmail.com',
        password: genericPassword,
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
          <GameBlock
            key={index}
            text={person.name}
            onPress={() => onSelectPerson(person)}
          />
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HardcodedPersons;
