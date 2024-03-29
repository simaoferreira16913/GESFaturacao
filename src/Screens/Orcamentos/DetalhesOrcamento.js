import React, { Children } from 'react';
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable,
  TouchableNativeFeedback, TouchableOpacity, View, 
  ScrollView,FlatList,Image, ToastAndroid,Alert, TextInput,Modal,TouchableHighlight } from 'react-native';
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
import Dialog from "react-native-dialog";
import Prompt from 'react-native-prompt-android';

export default function DetalhesOrcamento({navigation, route}) {
  const {getArtigoID} = useContext(AuthContext);
  const {enviarOrcamento} = useContext(AuthContext);
  const {getOrcamentos} = useContext(AuthContext);
  const {deleteOrcamento} = useContext(AuthContext);
  const {estadoOrcamento} = useContext(AuthContext);
  const {finalizarOrcamento} = useContext(AuthContext);
  const {getOrcamentosDetalhes} = useContext(AuthContext);
  const [orcamentoID, setOrcamentoID] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [aux, setAux] = useState();
  const [aux2, setAux2] = useState();
  const id = route.params.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const mudarEcra = (value) => {
    navigation.navigate('DetalhesOrcamento.js', value);
  }

  if(orcamentoID.length == 0){
    getOrcamentosDetalhes(id).then((res)=>{
        console.log(res.data.data);
        setOrcamentoID(res.data.data);
        setTableData(res.data.data.linhas.map(linha => [linha.artigo, Number(linha.preco).toFixed(2), parseFloat(linha.qtd).toFixed(2),
             linha.imposto, Number(linha.totalLinha).toFixed(2)]));
        setAux(1);   
    });
  
  }
  
    if(aux2 != 1){
      if(aux == 1){
        for(let i = 0; i < tableData.length; i++){
        
          getArtigoID(tableData[i][0]).then((res)=>{
            if(tableData[i][0] != res.data.data.Nome){
              console.log(res.data.data.Nome);
              if(res.data.data.Nome != null){
              tableData[i][0] = res.data.data.Nome;
              console.log("Oi",tableData);
              setTableData([...tableData]);
              setAux2(1);
              }
            }
          });
        }
      }
    }
    

    function handleFinalizarOrcamento(){
      finalizarOrcamento(id).then((res)=>{
        console.log(res);
      })
      .catch(e => {
        console.log(`Login error ${e}`);
    });
    navigation.goBack()
    navigation.navigate('GesFaturação');
    //navigation.navigate('GesFaturação-Ver Detalhes',  { id: id });
    ToastAndroid.show("Orçamento Finalizado",ToastAndroid.SHORT);

    }

    function handleEstadoOrcamento(estado){
      console.log("Tou Aqui",estado)
      estadoOrcamento(id, estado).then((res)=>{
        console.log(res);
      }).catch(e => {
        console.log(`Login error ${e}`);
    });
    navigation.navigate('GesFaturação');
    //ToastAndroid.show("Orçamento Aceite");
    if(estado == 1){
      ToastAndroid.show("Orçamento Aceite ", ToastAndroid.SHORT);
    }else{
      ToastAndroid.show("Orçamento Rejeitado",  ToastAndroid.SHORT);
    }
    }
    const handleButtonEnviar = () =>{
      console.log("Cheguei")
      Alert.prompt("OI","NOME:",[{
        text:"Submit",
        onPress:(text)=>console.log(text)
      },
    {
      text:"Cancel",
      onPress:()=>console.log("Cancel")
    }],"plain-text","Name")
      
    }

  return (
    <ScrollView>
      <Text style={styles.titleSelect}>Cliente</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{orcamentoID.Cliente}</Text>
      </View>
      <Text style={styles.titleSelect}>NIF</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{orcamentoID.Nif}</Text>
      </View>
      <Text style={styles.titleSelect}>Endereço</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{orcamentoID.EnderecoCliente}</Text>
      </View>
      <Text style={styles.titleSelect}>Série</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{orcamentoID.Serie}</Text>
      </View>
      <Text style={styles.titleSelect}>Data</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{orcamentoID.Data}</Text>
      </View>
      <Text style={styles.titleSelect}>Data Vencimento</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{orcamentoID.DataValidade}</Text>
      </View>
      <Text style={styles.titleSelect}>Desconto</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{parseFloat(orcamentoID.PercentagemDesconto).toFixed(2)}%</Text>
      </View>
      <Text style={styles.titleSelect}>Moeda</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{orcamentoID.Moeda}</Text>
      </View>
      <Text style={styles.titleSelect}>Linhas</Text>
      <Table style={{marginLeft: 10}}>
    <Row textStyle={{fontWeight: "bold"}} data={["Artigo", "Preço", "QTD", "IVA", "Total"]}/>
    {tableData.map((rowData, index) => (
        <Row
            key={index}
            data={rowData}
            style={[styles.row, {backgroundColor: '#f9f9f9', marginTop: 4,  marginRight: 2, padding:5, backgroundColor: "#e5e9ec"}]}
            textStyle={styles.text}
        />
    ))}
</Table>

<View style={styles.marginTOPButton2}>

{orcamentoID.Estado === "Rascunho" ? (
  <View style={styles.marginTOPButton}>
    <Button color="#d0933f"  title="Finalizar Orçamento" onPress={() => { handleFinalizarOrcamento()}} />
  </View>
) : (orcamentoID.Estado === "Aberto" ? (
  
  <View>
    <View style={styles.marginTOPButton}>
<Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={{ marginTop: 22 }}>
          <View>
            
            <Text style={styles.titleSelect}>Email</Text>
            <View style={styles.borderMargin}>
            <TextInput placeholder="Email" value={inputValue} onChangeText={text => setInputValue(text)}/>
            </View>
            <View style={{margin: 10}}>
            <Button color="#488c6c"  title="Enviar" onPress={() => {
              setModalVisible(!modalVisible);
                enviarOrcamento(id, inputValue).then((res)=>{
                  console.log(res);
                });
              }} />
            </View>
            <View style={{margin: 10}}>
            <Button color="#d0933f" title="Cancelar" onPress={() => {
              setModalVisible(!modalVisible);

              }} />
            </View>
          </View>
        </View>
      </Modal>
  <Button color="#d0933f"  title="Enviar Email" onPress={()=>setModalVisible(true)} />
</View>
    <Button color="#488c6c" title="Aceitar" onPress={() => { handleEstadoOrcamento(1) }} />
    <Button color="#bf4346" title="Rejeitar" onPress={() => { handleEstadoOrcamento(0) }} />
  </View>
) : (
  <View>
    <View style={styles.marginTOPButton}>
<Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={{ marginTop: 22 }}>
          <View>
            
            <Text style={styles.titleSelect}>Email</Text>
            <View style={styles.borderMargin}>
            <TextInput placeholder="Email" value={inputValue} onChangeText={text => setInputValue(text)}/>
            </View>
            <View style={{margin: 10}}>
            <Button color="#488c6c"  title="Enviar" onPress={() => {
              setModalVisible(!modalVisible);
                enviarOrcamento(id, inputValue).then((res)=>{
                  console.log(res);
                });
              }} />
            </View>
            <View style={{margin: 10}}>
            <Button color="#d0933f" title="Cancelar" onPress={() => {
              setModalVisible(!modalVisible);

              }} />
            </View>
          </View>
        </View>
      </Modal>
  <Button color="#d0933f"  title="Enviar Email" onPress={()=>setModalVisible(true)} />
</View>
  </View>
  
))}
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
      marginTop: 20,
      marginBottom: 20
    },
    marginTOPButton2: {
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 7
    }
  });