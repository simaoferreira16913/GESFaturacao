import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//substituir pelo authstack e appstack
import Home from '../Screens/Home';
import MainOrcamento from '../Screens/Orcamentos/MainOrcamento';
import CriarOrcamento from '../Screens/Orcamentos/CriarOrcamento';
import CriarCliente from '../Screens/Clientes/CriarCliente';
import CriarArtigo from '../Screens/Artigos/CriarArtigo';
import MainArtigo from '../Screens/Artigos/MainArtigo';
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
import DetalhesNotaCred from '../Screens/notasCredito/DetalhesNotaCred';
import MainNotaDeb from '../Screens/notasDebito/MainNotaDeb';
import DetalhesNotaDeb from '../Screens/notasDebito/DetalhesNotaDeb';
import MainFornecedores from '../Screens/Fornecedores/MainFornecedores';
import DetalhesFornecedor from '../Screens/Fornecedores/DetalhesFornecedores';
import CriarFornecedores from '../Screens/Fornecedores/CriarFornecedores';
import DetalhesCliente from '../Screens/Clientes/DetalhesCliente';
import MainCliente from '../Screens/Clientes/MainCliente';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="GesFaturação" component={Home} />
        <Stack.Screen name="GesFaturação-Orçamentos" component={MainOrcamento} />
        <Stack.Screen name='GesFaturação-Criar Orçamento' component={CriarOrcamento}/>
        <Stack.Screen name='GesFaturação-Criar Cliente' component={CriarCliente}/>
        <Stack.Screen name='GesFaturação-Artigos' component={MainArtigo}/>
        <Stack.Screen name='GesFaturação-Criar Artigo' component={CriarArtigo}/>
        <Stack.Screen name='GesFaturação-Ver Detalhes' component={VerDetalhesOrc}/>
        <Stack.Screen name='GesFaturação-Faturas' component={MainFatura}/>
        <Stack.Screen name='GesFaturação-Fatura Detalhes' component={DetalhesFatura}/>
        <Stack.Screen name='GesFaturação-Criar Fatura' component={CriarFatura}/>
        <Stack.Screen name='GesFaturação-Faturas Simplificadas' component={MainFaturaSimp}/>
        <Stack.Screen name='GesFaturação-Fatura Simplificada Detalhes' component={DetalhesFaturaSimp}/>
        <Stack.Screen name='GesFaturação-Fatura Recibo' component={MainFaturaRec}/>
        <Stack.Screen name='GesFaturação-Proformas' component={MainFaturaPro}/>
        <Stack.Screen name='GesFaturação-Proformas Detalhes' component={DetalhesFaturaPro}/>
        <Stack.Screen name='GesFaturação-Criar Proforma' component={CriarProforma}/>
        <Stack.Screen name='GesFaturação-Criar Fatura Simplificada' component={CriarFaturaSimp}/>
        <Stack.Screen name='GesFaturação-Notas de Créditos' component={MainNotaCred}/>
        <Stack.Screen name='GesFaturação-Notas de Créditos Detalhes' component={DetalhesNotaCred}/>
        <Stack.Screen name='GesFaturação-Notas de Débito' component={MainNotaDeb}/>
        <Stack.Screen name='GesFaturação-Nota de Débito Detalhes' component={DetalhesNotaDeb}/>
        <Stack.Screen name='GesFaturação-Fornecedores' component={MainFornecedores}/>
        <Stack.Screen name='GesFaturação-Fornecedores Detalhes' component={DetalhesFornecedor}/>
        <Stack.Screen name='GesFaturação-Criar Fornecedores' component={CriarFornecedores}/>
        <Stack.Screen name='GesFaturação-Clientes' component={MainCliente}/>
        <Stack.Screen name='GesFaturação-Cliente Detalhes' component={DetalhesCliente}/>
      </Stack.Navigator>
    );
};

export default AppStack;