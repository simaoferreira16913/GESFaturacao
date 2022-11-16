import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";

export default function CriarOrcamento({navigation}) {
   
    const {addOrcamentos} = useContext(AuthContext);
    const {insertCliente} = useContext(AuthContext);

    var nome_cliente = "Joao"
    var nif_cliente = 156213789

    return (
      <View style={styles.container}>
             <TouchableOpacity onPress={()=>insertCliente(nome_cliente,nif_cliente)}>
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

