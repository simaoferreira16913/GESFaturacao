import React, { Children } from 'react';
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable,
  TouchableNativeFeedback, TouchableOpacity, View, ScrollView, Modal, ToastAndroid } from 'react-native';
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


export default function DetalhesTransporte({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const {getArtigoID} = useContext(AuthContext);
  const {getGuiasTransporte} = useContext(AuthContext);
  const {deleteGuiaTransporte} = useContext(AuthContext);
  const {estadoOrcamento} = useContext(AuthContext);
  const {finalizarGuiaTransporte} = useContext(AuthContext);
  const {getGuiaTransporteDetalhes} = useContext(AuthContext);
  const [guiaTransporteID, setGuiaTransporteID] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [aux, setAux] = useState();
  const [aux2, setAux2] = useState();
  const [idGuiaT, setIdGuia] = useState(null);
  const id = route.params.id;


  const mudarEcra = (value) => {
    navigation.navigate('DetalhesTransporte.js', value);
  }

  if(guiaTransporteID.length == 0){
    getGuiaTransporteDetalhes(id).then((res)=>{
        console.log(res.data.data);
        setGuiaTransporteID(res.data.data);
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
    

    function handleFinalizarGuiaTransporte(){
      finalizarGuiaTransporte(guiaTransporteID.ID_GuiaTransporte).then((res)=>{
        console.log(JSON.stringify(res));
        ToastAndroid.show("Fatura Finalizada",ToastAndroid.SHORT);
      })
      .catch(e => {
        console.log(`Error ${e}` + 'Finalizar Guia');
    });
    navigation.goBack()
    navigation.navigate('GesFaturação');
    }

  return (
    <ScrollView>

      <View style={styles.marginTOPButton}>
      <Button color="#d0933f"
        title="Dados Cliente"
        onPress={() => setModalVisible(true)}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ScrollView>
        <View>
          <Text style={styles.titleSelect}>Cliente</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.Cliente}</Text>
          </View>

          <Text style={styles.titleSelect}>Nif</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.Nif}</Text>
          </View>
          
          <Text style={styles.titleSelect}>Endereço</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.EnderecoCliente}</Text>
          </View>

          <Text style={styles.titleSelect}>Código Postal</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.CodigoPostalCliente}</Text>
          </View>

          <Text style={styles.titleSelect}>Localidade</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.LocalidadeCliente}</Text>
          </View>

          <Text style={styles.titleSelect}>Cidade</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.CidadeCliente}</Text>
          </View>

          <Text style={styles.titleSelect}>Distrito</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.RegiaoCliente}</Text>
          </View>
          
          <Text style={styles.titleSelect}>Pais</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.PaisFull}</Text>
          </View>

          <View style={styles.marginTOPButton}>
          <Button color="#d0933f"
            title="Fechar"
            onPress={() => setModalVisible(false)}
          />
          </View>
        </View>
        </ScrollView>
      </Modal>

      <View style={styles.marginTOPButton}>
      <Button color="#d0933f"
        title="Dados Carga"
        onPress={() => setModal2Visible(true)}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal2Visible}
        onRequestClose={() => setModal2Visible(false)}
      >
        <ScrollView>
        <View>
          <Text style={styles.titleSelect}>Data/Hora Carga</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.DataCarga + ' ' + guiaTransporteID.HoraCarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Endereço</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.EnderecoCarga}</Text>
          </View>
          
          <Text style={styles.titleSelect}>Codigo Postal</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.CodigoPostalCarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Localidade</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.LocalidadeCarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Distrito</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.RegiaoCarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Cidade</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.CidadeCarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Pais</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.PaisCargaFull}</Text>
          </View>

          <View style={styles.marginTOPButton}>
          <Button color="#d0933f"
            title="Fechar"
            onPress={() => setModal2Visible(false)}
          />
          </View>
        </View>
        </ScrollView>
      </Modal>

      <View style={styles.marginTOPButton}>
      <Button color="#d0933f"
        title="Dados Descarga"
        onPress={() => setModal3Visible(true)}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal3Visible}
        onRequestClose={() => setModal3Visible(false)}
      >
        <ScrollView>
        <View>
          <Text style={styles.titleSelect}>Data/Hora Descarga</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.DataDescarga + ' ' + guiaTransporteID.HoraDescarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Código AT</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.ATDocCodeID}</Text>
          </View>

          <Text style={styles.titleSelect}>Endereço</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.EnderecoDescarga}</Text>
          </View>
          
          <Text style={styles.titleSelect}>Codigo Postal</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.CodigoPostalDescarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Localidade</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.LocalidadeDescarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Distrito</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.RegiaoDescarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Cidade</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.CidadeDescarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Pais</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.PaisDescargaFull}</Text>
          </View>

          <View style={styles.marginTOPButton}>
          <Button color="#d0933f"
            title="Fechar"
            onPress={() => setModal3Visible(false)}
          />
          </View>
        </View>
        </ScrollView>
      </Modal>

      <View style={styles.marginTOPButton}>
      <Button color="#d0933f"
        title="Dados Guia"
        onPress={() => setModal4Visible(true)}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal4Visible}
        onRequestClose={() => setModal4Visible(false)}
      >
        <ScrollView>
        <View>
          <Text style={styles.titleSelect}>Série</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.Serie}</Text>
          </View>

          <Text style={styles.titleSelect}>Número</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.Numero}</Text>
          </View>

          <Text style={styles.titleSelect}>Data</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.DataCriacao}</Text>
          </View>
          
          <Text style={styles.titleSelect}>Data Vencimento</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.DataDescarga}</Text>
          </View>

          <Text style={styles.titleSelect}>Condições de Pagamento</Text>
          <View style={styles.borderMargin}>
            {guiaTransporteID.MetodoPagamento === "Numerário" ? (
            <Text style={{marginLeft: 4}}>Pronto Pagamento</Text>
            ) : (guiaTransporteID.MetodoPagamento !== "Numerário" ? (
              <Text style={{marginLeft: 4}}>{guiaTransporteID.MetodoPagamento}</Text>
            ) : (
              <View>                
              </View>              
            ))}
          </View>

          <Text style={styles.titleSelect}>Moeda</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{guiaTransporteID.Moeda}</Text>
          </View>

          <Text style={styles.titleSelect}>Referencia</Text>
          <View style={styles.borderMargin}>
            {guiaTransporteID.Referencia === "" ? (
            <Text style={{marginLeft: 4}}>Sem informação</Text>
            ) : (guiaTransporteID.Referencia !== "" ? (
              <Text style={{marginLeft: 4}}>{guiaTransporteID.Referencia}</Text>
            ) : (
              <View>                
              </View>              
            ))}
          </View>

          <Text style={styles.titleSelect}>Desconto</Text>
          <View style={styles.borderMargin}>
            <Text style={{marginLeft: 4}}>{Number(guiaTransporteID.Desconto).toFixed(2) + ' %'}</Text>
          </View>

          <Text style={styles.titleSelect}>Observações</Text>
          <View style={styles.borderMargin}>
            {guiaTransporteID.Observacoes === "" ? (
            <Text style={{marginLeft: 4}}>Sem informação</Text>
            ) : (guiaTransporteID.Observacoes !== "" ? (
              <Text style={{marginLeft: 4}}>{guiaTransporteID.Observacoes}</Text>
            ) : (
              <View>                
              </View>              
            ))}
          </View>

          <View style={styles.marginTOPButton}>
          <Button color="#d0933f"
            title="Fechar"
            onPress={() => setModal4Visible(false)}
          />
          </View>
        </View>
        </ScrollView>
      </Modal>


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

{guiaTransporteID.Estado === "Rascunho" ? (
  <Button color="#d0933f"  title="Finalizar Guia" onPress={() => {handleFinalizarGuiaTransporte()}} />
) : (

  <Text></Text>

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
      margin: 20
    },
    marginTOPButton2: {
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 7
    }
  });