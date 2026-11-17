// =========================================
// SCRIPT DA PÁGINA - FABIANE SARRES
// =========================================


// ===== 1. BOTÃO DE TEMA (claro / escuro) com if/else =====
const botaoTema = document.getElementById("botao-tema");

function aplicarTema(tema) {
  if (tema === "escuro") {
    document.body.classList.add("escuro");
    botaoTema.textContent = "☀";
    botaoTema.setAttribute("aria-label", "Ativar tema claro");
  } else {
    document.body.classList.remove("escuro");
    botaoTema.textContent = "☾";
    botaoTema.setAttribute("aria-label", "Ativar tema escuro");
  }
}

botaoTema.addEventListener("click", function () {
  let novoTema;
  if (document.body.classList.contains("escuro")) {
    novoTema = "claro";
  } else {
    novoTema = "escuro";
  }
  aplicarTema(novoTema);
  // Guarda a escolha no localStorage
  localStorage.setItem("tema", novoTema);
});

// Quando a página abre, usa o tema que ficou salvo
aplicarTema(localStorage.getItem("tema"));


// ===== 2. LINHA DO TEMPO (array + laço) =====
const trajetoria = [
  {
    marco: "// o começo",
    titulo: "Nutricionista clínica",
    texto: "Especialista em nutrição materno-infantil. Na saúde, aprendi a ouvir, acolher e resolver problemas reais das pessoas."
  },
  {
    marco: "// em andamento",
    titulo: "Especializando em saúde da mulher",
    texto: "Estou cursando a especialização em saúde da mulher, com foco em endometriose, adenomiose e infertilidade."
  },
  {
    marco: "// a virada",
    titulo: "Análise e Desenvolvimento de Sistemas",
    texto: "Comecei ADS no SENAC-DF, estudando HTML, CSS, JavaScript, Python, Java e Git. Também sou representante da minha turma."
  },
  {
    marco: "// liderança",
    titulo: "Fundadora do Pink_Code",
    texto: "Criei um projeto para mostrar que a tecnologia é para todas, aproximando mulheres da área de TI."
  },
  {
    marco: "// hoje",
    titulo: "AWS Women in Cloud",
    texto: "No Hackathon AWS Women in Cloud, fiz a análise de requisitos e a gestão do projeto Mulheres no Controle, usando engenharia de prompts no Kiro."
  }
];

const linhaDoTempo = document.getElementById("linha-do-tempo");

for (let i = 0; i < trajetoria.length; i++) {
  const etapa = trajetoria[i];
  const item = document.createElement("li");

  // A última etapa ganha destaque
  if (i === trajetoria.length - 1) {
    item.classList.add("atual");
  }

  item.innerHTML =
    '<span class="marco">' + etapa.marco + "</span>" +
    "<h3>" + etapa.titulo + "</h3>" +
    "<p>" + etapa.texto + "</p>";

  linhaDoTempo.appendChild(item);
}


// ===== 3. HABILIDADES (array + laço) =====
const habilidades = ["HTML5", "CSS3", "JavaScript", "Python", "Java", "Angular", "Git & GitHub", "Análise de requisitos", "Engenharia de prompts", "UX/UI", "Cloud"];
const listaHabilidades = document.getElementById("lista-habilidades");

for (let i = 0; i < habilidades.length; i++) {
  const item = document.createElement("li");
  item.textContent = habilidades[i];
  listaHabilidades.appendChild(item);
}


// ===== 4. CALCULADORA DE IMC (lê, valida e calcula) =====
const formImc = document.getElementById("form-imc");
const campoPeso = document.getElementById("peso");
const campoAltura = document.getElementById("altura");
const resultado = document.getElementById("resultado");

function mostrarErro(mensagem, campo) {
  resultado.innerHTML = '<p class="resultado-erro">⚠ ' + mensagem + "</p>";
  campo.classList.add("invalido");
  campo.focus();
}

