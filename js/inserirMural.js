// ================== MODAL ==================
function abrirInserir() {
    document.getElementById("modalInserir").style.display = "block";
}

function fecharInserir() {
    document.getElementById("modalInserir").style.display = "none";
}

// ================== ENVIAR FORMULÁRIO ==================
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formInserir");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const mensagem = document.getElementById('alerta');
            const imagemInput = document.getElementById("imagem");
            const imagem = imagemInput.files[0];
            const mensagemImagem = document.getElementById("mensagemImagem");

            // Oculta aviso da imagem a cada envio
            // mensagemImagem.classList.add("d-none");

            // // Validação de tamanho da imagem
            // if (imagem && imagem.size > 2 * 1024 * 1024) {
            //     // Exibe apenas o aviso abaixo do campo de imagem
            //     mensagemImagem.classList.remove("d-none");
            //     return;
            // }


            const formData = new FormData(form);

            fetch('controller/inserirMural.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    mensagem.innerText = data.message;
                    mensagem.classList.remove('alerta-sucesso', 'alerta-erro');
                    mensagem.classList.add(data.success ? 'alerta-sucesso' : 'alerta-erro');
                    mensagem.style.display = 'block';

                    setTimeout(() => {
                        mensagem.style.display = 'none';
                        if (data.success) {
                            fecharInserir();
                            location.reload();
                        }
                    }, 3000);
                })
                .catch(error => {
                    mensagem.innerText = 'Erro ao inserir.';
                    mensagem.classList.remove('alerta-sucesso', 'alerta-erro');
                    mensagem.classList.add('alerta-erro');
                    mensagem.style.display = 'block';

                    setTimeout(() => mensagem.style.display = 'none', 3000);
                    console.error('Erro:', error);
                });
        });

        // Quando o usuário troca a imagem, esconde o aviso automaticamente
        document.getElementById("imagem").addEventListener("change", function () {
            document.getElementById("mensagemImagem").classList.add("d-none");
        });
    }
});
