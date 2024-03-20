//Lista de números sorteados
let listaDeNumerosSorteados = [];
let limiteNumeros = 10;

//Variáveis do número secreto + número de tentativas 
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Título + Parágrafo da nossa página
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

//Criando uma variável para minhas mensagens iniciais
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

//Gerando o número secreto
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumeros + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == limiteNumeros) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
} 

//Ativando o botão de chute + Dizendo ao jogador se ele acertou ou errou seu chute (e dando dicas)
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabéns, você acertou o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}!!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('h1', 'Errou!!');
            exibirTextoNaTela('p',`O  número é menor que ${chute}.`);
        } else {
            exibirTextoNaTela('h1', 'Errou!!');
            exibirTextoNaTela('p', `O número é maior que ${chute}.`);
        }
        tentativas++;
        limparCampo();
    }
    
}

//Limpar campo de resposta
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

//Função de reinicio do jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}