formImc.addEventListener("submit", function (evento) {
  evento.preventDefault();

  campoPeso.classList.remove("invalido");
  campoAltura.classList.remove("invalido");

  // Troca vírgula por ponto para aceitar "62,5"
  const textoPeso = campoPeso.value.trim().replace(",", ".");
  const textoAltura = campoAltura.value.trim().replace(",", ".");

  // Validação: campos vazios
  if (textoPeso === "") {
    mostrarErro("Digite o seu peso.", campoPeso);
    return;
  }
  if (textoAltura === "") {
    mostrarErro("Digite a sua altura.", campoAltura);
    return;
  }

  let peso = Number(textoPeso);
  let altura = Number(textoAltura);

  // Validação: letra no lugar de número
  if (isNaN(peso)) {
    mostrarErro("O peso precisa ser um número. Exemplo: 62,5", campoPeso);
    return;
  }
  if (isNaN(altura)) {
    mostrarErro("A altura precisa ser um número. Exemplo: 1,65", campoAltura);
    return;
  }

  // Se a pessoa digitar a altura em centímetros (ex: 165), converte para metros
  if (altura > 3) {
    altura = altura / 100;
  }

  // Validação: valores fora do normal
  if (peso < 20 || peso > 300) {
    mostrarErro("Digite um peso entre 20 e 300 kg.", campoPeso);
    return;
  }
  if (altura < 0.5 || altura > 2.5) {
    mostrarErro("Digite uma altura entre 0,50 e 2,50 m.", campoAltura);
    return;
  }

  // Cálculo do IMC
  const imc = peso / (altura * altura);
  let classificacao;
  let dica;

  // Classificação da OMS para adultos
  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    dica = "Vale procurar uma nutricionista para ganhar peso com saúde.";
  } else if (imc < 25) {
    classificacao = "Peso adequado";
    dica = "Continue cuidando da alimentação e se movimentando!";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
    dica = "Pequenas mudanças na rotina já fazem diferença.";
  } else if (imc < 35) {
    classificacao = "Obesidade grau I";
    dica = "Um acompanhamento profissional pode ajudar bastante.";
  } else if (imc < 40) {
    classificacao = "Obesidade grau II";
    dica = "Procure acompanhamento com nutricionista e médico.";
  } else {
    classificacao = "Obesidade grau III";
    dica = "Procure acompanhamento com nutricionista e médico.";
  }

  const imcTexto = imc.toFixed(1).replace(".", ",");

  resultado.innerHTML =
    '<p class="resultado-numero">' + imcTexto + "</p>" +
    '<p class="resultado-classe">' + classificacao + "</p>" +
    '<p class="resultado-dica">' + dica + "</p>";

  salvarNoHistorico(imcTexto, classificacao);
});


// ===== 5. HISTÓRICO SALVO NO localStorage =====
const listaHistorico = document.getElementById("lista-historico");
const botaoLimpar = document.getElementById("limpar-historico");

function lerHistorico() {
  const salvo = localStorage.getItem("historicoImc");
  if (salvo) {
    return JSON.parse(salvo);
  } else {
    return [];
  }
}

function mostrarHistorico() {
  const historico = lerHistorico();
  listaHistorico.innerHTML = "";

  if (historico.length === 0) {
    listaHistorico.innerHTML = "<li><span>Nenhum cálculo ainda.</span></li>";
    return;
  }

  for (let i = 0; i < historico.length; i++) {
    const item = document.createElement("li");
    item.innerHTML = "IMC " + historico[i].imc + " · " + historico[i].classe + " <span>" + historico[i].data + "</span>";
    listaHistorico.appendChild(item);
  }
}

function salvarNoHistorico(imc, classe) {
  const historico = lerHistorico();
  const data = new Date().toLocaleDateString("pt-BR");

  // Coloca o novo cálculo no começo da lista
  historico.unshift({ imc: imc, classe: classe, data: data });

  // Guarda só os 5 últimos
  if (historico.length > 5) {
    historico.pop();
  }

  localStorage.setItem("historicoImc", JSON.stringify(historico));
  mostrarHistorico();
}

botaoLimpar.addEventListener("click", function () {
  localStorage.removeItem("historicoImc");
  mostrarHistorico();
});

mostrarHistorico();
