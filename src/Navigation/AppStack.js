import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//substituir pelo authstack e appstack
import Home from '../Screens/Home';
import MainOrcamento from '../Screens/Orcamentos/MainOrcamento';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="GesFaturação" component={Home} />
        <Stack.Screen name="GesFaturação-Orçamentos" component={MainOrcamento} />
      </Stack.Navigator>
    );
};

export default AppStack;