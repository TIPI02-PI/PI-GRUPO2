
DROP DATABASE IF EXISTS Lumio;

CREATE DATABASE Lumio
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE Lumio;

-- ============================================================================
-- ENDEREÇOS
-- ============================================================================

CREATE TABLE enderecos (
    id INT AUTO_INCREMENT PRIMARY KEY,

    cep VARCHAR(9) NOT NULL,
    logradouro VARCHAR(200) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento VARCHAR(100),
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,

    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================================
-- REPRESENTANTE
-- ============================================================================

CREATE TABLE representante (
    id INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,

    tipo_documento ENUM('CPF', 'CNPJ'),
    documento VARCHAR(18) UNIQUE,

    google_id VARCHAR(255) NULL UNIQUE,
    foto VARCHAR(500),

    role ENUM('admin', 'user', 'membro')
        NOT NULL DEFAULT 'user',

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================================
-- REPRESENTANTE / ENDEREÇOS
-- ============================================================================

CREATE TABLE representante_endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,

    representante_id INT NOT NULL,
    endereco_id INT NOT NULL,

    tipo ENUM('residencial', 'comercial', 'outro')
        NOT NULL DEFAULT 'residencial',

    principal BOOLEAN NOT NULL DEFAULT FALSE,

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (representante_id)
        REFERENCES representante(id)
        ON DELETE CASCADE,

    FOREIGN KEY (endereco_id)
        REFERENCES enderecos(id),

    UNIQUE (representante_id, endereco_id)
);

-- ============================================================================
-- ESCOLA
-- ============================================================================

CREATE TABLE escola (
    id INT AUTO_INCREMENT PRIMARY KEY,

    endereco_id INT NOT NULL,

    nome VARCHAR(240) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (endereco_id)
        REFERENCES enderecos(id)
);

-- ============================================================================
-- MOTORISTA
-- ============================================================================

CREATE TABLE motorista (
    id INT AUTO_INCREMENT PRIMARY KEY,

    representante_id INT NOT NULL UNIQUE,

    status ENUM('ativo', 'inativo', 'suspenso')
        NOT NULL DEFAULT 'ativo',

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (representante_id)
        REFERENCES representante(id)
        ON DELETE CASCADE
);

-- ============================================================================
-- AUXILIAR
-- ============================================================================

CREATE TABLE auxiliar (
    id INT AUTO_INCREMENT PRIMARY KEY,

    representante_id INT NOT NULL UNIQUE,

    status ENUM('ativo', 'inativo', 'suspenso')
        NOT NULL DEFAULT 'ativo',

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (representante_id)
        REFERENCES representante(id)
        ON DELETE CASCADE
);

-- ============================================================================
-- VAN
-- ============================================================================

CREATE TABLE van (
    id INT AUTO_INCREMENT PRIMARY KEY,

    motorista_id INT NOT NULL,

    placa CHAR(7) NOT NULL UNIQUE,
    identificacao VARCHAR(100),

    capacidade INT,

    tipo_combustivel ENUM(
        'gasolina',
        'etanol',
        'diesel',
        'gnv',
        'eletrico'
    ),

    consumo_medio DECIMAL(5,2),

    status ENUM(
        'ativa',
        'inativa',
        'manutencao',
        'bloqueada'
    ) NOT NULL DEFAULT 'ativa',

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (motorista_id)
        REFERENCES motorista(id)
);

-- ============================================================================
-- VAN / AUXILIAR
-- ============================================================================

CREATE TABLE van_auxiliar (
    id INT AUTO_INCREMENT PRIMARY KEY,

    van_id INT NOT NULL,
    auxiliar_id INT NOT NULL,

    data_inicio DATE,
    data_fim DATE,

    status ENUM('ativo', 'inativo')
        NOT NULL DEFAULT 'ativo',

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (van_id)
        REFERENCES van(id),

    FOREIGN KEY (auxiliar_id)
        REFERENCES auxiliar(id),

    UNIQUE (van_id, auxiliar_id)
);

-- ============================================================================
-- ALUNO
-- Alunos não possuem autenticação própria.
-- ============================================================================

CREATE TABLE aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,

    escola_id INT NOT NULL,

    nome VARCHAR(120) NOT NULL,
    foto VARCHAR(500),
    data_nascimento DATE,

    turno ENUM(
        'matutino',
        'vespertino',
        'noturno',
        'integral'
    ) NOT NULL,

    observacoes VARCHAR(500),

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (escola_id)
        REFERENCES escola(id)
);

-- ============================================================================
-- REPRESENTANTE / ALUNO
-- ============================================================================

CREATE TABLE representante_aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,

    aluno_id INT NOT NULL,
    representante_id INT NOT NULL,

    tipo_relacao VARCHAR(120),
    principal BOOLEAN NOT NULL DEFAULT FALSE,

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (aluno_id)
        REFERENCES aluno(id)
        ON DELETE CASCADE,

    FOREIGN KEY (representante_id)
        REFERENCES representante(id)
        ON DELETE CASCADE,

    UNIQUE (aluno_id, representante_id)
);

-- ============================================================================
-- PONTOS DO ALUNO
-- ============================================================================

