import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";
import {Picker} from '@react-native-picker/picker';
import { BASE_URL } from '../../config';



export default function CriarOrcamento({navigation}){
    const {addOrcamentos} = useContext(AuthContext);
    const {insertCliente} = useContext(AuthContext);
    const {deletecliente} = useContext(AuthContext);
    const {criarCliente} = useContext(AuthContext);
    const {getOrcamentos} = useContext(AuthContext);
    const {getClientes} = useContext(AuthContext);
    var dadosClientes = [];
    var coisa;
    /*const getClientes = async ()=> {
      var token = await this.getToken();
      params= {
          opcao: '0',
          _token: token,
          pag: '0',
          numRows: '25',
          table_usage: '1',
      }
      console.log(`${BASE_URL}/api/tabelas/clientes`+`?`+new URLSearchParams(params))
      const dados = await fetch(`${BASE_URL}/api/tabelas/clientes`+`?`+new URLSearchParams(params),{
          method: 'GET',
          headers: {
              Accept: 'application/json',
          }
      });
      const aux = await dados.json();
      console.log("OI",aux)
      dadosClientes.push(aux)
      coisa = aux;
      return aux;
  };*/
  dadosClientes = [];
  getClientes().then((res)=>{
    console.log(res.data)
    dadosClientes.push(res.data.aaData)
    console.log(dadosClientes)
  })
  
    return (
      <View style={styles.container}>
             <TouchableOpacity onPress={()=>getClientes()}>
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
        <Picker placeholder="Selecione um cliente" onValueChange={itemValue=>this.getClienteID(itemValue)}>
          {dadosClientes.map(function(object,i){
            return <Picker.Item label={object[2]} value={object[0]} key={i}/>;
          })}
        </Picker>
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

