import React from "react";
import { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, Touchable, TouchableNativeFeedback, TouchableOpacity, View, FlatList, TextInput,ScrollView } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../../config';
import DatePicker from 'react-native-date-picker'
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';
//import {yupResolver} from '@hookform/resolvers/yup'
//import * as yup from 'yup';

/*const schema = yup.object().shape({
    //artigo: yup.required("Selecione um artigo"),
    quantidade: yup.number().required("Insira a quantidade")
      .positive("A quantidade deve ser positiva")
        .integer("A quantidade deve ser inteira"),
    preco: yup.number().required("Inserira o preco")
    .positive("O preço deve ser positivo").min(0.01,"Insira um preço válido")
});*/


function Item({ item, onPress }) {
  const {getArtigoID} = useContext(AuthContext);
  const [nomeArtigo, setNomeArtigo] = useState();
  getArtigoID(item.artigo).then((res)=>{
    setNomeArtigo(res.data.data.Nome)
  })
  return (
    <View>
      <Text>Artigo: {nomeArtigo} Preço: {item.preco} QTD: {item.qtd} IVA: {item.iva} Total: {Number(item.preco) * Number(item.qtd)}</Text>
      <Button title="Remover" color="#d0933f" onPress={onPress} />
    </View>
  );
}


export default function CriarOrcamento({ navigation }) {

  const { getOrcamentos } = useContext(AuthContext);
  const { getClientes } = useContext(AuthContext);
  const { getclienteID } = useContext(AuthContext)
  const { getArtigos } = useContext(AuthContext);
  const {addOrcamentos} = useContext(AuthContext);
  var coisa;

  /*const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema)
  });*/
  const [dadosClientes, setDadosClientes] = useState([]);
  const [dadosArtigos, setDadosArtigos] = useState([]);
  const [cliente, setCliente] = useState();
  const [linhas, setLinhas] = useState([]);
  const [datei, setDatei] = useState(null)
  const [open, setOpen] = useState(false);
  const [artigo, setArtigo] = useState();
  const [quantidade, setQuantidade] = useState();
  const [preco, setPreco] = useState();
  const [listKey, setListKey] = useState(0);
  const [precoPVP, setPrecoPVP] = useState();
  const [iva, setIva] = useState(1);

  const onSubmit = (data) => {
    setLinhas([...linhas, data]);
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
    getOrcamentos().then((res) => {
      console.log(res.data);

    })
  }
  
  const removeItem = (index) => {
    setLinhas(linhas.filter((_, i) => i !== index));
  }

  console.log(linhas);

  const [selectedIdCliente, setSelectedIdCliente] = useState(null);
  const [selectedIdArtigo, setSelectedIdArtigo] = useState(null);
 
  function handleCreateOrcamento(){
    const dadosOrcamento = {
      cliente:cliente,
      linhas: linhas
    }
    addOrcamentos(dadosOrcamento).then((res)=>{
      console.log(res);
    })
  }
  return (
    <ScrollView>
    <View style={styles.container}>

      <View style={{marginTop: 10}}>
        <Button  title="Novo Cliente" color="#d0933f" onPress={() => navigation.navigate("GesFaturação-Criar Cliente")} />
        <Text style={styles.titleSelect}>Cliente</Text>
        <View style={styles.borderMargin}>
        <Picker  style={styles.pickerComponent} placeholder="Selecione um cliente" selectedValue={selectedIdCliente} onValueChange={itemValue => setSelectedIdCliente(itemValue)}>
          {dadosClientes.map(function (object, i) {
            return <Picker.Item label={object[2]} value={object[0]} key={i} />;
          })}
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
          
          setDatei(datei)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      
      <Text style={styles.textDate}> {todaiDate = moment(datei).format("DD/MM/YYYY") }</Text>
         
      </TouchableOpacity>
      
        </View>
        <Text style={styles.titleSelect}>Artigo</Text>
        <View style={styles.borderMargin}>
        <Picker placeholder="Selecione um Artigo"
          selectedValue={artigo} onValueChange={itemValue => {
            setArtigo(itemValue);
            setSelectedIdArtigo(itemValue[0]);
            setPrecoPVP(itemValue[4]);
            console.log("Aui", precoPVP);
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
        <Text style={styles.titleSelect}>IVA</Text>
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
          setLinhas([...linhas, {
            artigo: selectedIdArtigo, qtd: quantidade, preco: precoPVP, iva: iva
          }]);
          setListKey(listKey + 1);
        }}
        />
        </View>
      </View>
      <FlatList
        data={linhas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Item item={item} onPress={() => removeItem(index)} />
        )}
      />
      <View style={{marginTop: 30, width: 350}}>
      <Button  title="Criar Orçamento" color="#d0933f" onPress={handleCreateOrcamento} />
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

