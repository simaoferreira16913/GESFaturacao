import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';

import qs from 'qs';

import { ToastAndroid } from 'react-native';


//Possibilita passar qualquer valor para qualquer ecrã da app

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [nome, setNome] = useState(null);

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
            setNome(username);
            await AsyncStorage.setItem('@userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('@userToken', userInfo._token);
            console.log("User Token: " + userInfo._token);
            ToastAndroid.show("Bem-vindo, " + username, ToastAndroid.SHORT);
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
        ToastAndroid.show("Obrigado pela preferência, " + nome, ToastAndroid.SHORT);
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

    getToken = async () => AsyncStorage.getItem('@userToken');
    const deletecliente = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/tabelas/clientes`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '4',
                _token: token,
                idCliente: id
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
   
   const criarCliente = async (dadosCli) =>{
    var token = await this.getToken();
    console.log(token)
    axios.post(`${BASE_URL}/api/tabelas/clientes`, {
    opcao: '2',
                _token: token,
                nome_cliente: dadosCli.Nome,
                nif_cliente: dadosCli.Nif,
                pais_cliente: dadosCli.Pais,
                endereco_cliente: dadosCli.Endereco,
                codigopostal_cliente: dadosCli.CodigoPostal,
                regiao_cliente: dadosCli.Regiao,
                cidade_cliente: dadosCli.Cidade,
                email_cliente: dadosCli.Email,
                website_cliente: dadosCli.Website,
                tlm_cliente: dadosCli.Telemovel,
                tlf_cliente: dadosCli.Telefone,
                fax_cliente: dadosCli.Fax,
                vencimento_cliente: dadosCli.Vencimento,
                desconto_cliente: dadosCli.Desconto,

    }, {headers: { Accept: 'application/json',}})}
    const insertCliente = async () =>{
        //console.log(dadosCli);
        //console.log(dadosCli.Nome)
        var token = await this.getToken();
        console.log(token)
        return axios({
            url: `https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/clientes`,
            method: 'POST',
            timeout: 5000,
            data : {
                opcao: '2',
                _token: token,
                nome_cliente: "dadosCli.Nome ",
                nif_cliente: 192047663,
                pais_cliente: "PT",
                endereco_cliente: "dadosCli",
                codigopostal_cliente: "4755-261",
                regiao_cliente: 0,
                cidade_cliente: 0,
                email_cliente: "dadosCli@Email.pt",
                website_cliente: "dadosCli.Website.pt",
                tlm_cliente: 960000000,
                tlf_cliente: 252000000,
                fax_cliente: 252000001,
                vencimento_cliente: 0,
                desconto_cliente: 0,
        },
        headers: {
            Accept: 'application/json',
        }
        });
       
    }

    const addOrcamentos = async () => {
            console.log("Entrei");
            cliente = 1;
            serie = 1;
            numero = 3;
            data= "05/11/2022";
            validade = "12/12/2022";
            referencia = "Ref. Documento";
            vencimento = 1000;
            moeda = 1;
            desconto = 0;
            observacoes = "Observacoes";
            artigo= 4;
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
                _token: _token,
                opcao: "2",
                cliente: 1,
                serie: 3,
                numero: 0,
                data: data,
                validade: validade,
                referencia: referencia,
                vencimento: 0,
                moeda: 1,
                desconto: 0,
                observacoes: observacoes,
                Linhas: Linhas,
                finalizarDocumento: 0,
            },{headers: { 'content-type': 'application/x-www-form-urlencoded' },})
            .then(async res => {
                console.log(res.data)
                //return res.data
            }).catch(e =>{
                console.log(`Erro: ${e}`);
                setIsLoading(false)
            });

    }

    const addArtigo = async (dadosArt) =>{
        console.log(dadosArt);
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/tabelas/artigos`,
            method: 'POST',
            timeout: 5000,
            data : {
                opcao: '2',
                _token: token,
                codigo_artigo:dadosArt.Codigo,
                nome_artigo: dadosArt.Nome,
                categoria_artigo: dadosArt.Categoria,
                tipo_artigo: dadosArt.Tipo,
                stock_artigo: dadosArt.Stock,
                unidade_artigo: dadosArt.Unidade,
                precoPVP_artigo: dadosArt.PrecoPVP,
                imposto_artigo: dadosArt.IVA , 
                preco_artigo: dadosArt.Preco ,
                codigobarras_artigo: dadosArt.CodigoBarras,
                numeroserie_artigo: dadosArt.SerialNumber,
                retencao_valor_artigo: dadosArt.RetencaoValor,
                retencao_percenteagem_artigo: dadosArt.RetencaoPercentagem,
                observacoes_artigo: dadosArt.DescricaoLonga
        },
        headers: {
            Accept: 'application/json',
        }
        });
    }


    

    return(
        <AuthContext.Provider value={{login, logout, getOrcamentos,addOrcamentos,criarCliente,insertCliente,deletecliente,addArtigo,isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}