import React, { Children } from 'react';
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TestScheduler } from 'jest';
import { BASE_URL } from '../../config';
import { Pairs } from 'matter';
import axios from 'axios';
import { AuthContext, AuthProvider } from '../../Context/AuthContext';
import DatePicker from 'react-native-date-picker'
import { Renderer } from 'phaser';
import moment from 'moment/moment';

export default function MainOrcamento({navigation}) {


  Date.prototype.toDateString = function dtoString() {
    return `${this.getDay}`;
  }

  
  const [dataAux, setDateAux] = useState(new Date())
  const [datei, setDatei] = useState(null)
  const [datef, setDatef] = useState(null)
  const [open, setOpen] = useState(false)
  const [openf, setOpenf] = useState(false)
 
  const opcao = 0;
  const [search, setSearch] = useState("c")
  const numRows = 10;
  const pag = 10;
  const entrar = () =>{
    navigation.navigate("Ecra2")
  }

    const [client, setClient] = useState([]);


  
     

  /*const handleClient = async() =>{
    const res = axios.get(`${BASE_URL}/api/tabelas/clientes`,{
        _token,
        opcao,
        search,
        numRows,
        pag
    })
    //const res = await BASE_URL.get('/api/tabelas/clientes')
    .then(res => {
    setClient(res.data)
    console.log(res.data)})
    
  }

  useEffect(()=>{
    handleClient()
  },[])*/

  const [selectedClient, setSelectedClient] = useState();
  const [selectedEst, setSelectedEst] = useState();
  
  
   
  const {getOrcamentos} = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <Text>{getOrcamentos}</Text>
     <View > 
        <TouchableNativeFeedback onPress={()=> navigation.navigate("GesFaturação-Criar Orçamento")}>
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

      <View> 
        <Text style={styles.titleSelect}>Cliente</Text>
        <View style={styles.borderMargin}>
        <Picker style={styles.pickerComponent} 
              selectedValue={selectedClient}
              onValueChange={(itemValue, itemIndex) =>
              setSelectedClient(itemValue)}>
          
          <Picker.Item label="Selecione um cliente" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
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
          <Picker.Item label="Rascunho" value="java" />
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
      
      <View  > 
        <TouchableNativeFeedback onPress={()=> getOrcamentos(search,numRows,pag)}>
          <View style={styles.button}>

            <Text style={styles.textfont}>   Pesquisar</Text>
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
    }

  });