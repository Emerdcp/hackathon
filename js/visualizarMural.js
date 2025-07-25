// ================== VISUALIZAR CARD ==================
async function abrirVisualizar(id) {
    try {
        const response = await fetch(`controller/visualizarMural.php?id=${id}`);
        const item = await response.json();

        document.getElementById("visualizarTitulo").textContent = item.titulo;

// const categoriaBanner = document.getElementById("visualizarCategoria");
// categoriaBanner.textContent = item.categoria === 'V' ? 'Vendo' : 'Ofereço';
// categoriaBanner.className = `btn-categoria w-100 text-center ${item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco'}`;

        const categoriaElement = document.getElementById("visualizarCategoria");

        // Aplica texto e estilo
        categoriaElement.textContent = item.categoria === 'V' ? 'VENDO' : 'OFEREÇO';
        categoriaElement.classList.remove('btn-vendo', 'btn-ofereco');
        categoriaElement.classList.add(item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco');

        document.getElementById("visualizarImagem").src = `uploads/${item.imagem}`;
        document.getElementById("visualizarDescricao").textContent = item.descricao;
        document.getElementById("visualizarNome").textContent = item.nome;
        document.getElementById("visualizarEmail").textContent = item.email;
        document.getElementById("visualizarTelefone").textContent = item.telefone;

        // const numeroLimpo = item.telefone.replace(/\D/g, '');
        const numeroLimpo = (item.telefone ?? '').replace(/\D/g, '');
        const linkLigar = document.getElementById("linkLigar");
        const linkWhatsapp = document.getElementById("linkWhatsapp");

        linkLigar.href = `tel:${numeroLimpo}`;
        linkWhatsapp.href = `https://wa.me/${numeroLimpo}`;

        linkLigar.classList.remove('btn-vendo', 'btn-ofereco');
        linkWhatsapp.classList.remove('btn-vendo', 'btn-ofereco');

        const classeCategoria = item.categoria === 'V' ? 'btn-vendo' : 'btn-ofereco';
        linkLigar.classList.add(classeCategoria);
        linkWhatsapp.classList.add(classeCategoria);

        document.getElementById("modalVisualizar").style.display = "block";

    } catch (error) {
        console.error("Erro ao visualizar item:", error);
    }
}

function fecharVisualizar() {
    document.getElementById("modalVisualizar").style.display = "none";
}

const modal = document.getElementById("modalVisualizar");

modal.addEventListener("click", function(event) {
  // Se o clique for exatamente no modal (fundo), fecha
  if (event.target === modal) {
    fecharVisualizar();
  }
});