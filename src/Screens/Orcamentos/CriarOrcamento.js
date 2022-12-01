import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";

export default function CriarOrcamento({navigation}) {
   
    const {addOrcamentos} = useContext(AuthContext);
    const {insertCliente} = useContext(AuthContext);
    const {deletecliente} = useContext(AuthContext);
    const {criarCliente} = useContext(AuthContext);
  
    const dadosCli={Nome:"Nelson", Nif:"193047663", Pais:"China",Endereco:"Morada",CodigoPostal:4755-123,
                Regiao:0, Cidade:0,Email:"teste@teste.com",Website:"www.oi.pt",Telemovel:968000000,Telefone:252123123
                ,Fax:252123124, Vencimento:0, Desconto:0};
    id = 6;
    return (
      <View style={styles.container}>
             <TouchableOpacity onPress={()=>criarCliente(dadosCli)}>
              <Text>Click</Text>
              </TouchableOpacity> 
              <TouchableOpacity onPress={()=>deletecliente(id)}>
              <Text>Click Delete</Text>
              </TouchableOpacity>   
         
              <View > 
        <TouchableNativeFeedback onPress={()=> navigation.navigate("GesFaturação-Criar Cliente")}>
          <View style={styles.button}>
          
            <Text style={styles.textfont}>   Novo Cliente</Text>
          </View>
        </TouchableNativeFeedback>
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
    button: {
      alignItems:'center',
      backgroundColor:'#d0933f',
      marginTop:16,
      width: 300,
      padding: 10,
    },
});

