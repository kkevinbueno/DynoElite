CREATE DATABASE IF NOT EXISTS dynoelite
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE dynoelite;

CREATE TABLE IF NOT EXISTS alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    idade INT NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    data_matricula DATE,
    objetivo VARCHAR(50),
    dieta VARCHAR(3) DEFAULT 'Não',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);