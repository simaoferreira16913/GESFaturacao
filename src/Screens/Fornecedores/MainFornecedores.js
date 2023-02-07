import React, { Children } from 'react';
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable,
  TouchableNativeFeedback, TouchableOpacity, View, ScrollView,FlatList,Image, ToastAndroid,LogBox,Alert  } from 'react-native';
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

export default function MainFornecedores({navigation}) {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const {getFornecedores} = useContext(AuthContext);
  const {deleteFornecedor} = useContext(AuthContext);
  const { getClientes } = useContext(AuthContext);
  Date.prototype.toDateString = function dtoString() {
    return `${this.getDay}`;
  }

  const [dadosClientes, setDadosClientes] = useState([]);
  const [dataAux, setDateAux] = useState(new Date())
  const [datei, setDatei] = useState()
  const [datef, setDatef] = useState()
  const [open, setOpen] = useState(false)
  const [openf, setOpenf] = useState(false)
  const [fornecedores, setFornecedores] = useState([]);
  const [selectedIdCliente, setSelectedIdCliente] = useState(null);
  const opcao = 0;
  const [search, setSearch] = useState("c")
  const numRows = 10;
  const pag = 10;
  const entrar = () =>{
    navigation.navigate("Ecra2")
  }

    const [client, setClient] = useState([]);


  const [selectedClient, setSelectedClient] = useState();
  const [selectedEst, setSelectedEst] = useState();
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  
  if(!fornecedores.length){
    getFornecedores().then((res)=>{
      setFornecedores(res.data.aaData);
      console.log(res.data.aaData);
    }).catch(e =>{
      console.log(`Erro: ${e}`);
  });
  } 
 
  const columns = ['Nome', 'Nif' , 'Ações'];

  const data = fornecedores.map(item => {
    let botoes;
    
      botoes = (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{ marginRight:10}} onPress={() => handleRemove(item[0])}>
            <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png"}} style={{width: 25, height: 25,padding:"2%"}}/>
          </TouchableOpacity >
          <TouchableOpacity onPress={() => mudarEcra(item[0])}>
            <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/picol-vector/32/view-512.png"}} style={{width: 25, height: 25,padding:"2%"}}/>
          </TouchableOpacity >
        </View>
      );
    
    return [ item[1],item[2],  botoes];
  });

  const handleRemove = (id) => {
    console.log(id)
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja remover este item?',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Confirmar', onPress: () => removerConfirmar(id)},
      ],
      { cancelable: false }
    )
  }
  const removerConfirmar = (id) =>{
    console.log(id)
    deleteFornecedor(id).then((res)=>{
      console.log(res);
    });

    setFornecedores(fornecedores.filter(item => item[0] !== id));
    ToastAndroid.show("Fornecedores Eliminada",ToastAndroid.SHORT);
  }
  const mudarEcra = (value) => {
    navigation.navigate('GesFaturação - Fornecedores Detalhes',  { id: value });
  }

  return (
    <ScrollView style={{ backgroundColor: '#e5e9ec' }}>
    <View style={styles.container}>
      
     <View > 
        <TouchableNativeFeedback onPress={()=> navigation.navigate("GesFaturação - Criar Fornecedores")}>
          <View style={styles.button}>
          
            <Text style={styles.textfont}>   Novo Fornecedor</Text>
          </View>
        </TouchableNativeFeedback>
      </View>


      <Table style={{width: '100%', height: '100%', marginLeft:70}}>
        <Row data={columns}  textStyle={styles.text}/>
        <Rows data={data} />
      </Table>
      
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
    text: {
      fontSize: 16,
      color:"#000000"
    }
    

  });