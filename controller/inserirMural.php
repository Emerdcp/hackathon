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

if (!$categoria || !$nome || !$email || !$telefone || !$titulo) {
    $response['message'] = 'Todos os campos obrigatórios devem ser preenchidos.';
    echo json_encode($response);
    exit;
}

$sql = "INSERT INTO CAD_MURAL (CATEGORIA, NOME, EMAIL, TELEFONE, TITULO, DESCRICAO) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    $response['message'] = "Erro no prepare: " . $conn->error;
    echo json_encode($response);
    exit;
}

$stmt->bind_param("ssssss", $categoria, $nome, $email, $telefone, $titulo, $descricao);

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'Inserido no mural com sucesso!';
} else {
    $response['message'] = 'Erro ao cadastrar: ' . $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
