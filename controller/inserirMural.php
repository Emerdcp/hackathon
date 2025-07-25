<?php
require_once '../config.php';
header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

$categoria = $_POST['categoria'] ?? '';
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$titulo = $_POST['titulo'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$st_registro = $_POST['st_registro'] ?? '';


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['message'] = 'E-mail inválido.';
    echo json_encode($response);
    exit;
}

if (!$categoria || !$nome || !$email || !$telefone || !$titulo || !$descricao) {
    $response['message'] = 'Todos os campos obrigatórios devem ser preenchidos.';
    echo json_encode($response);
    exit;
}

$tamanhoMaximo = 2 * 1024 * 1024; // 2MB
if ($_FILES['imagem']['size'] > $tamanhoMaximo) {
    $response['message'] = 'A imagem excede o tamanho máximo permitido (2MB).';
    echo json_encode($response);
    exit;
}

// Upload de imagem
if (!isset($_FILES['imagem']) || $_FILES['imagem']['error'] != 0) {
    $response['message'] = 'Erro ao enviar a imagem.';
    echo json_encode($response);
    exit;
}

$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$imagemNome = uniqid() . '_' . basename($_FILES['imagem']['name']);
$caminhoImagem = $uploadDir . $imagemNome;

if (!move_uploaded_file($_FILES['imagem']['tmp_name'], $caminhoImagem)) {
    $response['message'] = 'Falha ao mover imagem.';
    echo json_encode($response);
    exit;
}

try {
    $sql = "INSERT INTO CAD_MURAL (CATEGORIA, NOME, EMAIL, TELEFONE, TITULO, DESCRICAO, IMAGEM, ST_REGISTRO) VALUES (?, ?, ?, ?, ?, ?, ?, 'A')";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        $response['message'] = "Erro no prepare: " . $conn->error;
        echo json_encode($response);
        exit;
    }
    $stmt->bind_param("sssssss", $categoria, $nome, $email, $telefone, $titulo, $descricao, $imagemNome);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Inserido no mural com sucesso!';
    } else {
        $response['message'] = 'Erro ao cadastrar: ' . $stmt->error;
    }

    $stmt->close();
    $conn->close();

    echo json_encode($response);
} catch (Exception $e) {
    //throw $th;
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}


