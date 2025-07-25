function fecharVisualizar() {
    document.getElementById("modalVisualizar").style.display = "none";
}

// ================== MOSTRAR CARDS e CARREGA MAIS ==================

let offset = 0;
const limit = 6; // Quantos itens por clique

async function mostrarCards() {
    const cardsContainer = document.getElementById("listaAnuncios");

    try {
        const response = await fetch(`controller/listarMural.php?offset=${offset}&limit=${limit}`);
        const mural = await response.json();

        // Se não vierem mais itens, esconde o botão
        if (mural.length === 0) {
            document.getElementById("btnCarregarMais").style.display = "none";
            return;
        }

        mural.forEach((item) => {
            const numeroLimpo = item.telefone.replace(/\D/g, '');
            const tipoClasseBtn = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';
                                                            //O tamanho dos card, estão definidos aqui: width: 18rem; height: 50rem
            const card = `
            <div class="card m-2 p-3 d-flex flex-column justify-content-between" style="width: 22rem; height: 40rem"> 
                <span class="categoria ${item.categoria === 'V' ? 'vendo' : 'ofereco'}">
                    ${item.categoria === 'V' ? 'Vendo' : 'Ofereço'}
                </span>
                <h3 class="card-title mt-2 text-center">${item.titulo}</h3>
                <img src="uploads/${item.imagem}" alt="Imagem do anúncio" class="img-fluid mb-2" style="height: 180px; object-fit: contain;">
                <p class="descricao-limitada">${item.descricao}</p>
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Telefone:</strong> ${item.telefone}</p>
                <div class="mt-auto">
                    <div class="mt-2 d-flex gap-2">
                        <a href="tel:${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank">
                            <img src="imagens/telefone.png" alt="Telefone" class="telWhats"> Ligar
                        </a>
                        <a href="https://wa.me/${numeroLimpo}" class="${tipoClasseBtn} botao-metade" target="_blank">
                            <img src="imagens/whatsapp.png" alt="Telefone" class="telWhats"> Whats
                        </a>
                    </div>
                    <div class="mt-2">
                        <div class="btn-ver-mais ${item.categoria === 'V' ? 'vendo' : 'ofereco'}" onclick="abrirVisualizar(${item.id})">
                            Ver mais
                        </div>
                    </div>
                </div>
            </div>
            `;
            cardsContainer.innerHTML += card;
        });

        // Atualiza o offset para próxima chamada
        offset += mural.length;

    } catch (error) {
        console.error("Erro ao carregar mural:", error);
    }
}

// Ao clicar no botão “Carregar mais”
document.getElementById("btnCarregarMais").addEventListener("click", mostrarCards);


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

// ================== Mascara telefone ==================
function aplicarMascaraTelefone(input) {
    input.addEventListener("input", function () {
        let valor = input.value.replace(/\D/g, "");
        if (valor.length > 11) valor = valor.slice(0, 11);
        if (valor.length > 0) {
            valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
        }
        input.value = valor.trim();
    });
}
