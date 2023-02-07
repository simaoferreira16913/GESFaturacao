import React, { useContext} from 'react';
//import { Button, StyleSheet, Text, View, Image} from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../Context/AuthContext';


export default function Home({navigation}) {

  const {logout} = useContext(AuthContext);

  const entrar = () =>{
    navigation.navigate("Ecra2")
  }

  return (
    <View style={styles.outerContainer}>
        <Text style={styles.paddingBottom}>Menu</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.menuButton, styles.shadow]}
          onPress={() => navigation.navigate("GesFaturação - Orçamentos")}>
          <Text style={styles.menuText}>Orçamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, styles.shadow]}
          onPress={() => navigation.navigate("GesFaturação - Proformas")}>
          <Text style={styles.menuText}>Proformas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, styles.shadow]}
          onPress={() => navigation.navigate("GesFaturação - Doc. de Transporte")}>
          <Text style={styles.menuText}>Doc. de Transporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, styles.shadow]}
          onPress={() => navigation.navigate("GesFaturação - Vendas")}>
          <Text style={styles.menuText}>Vendas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, styles.shadow]}
          onPress={() => navigation.navigate("GesFaturação - Compras")}>
          <Text style={styles.menuText}>Compras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, styles.shadow]}
          onPress={() => navigation.navigate("GesFaturação - Analise")}>
          <Text style={styles.menuText}>Análise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuButton, styles.shadow]}
          onPress={() => navigation.navigate("GesFaturação - Tabelas")}>
          <Text style={styles.menuText}>Tabelas</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('./assets/logotipoMini.png')}/>
      
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={[styles.logoutButton, styles.shadow]}
          onPress={() => {logout()}}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
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
    width: 210,
    height: 50,
    alignItems: "center"
  },
  menuText: {
    fontSize: 20,
    fontWeight: "bold",
    color:'#ffffff',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#bf4346',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "bold",
    color:'#ffffff',},
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