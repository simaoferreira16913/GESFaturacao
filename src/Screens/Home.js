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
      <Button title='Faturas Simplificadas' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Faturas Simplificadas")}/>
      <Button title='Proformas' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Proformas")}/>
      <Button title='Notas de Crédito' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Notas de Créditos")}/>
      <Button title='Notas de Débito' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Notas de Débito")}/>
      <Button title='Fornecedores' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Fornecedores")}/>
      <Button title='Clientes' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Clientes")}/>
      <Button title='Compras' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Compras")}/>
      <Button title='Análise' color='#d0933f' onPress={()=> navigation.navigate("GesFaturação-Analise")}/>
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