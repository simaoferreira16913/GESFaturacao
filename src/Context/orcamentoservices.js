import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


class ClientsService {

    getToken = async () => AsyncStorage.getItem('TOKEN')
    async getclientes() {
        
        var token = await this.getToken();
        console.log("Batatas")
        return axios({
            url: `https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/clientes`,
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
            }
        }).then(async res =>{
            dados.push(res.data.aaData)
            console.log(dados)
     });

        
    }

    async getcliente(id) {
        var token = await this.getToken();
        return axios({
            url: 'https://demo.gesfaturacao.pt/gesfaturacao/server/webservices/api/tabelas/clientes',
            method: 'GET',
            timeout: 5000,
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


}

const clientsService = new ClientsService();
export default clientsService;