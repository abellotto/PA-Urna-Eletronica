//controle de interface
let seuVotoPara = document.querySelector('.t1-1 span');
let cargo = document.querySelector('.t1-2 span');
let descricao = document.querySelector('.t1-4');
let aviso = document.querySelector('.t2');
let lateral = document.querySelector('.t1--right');
let numeros = document.querySelector('.t1-3');


//variáveis de controle de ambiente
let etapaAtual = 0;
let numeroAtual = '';
let votoBranco = false;
let votos =[];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numeroAtual = '';
    votoBranco = false;

    for(let i=0; i<etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>'
        }
    }
    
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if (item.numero === numeroAtual) {
            return true;
        } else {
            return false;
        }
    });

    if (candidato.length>0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display='block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `<div class="t1-image small"><img src="assets/midia/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="t1-image"><img src="assets/midia/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display='block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

//funções
function clicou(n) {
    let numeroDigitado = document.querySelector('.numero.pisca');
    if (numeroDigitado !== null) {
        numeroDigitado.innerHTML = n;
        numeroAtual = `${numeroAtual}${n}`;

        numeroDigitado.classList.remove('pisca');

        if (numeroDigitado.nextElementSibling !== null) {
            numeroDigitado.nextElementSibling.classList.add('pisca') //pega a próxima div
        } else {
            atualizaInterface();
        }
    }
}
function branco() {
    if (numeroAtual === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display='block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
        lateral.innerHTML = '';
    }
}
function corrige() {
    if (etapas[etapaAtual] !== undefined) {
        comecarEtapa();
    }
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    let nomeVotado = "";

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: "branco"
        });
    } else if(numeroAtual.length === etapa.numeros){
        votoConfirmado = true;
  
        //buscar o candidato para salvar o nome votado
        let candidato = etapa.candidatos.filter((item)=>{
            if (item.numero === numeroAtual) {
                return true;
            } else {
                return false;
            }
        });

        if (candidato.length>0) {
            nomeVotado = candidato[0].nome;
        } else {
            nomeVotado = 'nulo';
        }
        
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numeroAtual,
            nome: nomeVotado
        });
    }


    if (votoConfirmado) {
        etapaAtual ++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }



}


comecarEtapa();
