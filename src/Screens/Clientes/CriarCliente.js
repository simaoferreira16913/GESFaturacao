import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,TextInput,Touchable, Alert, 
  TouchableNativeFeedback, TouchableOpacity, View , ScrollView} from 'react-native';
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
    resolver:yupResolver()
  });
  
  const {criarCliente} = useContext(AuthContext);
  function submitcliente(data){
    
      criarCliente(data)
  }

    
     


     
    
    return (
      <ScrollView>
       <View style={styles.container}>
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
          <Button
          title="Criar Cliente" color='#d0933f'
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
      alignItems: 'center',
      justifyContent: 'flex-start',
      
    },
});