import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function MainGuias({navigation}) {

  return (
    <View style={styles.container}>
     <View style={styles.button}>
      
      <Button title='Guias de Transporte' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Guias Transporte")}/>
      <Button title='Guias de Remessa' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Guias Remessa")}/>
      <Button title='Guias de Devolução' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Guias Devolução")}/>
      <Button title='Guias de Mov. Ativos Próprios' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Guias Ativos")}/>
      <Button title='Guias de Consignação' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Guias Consignação")}/>
      
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