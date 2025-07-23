// ================== MODAL ==================
function abrirInserir() {
    document.getElementById("modalInserir").style.display = "block";
}

function fecharInserir() {
    document.getElementById("modalInserir").style.display = "none";
}

// ================== ENVIAR FORMULÁRIO ==================
document.getElementById("formInserir").addEventListener("submit", function (e) {
    e.preventDefault();

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

    mural.forEach((item) => {
        const card = `
            <div class="card m-2 p-3" style="width: 18rem;">
                <h3 class="card-title">${item.titulo}</h3>
                <p><strong>${item.categoria === 'V' ? 'Vendo' : 'Ofereço'}</strong></p>
                <p>${item.descricao}</p>
                <p><strong>Nome:</strong> ${item.nome}</p>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Telefone:</strong> ${item.telefone}</p>
            </div>
        `;
        cardsContainer.innerHTML += card;
    });
}

// ================== AO CARREGAR A PÁGINA ==================
window.onload = function () {
    mostrarCards();
};
