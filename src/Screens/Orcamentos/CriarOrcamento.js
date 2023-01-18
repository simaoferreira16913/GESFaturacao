import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, TouchableOpacity, View,FlatList } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";
import {Picker} from '@react-native-picker/picker';
import { BASE_URL } from '../../config';
import DatePicker from 'react-native-date-picker'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';



export default function CriarOrcamento({navigation}){
    const {addOrcamentos} = useContext(AuthContext);
    const {insertCliente} = useContext(AuthContext);
    const {deletecliente} = useContext(AuthContext);
    const {criarCliente} = useContext(AuthContext);
    //const {getOrcamentos} = useContext(AuthContext);
    const {getClientes} = useContext(AuthContext);
    const {getclienteID} = useContext(AuthContext)
    const {getArtigos} = useContext(AuthContext);
    var coisa;
    

  const [dadosClientes,setDadosClientes] = useState([]);
  const [dadosArtigos,setDadosArtigos] = useState([]);
  const [cliente, setCliente] = useState();
  const [linhas, setLinhas] = useState([]);
  const [datei, setDatei] = useState(null)
  const [open, setOpen] = useState(false)
  
  
  getArtigos().then((res)=>{
    setDadosArtigos(res.data.aaData)
    
  });
  getClientes().then((res)=>{
    //console.log(res.data)
    setDadosClientes(res.data.aaData)
    //console.log(dadosClientes)
    //return res.data.aaData
  })
  /*if (dadosClientes.length === 0){
    ;
  }else{
    getClientes().then((res)=>{
      //console.log(res.data)
      setDadosClientes(res.data.aaData)
      //console.log(dadosClientes)
      //return res.data.aaData
    })
    console.log("batatas")
  }
  if (dadosArtigos.length === 0){
    getArtigos().then((res)=>{
      setDadosArtigos(res.data.aaData)
      console.log(dadosArtigos)
    });
  }*/
  
  
 
  
  const [selectedId, setSelectedId] = useState(null);
/* getclienteID(1).then(response => {
    
    setCliente(response.data.data)
    //console.log(response.data)
    console.log(cliente)
});*/
  if(selectedId != null){
    getclienteID(selectedId).then(response => {
    
      setCliente(response.data.data)
      //console.log(response.data)
      console.log(cliente)
  });
  }
  
    return (
      <View style={styles.container}>
            
              
              
              <View > 
        <TouchableNativeFeedback onPress={()=> navigation.navigate("GesFaturação-Criar Cliente")}>
          <View style={styles.button}>
          
            <Text style={styles.textfont}>   Novo Cliente</Text>
          </View>
        </TouchableNativeFeedback>
        <Picker placeholder="Selecione um cliente" onValueChange={itemValue=>setSelectedId(itemValue)}>
          {dadosClientes.map(function(object,i){
      return <Picker.Item label={object[2]} value={object[0]} key={i}/>;
    })}
        </Picker>
        
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
      <Picker placeholder="Selecione um Artigo" onValueChange={itemValue=>setSelectedId(itemValue)}>
          {dadosArtigos.map(function(object,i){
      return <Picker.Item label={object[1]} value={object[0]} key={i}/>;
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

