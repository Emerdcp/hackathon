<?php 
include_once 'controller/verificaInativacao.php';
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mural Empreendedorismo</title>
    <link rel="icon" href="imagens/aviso.png">
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
    <meta name="description" content="Mural do Empreendedorismo, Vendo / Ofereço" />


    <!-- Transforma as Imagens -->
    <link rel="icon" href="./imagens/aviso16.png" sizes="16x16" type="image/png">
    <link rel="icon" href="./imagens/aviso32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="./imagens/aviso96.png" sizes="96x96" type="image/png">

    <!-- Transforma em APP -->
    <link rel="manifest" href="./manifest.json" />
    <meta name="theme-color" content="hashtag#fff">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">

  

</head>

<body>
    <section class="hero">
        <div class="overlay">
            <div class="container">
                <h1><b>Mural do Empreendedorismo</b></h1>
                <h3>Aqui você pode divulgar o que está vendendo ou oferecendo como serviço.</h3>
                <a class="btn btn-primary me-2" onclick="abrirInserir()">Inserir</a>
                <a class="btn btn-outline-secondary" onclick="abrirFiltrar()">Filtrar</a>
            </div>
        </div>
    </section>

    <!--================== BARRA DE NAVEGAÇÃO ==================-->
    <section>
        <div class="container">
            <img src="imagens/anuncios.png" class="anuncios" alt="Anúncios">
            <div class="cards row" id="listaAnuncios">

            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button id="btnCarregarMais" class="">Carregar mais</button>
            </div>
        </div>
    </section>

    <!--================== MODAL PARA INSERIR ==================-->
    <div id="modalInserir" class="modal">
        <div class="modal-conteudo">
            <span class="fechar" onclick="fecharInserir()">&times;</span>
            <h3>Inserir no Mural</h3>
            <form id="formInserir" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-md-12">
                        <label for="categoria">Categoria</label>
                        <select name="categoria" id="categoria" class="form-control" required>
                            <option value="V">Vendo</option>
                            <option value="O">Ofereço</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <label for="nome" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite seu nome" maxlength="80"
                            required>
                    </div>
                    <div class="col-md-12">
                        <label for="email" class="form-label">E-mail</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Digite seu e-mail"
                            maxlength="100" required>
                    </div>
                    <div class="col-md-12">
                        <label for="telefone" class="form-label">Telefone</label>
                        <input type="text" class="form-control" id="telefone" name="telefone" placeholder="Digite seu telefone"
                            maxlength="20" required>
                    </div>
                    <div class="col-md-12">
                        <label for="titulo" class="form-label">Título</label>
                        <input type="text" class="form-control" id="titulo" name="titulo" placeholder="Digite o título"
                            maxlength="40" required>
                    </div>
                    <div class="col-md-12">
                        <label for="descricao" class="form-label">Descrição</label>
                        <textarea class="form-control" id="descricao" name="descricao" placeholder="Digite a descrição" maxlength="250"
                            required></textarea>
                    </div>
                    <div class="col-md-12">
                        <label for="imagem" class="form-label">Imagem</label>
                        <input type="file" class="form-control" id="imagem" name="imagem" accept="image/*" required>
                        <small class="text-muted"><b><i>A imagem deve ter no máximo 2MB.</i></b></small>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <button type="submit" class="btn btn-primary flex-fill">Salvar</button>
                        <button type="button" class="btn btn-secondary flex-fill" onclick="fecharInserir('modalInserir')">Cancelar</button>
                    </div>
                    <div id="alerta" class="alerta sucesso">Anúncio inserido com sucesso!</div>
                </div>
            </form>
        </div>
    </div>

    <!--================== MODAL PARA FILTRAR ==================-->
    <div id="modalFiltrar" class="modal">
        <div class="modal-conteudo">
            <span class="fechar" onclick="fecharFiltrar()">&times;</span>
            <h3>Filtrar no Mural</h3>
            <form id="formFiltrar">
                <div class="mb-3">
                    <label for="filtroCategoria">Categoria</label>
                    <select name="filtroCategoria" id="filtroCategoria" class="form-control">
                        <option value="">Todas</option>
                        <option value="V">Vendo</option>
                        <option value="O">Ofereço</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="filtroTitulo" class="form-label">Título</label>
                    <input type="text" class="form-control" id="filtroTitulo" placeholder="Digite o título">
                </div>
                <div class="d-flex gap-2 mt-3">
                    <button type="submit" class="btn btn-primary flex-fill">Filtrar</button>
                    <button type="button" class="btn btn-secondary flex-fill"
                        onclick="fecharFiltrar()">Cancelar</button>
                </div>
                <div id="alertaFiltro" class="alerta sucesso" style="display:none; margin-top:10px;">Filtro aplicado com
                    sucesso!</div>
            </form>
        </div>
    </div>

    <!--================== Modal Visualização ==================-->
    <div id="modalVisualizar" class="modal">
        <div class="modal-conteudo">
            <span class="fechar" onclick="fecharVisualizar()">&times;</span>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div id="visualizarCategoria" class="btn-categoria w-100 text-center">Categoria</div>
                <span class="fechar" onclick="fecharVisualizar()">&times;</span>
            </div>
            <h3 id="visualizarTitulo" class="text-center mt-2 mb-3 fw-bold"></h3>
            <!-- <img id="visualizarImagem" src="" alt="Imagem do anúncio" class="img-fluid mb-2" style="height: 180px; object-fit: cover;"> -->
            <div class="text-center">
                <img id="visualizarImagem" src="" alt="Imagem do anúncio" class="img-fluid mb-3 visualizar-imagem">
            </div>
            <p id="visualizarDescricao"></p>
            <p><strong>Nome:</strong> <span id="visualizarNome"></span></p>
            <p><strong>Email:</strong> <span id="visualizarEmail"></span></p>
            <p><strong>Telefone:</strong> <span id="visualizarTelefone"></span></p>
            <div class="mt-2 d-flex gap-2">
                <a id="linkLigar" href="#" class="botao-metade" target="_blank">
                    <img src="imagens/telefone.png" alt="Telefone" class="telWhats"> Ligar
                </a>
                <a id="linkWhatsapp" href="#" class="botao-metade" target="_blank">
                    <img src="imagens/whatsapp.png" alt="WhatsApp" class="telWhats"> Whats
                </a>
            </div>
        </div>
    </div>

    <!--================== INFORMAÇÃO DO REDAPÉ ==================-->
    <footer>
        <div class="container">
            <p style="text-align: center;"><b><i>As negociações são de inteira responsabilidade dos anunciantes, e não do Senac, ok?</b></i></p>
        </div>
    </footer>

    <!--================== CHAMADA DO JAVA ==================-->
    <script src="script.js"></script>
    <script src="js/inserirMural.js"></script>
    <script src="js/filtroMural.js"></script>
    <script src="js/visualizarMural.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"
        defer></script>
</body>
</html>