import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";


export default function MainArtigo({navigation}) {
  const {logout} = useContext(AuthContext);

  const entrar = () =>{
    navigation.navigate("Ecra2")
  }

  return (
    <View style={styles.container}>
     <View style={styles.button}>
      
      <Button title='Criar Artigo' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Criar Artigo")}/>
      
      
      
      
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