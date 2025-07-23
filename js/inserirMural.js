// ================== MODAL ==================
function abrirInserir() {
    document.getElementById("modalInserir").style.display = "block";
}

function fecharInserir() {
    document.getElementById("modalInserir").style.display = "none";
}


// ================== ENVIAR FORMULÁRIO ==================//

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formInserir");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const mensagem = document.getElementById('mensagem-inserir');

      fetch('../controller/inserir.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          mensagem.innerText = data.message;
          mensagem.classList.remove('alerta-sucesso', 'alerta-erro'); // remove classes antigas
          mensagem.classList.add(data.success ? 'alerta-sucesso' : 'alerta-erro'); // adiciona a correta
          mensagem.style.display = 'block';

          setTimeout(() => {
            mensagem.style.display = 'none';
            if (data.success) {
              fecharModal('modalInserir');
              // location.reload(); // ou atualizar tabela
            //   buscar(); // função que carrega novamente a tabela sem recarregar a página
            }
          }, 3000);
        })
        .catch(error => {
          mensagem.innerText = 'Erro ao inserir usuário.';
          mensagem.classList.remove('alerta-sucesso', 'alerta-erro');
          mensagem.classList.add('alerta-erro');
          mensagem.style.display = 'block';

          setTimeout(() => mensagem.style.display = 'none', 3000);
          console.error('Erro:', error);
        });
    });
  }
  // Chama no carregamento da página
//   buscarCliente();
});






// ================== ENVIAR FORMULÁRIO ==================
document.getElementById("formInserir").addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = {
        categoria: document.getElementById('categoria').value,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value
    };
    enviarParaBanco(dados);

});

// ================== ENVIAR PARA O BANCO DE DADOS ==================
async function enviarParaBanco(dados) {
    const formData = new FormData();
    for (let key in dados) {
        formData.append(key, dados[key]);
    }

    const response = await fetch('controller/inserirMural.php', {
        method: 'POST',
        body: formData
    });

    const resultado = await response.json();
    if (resultado.success) {
        alert('Anúncio inserido no banco com sucesso!');
    } else {
        alert('Erro: ' + resultado.message);
    }
}
