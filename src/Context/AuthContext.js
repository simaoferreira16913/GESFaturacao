import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';

//Possibilita passar qualquer valor para qualquer ecrã da app

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = async (username, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}/auth/login`, {
            username,
            password
        })
        .then(async res => {
            console.log(res.data);
            let userInfo = res.data;
            setUserInfo(userInfo);
            setUserToken(userInfo._token);
            await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('@userToken', userInfo._token);
            console.log("User Token: " + userInfo._token);
        })
        .catch(e => {
            console.log(`Login error ${e}`);
        });
    
        setIsLoading(false);
    }

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        await AsyncStorage.removeItem('@userInfo');
        await AsyncStorage.removeItem('@userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async () => {
        try{
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('@userInfo');
            let userToken = await AsyncStorage.getItem('@userToken');
            userInfo = JSON.parse(userInfo);

            if ( userInfo ){
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);
        } catch(e) {
            console.log(`isLoggedIn error ${e}`);
        }
    }


    const getOrcamentos = async (search,numRows, pag) => {
       
            setIsLoading(true);
            let _token = userToken;
            let opcao = 0;
            //console.log(userToken);
            axios.get(`${BASE_URL}/api/orcamentos/orcamentos`, {
                _token,
                opcao,
                search,
                numRows,
                pag
            })
            .then(async res => {
                console.log(res.data)
                return res.data
            }).catch(e =>{
                console.log(`Erro: ${e}`);
                setIsLoading(false)
            });
            
        console.log("Token:  "+_token)
        console.log(opcao);
        console.log(search);
        console.log(numRows);
        console.log(pag);
    }

    const addCliente = async () => {
        console.log("Entrei")
        nome_cliente = ""
        nif_cliente = 190031107
        pais_cliente = "Portugal"
        endereco_cliente = ""
        codigopostal_cliente
        regiao_cliente 
        cidade_cliente
        email_cliente 
        website_cliente 
        tlm_cliente
        tlf_cliente
        fax_cliente 
        preferencial_nome_cliente
        preferencial_email_cliente
        preferencial_tlm_cliente 
        preferencial_tlf_cliente 
        pagamento_cliente 
        vencimento_cliente 
        desconto_cliente 
        flagContaGeral 
        codigo_interno_cliente 
        let _token = userToken;
        let opcao = 2;
        axios.post(`${BASE_URL}/api/tabelas/clientes`, {
            _token,
            opcao,
            nome_cliente,
        nif_cliente,
        pais_cliente,
        endereco_cliente,
        codigopostal_cliente,
        regiao_cliente,
        cidade_cliente,
        email_cliente,
        website_cliente,
        tlm_cliente,
        tlf_cliente,
        fax_cliente,
        preferencial_nome_cliente,
        preferencial_email_cliente,
        preferencial_tlm_cliente,
        preferencial_tlf_cliente,
        pagamento_cliente,
        vencimento_cliente,
        desconto_cliente,
        flagContaGeral,
        codigo_interno_cliente,
        })
        .then(async res => {
            console.log(res.data)
            return res.data
        }).catch(e =>{
            console.log(`Erro: ${e}`);
            setIsLoading(false)
        });
    }

    const addOrcamentos = async () => {
            console.log("Entrei");
            cliente = 1;
            serie = 1;
            numero = 3;
            data= "05/11/2022";
            validade = "12/12/2022";
            referencia = "132165";
            vencimento = 1000;
            moeda = 1;
            desconto = 0;
            observacoes = "";
            artigo= 3;
            descricao="gota"; 
            qtd=1; 
            preco=1,626; 
            imposto=1; 
            motivo=0 
            desconto=0
            retencao=0
            Linha = [artigo,descricao, qtd, preco, imposto, motivo, desconto, retencao]
            Linhas = [Linha];
            finalizarDocumento=1;
            setIsLoading(true);
            let _token = userToken;
            let opcao = 2;
            //console.log(userToken);
            axios.post(`${BASE_URL}/api/orcamentos/orcamentos`, {
                _token,
                opcao,
                cliente,
                serie,
                numero,
                data,
                validade,
                referencia,
                vencimento,
                moeda,
                desconto,
                observacoes,
                artigo,
                descricao, 
                qtd, 
                preco, 
                imposto, 
                motivo, 
                desconto,
                retencao,
                Linhas,
                finalizarDocumento,
            })
            .then(async res => {
                console.log(res.data)
                return res.data
            }).catch(e =>{
                console.log(`Erro: ${e}`);
                setIsLoading(false)
            });

    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return(
        <AuthContext.Provider value={{login, logout, getOrcamentos,addOrcamentos,addCliente,isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}