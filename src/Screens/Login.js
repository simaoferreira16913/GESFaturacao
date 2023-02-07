import React, {useContext, useState} from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { AuthContext } from '../Context/AuthContext';

const Login = ({navigation}) => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
        <Image source={require('./assets/gesf.png')}  style={styles.img}/>
        <Text style={styles.paddingBottom}>Bem-vindo ao GESFaturação</Text>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder="Username"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry
        />

        <Button
          title="Iniciar Sessão" color='#d0933f'
          onPress={() => {login(username, password)}}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  img: {
    width: '55%', 
    margin: 20,
    padding: 10
  },
  paddingBottom: {
    paddingBottom: 30
  }
});

export default Login;