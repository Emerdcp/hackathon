// ================== MODAL ==================
function abrirInserir() {
    document.getElementById("modalInserir").style.display = "block";
}

function fecharInserir() {
    document.getElementById("modalInserir").style.display = "none";
}

function fecharVisualizar() {
    document.getElementById("modalVisualizar").style.display = "none";
}

// ================== ENVIAR FORMULÁRIO ==================
document.getElementById("formInserir").addEventListener("submit", function (e) {
    e.preventDefault();

    // const dados = {
    //     categoria: document.getElementById('categoria').value,
    //     nome: document.getElementById('nome').value,
    //     email: document.getElementById('email').value,
    //     telefone: document.getElementById('telefone').value,
    //     titulo: document.getElementById('titulo').value,
    //     descricao: document.getElementById('descricao').value
    // };

    // enviarParaBanco(dados);

    const categoria = document.getElementById("categoria").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    const novoCard = { categoria, nome, email, telefone, titulo, descricao };

    let mural = JSON.parse(localStorage.getItem("mural")) || [];
    mural.push(novoCard);
    localStorage.setItem("mural", JSON.stringify(mural));

    mostrarCards();
    this.reset();
    fecharInserir();
});

// ================== MOSTRAR CARDS ==================
function mostrarCards() {
    const mural = JSON.parse(localStorage.getItem("mural")) || [];
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";


    mural.forEach((item, index) => {
        const numeroLimpo = item.telefone.replace(/\D/g, ''); // Remove traços, espaços, parênteses etc.
        const tipoClasseBtn = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';

        const card = `
        <div class="card m-2 p-3" style="width: 18rem;">
            <span class="categoria ${item.categoria === 'V' ? 'vendo' : 'ofereco'}">
                ${item.categoria === 'V' ? 'Vendo' : 'Ofereço'}
            </span>
            <h3 class="card-title mt-2">${item.titulo}</h3>
            <p class="descricao-limitada">${item.descricao}</p>
            <p><strong>Nome:</strong> ${item.nome}</p>
            <p><strong>Email:</strong> ${item.email}</p>
            <p><strong>Telefone:</strong> ${item.telefone}</p>
            <div class="mt-2 d-flex gap-2">
                <a href="tel:${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank"><img src="imagens/telefone.png" alt="Telefone" class="telWhats">Ligar</a>
                <a href="https://wa.me/${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank"><img src="imagens/whatsapp.png" alt="Telefone" class="telWhats">Whats</a>
            </div>
            <div class="mt-2">
                <div class="btn-ver-mais ${item.categoria === 'V' ? 'vendo' : 'ofereco'}"
                    onclick="abrirVisualizar(${index})">
                    Ver mais
                </div>
            </div>
        </div>
    `;
        cardsContainer.innerHTML += card;
    });
}


// ================== AO CARREGAR A PÁGINA ==================
window.onload = function () {
    mostrarCards();

    const telefoneInput = document.getElementById("telefone");
    aplicarMascaraTelefone(telefoneInput);
};


// ================== EXIBE ALERTA ==================
function exibirAlerta(mensagem, tipo = 'sucesso') {
    const alerta = document.getElementById("alerta");
    alerta.className = `alerta ${tipo}`;
    alerta.textContent = mensagem;
    alerta.style.display = 'block';
    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
}

