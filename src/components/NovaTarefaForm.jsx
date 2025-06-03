// src/components/NovaTarefaForm.jsx
import React, { useState } from 'react';
import styles from './NovaTarefaForm.module.css'; // Importa o CSS Module

function NovaTarefaForm({ onAdicionarTarefa }) {
  const [descricao, setDescricao] = useState('');
  const [periodo, setPeriodo] = useState('Manhã');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descricao.trim()) {
      alert('Por favor, insira uma descrição para a tarefa.');
      return;
    }
    onAdicionarTarefa({ descricao, periodo });
    setDescricao('');
    setPeriodo('Manhã');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3>Adicionar Nova Tarefa</h3>
      <div className={styles.formGroup}>
        <label htmlFor="descricao-tarefa">Descrição:</label>
        <input
          type="text"
          id="descricao-tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva a tarefa"
          className={styles.inputField}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="periodo-tarefa">Período:</label>
        <select
          id="periodo-tarefa"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className={styles.selectField}
        >
          <option value="Manhã">Manhã 🌅</option>
          <option value="Tarde">Tarde ☀️</option>
          <option value="Noite">Noite 🌙</option>
        </select>
      </div>
      <button type="submit" className={styles.buttonAdd}>
        Adicionar Tarefa
      </button>
    </form>
  );
}

export default NovaTarefaForm;