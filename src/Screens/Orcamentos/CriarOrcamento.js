import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";

export default function CriarOrcamento({navigation}) {
   
    const {addOrcamentos} = useContext(AuthContext);
    const {addCliente} = useContext(AuthContext);


    return (
      <View style={styles.container}>
             <TouchableOpacity onPress={()=>addCliente()}>
              <Text>Click</Text>
              </TouchableOpacity>   
         
        
        
  
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
});

