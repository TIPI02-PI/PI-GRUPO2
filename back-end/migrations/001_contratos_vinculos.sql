-- Executar uma vez em um banco Lumio existente.
ALTER TABLE aluno MODIFY van_id INT NULL;
ALTER TABLE vinculo MODIFY auxiliar_id INT NULL,
    ADD COLUMN motorista_id INT NULL,
    ADD FOREIGN KEY (motorista_id) REFERENCES motorista(id);

UPDATE vinculo v JOIN van ON van.id = v.van_id
SET v.motorista_id = van.motorista_id;
ALTER TABLE vinculo MODIFY motorista_id INT NOT NULL;

ALTER TABLE contrato ADD COLUMN pdf MEDIUMBLOB NULL,
    ADD COLUMN confirmado_responsavel_em DATETIME NULL,
    ADD COLUMN confirmado_motorista_em DATETIME NULL;

CREATE TABLE van_escola (
    van_id INT NOT NULL,
    escola_id INT NOT NULL,
    PRIMARY KEY (van_id, escola_id),
    FOREIGN KEY (van_id) REFERENCES van(id) ON DELETE CASCADE,
    FOREIGN KEY (escola_id) REFERENCES escola(id) ON DELETE CASCADE
);
