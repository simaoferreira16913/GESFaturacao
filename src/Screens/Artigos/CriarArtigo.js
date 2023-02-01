import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,TextInput,Touchable, Alert, 
  TouchableNativeFeedback, TouchableOpacity, View , ScrollView} from 'react-native';
import { AuthContext } from "../../Context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';

const schema = yup.object({

})

export default function CriarArtigo({navigation}) {
  
  const { control,register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver()
  });
  
  const {CriarArtigo} = useContext(AuthContext);
  function submitcliente(data){
    
    CriarArtigo(data)
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
          name="Codigo"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Codigo"
              />
          )}
          />
          <Controller 
          control={control}
          name="Categoria"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Categoria"
              />
          )}
          />
          <Controller 
          control={control}
          name="Tipo"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Tipo"
              />
          )}
          />
          <Controller 
          control={control}
          name="Stock"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Stock"
              />
          )}
          />
          <Controller 
          control={control}
          name="Unidade"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Unidade"
              />
          )}
          />
          <Controller 
          control={control}
          name="PrecoPVP"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="PrecoPVP"
              />
          )}
          />
          <Controller 
          control={control}
          name="IVA"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="IVA"
              />
          )}
          />
          <Controller 
          control={control}
          name="Preco"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Preco"
              />
          )}
          />
          <Controller 
          control={control}
          name="CodigoBarras"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="CodigoBarras"
              />
          )}
          />
          <Controller 
          control={control}
          name="SerialNumber"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="SerialNumber"
              />
          )}
          />
          <Controller 
          control={control}
          name="RetencaoValor"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="RetencaoValor"
              />
          )}
          />
          <Controller 
          control={control}
          name="DescricaoLonga"
          render={({field: {onChange, onBlur, value}})=>(
              <TextInput 
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="DescricaoLonga"
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