CREATE TABLE pontos_aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,

    aluno_id INT NOT NULL,
    endereco_id INT NOT NULL,

    tipo ENUM('embarque', 'desembarque') NOT NULL,

    observacoes VARCHAR(500),

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (aluno_id)
        REFERENCES aluno(id)
        ON DELETE CASCADE,

    FOREIGN KEY (endereco_id)
        REFERENCES enderecos(id),

    UNIQUE (aluno_id, endereco_id, tipo),
    UNIQUE (aluno_id, id)
);

-- ============================================================================
-- VÍNCULO
-- ============================================================================

CREATE TABLE vinculo (
    id INT AUTO_INCREMENT PRIMARY KEY,

    representante_id INT NOT NULL,
    aluno_id INT NOT NULL,
    van_id INT NOT NULL,

    turno ENUM(
        'matutino',
        'vespertino',
        'noturno',
        'integral'
    ) NOT NULL,

    status ENUM(
        'solicitado',
        'aguardando_aceite',
        'aguardando_contrato',
        'ativo',
        'encerrado',
        'cancelado'
    ) NOT NULL DEFAULT 'solicitado',

    data_inicio DATE,
    data_fim DATE,

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (aluno_id, representante_id)
        REFERENCES representante_aluno(aluno_id, representante_id),

    FOREIGN KEY (van_id)
        REFERENCES van(id)
);

-- ============================================================================
-- CONTRATO
-- ============================================================================

CREATE TABLE contrato (
    id INT AUTO_INCREMENT PRIMARY KEY,

    vinculo_id INT NOT NULL,

    arquivo VARCHAR(500) NULL,

    status ENUM(
        'aguardando_envio',
        'aguardando_confirmacao',
        'ativo',
        'encerrado',
        'vencido'
    ) NOT NULL DEFAULT 'aguardando_envio',

    data_envio DATETIME,
    data_confirmacao DATETIME,

    data_inicio DATE,
    data_fim DATE,

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (vinculo_id)
        REFERENCES vinculo(id)
);

-- ============================================================================
-- ROTAS
-- ============================================================================

CREATE TABLE rotas (
    id INT AUTO_INCREMENT PRIMARY KEY,

    van_id INT NOT NULL,

    nome VARCHAR(120) NOT NULL,

    tipo ENUM('ida', 'volta') NOT NULL,

    status ENUM('ativa', 'inativa')
        NOT NULL DEFAULT 'ativa',

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (van_id)
        REFERENCES van(id)
);

-- ============================================================================
-- PARADAS DA ROTA
-- ============================================================================

CREATE TABLE rota_parada (
    id INT AUTO_INCREMENT PRIMARY KEY,

    rota_id INT NOT NULL,
    aluno_id INT NOT NULL,
    ponto_id INT NOT NULL,

    ordem INT NOT NULL,
    horario TIME,

    FOREIGN KEY (rota_id)
        REFERENCES rotas(id),

    FOREIGN KEY (aluno_id, ponto_id)
        REFERENCES pontos_aluno(aluno_id, id),

    UNIQUE (rota_id, ordem),

    UNIQUE (rota_id, ponto_id)
);

-- ============================================================================
-- VIAGENS
-- ============================================================================

CREATE TABLE viagens (
    id INT AUTO_INCREMENT PRIMARY KEY,

    rota_id INT NOT NULL,
    van_id INT NOT NULL,
    motorista_id INT NOT NULL,

    tipo ENUM('ida', 'volta') NOT NULL,

    inicio DATETIME,
    fim DATETIME,

    status ENUM(
        'agendada',
        'em_andamento',
        'finalizada',
        'cancelada'
    ) NOT NULL DEFAULT 'agendada',

    distancia DECIMAL(10,2),

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (rota_id)
        REFERENCES rotas(id),

    FOREIGN KEY (van_id)
        REFERENCES van(id),

    FOREIGN KEY (motorista_id)
        REFERENCES motorista(id)
);

-- ============================================================================
-- VIAGEM / ALUNO
-- ============================================================================

CREATE TABLE viagem_aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,

    viagem_id INT NOT NULL,
    aluno_id INT NOT NULL,

    status ENUM(
        'previsto',
        'nao_ira',
        'aguardando_embarque',
        'embarcado',
        'nao_localizado',
        'a_caminho_escola',
        'chegou_escola',
        'aguardando_retorno',
        'em_retorno',
        'entregue',
        'ausente_sem_aviso',
        'cancelado'
    ) NOT NULL DEFAULT 'previsto',

    observacao VARCHAR(500),

    FOREIGN KEY (viagem_id)
        REFERENCES viagens(id),

    FOREIGN KEY (aluno_id)
        REFERENCES aluno(id),

    UNIQUE (viagem_id, aluno_id)
);

-- ============================================================================
-- HISTÓRICO DE STATUS DO ALUNO
-- ============================================================================

CREATE TABLE historico_status_aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,

    viagem_aluno_id INT NOT NULL,
    representante_id INT NOT NULL,

    status_anterior VARCHAR(50),
    status_novo VARCHAR(50) NOT NULL,

    motivo VARCHAR(500),

    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (viagem_aluno_id)
        REFERENCES viagem_aluno(id),

    FOREIGN KEY (representante_id)
        REFERENCES representante(id)
);

-- ============================================================================
-- LOCALIZAÇÃO E RASTREAMENTO
-- ============================================================================

-- ============================================================================