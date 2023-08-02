//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete e da raquete do oponente

let xRaquete = 5;
let yRaquete = 150;
let xRaqueteOponente = 685;
let yRaqueteOponente = 150;
let rComprimento = 10; 
let rAltura = 90;
let velocidadeYOponente ;
let chanceDeErrar = 0;

//extremos da bolinha para colisao

let esquerdaBolinha = xBolinha - raio;
let superiorBolinha = yBolinha - raio;
let inferiorBolinha = yBolinha + raio;
let direitaRaquete = xRaquete + rComprimento;
let superiorRaquete = yRaquete;
let inferiorRaquete = yRaquete + rAltura;	
let colidiu = false;

//placar

let meusPontos = 0;
let pontosOponente = 0;

//sons 

let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(700, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
 // verificaColisaoRaquete();
  colisaoRaquetes(xRaquete, yRaquete);
  colisaoRaquetes(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  placar();
  marcaPontos();
  calculaChanceDeErrar();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x, y){ 
  rect(x, y, rComprimento, rAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 10, 310);
}

function movimentaRaqueteOponente() {
velocidadeYOponente = yBolinha - yRaqueteOponente - rComprimento / 2 - 30;
 yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
 yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
 calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
 chanceDeErrar += 1
    if (chanceDeErrar >= 39){
 chanceDeErrar = 40
    }
  } else {
 chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
 chanceDeErrar = 35
    }
  }
}

// function verificaColisaoRaquete(){
//   if (esquerdaBolinha < direitaRaquete && superiorBolinha < inferiorRaquete && inferiorBolinha > superiorRaquete) {
 //       velocidadeXBolinha *= -1;
 //   } 
//}

function colisaoRaquetes(x, y) {
  colidiu = collideRectCircle(x, y, rComprimento, rAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
        velocidadeXBolinha *= -1;
  raquetada.play();
    }
}

function placar(){
  stroke(255);
  textAlign (CENTER);
  textSize (15);
  fill(color(255, 140,0))
  rect (345, 12, 30, 17)
  rect (275, 12, 30, 17)
  fill (255);
  text (meusPontos, 290, 26)
  text (pontosOponente, 360, 26)
}

function marcaPontos(){
  if (xBolinha > 690){
    meusPontos += 1;
  ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
  ponto.play();
  } 
}