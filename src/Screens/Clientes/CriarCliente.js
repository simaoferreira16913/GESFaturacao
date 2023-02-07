import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,TextInput,Touchable, Alert, 
  TouchableNativeFeedback, TouchableOpacity, View , ScrollView,ToastAndroid} from 'react-native';
import { AuthContext } from "../../Context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';

const schema = yup.object({
  Nome: yup.string().required("Digite o nome do Cliente"),
  Nif: yup.number("Digite apenas numeros").required("Digite o numero do cliente").positive().integer().min(9,"O nif deve ter pelo menos nove digitos"),
  CodigoPostal: yup.number().positive().integer().min(4),
  Email: yup.string().email(),

})

export default function CriarCliente({navigation}) {
  
  const { control,register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver:yupResolver(schema)
  });
  
  const {criarCliente} = useContext(AuthContext);
  function submitcliente(data){
    
      criarCliente(data)
      navigation.navigate('GesFaturação');
      ToastAndroid.show("Cliente Criado ", ToastAndroid.SHORT);
  }

    
     


     
    
    return (
      <ScrollView>
      <View style={styles.container}>
       <Text style={styles.titleSelect}>Nome*</Text>
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
          <Text style={styles.titleSelect}>NIF*</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Nif"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nif"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>País</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Pais"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="País"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Endereço</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Endereco"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Endereço"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Código-Postal</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="CodigoPostal"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Código Postal"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Região</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Regiao"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Região"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Cidade</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Cidade"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Cidade"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Email</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Email"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Website</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Website"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Website"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Telemóvel</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Telemovel"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Telemovel"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Telefone</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Telefone"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Telefone"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Fax</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Fax"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Fax"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Vencimento</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Vencimento"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Vencimento"
              />
          )}
          />
          </View>
          <Text style={styles.titleSelect}>Desconto</Text>
          <View style={styles.borderMargin}>
          <Controller 
          control={control}
          name="Desconto"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Desconto"
              />
          )}
          />
          </View>
          <View style={{margin: 10}}>
          <Button
          title="Criar Cliente" color='#d0933f'
          onPress={handleSubmit(submitcliente)}
        />
        </View>
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