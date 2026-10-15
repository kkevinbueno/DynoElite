<?php
header('Content-Type: text/plain; charset=utf-8');
require_once 'conexao.php';

$nome           = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$idade          = isset($_POST['idade']) ? trim($_POST['idade']) : '';
$peso           = isset($_POST['peso']) ? trim($_POST['peso']) : '';
$data_matricula = isset($_POST['data_matricula']) ? trim($_POST['data_matricula']) : '';
$objetivo       = isset($_POST['objetivo']) ? trim($_POST['objetivo']) : '';
$dieta          = isset($_POST['dieta']) ? trim($_POST['dieta']) : 'Não';

if ($nome === '' || $idade === '' || $peso === '') {
    echo "Erro: campos obrigatorios nao preenchidos";
    exit;
}

try {
    $sql = "INSERT INTO alunos (nome, idade, peso, data_matricula, objetivo, dieta)
            VALUES (:nome, :idade, :peso, :data_matricula, :objetivo, :dieta)";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nome' => $nome,
        ':idade' => $idade,
        ':peso' => $peso,
        ':data_matricula' => $data_matricula !== '' ? $data_matricula : null,
        ':objetivo' => $objetivo,
        ':dieta' => $dieta
    ]);

    echo "ok";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}