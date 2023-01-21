import React from "react";
import { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, Touchable, TouchableNativeFeedback, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";
import { Picker } from '@react-native-picker/picker';
import { BASE_URL } from '../../config';
import DatePicker from 'react-native-date-picker'
import { useForm } from 'react-hook-form';
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
      <Button title="Remover" onPress={onPress} />
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
    <View style={styles.container}>



      <View >
        <TouchableNativeFeedback onPress={() => navigation.navigate("GesFaturação-Criar Cliente")}>
          <View style={styles.button}>

            <Text style={styles.textfont}>   Novo Cliente</Text>
          </View>
        </TouchableNativeFeedback>
        <Picker placeholder="Selecione um cliente" selectedValue={selectedIdCliente} onValueChange={itemValue => setSelectedIdCliente(itemValue)}>
          {dadosClientes.map(function (object, i) {
            return <Picker.Item label={object[2]} value={object[0]} key={i} />;
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
        {/* {errors.artigo && <Text>{errors.artigo.message}</Text>} */}
        <TextInput
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
          placeholder="Quantidade"
          keyboardType="numeric"
        // ref={register({name: "quantidade"})} 
        />
        {/* {errors.quantidade && <Text>{errors.quantidade.message}</Text>} */}
        <TextInput
          value={precoPVP}
          defaultValue={precoPVP}
          onChangeText={(text) => setPrecoPVP(text)}
          placeholder="Preço Unitário"
          keyboardType="numeric"
        // ref={register({name:"preco"})}
        />
        <Picker
          selectedValue={iva}
          onValueChange={(itemValue) => setIva(itemValue)}
        >

          <Picker.Item label="23%" value="1" />
          <Picker.Item label="13%" value="2" />
          <Picker.Item label="6%" value="3" />
          <Picker.Item label="0%" value="4" />
        </Picker>
        {/* {errors.preco && <Text>{errors.preco.message}</Text>} */}
        <Button title="Adicionar" onPress={() => {
          setLinhas([...linhas, {
            artigo: selectedIdArtigo, qtd: quantidade, preco: precoPVP, iva: iva
          }]);
          setListKey(listKey + 1);
        }}
        />
      </View>
      <FlatList
        data={linhas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Item item={item} onPress={() => removeItem(index)} />
        )}
      />
      <Button title="Criar Orçamento" onPress={handleCreateOrcamento} />
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
    alignItems: 'center',
    backgroundColor: '#d0933f',
    marginTop: 16,
    width: 300,
    padding: 10,
  },
});

