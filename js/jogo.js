// Variáveis globais do jogo
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Referências aos botões e elementos
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const especial = document.getElementById('especial');

// Reinicia tudo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
  especial.className = 'invisivel';
  especial.innerHTML = "";
}

// Prepara nova rodada
function jogarNovamente() {
  jogar = true;
  const cartas = document.querySelectorAll(".inicial, .acertou, .errou");

  cartas.forEach(carta => {
    // Remove emojis de acerto/erro
    const imagensExtras = carta.querySelectorAll(".emoji");
    imagensExtras.forEach(img => img.remove());

    // Restaura estado inicial e imagem da carta
    carta.className = "inicial";
    carta.innerHTML = `<img class="img-carta" src="https://veja.abril.com.br/wp-content/uploads/2020/02/apostas_esportiva_onlines-oee803dsbihgfdxk1c09q20xbi7ag51k80npcttet8.jpg?crop=1&resize=1212,909" alt="Carta">`;
  });

  atualizaPlacar(acertos, tentativas);
  especial.className = 'invisivel';
  especial.innerHTML = "";
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Atualiza placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (tentativas > 0) ? (acertos / tentativas) * 100 : 0;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} | Tentativas: ${tentativas} | Desempenho: ${Math.round(desempenho)}%`;
}

// Evento de acerto
function acertou(obj) {
  obj.className = "acertou";
  const imgCarta = obj.querySelector(".img-carta");
  if (imgCarta) imgCarta.remove();

  const img = new Image(100);
  img.className = "emoji acerto-animado"; // classe com animação
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  obj.appendChild(img);
}


// Evento de erro
function errou(obj) {
  obj.className = "errou";
  // Remove a imagem da carta para mostrar só o emoji
  const imgCarta = obj.querySelector(".img-carta");
  if (imgCarta) imgCarta.remove();

  const img = new Image(100);
  img.className = "emoji";
  img.src = "https://cdn-icons-png.flaticon.com/512/1828/1828665.png";
  obj.appendChild(img);
}

// Verificação do clique
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    const sorteado = Math.floor(Math.random() * 4);

    if (parseInt(obj.id) === sorteado) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj);
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);

    // Após 4 jogadas, mostra botões e evento especial
    if (tentativas === 4) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';

      if (acertos === 4) {
        especial.className = 'visivel';
        especial.innerHTML = "🎉 Parabéns! Você acertou todas!";
      } else if (acertos === 0) {
        especial.className = 'visivel';
        especial.innerHTML = "💀 Você errou todas. Tente novamente!";
      }
    }
  } else {
    alert('Clique em "Jogar novamente" para continuar.');
  }
}

// Eventos de clique
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
