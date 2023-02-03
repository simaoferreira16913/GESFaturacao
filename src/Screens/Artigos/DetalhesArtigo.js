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


export default function DetalhesArtigo({navigation, route}) {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const {getArtigoID} = useContext(AuthContext);
  const {getclienteID} = useContext(AuthContext);
  const [artigoID, setArtigoID] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [aux, setAux] = useState();
  const [aux2, setAux2] = useState();
  const id = route.params.id;
  console.log(id)

  /*const mudarEcra = (value) => {
    navigation.navigate('DetalhesOrcamento.js', value);
  }*/

  if(artigoID.length == 0){
    getArtigoID(id).then((res)=>{
        console.log("CLIENTE",res.data.data);
        setArtigoID(res.data.data);   
    });
  
  }
  
   

  

    

  return (
    <ScrollView>
      <Text style={styles.titleSelect}>Nome</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{artigoID.Nome}</Text>
      </View>
      <Text style={styles.titleSelect}>Categoria</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{artigoID.Categoria}</Text>
      </View>
      <Text style={styles.titleSelect}>Tipo</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{artigoID.Tipo}</Text>
      </View>
      <Text style={styles.titleSelect}>Preço PVP</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{Number(artigoID.PrecoPVP)}</Text>
      </View>
      
      <Text style={styles.titleSelect}>IVA</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{artigoID.IVA}</Text>
      </View>
      <Text style={styles.titleSelect}>Preço Unitário</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{Number(artigoID.Preco)}</Text>
      </View>
      
      <Text style={styles.titleSelect}>Motivo de Isenção</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{artigoID.MotivoIsencao}</Text>
      </View>
      <View style = {styles.lineStyle} />
      <Text style={styles.titleSelect}>Retenção</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{artigoID.Retencao}</Text>
      </View>
      <View style = {styles.lineStyle} />
      <Text style={styles.titleSelect}>Preço Custo Inicial</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{Number(artigoID.PrecoCustoInicial)}</Text>
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