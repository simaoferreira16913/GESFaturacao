import React from "react";
import { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, Touchable, TouchableNativeFeedback, TouchableOpacity, View, FlatList, TextInput, ScrollView, Modal } from 'react-native';
import { AuthContext } from "../../../Context/AuthContext";
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../../config';
import DatePicker from 'react-native-date-picker'
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';



function Item({ item, onPress }) {
  const {getArtigoID} = useContext(AuthContext);
  const [nomeArtigo, setNomeArtigo] = useState();
  getArtigoID(item.artigo).then((res)=>{
    setNomeArtigo(res.data.data.Nome)
  })
  return (
    <View>
      <Text>Artigo: {nomeArtigo} | Preço: {item.preco} € | QTD: {item.qtd} | Total: {Number(item.preco) * Number(item.qtd)} €</Text>
      <Button title="Remover" color="#bf4346" onPress={onPress} />
    </View>
  );
}


export default function CriarTransporte({ navigation }) {

  const { getGuiasTransporte } = useContext(AuthContext);
  const { getClientes } = useContext(AuthContext);
  const { getclienteID } = useContext(AuthContext)
  const { getArtigos } = useContext(AuthContext);
  const { addGuiasTransporte } = useContext(AuthContext);
  var coisa;

  /*const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
  });*/
  const [dadosClientes, setDadosClientes] = useState([]);
  const [dadosArtigos, setDadosArtigos] = useState([]);
  //const [cliente, setCliente] = useState();
  //const [linhas, setLinhas] = useState([]);
  const [datei, setDatei] = useState(null);
  const [open, setOpen] = useState(false);

  const [datev, setDatev] = useState(null);
  const [openv, setOpenV] = useState(false);

  const [datec, setDatec] = useState(null);
  const [openc, setOpenc] = useState(false);

  const [dateCTime, setDateCTime] = useState(null);
  const [openCTime, setOpenCTime] = useState(false);

  const [dated, setDated] = useState(null);
  const [opend, setOpend] = useState(false);

  const [dateDTime, setDateDTime] = useState(null);
  const [openDTime, setOpenDTime] = useState(false);

  const [artigo, setArtigo] = useState();
  const [quantidade, setQuantidade] = useState();
  const [preco, setPreco] = useState();
  const [listKey, setListKey] = useState(0);
  const [precoPVP, setPrecoPVP] = useState();
  const [iva, setIva] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);

  const [descricaoC, setDescricaoL ] = useState("Artigo+Geral");
  const [retencaoC, setRetencaoL ] = useState("0");
  

    //Dados para addGuiaTransporte

    //Cliente
    const [clienteC, setCliente] = useState();

    //Carga
    const [dataCargaC, setDataCarga] = useState("12/12/2022");
    const [horaCargaC, setHoraCarga] = useState("20:20");
    const [matriculaC, setMatricula] = useState("26-SD-53");
    const [enderecoC, setEnderecoCarga] = useState("Rua Falsa");
    const [codigoPostalC, setCodigoPostalCarga] = useState("4567-456");
    const [cidadeC, setCidadeCarga] = useState("Mogege");
    const [distritoC, setDistritoCarga] = useState("Porto");
    const [paisC, setPaisCarga] = useState("Portugal");

    //Descarga
    const [dataDescargaD, setDataDescarga] = useState("12/12/2022");
    const [horaDescargaD, setHoraDescarga] = useState("20:20");
    const [enderecoD, setEnderecoDescarga] = useState("Rua Falsa");
    const [codigoPostalD, setCodigoPostalDescarga] = useState("4567-456");
    const [cidadeD, setCidadeDescarga] = useState("Mogege");
    const [distritoD, setDistritoDescarga] = useState("Porto");
    const [paisD, setPaisDescarga] = useState("Portugal");
    
    //Guia
    const [serieG, setSerie] = useState(3);
    const [numeroG, setNumero] = useState(0);
    const [dataG, setData] = useState("12/12/2022");
    const [validadeG, setValidade] = useState("12/12/2022");
    const [vencimentoG, setVencimento] = useState(0);
    const [moedaG, setMoeda] = useState(1);
    const [referenciaG, setReferencia] = useState("Ref. Documento");
    const [descontoG, setDesconto] = useState(0);
    const [observacoesG, setObservacoes] = useState("Observacoes");

    //Linha de artigo
    const [LinhasG, setLinhas] = useState([]);

    //Extra
    const [finalizarDocumentoG, setFinalizarDocumento] = useState(0);
    const [precisaBancoG, setPrecisaBanco] = useState(0);


  const onSubmit = (data) => {
    setLinhas([...LinhasG, data]);
  }

  if (!dadosArtigos.length) {
    getArtigos().then((res) => {
      setDadosArtigos(res.data.aaData)
      console.log(res.data.aaData)
    });
  }
  if (!dadosClientes.length) {
    getClientes().then((res) => {
      console.log(res.data)
      setDadosClientes(res.data.aaData)
      
    });
    getGuiasTransporte().then((res) => {
      console.log(res.data);

    })
  }
  
  const removeItem = (index) => {
    setLinhas(LinhasG.filter((_, i) => i !== index));
  }

  console.log(LinhasG);

  const [selectedIdCliente, setSelectedIdCliente] = useState(null);
  const [selectedIdArtigo, setSelectedIdArtigo] = useState(null);

  handleCreateGuiaTransporte = () => {

    console.log(clienteC + ' É aqui cepo');
    console.log(serieG + ' É aqui cepo');
    console.log(numeroG + ' É aqui cepo');
    console.log(dataG + ' É aqui cepo');
    console.log(validadeG + ' É aqui cepo');
    console.log(referenciaG + ' É aqui cepo');
    console.log(vencimentoG + ' É aqui cepo');
    console.log(moedaG + ' É aqui cepo');
    console.log(descontoG + ' É aqui cepo');
    console.log(observacoesG + ' É aqui cepo');
    console.log(dataCargaC + ' É aqui cepo');
    console.log(horaCargaC + ' É aqui cepo');
    console.log(enderecoC + ' É aqui cepo');
    console.log(codigoPostalC + ' É aqui cepo');
    console.log(cidadeC + ' É aqui cepo');
    console.log(paisC + ' É aqui cepo');
    console.log(dataDescargaD + ' É aqui cepo');
    console.log(horaDescargaD + ' É aqui cepo');
    console.log(enderecoD + ' É aqui cepo');
    console.log(codigoPostalD + ' É aqui cepo');
    console.log(cidadeD + ' É aqui cepo');
    console.log(paisD + ' É aqui cepo');
    console.log(matriculaC + ' É aqui cepo');
    console.log(distritoC + ' É aqui cepo');
    console.log(distritoD + ' É aqui cepo');
    console.log(JSON.stringify(LinhasG) + ' É aqui cepo');
    console.log(finalizarDocumentoG + ' É aqui cepo');
    console.log(precisaBancoG + ' É aqui cepo');
    
    addGuiasTransporte(clienteC, serieG, numeroG, dataG, validadeG, referenciaG, vencimentoG, moedaG, 
        descontoG, observacoesG, dataCargaC, horaCargaC, enderecoC, codigoPostalC, cidadeC, 
        paisC, dataDescargaD, horaDescargaD, enderecoD, codigoPostalD, cidadeD, paisD, matriculaC, 
        distritoC, distritoD, LinhasG, finalizarDocumentoG, precisaBancoG).then(response => {
        console.log(response + ' Resposta Criar Guia de Transporte')
    });
}

  return (
    <ScrollView>
    <View style={styles.container}>

      <View style={{marginTop: 10}}>
        <Button  title="Novo Cliente" color="#d0933f" onPress={() => navigation.navigate("GesFaturação - Criar Cliente")} />
        <Text style={styles.titleSelect}>Cliente</Text>
        <View style={styles.borderMargin}>
        <Picker  style={styles.pickerComponent} placeholder="Selecione um cliente" selectedValue={selectedIdCliente} onValueChange={itemValue => {
          setSelectedIdCliente(itemValue); 
          setCliente(itemValue[0]);}}>
          {dadosClientes.map(function (object, i) {
            return <Picker.Item label={object[2]} value={object[0]} key={i} />;
          })}
        </Picker>
        </View>

      <View style={{marginTop: 10}}>
      <Button color="#d0933f"
        title="Dados Carga"
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
            
            <Text style={styles.titleSelect}>Data Carga</Text>
            <View style={styles.borderMargin}>
            <TouchableOpacity  onPress={() => setOpenc(true)} style={styles.touchableO}>
            <DatePicker
            modal
            mode="date"
            open={openc}
            date={new Date()}
            onConfirm={(datec) => {
              setOpenc(false)
              
              setDatec(datec);
              setDataCarga(moment(datec).format("DD/MM/YYYY"));
            }}
            onCancel={() => {
              setOpenc(false)
            }}
            />
          
            <Text style={styles.textDate}> {todacDate = moment(datec).format("DD/MM/YYYY") }</Text>

            </TouchableOpacity>
            </View>

            <Text style={styles.titleSelect}>Hora Carga</Text>
              <View style={styles.borderMargin}>
              <TouchableOpacity  onPress={() => setOpenCTime(true)} style={styles.touchableO}>
              <DatePicker
              modal
              mode="time"
              open={openCTime}
              date={new Date()}
              onConfirm={(dateCTime) => {
                setOpenCTime(false)
                
                setDateCTime(dateCTime);
                setHoraCarga(moment(dateCTime).format("hh:mm"));
              }}
              onCancel={() => {
                setOpenCTime(false)
              }}
            />
            
            <Text style={styles.textDate}> {todaCTDate = moment(dateCTime).format("hh:mm") }</Text>

            </TouchableOpacity>
            </View>

            <Text style={styles.titleSelect}>Matricula</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={matriculaC}
              onChangeText={(text) => setMatricula(text)}
              placeholder="Matricula"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>

            <Text style={styles.titleSelect}>Endereço</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={enderecoC}
              onChangeText={(text) => setEnderecoCarga(text)}
              placeholder="Endereço"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>    

            <Text style={styles.titleSelect}>Codigo Postal</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={codigoPostalC}
              onChangeText={(text) => setCodigoPostalCarga(text)}
              placeholder="Codigo Postal"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>  

            <Text style={styles.titleSelect}>Cidade</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={cidadeC}
              onChangeText={(text) => setCidadeCarga(text)}
              placeholder="Cidade"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>

            <Text style={styles.titleSelect}>Distrito</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={distritoC}
              onChangeText={(text) => setDistritoCarga(text)}
              placeholder="Distrito"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>

            <Text style={styles.titleSelect}>Pais</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={paisC}
              onChangeText={(text) => setPaisCarga(text)}
              placeholder="Pais"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
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


      <View style={{marginTop: 10}}>
      <Button color="#d0933f"
        title="Dados Descarga"
        onPress={() => setModal2Visible(true)}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal2Visible}
        onRequestClose={() => setModa2lVisible(false)}
      >
        <ScrollView>
          <View>
            
            <Text style={styles.titleSelect}>Data Descarga</Text>
            <View style={styles.borderMargin}>
            <TouchableOpacity  onPress={() => setOpend(true)} style={styles.touchableO}>
            <DatePicker
            modal
            mode="date"
            open={opend}
            date={new Date()}
            onConfirm={(dated) => {
              setOpend(false)
              
              setDated(dated);
              setDataDescarga(moment(dated).format("DD/MM/YYYY"));
            }}
            onCancel={() => {
              setOpend(false)
            }}
            />
          
            <Text style={styles.textDate}> {todadDate = moment(dated).format("DD/MM/YYYY") }</Text>

            </TouchableOpacity>
            </View>

            <Text style={styles.titleSelect}>Hora Descarga</Text>
              <View style={styles.borderMargin}>
              <TouchableOpacity  onPress={() => setOpenDTime(true)} style={styles.touchableO}>
              <DatePicker
              modal
              mode="time"
              open={openDTime}
              date={new Date()}
              onConfirm={(dateDTime) => {
                setOpenDTime(false)
                
                setDateDTime(dateDTime);
                setHoraDescarga(moment(dateDTime).format("hh:mm"));
              }}
              onCancel={() => {
                setOpenDTime(false)
              }}
            />
            
            <Text style={styles.textDate}> {todaDTDate = moment(dateDTime).format("hh:mm") }</Text>

            </TouchableOpacity>
            </View>

            <Text style={styles.titleSelect}>Endereço</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={enderecoD}
              onChangeText={(text) => setEnderecoDescarga(text)}
              placeholder="Endereço"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>    

            <Text style={styles.titleSelect}>Codigo Postal</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={codigoPostalD}
              onChangeText={(text) => setCodigoPostalDescarga(text)}
              placeholder="Codigo Postal"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>  

            <Text style={styles.titleSelect}>Cidade</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={cidadeD}
              onChangeText={(text) => setCidadeDescarga(text)}
              placeholder="Cidade"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>

            <Text style={styles.titleSelect}>Distrito</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={distritoD}
              onChangeText={(text) => setDistritoDescarga(text)}
              placeholder="Distrito"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>

            <Text style={styles.titleSelect}>Pais</Text>
            <View style={styles.borderMargin}>
            <TextInput
              value={paisD}
              onChangeText={(text) => setPaisDescarga(text)}
              placeholder="Pais"
              keyboardType="default"
            // ref={register({name: "quantidade"})} 
            />
            </View>

            <View style={{marginTop: 10}}>
            <Button color="#d0933f"
              title="Fechar"
              onPress={() => setModal2Visible(false)}
            />
            </View>
          </View>
        </ScrollView>
      </Modal>

      <View style={{marginTop: 10}}>
      <Button color="#d0933f"
        title="Dados Guia"
        onPress={() => setModal3Visible(true)}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal3Visible}
        onRequestClose={() => setModa3lVisible(false)}
      >
        <ScrollView>
          <View>
            
          <Text style={styles.titleSelect}>Serie</Text>
        <View style={styles.borderMargin}>
        <Picker
          selectedValue={serieG}
          onValueChange={(itemValue) => setSerie(itemValue)}
        >

          <Picker.Item label="2022" value="3" />
          <Picker.Item label="2023A" value="6" />
        </Picker>
        </View>

        <Text style={styles.titleSelect}>Data</Text>
        <View style={styles.borderMargin}>
        <TouchableOpacity  onPress={() => setOpen(true)} style={styles.touchableO}>
        <DatePicker
        modal
        mode="date"
        open={open}
        date={new Date()}
        onConfirm={(datei) => {
          setOpen(false)
          
          setDatei(datei);
          setData(moment(datei).format("DD/MM/YYYY"));
          setValidade(moment(datei).format("DD/MM/YYYY"));
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      
      <Text style={styles.textDate}> {todaiDate = moment(datei).format("DD/MM/YYYY") }</Text>

      </TouchableOpacity>
      </View>

      <Text style={styles.titleSelect}>Vencimento</Text>
        <View style={styles.borderMargin}>
        <TextInput
          value={vencimentoG}
          onChangeText={(text) => setVencimento(text)}
          placeholder="Vencimento"
          keyboardType="numeric"
        // ref={register({name: "quantidade"})} 
        />
        </View>

        <Text style={styles.titleSelect}>Moeda</Text>
        <View style={styles.borderMargin}>
        <Picker
          selectedValue={moedaG}
          onValueChange={(itemValue) => setMoeda(itemValue)}
        >

          <Picker.Item label="Euro (€)" value="1" />
          <Picker.Item label="Libra ING (GBP)" value="2" />
          <Picker.Item label="Dólar USA ($)" value="3" />
          <Picker.Item label="Real Br. (R$)" value="4" />
          <Picker.Item label="Fr. Suiço (CHF)" value="5" />
        </Picker>
        </View>

        <Text style={styles.titleSelect}>Referencia</Text>
        <View style={styles.borderMargin}>
        <TextInput
          value={referenciaG}
          onChangeText={(text) => setReferencia(text)}
          placeholder="Referencia"
          keyboardType="default"
        // ref={register({name: "quantidade"})} 
        />
        </View>

        <Text style={styles.titleSelect}>Desconto</Text>
        <View style={styles.borderMargin}>
        <TextInput
          value={descontoG}
          defaultValue={0}
          onChangeText={(text) => setDesconto(text)}
          placeholder="Desconto"
          keyboardType="numeric"
        // ref={register({name:"preco"})}
        />
        </View>

        <Text style={styles.titleSelect}>Observações</Text>
        <View style={styles.borderMargin}>
        <TextInput
          value={observacoesG}
          onChangeText={(text) => setObservacoes(text)}
          placeholder="Observações"
          keyboardType="default"
        // ref={register({name: "quantidade"})} 
        />
        </View>

            <View style={{marginTop: 10}}>
            <Button color="#d0933f"
              title="Fechar"
              onPress={() => setModal3Visible(false)}
            />
            </View>
          </View>
        </ScrollView>
      </Modal>

      <View style={{marginTop: 10}}>
      <Button color="#d0933f"
        title="Inserir Artigo"
        onPress={() => setModal4Visible(true)}
      />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal4Visible}
        onRequestClose={() => setModa4lVisible(false)}
      >
        <ScrollView>
          <View>

            
        <Text style={styles.titleSelect}>Artigo</Text>
        <View style={styles.borderMargin}>
        <Picker placeholder="Selecione um Artigo"
          selectedValue={artigo} onValueChange={itemValue => {
            setArtigo(itemValue);
            setSelectedIdArtigo(itemValue[0]);
            setPrecoPVP(itemValue[4]);
            setDescricaoL(itemValue[1]);
          }} >
          {dadosArtigos.map(function (object, i) {
            return <Picker.Item label={object[1]} value={object} key={i} />;
          })}
        </Picker>
        </View>
        {/* {errors.artigo && <Text>{errors.artigo.message}</Text>} */}
        <Text style={styles.titleSelect}>Quantidade</Text>
        <View style={styles.borderMargin}>
        <TextInput
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
          placeholder="Quantidade"
          keyboardType="numeric"
        // ref={register({name: "quantidade"})} 
        />
        </View>
        {/* {errors.quantidade && <Text>{errors.quantidade.message}</Text>} */}
        <Text style={styles.titleSelect}>Preço</Text>
        <View style={styles.borderMargin}>
        <TextInput
          value={precoPVP}
          defaultValue={precoPVP}
          onChangeText={(text) => setPrecoPVP(text)}
          placeholder="Preço Unitário"
          keyboardType="numeric"
        // ref={register({name:"preco"})}
        />
        </View>
        <Text style={styles.titleSelect}>Imposto</Text>
        <View style={styles.borderMargin}>
        <Picker
          selectedValue={iva}
          onValueChange={(itemValue) => setIva(itemValue)}
        >

          <Picker.Item label="23%" value="1" />
          <Picker.Item label="13%" value="2" />
          <Picker.Item label="6%" value="3" />
          <Picker.Item label="0%" value="4" />
        </Picker>
        </View>
        
        {/* {errors.preco && <Text>{errors.preco.message}</Text>} */}
        <View style={{marginBottom: 10, marginTop: 10}}>
        <Button title="Adicionar" color="#d0933f" onPress={() => {
          setLinhas([...LinhasG, {
            artigo: selectedIdArtigo, descricao: descricaoC, qtd: quantidade, preco: precoPVP, imposto: iva, motivo: null, desconto: descontoG, retencao: retencaoC
          }]);
          setListKey(listKey + 1);
        }}
        />
        </View>

            <View style={{marginTop: 10}}>
              <Button color="#d0933f"
               title="Fechar"
               onPress={() => setModal4Visible(false)}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>


        <Text style={styles.titleSelect}>Finalizar Documento</Text>
        <View style={styles.borderMargin}>
        <Picker
          selectedValue={finalizarDocumentoG}
          onValueChange={(itemValue) => setFinalizarDocumento(itemValue)}
        >

          <Picker.Item label="Rascunho" value="0" />
          <Picker.Item label="Aberto" value="1" />
        </Picker>
        </View>
        
      </View>

      <Text style={styles.titleSelect}>Linha de Artigos</Text>
      <FlatList
        data={LinhasG}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Item item={item} onPress={() => removeItem(index)} />
        )}
      />
      <View style={{marginTop: 30, width: 350}}>
      <Button  title="Criar Guia Transporte" color="#d0933f" onPress={() => handleCreateGuiaTransporte()} />
      </View>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#d0933f',
    marginTop: 16,
    width: 300,
    padding: 10,
  },
  textfont: {
    color: "#ffffff",
    fontSize: 16,
    fontweight: "bold"

  },
  titleSelect: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
    color: "#5F5D5C"
  },
  pickerComponent: {
    width: 350,
    
  },
  borderMargin: {
    borderWidth: 1,
    borderColor: 'grey',
    
  },
  touchableO: {
    width: 350,
    height: 55,
    justifyContent: "center"
  }
});

