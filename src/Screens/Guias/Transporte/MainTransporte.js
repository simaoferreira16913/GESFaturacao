import React, { Children } from 'react';
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable,
  TouchableNativeFeedback, TouchableOpacity, View, ScrollView,FlatList,Image, ToastAndroid } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TestScheduler } from 'jest';
import { BASE_URL } from '../../config';
import { Pairs } from 'matter';
import axios from 'axios';
import { AuthContext} from '../../../Context/AuthContext';
import DatePicker from 'react-native-date-picker'
import { Renderer } from 'phaser';
import moment from 'moment/moment';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import { LogBox } from 'react-native';


export default function MainTransporte({navigation}) {
  const {getGuiasTransporte} = useContext(AuthContext);
  const {deleteGuiasTransporte} = useContext(AuthContext);
  const { getClientes } = useContext(AuthContext);
  Date.prototype.toDateString = function dtoString() {
    return `${this.getDay}`;
  }

  const [dadosClientes, setDadosClientes] = useState([]);
  const [datei, setDatei] = useState()
  const [datef, setDatef] = useState()
  const [open, setOpen] = useState(false)
  const [openf, setOpenf] = useState(false)
  const [guiasTransporte, setGuiasTransporte] = useState([]);
  const [selectedIdCliente, setSelectedIdCliente] = useState(null);
  const opcao = 0;
  const [searchO, setSearchO] = useState("c")
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
  
  if(!guiasTransporte.length){
    getGuiasTransporte().then((res)=>{
      setGuiasTransporte(res.data.aaData);
      console.log(JSON.stringify(res.data.aaData) + ' cenas');
    }).catch(e =>{
      console.log(`Erro: ${e}` + ' ganda erro');
      //setIsLoading(false)
  });
  } 
  if (!dadosClientes.length) {
    getClientes().then((res) => {
      console.log(res.data + ' cenas cliente')
      setDadosClientes(res.data.aaData)
      
    });
  }
  const columns = ['Nome', 'Preço', 'Estado', , 'Ações'];

  const data = guiasTransporte.map(item => [ item[2],parseFloat(item[8]).toFixed(2), item[9], 
  <View style={{flexDirection: 'row'}}>
            {item[9] === "Rascunho" ? (
            <TouchableOpacity style={{ marginRight:10}} onPress={() => handleRemove(item[0])}>
            <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png"}} style={{width: 25, height: 25,padding:"2%"}}/></TouchableOpacity >
            ) : (item[9] !== "Rascunho" ? (
              <View>                
              </View> 
            ) : (
              <View>                
              </View>              
            ))}
  <TouchableOpacity onPress={() => mudarEcra(item[0])}>
  <Image source={{uri: "https://cdn2.iconfinder.com/data/icons/picol-vector/32/view-512.png"}} style={{width: 25, height: 25,padding:"2%"}}/>
  </TouchableOpacity >
  </View>
]);

  const handleRemove = (id) => {
    console.log(id)
    deleteGuiasTransporte(id).then((res)=>{
      console.log(JSON.stringify(res));
    });

    setGuiasTransporte(guiasTransporte.filter(item => item[0] !== id));
  }

  const showToast = () => {
    ToastAndroid.show('Apenas guias com estado "Rascunho" podem ser apagadas', ToastAndroid.SHORT);
  };

  const mudarEcra = (value) => {
    navigation.navigate('GesFaturação-Detalhes Guia Transporte',  { id: value });
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      
     <View > 
        <TouchableNativeFeedback onPress={()=> navigation.navigate("GesFaturação-Criar Guia Transporte")}>
          <View style={styles.button}>
          
            <Text style={styles.textfont}>Nova Guia de Transporte</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      
      <View > 
        <TouchableNativeFeedback>
          <View style={styles.button}>
          
            <Text style={styles.textfont}>Integrar Guia</Text>
          </View>
        </TouchableNativeFeedback>
      </View> 
      <View > 
        <TouchableNativeFeedback>
          <View style={styles.button}>
          
            <Text style={styles.textfont}>Enviar Guia</Text>
          </View>
        </TouchableNativeFeedback>
      </View> 

      <View> 
        <Text style={styles.titleSelect}>Cliente</Text>
        <View style={styles.borderMargin}>
        <Picker  style={styles.pickerComponent} placeholder="Selecione um cliente" 
        selectedValue={selectedIdCliente} 
        onValueChange={itemValue => setSelectedIdCliente(itemValue[0])}>
          {dadosClientes.map(function (object, i) {
            return <Picker.Item label={object[2]} value={object[0]} key={i} />;
          })}
        </Picker>
        </View>
      </View>
      <View> 
        <Text style={styles.titleSelect}>Estado</Text>
        <View style={styles.borderMargin}>
        <Picker style={styles.pickerComponent} 
              selectedValue={selectedEst}
              onValueChange={(itemValue, itemIndex) =>
              setSelectedEst(itemValue)}>
          
          <Picker.Item label="Selecione um Estado"  />
          <Picker.Item label="Rascunho" value="Rascunho" />
          <Picker.Item label="Aberto" value="Aberto" />
          <Picker.Item label="Aprovado" value="Aprovado" />
          <Picker.Item label="Rejeitado" value="Rejeitado" />
        </Picker>
        </View>
      </View>
      
      <View> 
        <Text style={styles.titleSelect}>Data de Início</Text>
        <View style={styles.borderMargin}>
        <TouchableOpacity  onPress={() => setOpen(true)} style={styles.touchableO}>
        <DatePicker
        modal
        mode="date"
        
        open={open}
        date={new Date()}
        onConfirm={(datei) => {
          setOpen(false)
          
          setDatei(datei)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      
      <Text style={styles.textDate}> {todaiDate = moment(datei).format("DD/MM/YYYY") }</Text>
         
      </TouchableOpacity>
      
        </View>
      </View>
      <View> 
        <Text style={styles.titleSelect}>Data de Fim</Text>
        <View style={styles.borderMargin}>
        <TouchableOpacity  onPress={() => setOpenf(true)} style={styles.touchableO}>
        <DatePicker
        modal
        mode="date"
        open={openf}
        date={new Date()}
        onConfirm={(datef) => {
          setOpenf(false)
          
          setDatef(datef)
        }}
        onCancel={() => {
          setOpenf(false)
        }}
      />
      
      <Text style={styles.textDate}> {todafDate = moment(datef).format("DD/MM/YYYY") }</Text>
         
      </TouchableOpacity>
      
        </View>
      </View>
      
      <View> 
        <TouchableNativeFeedback onPress={()=> 
          getGuiasTransporte()}>
          <View style={styles.button}>

            <Text style={styles.textfont}>Pesquisar</Text>
          </View>
        </TouchableNativeFeedback>
      </View>  
      <Table style={{width: '100%', height: '100%', marginLeft:40}}>
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