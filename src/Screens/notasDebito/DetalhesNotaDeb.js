import React, { Children } from 'react';
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable,
  TouchableNativeFeedback, TouchableOpacity, View, ScrollView,FlatList,Image, ToastAndroid,LogBox,TextInput,Modal,TouchableHighlight  } from 'react-native';
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


export default function DetalhesNotaDeb({navigation, route}) {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  const {getArtigoID} = useContext(AuthContext);
  const {enviarNotaDeb} = useContext(AuthContext);
  const {finalizarNotaDeb} = useContext(AuthContext);
  const {getNotasDebDetalhes} = useContext(AuthContext);
  const [notaDeb, setNotaDeb] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [aux, setAux] = useState();
  const [aux2, setAux2] = useState();
  const id = route.params.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  /*const mudarEcra = (value) => {
    navigation.navigate('DetalhesOrcamento.js', value);
  }*/

  if(notaDeb.length == 0){
    getNotasDebDetalhes(id).then((res)=>{
        console.log("NOTA:",res.data.data);
        setNotaDeb(res.data.data);
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
    

    function handleFinalizarNotaDeb(){
      finalizarNotaDeb(id).then((res)=>{
        console.log(res);
        ToastAndroid.show("Nota Finalizada",ToastAndroid.SHORT);
      })
      .catch(e => {
        console.log(`Login error ${e}`);
    });
    navigation.goBack()
    navigation.navigate('GesFaturação');
    //navigation.navigate('GesFaturação-Ver Detalhes',  { id: id });
    

    }

    

  return (
    <ScrollView>
      <Text style={styles.titleSelect}>Cliente</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{notaDeb.Cliente}</Text>
      </View>
      <Text style={styles.titleSelect}>NIF</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{notaDeb.Nif}</Text>
      </View>
      <Text style={styles.titleSelect}>Endereço</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{notaDeb.EnderecoCliente}</Text>
      </View>
      <Text style={styles.titleSelect}>Série</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{notaDeb.Serie}</Text>
      </View>
      <Text style={styles.titleSelect}>Data</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{notaDeb.Data}</Text>
      </View>
      <Text style={styles.titleSelect}>Data Vencimento</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{notaDeb.Validade}</Text>
      </View>
      <Text style={styles.titleSelect}>Desconto</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{parseFloat(notaDeb.PercentagemDesconto).toFixed(2)}%</Text>
      </View>
      <Text style={styles.titleSelect}>Moeda</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{notaDeb.Moeda}</Text>
      </View>
      <Text style={styles.titleSelect}>Motivo</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{notaDeb.Reason_Origem}</Text>
      </View>
      <Text style={styles.titleSelect}>Total</Text>
      <View style={styles.borderMargin}>
        <Text style={{marginLeft: 4}}>{Number(notaDeb.TotalPagar)}</Text>
      </View>
      <Text style={styles.titleSelect}>Linhas</Text>
      <Table style={{marginLeft: 10}}>
    <Row data={["Artigo", "Preço", "QTD", "IVA", "Total"]}/>
    {tableData.map((rowData, index) => (
        <Row
            key={index}
            data={rowData}
            style={[styles.row, index%2 && {backgroundColor: '#f9f9f9'}]}
            textStyle={styles.text}
        />
    ))}
</Table>

<View style={styles.marginTOPButton2}>

{notaDeb.Estado === "Rascunho" ? (
  <Button color="#d0933f"  title="Finalizar Nota de Débito" onPress={() => { handleFinalizarNotaDeb()}} />
) : (
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
                enviarNotaDeb(id, inputValue).then((res)=>{
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
)}
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