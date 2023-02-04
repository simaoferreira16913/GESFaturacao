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


    const getOrcamentos = async ()=> {
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/orcamentos/orcamentos`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                pag: '0',
                numRows: '25',
            },
            headers: {
                Accept: 'application/json',
            }
        }); 
    }
    

    const finalizarOrcamento = async (id) =>{
        var token = await this.getToken();
        let aux = id;
        console.log("Aqui",aux);
        axios.patch(`${BASE_URL}/api/orcamentos/orcamentos`,
        {_token: token, opcao: '6', idOrcamento: id}).then((res)=>{
            console.log(res)
        })
       
    }
    const estadoOrcamento = async (id, estado) =>{
        var token = await this.getToken();
        console.log(token)
        console.log(id);
        console.log(estado);
        axios.patch(`${BASE_URL}/api/orcamentos/orcamentos`,
        {_token: token, opcao: '9', idDocumento: id, estado: estado}).then((res)=>{
            console.log(res)
        })
        /*return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/orcamentos/orcamentos',
            method: 'PATCH',
            //timeout: 5000,
            params: {
                _token: token,
                opcao: '9',
                idDocumento: id,
                estado: estado
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });*/
       
    }


    
    
    const getArtigos = async () =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/tabelas/artigos`,
            method: 'GET',
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }


    getToken = async () => AsyncStorage.getItem('@userToken');
    
    
   
    
    const deleteOrcamento = async (id) => {
        var token = await this.getToken();
        console.log(token)
        return axios({
            url: `${BASE_URL}/api/orcamentos/orcamentos`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '4',
                _token: token,
                idOrcamento: id,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
    }

    const getOrcamentosDetalhes = async (id) =>{
        var token = await this.getToken();
       
        return axios({
            url: `${BASE_URL}/api/orcamentos/orcamentos`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token,
            }
        });
    }

    const addOrcamentos = async (clienteC, serieC, numeroC, dataC, validadeC, referenciaC, vencimentoC, moedaC, descontoC, observacoesC, LinhasC, finalizarDocumentoC) => {

        console.log(clienteC + ' Cliente');
        console.log(serieC + ' Serie');
        console.log(numeroC + ' num');
        console.log(dataC + ' data');
        console.log(validadeC + ' val');
        console.log(referenciaC + ' ref');
        console.log(vencimentoC + ' ven');
        console.log(moedaC + ' moeda');
        console.log(descontoC + ' des');
        console.log(observacoesC + ' obs');
        console.log(JSON.stringify(LinhasC) + ' linha');
        console.log(finalizarDocumentoC + ' fim');
           
        //const LinhasC = [{"artigo": "0001", "descricao":descricaoC, "qtd":qtdC, "preco": "19.01", "imposto": "1", "motivo":motivoC, "desconto":descontoCL, "retencao":retencaoC}];
        const stringifiedLinhas = JSON.stringify(LinhasC);

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/orcamentos/orcamentos',
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: userToken,
                cliente: clienteC, 
                serie: serieC, 
                numero: numeroC, 
                data: dataC,  
                validade: validadeC, 
                referencia: referenciaC, 
                vencimento: vencimentoC, 
                moeda: moedaC, 
                desconto: descontoC, 
                observacoes: observacoesC, 
                Linhas: stringifiedLinhas, 
                finalizarDocumento: finalizarDocumentoC
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        })
        .then(async res => {
            console.log(res.data)
            //return res.data
        }).catch(e =>{
            console.log(`Erro: ${e}` + ' Grande Erro');
            setIsLoading(false)
        });
    }
        /*console.log("Entrei");
        cliente = 1;
        serie = 1;
        numero = 5;
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
        //Linha = [artigo: artigo,descricao, qtd, preco, imposto, motivo, desconto, retencao]
        Linhas = [{"artigo":"1","descricao":"Artigo+Geral","qtd":"1","preco":"11.707","imposto":"1","motivo":null,"desconto":"0","retencao":"0","centro":"5","comentario":""},{"artigo":"2","descricao":"Serviço+Geral","qtd":"1","preco":"60","imposto":"1","motivo":null,"desconto":"0","retencao":"0","centro":"5","comentario":"Teste\nlinha+2"}];
        console.log(Linhas);
        finalizarDocumento=1;
        setIsLoading(true);
        var token = await this.getToken();
        let opcao = 2;
        //console.log(userToken);
        axios.post(`https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/orcamentos/orcamentos`, {
            _token: token,
            opcao: "2",
            cliente: "1",
            serie: "3",
            numero: "0",
            data: "12/12/2022",
            validade: "12/12/2022",
            referencia: "Ref. Documento",
            vencimento: "0",
            moeda: "1",
            desconto: "0",
            observacoes: "observacoes",
            Linhas: "[{'artigo':'1','descricao':'Artigo+Geral','qtd':'1','preco':'11.707','imposto':'1','motivo':null,'desconto':'0','retencao':'0','centro':'5','comentario':''},{'artigo':'2','descricao':'Serviço+Geral','qtd':'1','preco':'60','imposto':'1','motivo':null,'desconto':'0','retencao':'0','centro':'5','comentario':'Teste\nlinha+2'}]",
            finalizarDocumento: "0",
        },{headers: { 'content-type': 'application/x-www-form-urlencoded' },})
        .then(async res => {
            console.log(res.data)
            //return res.data
        }).catch(e =>{
            console.log(`Erro: ${e}`);
            setIsLoading(false)
        });*/


    const getArtigoID = async (id) =>{
        var token = await this.getToken();
        console.log(id)
        return axios({
            url: `${BASE_URL}/api/tabelas/artigos`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idArtigo: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }


    const CriarArtigo = async (dadosArt) =>{
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


    /*Faturas*/
    const getFaturas = async () =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/faturas`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                _token: token
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }

    const getFaturaDetalhes= async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/faturas`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }
    const finalizarFatura= async (id) =>{
        var token = await this.getToken();
        
        axios.patch(`${BASE_URL}/api/vendas/faturas`,
        {_token: token, opcao: '6', idFatura: id}).then((res)=>{
            console.log(res)
        })
    }

    const deleteFatura = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/faturas`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '5',
                _token: token,
                idFatura: id,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    const CriarFatura = async (clienteC, serieC, numeroC, dataC, validadeC, referenciaC, vencimentoC, moedaC, descontoC, observacoesC, LinhasC, finalizarDocumentoC) =>{
        var token = await this.getToken();
        console.log(clienteC + ' Cliente');
        console.log(serieC + ' Serie');
        console.log(numeroC + ' num');
        console.log(dataC + ' data');
        console.log(validadeC + ' val');
        console.log(referenciaC + ' ref');
        console.log(vencimentoC + ' ven');
        console.log(moedaC + ' moeda');
        console.log(descontoC + ' des');
        console.log(observacoesC + ' obs');
        console.log(JSON.stringify(LinhasC) + ' linha');
        console.log(finalizarDocumentoC + ' fim');

        const stringifiedLinhas = JSON.stringify(LinhasC);
        return axios({
            url: `${BASE_URL}/api/vendas/faturas`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: token,
                cliente: clienteC,
                serie: serieC,
                numero: numeroC,
                moeda: 1,
                data: dataC,
                validade: validadeC,
                referencia: referenciaC,
                vencimento: vencimentoC,
                desconto: descontoC,
                observacoes: observacoesC,
                finalizarDocumento: finalizarDocumentoC,
                pagamento: 0,
                Linhas: stringifiedLinhas,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    /*Fatura Simplificadas */
    const getFaturasSimp = async () =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/faturas_simplificadas`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                numRows: '25',
                pag: '0',
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }

    const getFaturaSimpDetalhes = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/faturas_simplificadas`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token,
            },
            headers: {
                Accept: 'application/json'
            }
        });
    }

    const criarFaturaSimp = async (clienteC, serieC, numeroC, dataC, validadeC, referenciaC, vencimentoC, moedaC, descontoC, observacoesC, LinhasC, finalizarDocumentoC) =>{
        var token = await this.getToken();
        console.log(clienteC + ' Cliente');
        console.log(serieC + ' Serie');
        console.log(numeroC + ' num');
        console.log(dataC + ' data');
        console.log(validadeC + ' val');
        console.log(referenciaC + ' ref');
        console.log(vencimentoC + ' ven');
        console.log(moedaC + ' moeda');
        console.log(descontoC + ' des');
        console.log(observacoesC + ' obs');
        console.log(JSON.stringify(LinhasC) + ' linha');
        console.log(finalizarDocumentoC + ' fim');

        const stringifiedLinhas = JSON.stringify(LinhasC);
        return axios({
            url: `${BASE_URL}/api/vendas/faturas_simplificadas`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: token,
                cliente: clienteC,
                serie: serieC,
                numero: numeroC,
                moeda: 1,
                data: dataC,
                validade: validadeC,
                referencia: referenciaC,
                vencimento: vencimentoC,
                desconto: descontoC,
                observacoes: observacoesC,
                finalizarDocumento: finalizarDocumentoC,
                pagamento: 0,
                Linhas: stringifiedLinhas,
                banco: 0,
                precisaBanco: 0,
                centrocusto: 0
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    const deleteFauratSimp = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/faturas_simplificadas`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '5',
                _token: token,
                idFatura: id,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    const finalizarFaturaSimp= async (id) =>{
        var token = await this.getToken();
        
        axios.patch(`${BASE_URL}/api/vendas/faturas_simplificadas`,
        {_token: token, opcao: '6', idFatura: id}).then((res)=>{
            console.log(res)
        })
    }


    /*Faturas Recibos */
    const getFaturasReb = async () =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/faturas`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                _token: token
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }
    /*Faturas Proforma */
    const getProforma = async ()=> {
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/orcamentos/proformas`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                pag: '0',
                numRows: '25',
            },
            headers: {
                Accept: 'application/json',
            }
        }); 
    }
    const getProformaDetalhes = async (id) =>{
        var token = await this.getToken();
       
        return axios({
            url: `${BASE_URL}/api/orcamentos/proformas`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token,
            }
        });
    }
    const deleteProforma = async (id) => {
        var token = await this.getToken();
        console.log(token)
        return axios({
            url: `${BASE_URL}/api/orcamentos/proformas`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '10',
                _token: token,
                idProforma: id,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
    }
    const finalizarProforma = async (id) =>{
        var token = await this.getToken();
        let aux = id;
        console.log("Aqui",aux);
        axios.patch(`${BASE_URL}/api/orcamentos/proformas`,
        {_token: token, opcao: '6', idProforma: id}).then((res)=>{
            console.log(res)
        })
       
    }
    const estadoProforma = async (id, estado) =>{
        var token = await this.getToken();
        console.log(token)
        console.log(id);
        console.log(estado);
        axios.patch(`${BASE_URL}/api/orcamentos/proformas`,
        {_token: token, opcao: '7', idDocumento: id, estado: estado}).then((res)=>{
            console.log(res)
        })
    }

    //Pedido API para as Guias

    //Guias de Transporte

    const getGuiasTransporte = async ()=> {
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/guias_transporte`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                pag: '0',
                numRows: '25',
            },
            headers: {
                Accept: 'application/json',
            }
        }); 
    }

    const deleteGuiasTransporte = async (id) => {
        var token = await this.getToken();
        
        return axios({
            url: `${BASE_URL}/api/guias_transporte`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '5',
                _token: token,
                idGuia: id,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
    }

    const getGuiaTransporteDetalhes = async (id) =>{
        var token = await this.getToken();
       
        return axios({
            url: `${BASE_URL}/api/guias_transporte`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token,
            }
        });
    }

    const finalizarGuiaTransporte = async (idGuiaT) =>{
        var token = await this.getToken();
        console.log(idGuiaT + 'ID GUIA')

        axios.patch(`${BASE_URL}/api/guias_transporte`,
        { opcao: '6', _token: token, idGuia: idGuiaT}).then((res)=>{
            console.log(res)
        })
       
    }

    const addGuiasTransporte = async (
        clienteC, serieG, numeroG, dataG, validadeG, referenciaG, vencimentoG, moedaG, 
        descontoG, observacoesG, dataCargaC, horaCargaC, enderecoC, codigoPostalC, cidadeC, 
        paisC, dataDescargaD, horaDescargaD, enderecoD, codigoPostalD, cidadeD, paisD, matriculaC, 
        distritoC, distritoD, LinhasG, finalizarDocumentoG, precisaBancoG) => {

           
        //const LinhasC = [{"artigo": "0001", "descricao":descricaoC, "qtd":qtdC, "preco": "19.01", "imposto": "1", "motivo":motivoC, "desconto":descontoCL, "retencao":retencaoC}];
        const stringifiedLinhas = JSON.stringify(LinhasG);

        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/guias_transporte',
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: userToken,
                cliente: clienteC,
                serie: serieG,
                numero: numeroG,
                data: dataG,
                validade: validadeG,
                referencia: referenciaG,
                vencimento: vencimentoG,
                moeda: moedaG,
                desconto: descontoG,
                observacoes: observacoesG,
                data_carga_guia: dataCargaC,
                hora_carga_guia: horaCargaC,
                endereco_carga_guia: enderecoC,
                codigopostal_carga_guia: codigoPostalC,
                cidade_carga_guia: cidadeC,
                pais_carga_guia: paisC,
                data_descarga_guia: dataDescargaD,
                hora_descarga_guia: horaDescargaD,
                endereco_descarga_guia: enderecoD,
                codigopostal_descarga_guia: codigoPostalD,
                cidade_descarga_guia: cidadeD,
                pais_descarga_guia: paisD,
                matricula_carga_guia: matriculaC,
                regiao_carga_guia: distritoC,
                regiao_descarga_guia: distritoD,
                Linhas: stringifiedLinhas,
                finalizarDocumento: finalizarDocumentoG,
                precisaBanco: precisaBancoG
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        })
        .then(async res => {
            console.log(res.data + 'Deu crl')
            //return res.data
        }).catch(e =>{
            console.log(`Erro: ${e}` + ' Grande Erro');
            setIsLoading(false)
        });
    }

    const atualizarCodigoATGuia = async (idGuiaT, codigoAT) =>{
        var token = await this.getToken();
        let aux = idGuiaT + ' ' + codigoAT;
        console.log("Aqui",aux);
        axios.patch(`${BASE_URL}/api/guias_transporte`,
        {_token: token, opcao: '7', idGuia: idGuiaT, codigo_at_guiaCodeAT: codigoAT}).then((res)=>{
            console.log(res)
        })
       
    }

    const gerarDocumentoGuia = async (idGuiaT) =>{
        var token = await this.getToken();
        let aux = idGuiaT;
        console.log("Aqui",aux);
        axios.patch(`${BASE_URL}/api/guias_transporte`,
        {_token: token, opcao: '9', idDocumento: idGuiaT}).then((res)=>{
            console.log(res)
        })
       
    }


    const addProforma = async (clienteC, serieC, numeroC, dataC, validadeC, referenciaC, vencimentoC, moedaC, descontoC, observacoesC, LinhasC, finalizarDocumentoC) => {

        console.log(clienteC + ' Cliente');
        console.log(serieC + ' Serie');
        console.log(numeroC + ' num');
        console.log(dataC + ' data');
        console.log(validadeC + ' val');
        console.log(referenciaC + ' ref');
        console.log(vencimentoC + ' ven');
        console.log(moedaC + ' moeda');
        console.log(descontoC + ' des');
        console.log(observacoesC + ' obs');
        console.log(JSON.stringify(LinhasC) + ' linha');
        console.log(finalizarDocumentoC + ' fim');
           
        //const LinhasC = [{"artigo": "0001", "descricao":descricaoC, "qtd":qtdC, "preco": "19.01", "imposto": "1", "motivo":motivoC, "desconto":descontoCL, "retencao":retencaoC}];
        const stringifiedLinhas = JSON.stringify(LinhasC);

        return axios({
            url: `${BASE_URL}/api/orcamentos/proformas`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: userToken,
                cliente: clienteC, 
                serie: serieC, 
                numero: numeroC, 
                data: dataC,  
                validade: validadeC, 
                referencia: referenciaC, 
                vencimento: vencimentoC, 
                moeda: moedaC, 
                desconto: descontoC, 
                observacoes: observacoesC, 
                Linhas: stringifiedLinhas, 
                finalizarDocumento: finalizarDocumentoC
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        })
        .then(async res => {
            console.log(res.data + 'Deu crl')
            //return res.data
        }).catch(e =>{
            console.log(`Erro: ${e}` + ' Grande Erro');
            setIsLoading(false)
        });
    }

    /*Nota de Credito */
    const getNotasCred = async () =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/notas_credito`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                _token: token
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }

    const getNotasCredDetalhes = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/notas_credito`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }
    const deleteNotaCred = async (id) => {
        var token = await this.getToken();
        console.log(token)
        return axios({
            url: `${BASE_URL}/api/vendas/notas_credito`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '5',
                _token: token,
                idNota: id,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
    }
    const finalizarNotaCred = async (id) =>{
        var token = await this.getToken();
        let aux = id;
        console.log("Aqui",aux);
        axios.patch(`${BASE_URL}/api/vendas/notas_credito`,
        {_token: token, opcao: '6', idNota: id}).then((res)=>{
            console.log(res)
        })
       
    }
    /*Nota de Debito*/
    const getNotasDeb = async () =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/notas_debito`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                _token: token
            },
            headers: {
                Accept: 'application/json',
            }
        });
    }

    const getNotasDebDetalhes = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/vendas/notas_debito`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idDocument: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }
    const deleteNotaDeb = async (id) => {
        var token = await this.getToken();
        console.log(token)
        return axios({
            url: `${BASE_URL}/api/vendas/notas_debito`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '5',
                _token: token,
                idNota: id,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
        });
    }
    const finalizarNotaDeb = async (id) =>{
        var token = await this.getToken();
        let aux = id;
        console.log("Aqui",aux);
        axios.patch(`${BASE_URL}/api/vendas/notas_debito`,
        {_token: token, opcao: '6', idNota: id}).then((res)=>{
            console.log(res)
        })
       
    }
    /*Fornecedores */
    const getFornecedores = async () =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/tabelas/fornecedores`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                pag: '0',
                numRows: '25',
                _token: token,
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

    const getFornecedorDetalhes = async (id) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/tabelas/fornecedores`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idFornecedor: id,
                _token: token,
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

    const deleteFornecedor = async (id) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/tabelas/fornecedores`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '4',
                _token: token,
                idFornecedor: id,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })
    }

    const CriarFornecedor = async (dadosCli) =>{
        var token = await this.getToken();
        console.log(token)
        console.log(dadosCli)
        axios.post(`${BASE_URL}/api/tabelas/fornecedores`, {
                    opcao: '2',
                    _token: token,
                    nome_fornecedor: dadosCli.Nome,
                    nif_fornecedor: dadosCli.Nif,
                    pais_fornecedor: dadosCli.Pais,
                    endereco_fornecedor: dadosCli.Endereco,
                    codigopostal_fornecedor: dadosCli.CodigoPostal,
                    regiao_fornecedor: dadosCli.Regiao,
                    cidade_fornecedor: dadosCli.Cidade,
                    email_fornecedor: dadosCli.Email,
                    website_fornecedor: dadosCli.Website,
                    tlm_fornecedor: dadosCli.Telemovel,
                    tlf_fornecedor: dadosCli.Telefone,
                    fax_fornecedor: dadosCli.Fax,
                    preferencial_nome_fornecedor: "oi",
                    preferencial_email_fornecedor: "asd@gmail.com",
                    preferencial_tlm_fornecedor: "789456123",
                    preferencial_tlf_fornecedor: "9657894560",
                    pagamento_fornecedor: "0",
                    vencimento_fornecedor: dadosCli.Vencimento,
                    desconto_fornecedor: dadosCli.Desconto,
                    flagContaGeral: "0"
    
        }, {headers: { Accept: 'application/json',}})}
        /*Clientes */
        const getClientes = async ()=> {
        
            var token = await this.getToken();
    
            return axios({
                url: `${BASE_URL}/api/tabelas/clientes`,
                method: 'GET',
                //timeout: 5000,
                params: {
                    opcao: '0',
                    _token: token,
                    pag: '0',
                    numRows: '25',
                    table_usage: '1'
                },
                headers: {
                    Accept: 'application/json',
                }
            })
    
            
        }
        const getclienteID = async (id) =>{
            console.log("AQUI", id)
            var token = await this.getToken();
            return axios({
                url: `${BASE_URL}/api/tabelas/clientes`,
                method: 'GET',
                //timeout: 5000,
                params: {
                    opcao: '1',
                    idCliente: id,
                    _token: token
                },
                headers: {
                    Accept: 'application/json',
                },
            });
        }
        const criarCliente = async (dadosCli) =>{
            var token = await this.getToken();
            console.log(token)
            console.log(dadosCli)
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

    /*Compras Fatura */
    const getComprasFat = async () =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/compras/compras`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                pag: '0',
                numRows: '25',
                table_usage: '1'
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }

    const getComprasFatDetalhes = async (id) =>{
        var token = await this.getToken();
        console.log(id);
        return axios({
            url: `${BASE_URL}/api/compras/compras`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '1',
                idCompra: id,
                _token: token
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }


    const finalizarCompra = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/compras/compras`,
            method: 'PATCH',
            timeout: 5000,
            data : qs.stringify({
                opcao: '6',
                _token: token,
                idCompra: id,
        }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }

    const anularCompra = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/compras/compras`,
            method: 'PATCH',
            timeout: 5000,
            data : qs.stringify({
                opcao: '5',
                _token: token,
                idCompra: id,
        }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }


    const deleteCompra = async (id) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/compras/compras`,
            method: 'DELETE',
            timeout: 5000,
            data: qs.stringify({
                opcao: '4',
                _token: token,
                idCompra: id
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    const CriarCompra = async (clienteC, serieC, numeroC, dataC, validadeC, referenciaC, vencimentoC, moedaC, descontoC, observacoesC, LinhasC, finalizarDocumentoC) =>{
        var token = await this.getToken();
        console.log(clienteC + ' Cliente');
        console.log(serieC + ' Serie');
        console.log(numeroC + ' num');
        console.log(dataC + ' data');
        console.log(validadeC + ' val');
        console.log(referenciaC + ' ref');
        console.log(vencimentoC + ' ven');
        console.log(moedaC + ' moeda');
        console.log(descontoC + ' des');
        console.log(observacoesC + ' obs');
        console.log(JSON.stringify(LinhasC) + ' linha');
        console.log(finalizarDocumentoC + ' fim');

        const stringifiedLinhas = JSON.stringify(LinhasC);
        return axios({
            url: `${BASE_URL}/api/compras/compras`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '2',
                _token: token,
                fornecedor: clienteC,
                serie: serieC,
                numero: 1,
                moeda: 1,
                data: dataC,
                validade: validadeC,
                referencia: referenciaC,
                vencimento: vencimentoC,
                desconto: descontoC,
                observacoes: observacoesC,
                finalizarDocumento: finalizarDocumentoC,
                pagamento: 0,
                Linhas: stringifiedLinhas,
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    /*Artigos */
    const deleteArtigo = async (id) =>{
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/artigos',
            method: 'DELETE',
            timeout: 5000,
            data : qs.stringify({
                opcao: '4',
                _token: token,
                idArtigo: id
                }),
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    /*Analise */
    const getAnalise = async () =>{
        var token = await this.getToken();
        return axios({
            url: `${BASE_URL}/api/analise`,
            method: 'GET',
            timeout: 5000,
            params: {
                opcao: '0',
                _token: token,
                pag: '0',
                numRows: '25',
                //cliente: '1',
                dataInicio: '02/02/2023',
                dataFim: '25/02/2023'
            },
            headers: {
                Accept: 'application/json',
            },
        });
    }
    /**Enviar Email Orcamento */
    const enviarOrcamento = async (id, mail) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/orcamentos/orcamentos`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '5',
                _token: token,
                documento: id,
                tipo_doc: 'OR',
                email:mail
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    /*Enviar Email Proforma */
    const enviarProforma = async (id, mail) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/orcamentos/proformas`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '5',
                _token: token,
                documento: id,
                tipo_doc: 'PF',
                email:mail
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    /*Enviar Email Fatura*/
    const enviarFatura = async (id, mail) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/vendas/faturas`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '7',
                _token: token,
                documento: id,
                tipo_doc: 'FT',
                email:mail
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    /*Enviar Email Fat Simp */
    const enviarFatSimp = async (id, mail) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/vendas/faturas_simplificadas`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '7',
                _token: token,
                documento: id,
                tipo_doc: 'FS',
                email:mail
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    /*Enviar Notas Cred*/
    const enviarNotaCred = async (id, mail) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/vendas/notas_credito`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '7',
                _token: token,
                documento: id,
                tipo_doc: 'NC',
                email:mail
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    /*Enviar Notas Deb */
    const enviarNotaDeb = async (id, mail) =>{
        var token = await this.getToken();

        return axios({
            url: `${BASE_URL}/api/vendas/notas_debito`,
            method: 'POST',
            timeout: 5000,
            data: qs.stringify({
                opcao: '7',
                _token: token,
                documento: id,
                tipo_doc: 'ND',
                email:mail
            }),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        });
    }
    return(
        <AuthContext.Provider value={{login, logout, getOrcamentos,addOrcamentos,criarCliente,deletecliente, estadoOrcamento,
            CriarArtigo,getClientes,getclienteID,getArtigos,getArtigoID, deleteOrcamento, getOrcamentosDetalhes, finalizarOrcamento,
            CriarFatura, deleteFatura, getFaturaDetalhes, getFaturas, finalizarFatura,
            getFaturasSimp, finalizarFaturaSimp, deleteFauratSimp, criarFaturaSimp, getFaturaSimpDetalhes, getFaturasReb,
            getGuiasTransporte, deleteGuiasTransporte, getGuiaTransporteDetalhes, finalizarGuiaTransporte, addGuiasTransporte, atualizarCodigoATGuia, gerarDocumentoGuia,

            getProforma, getProformaDetalhes,deleteProforma, finalizarProforma, estadoProforma, addProforma,
            getNotasCred, getNotasCredDetalhes,deleteNotaCred, finalizarNotaCred,
            getNotasDeb,getNotasDebDetalhes,deleteNotaDeb,finalizarNotaDeb, getFornecedores, getFornecedorDetalhes,deleteFornecedor,CriarFornecedor,
            getComprasFat,getComprasFatDetalhes,finalizarCompra,anularCompra,deleteCompra,CriarCompra,deleteArtigo,getAnalise
            ,enviarOrcamento,enviarProforma, enviarFatura, enviarFatSimp,enviarNotaDeb,enviarNotaCred
        ,isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}