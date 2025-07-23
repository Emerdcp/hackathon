<?php
require_once '../config.php';
header('Content-Type: application/json');

// Exibe erros para debug temporário
ini_set('display_errors', 1);
error_reporting(E_ALL);

$sql = "SELECT ID, CATEGORIA, NOME, EMAIL, TELEFONE, TITULO, DESCRICAO FROM CAD_MURAL ORDER BY ID DESC";
$result = $conn->query($sql);

$dados = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $dados[] = $row;
    }
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(['erro' => 'Erro na consulta: ' . $conn->error]);
}

$conn->close();
