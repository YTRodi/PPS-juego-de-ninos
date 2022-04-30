import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Audio } from 'expo-av';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { LanguagesEnum, ThemeEnum } from './enums';
import { useAsync } from '../../hooks';
import { useAuth } from '../../context/AuthProvider';
import { FullPageSpinner } from '../../components';
import { mapAuthError } from '../../helpers';

const activeOpacity = 0.3;

function Home() {
  const { top } = useSafeAreaInsets();
  const [language, setLanguage] = useState<LanguagesEnum>(LanguagesEnum.ES);
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.COLORS);

  const { logout } = useAuth();
  const { isLoading, isError, error, run } = useAsync();
  const toast = useToast();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isError) {
    const errorMessage = mapAuthError(error);
    toast.show(errorMessage, { type: 'danger' });
  }

  const signOut = () => run(new Promise(() => setTimeout(logout, 2000)));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: 16,
        marginHorizontal: 8,
      }}
    >
      <Languages
        language={language}
        setLanguage={setLanguage}
        onLogout={signOut}
      />

      <MainSquare theme={theme} language={language} />
      <ThemeButtons setTheme={setTheme} />
    </SafeAreaView>
  );
}

interface LanguagesProps {
  language: LanguagesEnum;
  setLanguage: React.Dispatch<React.SetStateAction<LanguagesEnum>>;
  onLogout: () => void;
}

function Languages({ language, setLanguage, onLogout }: LanguagesProps) {
  const containerStyles: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const textStyles = {
    fontSize: 40,
    borderColor: 'white',
    marginRight: 8,
  };

  const mappedLanguages = {
    [LanguagesEnum.ES]: 'Español',
    [LanguagesEnum.EN]: 'Inglés',
    [LanguagesEnum.PR]: 'Portugués',
  }[language];

  return (
    <View style={containerStyles}>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {mappedLanguages}
        </Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => setLanguage(LanguagesEnum.ES)}
        >
          <Text style={textStyles}>🇪🇸</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => setLanguage(LanguagesEnum.EN)}
        >
          <Text style={textStyles}>🇬🇧</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => setLanguage(LanguagesEnum.PR)}
        >
          <Text style={textStyles}>🇵🇹</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginRight: 8 }}>
        <TouchableOpacity activeOpacity={activeOpacity} onPress={onLogout}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'blue' }}>
            Salir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface MainSquareProps {
  theme: ThemeEnum;
  language: LanguagesEnum;
}

