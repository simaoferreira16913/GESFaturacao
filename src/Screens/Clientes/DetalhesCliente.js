import React, { Children } from 'react';
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable,
  TouchableNativeFeedback, TouchableOpacity, View, ScrollView,FlatList,Image, ToastAndroid,LogBox  } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TestScheduler } from 'jest';
import { BASE_URL } from '../../config';
import { Pairs } from 'matter';
import axios from 'axios';
import { AuthContext} from '../../Context/AuthContext';
import DatePicker from 'react-native-date-picker'
import { Renderer } from 'phaser';
import moment from 'moment/moment';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'


export default function DetalhesCliente({navigation, route}) {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const {getArtigoID} = useContext(AuthContext);
  const {getclienteID} = useContext(AuthContext);
  const [clienteID, setClienteID] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [aux, setAux] = useState();
  const [aux2, setAux2] = useState();
  const id = route.params.id;
  console.log(id)

  /*const mudarEcra = (value) => {
    navigation.navigate('DetalhesOrcamento.js', value);
  }*/

  if(clienteID.length == 0){
    getclienteID(id).then((res)=>{
        console.log("CLIENTE",res.data.data);
        setClienteID(res.data.data);   
    });
  
  }
  
   

  

    

  return (
    <ScrollView>
      <Text style={styles.titleSelect}>Nome</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{clienteID.Nome}</Text>
      </View>
      <Text style={styles.titleSelect}>NIF</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{clienteID.Nif}</Text>
      </View>
      <Text style={styles.titleSelect}>Endereço</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{clienteID.Endereco}</Text>
      </View>
      <Text style={styles.titleSelect}>Localidade</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{clienteID.Localidade}</Text>
      </View>
      <View style = {styles.lineStyle} />
      <Text style={styles.titleSelect}>Telemóvel</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{clienteID.Telemovel}</Text>
      </View>
      <Text style={styles.titleSelect}>Email</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{clienteID.Email}</Text>
      </View>
      
      <Text style={styles.titleSelect}>Telefone</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{clienteID.Telefone}</Text>
      </View>
      <View style = {styles.lineStyle} />
      <Text style={styles.titleSelect}>Método Pagamento</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{clienteID.Metodo}</Text>
      </View>
      

<View style={styles.marginTOPButton2}>

</View>
    </ScrollView>
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
      marginBottom:5,
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
      width: 350,
      
    },
    textSelect: {
      fontSize: 20,
      padding: 10,
      fontWeight: 'bold'
    },
    titleSelect: {
      fontSize: 20,
      margin: 10,
      fontWeight: "bold",
      color: "#5F5D5C"
    },
    borderMargin: {
      borderWidth: 1,
      borderColor: 'grey',
      marginLeft:10,
      marginRight:10,
      height:50,
      justifyContent: 'center',
    },
    dateComponent: {
        width: 350
    },
    touchableO: {
      width: 350,
      height: 55
    },
    textDate: {
      marginLeft:15,
      marginTop:15,
      fontSize: 16,
      color:"#000000"
    },
    marginTOPButton: {
      margin: 20
    },
    marginTOPButton2: {
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 7
    },
    lineStyle:{
      borderWidth: 0.5,
      borderColor:'black',
      margin:10,
    }
  });