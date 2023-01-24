
const url = 'https://mock-api.driven.com.br/api/v6/uol';

//enviar mensagem 
function sucessoAoEnviarMensagem(resposta){
    buscarMensagens();

}

function erroAoEnviarMensagem(error){
     alert('Erro ao enviar mensagem, conecte-se novamente!');
     window.location.reload()
}

function enviarMensagem(){
    
    const elementotexto = document.querySelector('.mensagem'); 
    const dadoMensagem = {
        from: nome,
        to: "Todos",
        text: elementotexto.value,
        type: "message"
    }
    const promisse = axios.post(`${url}/messages`,dadoMensagem);
    promisse.then(sucessoAoEnviarMensagem);
    promisse.catch(erroAoEnviarMensagem);

    elementotexto.value = '';

}


// Buscar e mostrar mensagens

let M = []; 

function buscarMensagens(){
    const promessa = axios.get (`${url}/messages`);
    promessa.then(sucessoAoBuscarMensagens);
    promessa.catch(erroAoBuscarMensagens);
}
function sucessoAoBuscarMensagens(resposta){
    console.log(resposta);
    mensagens = resposta.data;

    mostrarMensagens(mensagens);
}

function erroAoBuscarMensagens(error){
    console.log('Erro ao buscar as mensagens');
    alert('Ocorreu um erro ao buscar as mensagens do chat! Tente novamente mais tarde!');
}


function mostrarMensagens(resposta){
    console.log(resposta);
    M = resposta;
    console.log(M);

    const todasMensagens = document.querySelector(".notificacoes");
    let template = ' ';

    for(let i = 0; i<M.length; i++){

        let mensagem = M[i];
        if ( mensagem.type === 'message'){     
            template = `
                <div class="class="notificacao publica"">
                    <span class="horario">${mensagem.time}</span>
                        <strong>${mensagem.from}</strong>
                            <span> para </span>
                        <strong>${mensagem.to}: </strong>
                    <span>${mensagem.text}</span>
                </div>
            `;       
        }else if ( mensagem.type === 'private_message'){            
            if ( mensagem.to === nome || mensagem.from === nome){
                template = `
                    <div class="notificacao privada">
                        <span class="horario">${mensagem.time}</span>
                            <strong>${mensagem.from}</strong>
                                <span> reservadamente para </span>
                            <strong>${mensagem.to}: </strong>
                        <span>${mensagem.text}</span>
                    </div>        
                `;
            }
        } else if (mensagem.type === 'status'){
            template = `
                <div class="notificacao entrada-saida">
                <span class="horario">${mensagem.time}</span>
                <strong>${mensagem.from} &nbsp;</strong>          
                <span>${mensagem.text}</span>                    
                </div>             
            `;
        }
        
        todasMensagens.innerHTML += template;
    }
    const ultimaNotificacao = document.querySelector('.notificacoes div:last-child');
    ultimaNotificacao.scrollIntoView();


}

// Entrar na sala 
const nome = prompt("Qual seu nome?");
const dado = { name: nome}

iniciar();

function iniciar(){
   const promessa = axios.post(`${url}/participants`,dado)

   promessa.then(processarNome);
   promessa.catch(tratarErro);

}
function processarNome(resposta){
    console.log(resposta);
    buscarMensagens();
}

function tratarErro(erro){
    alert('Digite outro nome, este já está em uso!')
}

//controle da conexão 
setInterval(manterConexão,5000);

function manterConexão(){

    const conexão = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',dado)
    conexão.catch(perdeuConexão);

}
function perdeuConexão(){
    window.location.reload()
}