// ================== VISUALIZAR CARD ==================
function abrirVisualizar(index) {
    const mural = JSON.parse(localStorage.getItem("mural")) || [];
    const item = mural[index];

    document.getElementById("visualizarTitulo").textContent = item.titulo;
    document.getElementById("visualizarDescricao").textContent = item.descricao;
    document.getElementById("visualizarNome").textContent = item.nome;
    document.getElementById("visualizarEmail").textContent = item.email;
    document.getElementById("visualizarTelefone").textContent = item.telefone;

    const numeroLimpo = item.telefone.replace(/\D/g, '');
    const linkLigar = document.getElementById("linkLigar");
    const linkWhatsapp = document.getElementById("linkWhatsapp");

    // Define links
    linkLigar.href = `tel:${numeroLimpo}`;
    linkWhatsapp.href = `https://wa.me/${numeroLimpo}`;

    // Remove classes antigas
    linkLigar.classList.remove('btn-vendo', 'btn-ofereco');
    linkWhatsapp.classList.remove('btn-vendo', 'btn-ofereco');

    // Adiciona classe conforme a categoria
    const classeCategoria = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';
    linkLigar.classList.add(classeCategoria);
    linkWhatsapp.classList.add(classeCategoria);

    document.getElementById("modalVisualizar").style.display = "block";
}



// ================== Mascará telefone ==================

function aplicarMascaraTelefone(input) {
    input.addEventListener("input", function () {
        let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número

        if (valor.length > 11) {
            valor = valor.slice(0, 11); // Limita a 11 dígitos
        }

        if (valor.length > 0) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
        }

        input.value = valor.trim();
    });
}


// ================== ABRIR / FECHAR MODAL DE FILTRO ==================
function abrirFiltrar() {
  document.getElementById("modalFiltrar").style.display = "block";
}

function fecharFiltrar() {
  document.getElementById("modalFiltrar").style.display = "none";
  document.getElementById("formFiltrar").reset();
}


// ================== FILTRAR ==================
document.getElementById("formFiltrar").addEventListener("submit", function (e) {
  e.preventDefault();

  const categoria = document.getElementById("filtroCategoria").value.trim();
  const nome = document.getElementById("filtroNome").value.trim().toLowerCase();
  const titulo = document.getElementById("filtroTitulo").value.trim().toLowerCase();

  const mural = JSON.parse(localStorage.getItem("mural")) || [];

  const filtrados = mural.filter(item => {
    const matchCategoria = !categoria || item.categoria === categoria;
    const matchNome = !nome || item.nome.toLowerCase().includes(nome);
    const matchTitulo = !titulo || item.titulo.toLowerCase().includes(titulo);
    return matchCategoria && matchNome && matchTitulo;
  });

  mostrarCardsFiltrados(filtrados);
  fecharFiltrar();

  const alerta = document.getElementById("alertaFiltro");
  alerta.style.display = "block";
  setTimeout(() => (alerta.style.display = "none"), 3000);
});

// ================== MOSTRAR CARDS FILTRADOS ==================
function mostrarCardsFiltrados(lista) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  lista.forEach((item, index) => {
    const numeroLimpo = item.telefone.replace(/\D/g, '');
    const tipoClasseBtn = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';
    const corCategoria = item.categoria === 'V' ? 'vendo' : 'ofereco';

    const descricaoLimitada = item.descricao.length > 80
      ? item.descricao.substring(0, 80).trim() + "..."
      : item.descricao;

    const card = `
      <div class="card m-2 p-3" style="width: 18rem;">
          <span class="categoria ${corCategoria}">${item.categoria === 'V' ? 'VENDO' : 'OFEREÇO'}</span>
          <h3 class="card-title mt-2">${item.titulo}</h3>
          <p class="descricao-limitada">${descricaoLimitada}</p>
          <p><strong>Nome:</strong> ${item.nome}</p>
          <p><strong>Email:</strong> ${item.email}</p>
          <p><strong>Telefone:</strong> ${item.telefone}</p>
          <div class="mt-2 d-flex gap-2">
              <a href="tel:${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank">
                <img src="imagens/telefone.png" class="telWhats" />Ligar
              </a>
              <a href="https://wa.me/${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank">
                <img src="imagens/whatsapp.png" class="telWhats" />Whats
              </a>
          </div>
          <button class="${tipoClasseBtn} w-100 mt-2" onclick="abrirVisualizar(${mural.indexOf(item)})">Ver mais</button>
      </div>
    `;
    cardsContainer.innerHTML += card;
  });
}