import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Buscar tarefas ao carregar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Título é obrigatório');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.post(`${API_URL}/api/tasks`, { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      setError('Erro ao criar tarefa');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta tarefa?')) return;

    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError('Erro ao excluir tarefa');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Gerenciador de Tarefas</h1>
        <p>Sistema de gerenciamento com Docker Compose</p>
      </header>

      <main className="container">
        {error && <div className="error-message">{error}</div>}

        <div className="form-container">
          <h2>Nova Tarefa</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Título da tarefa"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
            />
            <textarea
              placeholder="Descrição (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows="3"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Adicionar Tarefa'}
            </button>
          </form>
        </div>

        <div className="tasks-container">
          <h2>Minhas Tarefas ({tasks.length})</h2>
          
          {loading && tasks.length === 0 ? (
            <p className="loading">Carregando tarefas...</p>
          ) : tasks.length === 0 ? (
            <p className="empty">Nenhuma tarefa cadastrada</p>
          ) : (
            <div className="tasks-list">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id, task.completed)}
                    />
                    <div className="task-text">
                      <h3>{task.title}</h3>
                      {task.description && <p>{task.description}</p>}
                      <small>
                        Criada em: {new Date(task.created_at).toLocaleString('pt-BR')}
                      </small>
                    </div>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer>
        <p>Desenvolvido com React + Node.js + PostgreSQL + Docker Compose</p>
      </footer>
    </div>
  );
}

export default App;