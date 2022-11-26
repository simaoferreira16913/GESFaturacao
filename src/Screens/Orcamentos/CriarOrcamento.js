import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";

export default function CriarOrcamento({navigation}) {
   
    const {addOrcamentos} = useContext(AuthContext);
    const {insertCliente} = useContext(AuthContext);
    const {deletecliente} = useContext(AuthContext);
    const {criarClinete} = useContext(AuthContext);
    //var nome_cliente = "Joao"
    //var nif_cliente = 156213789
    /*opcao: '2',
    _token: token,
    nome_cliente: dadosCli.Nome ,
    nif_cliente: dadosCli.Nif,
    pais_cliente: dadosCli.Pais,
    endereco_cliente: dadosCli.Endereco,
    codigopostal_cliente: dadosCli.CodigoPostal,
    regiao_cliente: dadosCli.Regiao,
    cidade_cliente: dadosCli.Cidade,
    email_cliente: dadosCli.Email,
    website_cliente: dadosCli.Website,
    tlm_cliente: dadosCli.Telemovel,
    tlf_cliente: dadosCli.Telefone,
    fax_cliente: dadosCli.Fax,
    vencimento_cliente: dadosCli.Vencimento,
    desconto_cliente: dadosCli.Desconto,*/
    const dadosCli={Nome:"Joao", Nif:192047663, Pais:"PT",Endereco:"Morada",CodigoPostal:4755-123,
                Regiao:0, Cidade:0,Email:"teste@teste.com",Website:"www.oi.pt",Telemovel:968000000,Telefone:252123123
                ,Fax:252123124, Vencimento:0, Desconto:0};
    id = 4;
    return (
      <View style={styles.container}>
             <TouchableOpacity onPress={()=>criarClinete()}>
              <Text>Click</Text>
              </TouchableOpacity>   
         
        
        
  
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
});

