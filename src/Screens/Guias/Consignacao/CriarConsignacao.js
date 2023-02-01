import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function CriarConsignacao({navigation}) {

  return (
    <View style={styles.container}>
     <View style={styles.button}>
      
        <Button title='Nova Guia Consignação' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Criar Guia Consignação")}/>
        <Button title='Voltar Atrás' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Guias")}/>
      
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