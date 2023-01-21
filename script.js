const nome = prompt("Qual seu lindo nome?");
const dado = { name: nome}

const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ',dado)

promessa.then(processarNome);
promessa.catch(tratarErro);

function processarNome(resposta){
    console.log(resposta.data);

}

function tratarErro(erro){
    console.log(erro.response.data);
}