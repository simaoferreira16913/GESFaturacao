import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,TextInput,Touchable, Alert, 
  TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";

export default function CriarCliente({navigation}) {
   

    
      this.textInput = React.createRef();
    
    const {addOrcamentos} = useContext(AuthContext);
    const {addCliente} = useContext(AuthContext);

    const [textNif,setTextNif] = useState()
    const [nif, setNif] = useState(null)
    const [nome, setNome] = useState(null)
    const [codInterno, setCodInterno] = useState(null)
    const [endereco, setEnderenco] = useState(null)
    const [codPostal, setCodPostal] = useState(null)
    const [localidade, setLocalidade] = useState(null)
    const [distrito, setDistrito] = useState(null)
    const [cidade, setCidade] = useState(null)
    const [pais, setPais] = useState(null)
    const [email, setEmail] = useState(null)
    const [website, setWebsite] = useState(null)
    const [tlm, setTlm] = useState(null)
    const [tlf, setTlf] = useState(null)
    const [fax, setFax] = useState(null)
    const [preferencial_nome, setPreferencial_nome] = useState(null)
    const [preferencial_email, setPreferencial_email] = useState(null)
    const [preferencial_tlm, setPreferencial_tlm] = useState(null)
    const [preferencial_tlf, setPreferencial_tlf] = useState(null)
    const [pagamento, setPagamento] = useState(null)
    const [vencimento, setVencimento] = useState(null)
    const [desconto, setDesconto] = useState(null)
    const [flagContaGeral, setFlagContaGeral] = useState(null)
    const [codigo_interno, setCodigoInterno] = useState(null);

    const {criarCliente} = useContext(AuthContext);

    function onChanged(text) {
      let newText='';
      let numbers = '0123456789';

      for (var i=0; i< text.lenght; i++){
        if(numbers.indexOf(text[i]) > -1){
          newText = newText + text[i];
          console.log(newText)
        }
        else {
          Alert.alert("Digite apenas números")
          
        }
      }
      console.log(newText)
      setNif(newText)
      
    }


   function validateInputs(text, type) {
      let numreg = /^[0-9]+$/;
      console.log("e")
        if (type == 'nif') {
          if (numreg.test(text)) {
            //ok
            setTextNif(text)
          } else {
            //nao ok
            text = null
            Alert.alert("Digite Apenas numeros")
            setTextNif('')
          } 
        
        }
    }
    return (
      <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text>Nif</Text>
          <TextInput
            style={styles.input}
            value={textNif}
            onChangeText={(text) => validateInputs(text, 'nif')}
            placeholder="NIF"
            keyboardType = 'numeric'
          />
          

        <Button
          title="Criar Cliente" color='#d0933f'
          onPress={() => {addCliente()}}
        />
        </View>
      
        
  
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