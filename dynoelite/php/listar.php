<?php
require_once 'conexao.php';

echo "<tr><th>Nome</th><th>Idade</th><th>Peso</th><th>Matrícula</th><th>Objetivo</th><th>Dieta</th></tr>";

$stmt = $pdo->query("SELECT nome, idade, peso, data_matricula, objetivo, dieta FROM alunos ORDER BY id DESC");

foreach ($stmt as $aluno) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($aluno['nome']) . "</td>";
    echo "<td>" . htmlspecialchars($aluno['idade']) . "</td>";
    echo "<td>" . htmlspecialchars($aluno['peso']) . "</td>";
    echo "<td>" . htmlspecialchars($aluno['data_matricula']) . "</td>";
    echo "<td>" . htmlspecialchars($aluno['objetivo']) . "</td>";
    echo "<td>" . htmlspecialchars($aluno['dieta']) . "</td>";
    echo "</tr>";
}