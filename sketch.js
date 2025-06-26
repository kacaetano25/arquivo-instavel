// Arquivo: sketch.js
// Versão de teste para o efeito "Paranoia Algorítmica" - Etapa 1: Correção de Cor

let imgOriginal;
let imgAlvo; // Nossa imagem de referência do Mosh Pro

// Links diretos para as imagens no GitHub
const URL_ORIGINAL = 'https://raw.githubusercontent.com/kacaetano25/arquivo-instavel/main/assets/apple.jpg';
const URL_ALVO_EFEITO_COR = 'https://raw.githubusercontent.com/kacaetano25/arquivo-instavel/main/assets/apple_paranoia.png';

function preload() {
  // Carrega as duas imagens antes do programa começar
  imgOriginal = loadImage(URL_ORIGINAL);
  imgAlvo = loadImage(URL_ALVO_EFEITO_COR);
}

function setup() {
  // Cria um canvas com o dobro da largura para caber as duas imagens
  createCanvas(imgOriginal.width * 2, imgOriginal.height);
  
  // --- PREPARAÇÃO DO TESTE ---
  
  // 1. Desenha a imagem de referência (do Mosh Pro) à esquerda
  image(imgAlvo, 0, 0);
  
  // 2. Cria uma imagem em branco para o nosso resultado
  let minhaVersao = createImage(imgOriginal.width, imgOriginal.height);
  
  // 3. Aplica nossa função de correção de cor na imagem original
  // e guarda o resultado em 'minhaVersao'
  colorCorrection(imgOriginal, minhaVersao);
  
  // 4. Desenha o nosso resultado à direita para podermos comparar
  image(minhaVersao, imgOriginal.width, 0);
  
  // Adiciona textos para sabermos quem é quem
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(20);
  text('Resultado do Mosh Pro (Alvo)', 20, 30);
  text('Resultado do Nosso Código p5.js', imgOriginal.width + 20, 30);
  
  noLoop(); // Não precisamos de animação
}


/**
 * Aplica correção de cor para simular os parâmetros do Mosh Pro.
 * Parâmetros-alvo: Saturation: 0.19, Hue Offset: 0.76
 * @param {p5.Image} original - A imagem de entrada.
 * @param {p5.Image} destino - A imagem onde o resultado será desenhado.
 */
function colorCorrection(original, destino) {
  // Define o modo de cor para HSB (Hue, Saturation, Brightness)
  // Hue: 0-360 (graus no círculo de cor)
  // Saturation: 0-100 (percentual)
  // Brightness: 0-100 (percentual)
  colorMode(HSB, 360, 100, 100);
  
  original.loadPixels(); // Carrega os dados dos pixels da imagem original
  
  // Percorre cada pixel da imagem original
  for (let x = 0; x < original.width; x++) {
    for (let y = 0; y < original.height; y++) {
      
      // Pega a cor do pixel atual
      let corDoPixel = original.get(x, y);
      
      // Extrai os componentes HSB
      let h = hue(corDoPixel);
      let s = saturation(corDoPixel);
      let b = brightness(corDoPixel);
      
      // --- APLICAÇÃO DOS PARÂMETROS ---
      // Parâmetro Saturation: 0.19 (reduz a saturação para 19% do original)
      s = s * 0.19; 
      
      // Parâmetro Hue Offset: 0.76 (desloca o matiz)
      // 0.76 de uma volta completa de 360 graus
      h = (h + (0.76 * 360)) % 360; 
      
      // Pinta o pixel na imagem de destino com a nova cor
      destino.set(x, y, color(h, s, b));
    }
  }
  
  destino.updatePixels(); // Aplica as mudanças que fizemos com set()
  
  // Volta ao modo de cor padrão para não afetar outras funções no futuro
  colorMode(RGB);
  console.log('Função colorCorrection finalizada!');
}