import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';


export default function MainGuias({navigation}) {

  return (
    <View style={styles.outerContainer}>
    <Text style={styles.paddingBottom}>Menu Documentos Transporte</Text>
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.menuButton, styles.shadow]}
      onPress={() => navigation.navigate("GesFaturação - Guias Transporte")}>
      <Text style={styles.menuText}>Guias Transporte</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.menuButton, styles.shadow]}
      onPress={()=> navigation.navigate("GesFaturação - Guias Remessa")}>
      <Text style={styles.menuText}>Guias Remessa</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.menuButton, styles.shadow]}
      onPress={() => navigation.navigate("GesFaturação - Guias Devolução")}>
      <Text style={styles.menuText}>Guias Devolução</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.menuButton, styles.shadow]}
      onPress={() => navigation.navigate("GesFaturação - Guias Ativos")}>
      <Text style={styles.menuText}>Guias Ativos</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.menuButton, styles.shadow]}
      onPress={() => navigation.navigate("GesFaturação - Guias Consignação")}>
      <Text style={styles.menuText}> Guias Consignação </Text>
    </TouchableOpacity>
  </View>

  <Image source={require('../assets/logotipoMini.png')}/>
  
</View>
);
};

const styles = StyleSheet.create({

outerContainer: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#e5e9ec',
},
container: {
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center',
backgroundColor: '#e5e9ec',
padding: 10,
},
menuButton: {
padding: 10,
backgroundColor: '#d0933f',
marginVertical: 5,
width: 220,
height: 50,
alignItems: "center"
},
menuText: {
fontSize: 20,
fontWeight: "bold",
color:'#ffffff',
},
header: {
backgroundColor: '#e5e9ec',
padding: 12,
alignItems: 'center',
flexDirection: 'row',
},
logo: {
width: 32,
height: 32,
marginRight: 10,
},
headerText: {
fontSize: 20,
},
button: {
marginTop: 50,
},
shadow: {
shadowColor: '#000',
shadowOffset: {
  width: 0,
  height: 2,
},
shadowOpacity: 0.05,
shadowRadius: 4,
elevation: 5,
},
paddingBottom: {
paddingBottom: 5,
paddingTop: 10,
fontSize: 20,
fontWeight: "bold",
}
});