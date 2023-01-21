const nome = prompt("Qual seu lindo nome?");
const dado = { name: nome}

const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ',dado)

promessa.then(processarNome);
promessa.catch(tratarErro);

function processarNome(resposta){
    document.querySelector('.notificacoes').innerHTML += `<div class="notificacao"> ${nome} entrou na sala </div>`

}

function tratarErro(erro){
    alert('Digite outro nome, este já está em uso!')
}

setInterval(manterConexão,5000);

function manterConexão(){

    const conexão = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',dado)
    conexão.catch(perdeuConexão);

}
function perdeuConexão(){
    window.location.reload()
}