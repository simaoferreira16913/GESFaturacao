import React from "react";
import { useState, useEffect,useContext } from 'react';
import { Button, StyleSheet, Text,Touchable, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { AuthContext } from "../../Context/AuthContext";

export default function CriarCliente({navigation}) {
   
    const {addOrcamentos} = useContext(AuthContext);
    const {addCliente} = useContext(AuthContext);

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
    const [codigo_interno, setCodigoInterno] = useState(null)


    return (
      <View style={styles.container}>
                
         
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            value={nif}
            onChangeText={text => this.setNif(text)}
            placeholder="NIF"
            keyboardType = 'numeric'
          />

<TextInput 
  style={styles.textInput}
  keyboardType = 'numeric'
  onChangeText = {(text)=> this.onChanged(text)}
  value = {this.state.myNumber}
/> 

onTextChanged(text) {
  // code to remove non-numeric characters from text
  this.setState({myNumber: text})
}

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          
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