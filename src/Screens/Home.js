import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../Context/AuthContext';


export default function Home({navigation}) {
  const {logout} = useContext(AuthContext);

  const entrar = () =>{
    navigation.navigate("Ecra2")
  }

  return (
    <View style={styles.container}>
     <View style={styles.button}>
      
      <Button title='Orçamentos' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Orçamentos")}/>
      <Button title='Artigos' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Artigos")}/>
      <Button title='Faturas' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Faturas")}/>
      <Button title='Logout' color='#d0933f' onPress={()=> {logout()}}/>
      
      </View> 
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e9ec',
    alignItems: 'center',
    justifyContent: 'flex-start',
   
  },
  card: {
      backgroundColor: '#e5e9ec',
      borderRadius: 5,
      padding: 12,
  },
  button: {
      marginTop:50,
  },
  marginButton:{
    marginTop:5,
  }
});