import React from 'react';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TestScheduler } from 'jest';


export default function MainOrcamento({navigation}) {

  const entrar = () =>{
    navigation.navigate("Ecra2")
  }


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