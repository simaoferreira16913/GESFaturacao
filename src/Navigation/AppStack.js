import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
//substituir pelo authstack e appstack
import Home from '../Screens/Home';
import MainOrcamento from '../Screens/Orcamentos/MainOrcamento';
import CriarOrcamento from '../Screens/Orcamentos/CriarOrcamento';
import CriarCliente from '../Screens/Clientes/CriarCliente';
import CriarArtigo from '../Screens/Artigos/CriarArtigo';
import MainArtigos from '../Screens/Artigos/MainArtigos';
import VerDetalhesOrc from '../Screens/Orcamentos/DetalhesOrcamento';
import MainFatura from '../Screens/Faturas/MainFatura';
import DetalhesFatura from '../Screens/Faturas/DetalhesFatura';
import CriarFatura from '../Screens/Faturas/CriarFatura';
import DetalhesFaturaSimp from '../Screens/FaturasSimplificadas/DetalhesFaturaSimp';
import MainFaturaSimp from '../Screens/FaturasSimplificadas/MainFaturaSimp';
import MainFaturaRec from '../Screens/FaturaRecibo/MainFaturaRec';
import MainFaturaPro from '../Screens/FaturasProforma/MainFaturaPro';
import DetalhesFaturaPro from '../Screens/FaturasProforma/DetalhesFaturaPro';
import CriarProforma from '../Screens/FaturasProforma/CriarProforma';
import CriarFaturaSimp from '../Screens/FaturasSimplificadas/CriarFaturaSimp';
import MainNotaCred from '../Screens/notasCredito/MainNotaCred';
import CriarNotaCred from '../Screens/notasCredito/CriarNotaCred';
import DetalhesNotaCred from '../Screens/notasCredito/DetalhesNotaCred';
import MainNotaDeb from '../Screens/notasDebito/MainNotaDeb';
import CriarNotaDeb from '../Screens/notasDebito/CriarNotaDeb';
import DetalhesNotaDeb from '../Screens/notasDebito/DetalhesNotaDeb';
import MainFornecedores from '../Screens/Fornecedores/MainFornecedores';
import DetalhesFornecedor from '../Screens/Fornecedores/DetalhesFornecedores';
import CriarFornecedores from '../Screens/Fornecedores/CriarFornecedores';
import DetalhesCliente from '../Screens/Clientes/DetalhesCliente';
import MainCliente from '../Screens/Clientes/MainCliente';
import MainCompra from '../Screens/Compras/MainCompra';
import DetalhesCompra from '../Screens/Compras/DetalhesCompra';
import CriarCompra from '../Screens/Compras/CriarCompra';
import DetalhesArtigo from '../Screens/Artigos/DetalhesArtigo';
import MainAnalise from '../Screens/Analise/MainAnalise';
import MainBancos from '../Screens/Banco/MainBancos';
import DetalhesBancos from '../Screens/Banco/DetalhesBancos';
import CriarBanco from '../Screens/Banco/CriarBanco';
import Tabelas from '../Screens/Tabelas';
import Vendas from '../Screens/Vendas';

//Guias
import MainGuias from '../Screens/Guias/MainGuias';
import CriarAtivos from '../Screens/Guias/Ativos/CriarAtivos';
import MainAtivos from '../Screens/Guias/Ativos/MainAtivos';
import CriarConsignacao from '../Screens/Guias/Consignacao/CriarConsignacao';
import MainConsignacao from '../Screens/Guias/Consignacao/MainConsignacao';
import CriarDevolucao from '../Screens/Guias/Devolucao/CriarDevolucao';
import MainDevolucao from '../Screens/Guias/Devolucao/MainDevolucao';
import CriarRemessa from '../Screens/Guias/Remessa/CriarRemessa';
import MainRemessa from '../Screens/Guias/Remessa/MainRemessa';
import CriarTransporte from '../Screens/Guias/Transporte/CriarTransporte';
import MainTransporte from '../Screens/Guias/Transporte/MainTransporte';
import DetalhesTransporte from '../Screens/Guias/Transporte/DetalhesTransporte';

const Stack = createNativeStackNavigator();

const Logo = () => (
  <Image
  source={require('../Screens/assets/logotipo.png')}
  style={{ width: 40, height: 40, marginRight: 10}}
  />
  );

const AppStack = () => {

    return (
      <Stack.Navigator>
        <Stack.Screen name="GesFaturação" component={Home} options={{headerLeft: () => <Logo />}}/>
        <Stack.Screen name="GesFaturação - Orçamentos" component={MainOrcamento} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Orçamento' component={CriarOrcamento} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Cliente' component={CriarCliente} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Artigos' component={MainArtigos} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Artigo Detalhes' component={DetalhesArtigo} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Artigo' component={CriarArtigo} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Ver Detalhes' component={VerDetalhesOrc} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Faturas' component={MainFatura} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Fatura Detalhes' component={DetalhesFatura} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Fatura' component={CriarFatura} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Faturas Simplificadas' component={MainFaturaSimp} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Fatura Simplificada Detalhes' component={DetalhesFaturaSimp} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Fatura Recibo' component={MainFaturaRec} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Proformas' component={MainFaturaPro} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Proformas Detalhes' component={DetalhesFaturaPro} options={{headerRight: () => <Logo />}}/>

        <Stack.Screen name='GesFaturação - Doc. de Transporte' component={MainGuias} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Guia Ativos' component={CriarAtivos} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Guias Ativos' component={MainAtivos} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Guia Consignação' component={CriarConsignacao} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Guias Consignação' component={MainConsignacao} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Guia Devolução' component={CriarDevolucao} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Guias Devolução' component={MainDevolucao} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Guia Remessa' component={CriarRemessa} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Guias Remessa' component={MainRemessa} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Guia Transporte' component={CriarTransporte} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Guias Transporte' component={MainTransporte} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Detalhes Guia Transporte' component={DetalhesTransporte} options={{headerRight: () => <Logo />}}/>
        
        <Stack.Screen name='GesFaturação - Criar Proforma' component={CriarProforma} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Fatura Simplificada' component={CriarFaturaSimp} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Notas de Créditos' component={MainNotaCred} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Nota de Crédito' component={CriarNotaCred} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Notas de Créditos Detalhes' component={DetalhesNotaCred} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Notas de Débito' component={MainNotaDeb} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Nota de Débito' component={CriarNotaDeb} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Nota de Débito Detalhes' component={DetalhesNotaDeb} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Fornecedores' component={MainFornecedores} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Fornecedores Detalhes' component={DetalhesFornecedor} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Fornecedores' component={CriarFornecedores} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Clientes' component={MainCliente} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Cliente Detalhes' component={DetalhesCliente} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Compras' component={MainCompra} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Compra Detalhes' component={DetalhesCompra} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Compra' component={CriarCompra} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Analise' component={MainAnalise} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Bancos' component={MainBancos} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Criar Banco' component={CriarBanco} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Banco Detalhes' component={DetalhesBancos} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Vendas' component={Vendas} options={{headerRight: () => <Logo />}}/>
        <Stack.Screen name='GesFaturação - Tabelas' component={Tabelas} options={{headerRight: () => <Logo />}}/>
      </Stack.Navigator>
    );
};

export default AppStack;