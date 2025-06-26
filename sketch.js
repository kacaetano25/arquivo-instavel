/**
 * VERSÃO 3: Aplica correção de cor com a lógica de saturação corrigida.
 * Parâmetros-alvo: Saturation: 0.19 (neutro em 0.5), Hue Offset: 0.76
 * @param {p5.Image} original - A imagem de entrada.
 * @param {p5.Image} destino - A imagem onde o resultado será desenhado.
 */
function colorCorrection(original, destino) {
  // Define o modo de cor para HSB para facilitar a manipulação
  colorMode(HSB, 360, 100, 100);
  
  original.loadPixels();
  
  // Percorre cada pixel da imagem original
  for (let x = 0; x < original.width; x++) {
    for (let y = 0; y < original.height; y++) {
      
      let corDoPixel = original.get(x, y);
      
      // Extrai os componentes HSB
      let h = hue(corDoPixel);
      let s = saturation(corDoPixel);
      let b = brightness(corDoPixel);
      
      // --- APLICAÇÃO DOS PARÂMETROS CORRIGIDOS ---
      
      // Parâmetro Saturation: 0.19. Lógica nova: 0.5 é neutro.
      // Isso significa que queremos 38% da saturação original.
      s = s * (0.19 / 0.5); 
      
      // Parâmetro Hue Offset: 0.76. Lógica mantida.
      // Desloca o matiz em 76% de uma volta de 360 graus.
      h = (h + (0.76 * 360)) % 360; 
      
      // Pinta o pixel na imagem de destino com a nova cor
      destino.set(x, y, color(h, s, b));
    }
  }
  
  destino.updatePixels();
  
  // Volta ao modo de cor padrão
  colorMode(RGB);
  console.log('Função colorCorrection (v3) finalizada com nova lógica!');
}