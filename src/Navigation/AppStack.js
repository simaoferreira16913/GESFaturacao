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
      </Stack.Navigator>
    );
};

export default AppStack;