// ================== FILTRO ==================
function abrirFiltrar() {
    document.getElementById("modalFiltrar").style.display = "block";
}

window.onclick = function(event) {
    const modal = document.getElementById("modalFiltrar");
    if (event.target === modal) {
        fecharFiltrar();
    }
}


document.getElementById("formFiltrar").addEventListener("submit", async function (e) {
    e.preventDefault();

    const categoria = document.getElementById("filtroCategoria").value;
    const titulo = document.getElementById("filtroTitulo").value;

    try {
        const response = await fetch(`controller/filtroMural.php?filtroCategoria=${encodeURIComponent(categoria)}&filtroTitulo=${encodeURIComponent(titulo)}`);
        const resultados = await response.json();

        exibirCards(resultados); // Você deve ter essa função ou algo similar
        fecharFiltrar();

        document.getElementById("alertaFiltro").style.display = "block";
        setTimeout(() => {
            document.getElementById("alertaFiltro").style.display = "none";
        }, 3000);
    } catch (error) {
        console.error("Erro ao aplicar filtro:", error);
    }
});

function exibirCards(mural) {
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    mural.forEach((item) => {
        const numeroLimpo = item.telefone.replace(/\D/g, '');
        const tipoClasseBtn = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';

        const card = `
            <div class="card m-2 p-3 d-flex flex-column justify-content-between" style="width: 22rem; height: 40rem;">
                <span class="categoria ${item.categoria === 'V' ? 'vendo' : 'ofereco'}">
                    ${item.categoria === 'V' ? 'Vendo' : 'Ofereço'}
                </span>
                <h3 class="card-title mt-2 text-center">${item.titulo}</h3>
                <img src="uploads/${item.imagem}" alt="Imagem do anúncio" class="img-fluid mb-2" style="height: 180px; object-fit: cover;">
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
                            <img src="imagens/whatsapp.png" alt="WhatsApp" class="telWhats"> Whats
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

    if (mural.length === 0) {
        cardsContainer.innerHTML = "<p class='text-center mt-3'>Nenhum resultado encontrado com esse filtro.</p>";
    }
}

function fecharFiltrar() {
    document.getElementById("modalFiltrar").style.display = "none";
}
