import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Headline,
  TextInput,
  Button,
  Paragraph,
  Caption,
} from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from './context/AuthProvider';
import { useAsync, useToggle } from './hooks';
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
  } = useFormik({
    initialValues,
    validationSchema: AuthSchema,
    onSubmit: formValues =>
      isLoginScreen ? run(login(formValues)) : run(register(formValues)),
  });

  if (isError) {
    const errorMessage = mapAuthError(error);
    toast.show(errorMessage, { type: 'danger' });
  }

  const getInputEmailIconColor = useCallback(
    (isFocused: boolean) =>
      formErrors.email && touched.email
        ? theme.colors.error
        : isFocused
        ? theme.colors.primary
        : theme.colors.placeholder,
    [formErrors, touched]
  );

  const getInputPasswordIconColor = useCallback(
    (isFocused: boolean) =>
      formErrors.password && touched.password
        ? theme.colors.error
        : isFocused
        ? theme.colors.primary
        : theme.colors.placeholder,
    [formErrors, touched]
  );

  function reset() {
    setIsLoginScreen();
    resetForm();
  }

  return (
    <View style={styles.container}>
      <Headline style={styles.title}>
        {isLoginScreen ? 'Login' : 'Registro'}
      </Headline>

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
          left={<TextInput.Icon name='email' color={getInputEmailIconColor} />}
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
          <Paragraph style={styles.textError}>{formErrors.password}</Paragraph>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.primary,
    marginBottom: 16,
  },
  textError: {
    color: theme.colors.error,
  },
  formGroup: {
    marginBottom: 16,
  },
  button: {
    marginTop: 18,
  },
  captionContainer: {
    marginTop: 8,
  },
  captionText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default UnauthenticatedApp;
