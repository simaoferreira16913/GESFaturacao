import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,TextInput,Touchable, Alert, 
  TouchableNativeFeedback, TouchableOpacity, View , ScrollView} from 'react-native';
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";


export default function CriarCliente({navigation}) {
   
  const { control,register, handleSubmit, watch, formState: { errors } } = useForm();
    
      this.textInput = React.createRef();
    

    const {addCliente} = useContext(AuthContext);
     
    const [textNif,setTextNif] = useState()
    const [nif, setNif] = useState()
    const [nome, setNome] = useState()
    const [endereco, setEnderenco] = useState()
    const [codPostal, setCodPostal] = useState()
    const [regiao, setRegiao] = useState()
   
    const [cidade, setCidade] = useState()
    const [pais, setPais] = useState()
    const [email, setEmail] = useState()
    const [website, setWebsite] = useState()
    const [tlm, setTlm] = useState()
    const [tlf, setTlf] = useState()
    const [fax, setFax] = useState()
    const [vencimento, setVencimento] = useState()
    const [desconto, setDesconto] = useState()
    
   /* const dadosCliente={Nome:"nome", Nif:"193047663", Pais:"PT",Endereco:"endereco",CodigoPostal:4755-123,
    Regiao:0, Cidade:0,Email:"teste@teste.com",Website:"teste@teste.com",Telemovel:968000000,Telefone:252000000
    ,Fax:252000001, Vencimento:0, Desconto:0};
    const dadosCli={Nome:nome, Nif:textNif, Pais:pais,Endereco:endereco,CodigoPostal:codPostal,
                Regiao:regiao, Cidade:cidade,Email:email,Website:website,Telemovel:tlm,Telefone:tlf
                ,Fax:fax, Vencimento:0, Desconto:0};*/

    const {criarCliente} = useContext(AuthContext);
     


      submitcliente = () => {
        criarCliente(this.state.newCliente)
    }

   function validateInputs(text, type) {
      let numreg = /^[0-9]+$/;
      
        if (type == 'nif') {
          if (numreg.test(text)) {
            //ok
            console.log(text)
            setTextNif(text)
          } 
          else {
            //nao ok
            text = null
            Alert.alert("Digite Apenas numeros")
            setTextNif('')
          } 
        
        }
        if(type == 'codpostal'){
          if (numreg.test(text)) {
            //ok
            setCodPostal(text)
          } 
          else {
            //nao ok
            text = null
            Alert.alert("Digite Apenas numeros")
            setCodPostal('')
          }
        }
        if(type == 'tlm'){
          if (numreg.test(text)) {
            //ok
            setTlm(text)
          } 
          else {
            //nao ok
            text = null
            Alert.alert("Digite Apenas numeros")
            setTlm('')
          }
        }
        if(type == 'tlf'){
          if (numreg.test(text)) {
            //ok
            setTlf(text)
          } 
          else {
            //nao ok
            text = null
            Alert.alert("Digite Apenas numeros")
            setTlf('')
          }
        }
        if(type == 'fax'){
          if (numreg.test(text)) {
            //ok
            setFax(text)
          } 
          else {
            //nao ok
            text = null
            Alert.alert("Digite Apenas numeros")
            setTlf('')
          }
        }
        if(type == 'vencimento'){
          if (numreg.test(text)) {
            //ok
            setVencimento(text)
          } 
          else {
            //nao ok
            text = null
            Alert.alert("Digite Apenas numeros")
            setVencimento('')
          }
        }
    }
    
    return (
       <form>

       </form>
      
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