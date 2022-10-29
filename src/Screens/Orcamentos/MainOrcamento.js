import React from 'react';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TestScheduler } from 'jest';
import { BASE_URL } from '../../config';
import { Pairs } from 'matter';
import axios from 'axios';


export default function MainOrcamento({navigation}) {

  const entrar = () =>{
    navigation.navigate("Ecra2")
  }

    const [client, setClient] = useState([]);


  

  const handleClient = async() =>{
    const res = axios.post(`${BASE_URL}/api/tabelas/clientes`)
    //const res = await BASE_URL.get('/api/tabelas/clientes')
    setClient((await res).data)
    console.log((await res).data)
  }

  useEffect(()=>{
    handleClient()
  },[])

  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.container}>
        
     <View > 
        <TouchableNativeFeedback>
          <View style={styles.button}>
          
            <Text style={styles.textfont}>   Novo Orçamento</Text>
          </View>
        </TouchableNativeFeedback>
      </View> 
      <View > 
        <TouchableNativeFeedback>
          <View style={styles.button}>
          
            <Text style={styles.textfont}> Integrar Orçamento</Text>
          </View>
        </TouchableNativeFeedback>
      </View> 
      <View > 
        <TouchableNativeFeedback>
          <View style={styles.button}>
          
            <Text style={styles.textfont}>   Enviar Orçamentos</Text>
          </View>
        </TouchableNativeFeedback>
      </View> 
      <Picker style={styles.pickerComponent} 
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)}>
          {client.map((item,key)=>{
            return <Picker.Item label={item} value={item} key={key}/>
          })}
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      

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
    touch: {
        flex:1,
        alignItems: 'center',
        marginTop:10,
        backgroundColor: '#d0933f',
    },
    button: {
      alignItems:'center',
      backgroundColor:'#d0933f',
      marginTop:16,
      width: 300,
      padding: 10,
    },
    icon: {
      position:'absolute',
      left:50,
    },
    textfont: {
      fontSize: 25,
      fontWeight: "bold",
      color:'#ffffff',
    },
    pickerComponent: {
      width: 350
    },
    textSelect: {
      fontSize: 20,
      padding: 10,
      fontWeight: 'bold'
    }

  });