function MainSquare({ theme, language }: MainSquareProps) {
  const [sound, setSound] = useState<Audio.Sound | null>();

  const colors = [
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/COLORS/ES-red.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/COLORS/EN-red.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/COLORS/PR-red.m4a'),
      }[language],
      image: require('../../../assets/colors/red.webp'),
      name: {
        [LanguagesEnum.ES]: 'Rojo',
        [LanguagesEnum.EN]: 'Red',
        [LanguagesEnum.PR]: 'Vermelho',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/COLORS/ES-blue.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/COLORS/EN-blue.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/COLORS/PR-blue.m4a'),
      }[language],
      image: require('../../../assets/colors/blue.jpeg'),
      name: {
        [LanguagesEnum.ES]: 'Azul',
        [LanguagesEnum.EN]: 'Blue',
        [LanguagesEnum.PR]: 'Azul',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/COLORS/ES-green.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/COLORS/EN-green.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/COLORS/PR-green.m4a'),
      }[language],
      image: require('../../../assets/colors/green.webp'),
      name: {
        [LanguagesEnum.ES]: 'Verde',
        [LanguagesEnum.EN]: 'Green',
        [LanguagesEnum.PR]: 'Verde',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/COLORS/ES-pink.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/COLORS/EN-pink.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/COLORS/PR-pink.m4a'),
      }[language],
      image: require('../../../assets/colors/pink.webp'),
      name: {
        [LanguagesEnum.ES]: 'Rosa',
        [LanguagesEnum.EN]: 'Pink',
        [LanguagesEnum.PR]: 'Rosa',
      }[language],
    },
  ];

  const numbers = [
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/NUMBERS/ES-one.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/NUMBERS/EN-one.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/NUMBERS/PR-one.m4a'),
      }[language],
      image: require('../../../assets/numbers/one.png'),
      name: {
        [LanguagesEnum.ES]: 'Uno',
        [LanguagesEnum.EN]: 'One',
        [LanguagesEnum.PR]: 'Um',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/NUMBERS/ES-two.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/NUMBERS/EN-two.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/NUMBERS/PR-two.m4a'),
      }[language],
      image: require('../../../assets/numbers/two.png'),
      name: {
        [LanguagesEnum.ES]: 'Dos',
        [LanguagesEnum.EN]: 'Two',
        [LanguagesEnum.PR]: 'Três',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/NUMBERS/ES-three.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/NUMBERS/EN-three.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/NUMBERS/PR-three.m4a'),
      }[language],
      image: require('../../../assets/numbers/three.png'),
      name: {
        [LanguagesEnum.ES]: 'Tres',
        [LanguagesEnum.EN]: 'Three',
        [LanguagesEnum.PR]: 'Três',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/NUMBERS/ES-four.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/NUMBERS/EN-four.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/NUMBERS/PR-four.m4a'),
      }[language],
      image: require('../../../assets/numbers/four.png'),
      name: {
        [LanguagesEnum.ES]: 'Cuatro',
        [LanguagesEnum.EN]: 'Four',
        [LanguagesEnum.PR]: 'Quatro',
      }[language],
    },
  ];

  const animals = [
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/ANIMALS/ES-dog.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/ANIMALS/EN-dog.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/ANIMALS/PR-dog.m4a'),
      }[language],
      image: require('../../../assets/animals/dog.jpeg'),
      name: {
        [LanguagesEnum.ES]: 'Perro',
        [LanguagesEnum.EN]: 'Dog',
        [LanguagesEnum.PR]: 'O cão',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/ANIMALS/ES-cat.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/ANIMALS/EN-cat.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/ANIMALS/PR-cat.m4a'),
      }[language],
      image: require('../../../assets/animals/cat.jpeg'),
      name: {
        [LanguagesEnum.ES]: 'Gato',
        [LanguagesEnum.EN]: 'Cat',
        [LanguagesEnum.PR]: 'Gato',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/ANIMALS/ES-lion.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/ANIMALS/EN-lion.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/ANIMALS/PR-lion.m4a'),
      }[language],
      image: require('../../../assets/animals/lion.jpeg'),
      name: {
        [LanguagesEnum.ES]: 'León',
        [LanguagesEnum.EN]: 'Lion',
        [LanguagesEnum.PR]: 'Leão',
      }[language],
    },
    {
      sound: {
        [LanguagesEnum.ES]: require('../../../assets/audio/ANIMALS/ES-dinosaur.m4a'),
        [LanguagesEnum.EN]: require('../../../assets/audio/ANIMALS/EN-dinosaur.m4a'),
        [LanguagesEnum.PR]: require('../../../assets/audio/ANIMALS/PR-dinosaur.m4a'),
      }[language],
      image: require('../../../assets/animals/dinosaur.jpeg'),
      name: {
        [LanguagesEnum.ES]: 'Dinosaurio',
        [LanguagesEnum.EN]: 'Dinosaur',
        [LanguagesEnum.PR]: 'Dinossauro',
      }[language],
    },
  ];

  const wrapperStyles = {
    flex: 1,
    height: Dimensions.get('window').width / 2.5,
  };

  const boxStyle: StyleProp<ViewStyle> = {
    flex: 1,
    borderWidth: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={{ marginTop: 16 }}>
      <FlatList
        data={
          {
            [ThemeEnum.COLORS]: colors,
            [ThemeEnum.NUMBERS]: numbers,
            [ThemeEnum.ANIMALS]: animals,
          }[theme]
        }
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View key={index} style={wrapperStyles}>
              <TouchableOpacity
                activeOpacity={activeOpacity}
                style={boxStyle}
                onPress={async () => {
                  Audio.Sound.createAsync(item.sound).then(
                    async ({ sound }) => {
                      setSound(sound);
                      await sound.playAsync();
                    },
                    console.error
                  );
                }}
              >
                <Image
                  source={item.image}
                  resizeMode='stretch'
                  style={{ height: '84%', width: '100%' }}
                />
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

interface ThemeButtonsProps {
  setTheme: React.Dispatch<React.SetStateAction<ThemeEnum>>;
}

function ThemeButtons({ setTheme }: ThemeButtonsProps) {
  const themes = [
    { image: require('../../../assets/colors.jpg'), kind: ThemeEnum.COLORS },
    { image: require('../../../assets/numbers.jpg'), kind: ThemeEnum.NUMBERS },
    { image: require('../../../assets/animals.jpg'), kind: ThemeEnum.ANIMALS },
  ];

  return (
    <View style={{ flex: 1, marginTop: 16 }}>
      {themes.map((theme, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={activeOpacity}
            onPress={() => setTheme(theme.kind)}
            style={{ flex: 1, marginBottom: index !== 2 ? 8 : 0 }}
          >
            <Image
              source={theme.image}
              style={{ height: '100%', width: '100%' }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default Home;
