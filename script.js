// Funções para abrir e fechar modal
function abrirInserir() {
    document.getElementById("modalInserir").style.display = "block";
}

function fecharInserir() {
    document.getElementById("modalInserir").style.display = "none";
}

// Enviar formulário
document.getElementById("formInserir").addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    const novoCard = { tipo, nome, email, telefone, titulo, descricao };

    let mural = JSON.parse(localStorage.getItem("mural")) || [];
    mural.push(novoCard);
    localStorage.setItem("mural", JSON.stringify(mural));

    mostrarCards();
    this.reset();
    fecharInserir();
});

// Mostrar os cards
function mostrarCards() {
    const mural = JSON.parse(localStorage.getItem("mural")) || [];
    const cardsContainer = document.querySelector(".cards");
    cardsContainer.innerHTML = "";

    mural.forEach((item, index) => {
        const card = `
            <div class="card m-2 p-3" style="width: 18rem;">
                <h5 class="card-title">${item.titulo}</h5>
                <p><strong>${item.tipo === 'V' ? 'Vendo' : 'Ofereço'}</strong></p>
                <p>${item.descricao}</p>
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Telefone:</strong> ${item.telefone}</p>
            </div>
        `;
        cardsContainer.innerHTML += card;
    });
}

// Mostrar cards ao carregar a página
window.onload = mostrarCards;
