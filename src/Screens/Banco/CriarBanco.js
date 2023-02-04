import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,TextInput,Touchable, Alert, 
  TouchableNativeFeedback, TouchableOpacity, View , ScrollView,ToastAndroid} from 'react-native';
import { AuthContext } from "../../Context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';

const schema = yup.object({
  Nome: yup.string().required("Digite o nome do Banco"),
  Debito: yup.number().required(),
  Credito: yup.number().required()
})

export default function CriarBanco({navigation}) {
  
  const { control,register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver:yupResolver(schema)
  });
  const [sncBase, setSNCBase] = useState(12);
  const {criarBanco} = useContext(AuthContext);
  function submitcliente(data){
      let nome = data.Nome;
      let deb = data.Debito;
      let cred = data.Credito;
      console.log(nome, deb, cred)
      criarBanco(nome, sncBase , deb , cred);
      navigation.navigate('GesFaturação');
      ToastAndroid.show("Cliente Criado ", ToastAndroid.SHORT);
  }

    
     


     
    
    return (
      <ScrollView>
      <View style={styles.container}>
       <Text style={styles.titleSelect}>Nome</Text>
       <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Nome"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nome"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Débito</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Debito"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Débito"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Crédito</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Credito"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Crédito"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Rubrica</Text>
          <View style={styles.borderMargin}>
        <Picker
          selectedValue={sncBase}
          onValueChange={(itemValue) => setSNCBase(itemValue)}
        >

          <Picker.Item label="Depósitos à ordem" value="12" />
          <Picker.Item label="Outros depósitos bancários" value="13" />
        </Picker>
        </View>
        </View>
          <View style={{margin: 10}}>
          <Button
          title="Criar Banco" color='#d0933f'
          onPress={handleSubmit(submitcliente)}
        />
        
       </View>
       </ScrollView>
      
    );
  
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e5e9ec',
      
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
      marginLeft: 10,
      marginRight: 10
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