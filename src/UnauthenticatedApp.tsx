import { useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Paragraph, Caption } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './context/AuthProvider';
import { useAsync, useToggle } from './hooks';
import { GameBlock, HardcodedPersons } from './components';
import { mapAuthError } from './helpers';
import { theme } from './styles';

const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 dígitos')
    .required('La contraseña es obligatoria'),
});

const initialValues = { email: '', password: '' };
const errorColor = theme.colors.error;
const focusColor = theme.colors.primary;
const noFocusColor = theme.colors.placeholder;

function UnauthenticatedApp() {
  const { login, register } = useAuth();
  const { isLoading, isError, error, run } = useAsync();
  const toast = useToast();
  const [isLoginScreen, setIsLoginScreen] = useToggle(true);
  const [hidePassword, toggleHidePassword] = useToggle(true);
  const {
    values: formValues,
    errors: formErrors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValidating,
    isValid,
    resetForm,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: AuthSchema,
    onSubmit: formValues =>
      isLoginScreen ? run(login(formValues)) : run(register(formValues)),
  });

  useEffect(() => {
    if (isError) {
      const errorMessage = mapAuthError(error);
      toast.show(errorMessage, { type: 'danger' });
    }
  }, [isError, error]);

  const label = useMemo(
    () => (isLoginScreen ? 'LOGIN' : 'REGISTRO'),
    [isLoginScreen]
  );

  const getInputEmailIconColor = useCallback(
    (isFocused: boolean) => getInputIconColor('email', isFocused),
    [formErrors, touched]
  );

  const getInputPasswordIconColor = useCallback(
    (isFocused: boolean) => getInputIconColor('password', isFocused),
    [formErrors, touched]
  );

  const getInputIconColor = useCallback(
    (field: keyof typeof initialValues, isFocused: boolean) => {
      return formErrors[field] && touched[field]
        ? errorColor
        : isFocused
        ? focusColor
        : noFocusColor;
    },
    [formErrors, touched]
  );

  const renderHeader = useCallback(() => {
    const splittedLabel = label.split('');
    return splittedLabel.map((char, index) => (
      <View key={index} style={{ marginRight: 4 }}>
        <GameBlock key={index} text={char} />
      </View>
    ));
  }, [isLoginScreen]);

  function reset() {
    setIsLoginScreen();
    resetForm();
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/background.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.contentWrapper}>
        <View style={styles.headerContainer}>{renderHeader()}</View>

        <View style={styles.formGroup}>
          <TextInput
            mode='outlined'
            keyboardType='email-address'
            returnKeyType='next'
            autoComplete={false}
            autoCapitalize='none'
            label='Correo electrónico'
            placeholder='Correo electrónico'
            value={formValues.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            left={
              <TextInput.Icon name='email' color={getInputEmailIconColor} />
            }
            error={Boolean(formErrors.email && touched.email)}
          />
          {formErrors.email && touched.email && (
            <Paragraph style={styles.textError}>{formErrors.email}</Paragraph>
          )}
        </View>

        <View style={styles.formGroup}>
          <TextInput
            mode='outlined'
            secureTextEntry={hidePassword}
            autoComplete={false}
            autoCapitalize='none'
            label='Contraseña'
            placeholder='Contraseña'
            value={formValues.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            left={
              <TextInput.Icon name='lock' color={getInputPasswordIconColor} />
            }
            right={
              <TextInput.Icon
                name={hidePassword ? 'eye' : 'eye-off'}
                onPress={toggleHidePassword}
                color={getInputPasswordIconColor}
              />
            }
            error={Boolean(formErrors.password && touched.password)}
          />
          {formErrors.password && touched.password && (
            <Paragraph style={styles.textError}>
              {formErrors.password}
            </Paragraph>
          )}
        </View>

        <Button
          style={styles.button}
          mode='contained'
          disabled={isLoading || isValidating || !isValid}
          loading={isLoading || isValidating}
          onPress={handleSubmit}
        >
          {isLoginScreen ? 'Iniciar sesión' : 'Registrarse'}
        </Button>

        <View style={styles.captionContainer}>
          <Caption>
            {isLoginScreen ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}{' '}
            <Caption style={styles.captionText} onPress={reset}>
              {isLoginScreen ? 'Regístrate!' : 'Inicia sesión!'}
            </Caption>
          </Caption>
        </View>

        <HardcodedPersons
          onSelectPerson={person =>
            setValues({ email: person.email, password: person.password })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    opacity: 0.1,
  },
  contentWrapper: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  textError: {
    color: theme.colors.error,
  },
  formGroup: {
    marginBottom: 16,
  },
  button: {
    marginTop: 4,
  },
  captionContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  captionText: {
    color: theme.colors.accent,
    fontWeight: 'bold',
  },
});

export default UnauthenticatedApp;
