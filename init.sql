-- Script de inicialização do banco de dados
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir algumas tarefas de exemplo
INSERT INTO tasks (title, description, completed) VALUES
    ('Configurar Docker', 'Criar arquivos docker-compose.yml e Dockerfiles', true),
    ('Desenvolver Backend', 'Criar API REST com Node.js e Express', true),
    ('Desenvolver Frontend', 'Criar interface com React', false),
    ('Testar Aplicação', 'Verificar integração entre serviços', false);