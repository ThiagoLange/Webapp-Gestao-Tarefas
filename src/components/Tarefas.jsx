// src/components/Tarefas.jsx
import React, { useState } from 'react';
import NovaTarefaForm from './NovaTarefaForm';
import styles from './Tarefas.module.css'; // Importa o CSS Module

function Tarefas() {
  const [tarefas, setTarefas] = useState([
    // Exemplo de tarefas iniciais para visualização do estilo
    // { id: 1, descricao: 'Comprar pão', periodo: 'Manhã', concluida: true },
    // { id: 2, descricao: 'Reunião de equipe', periodo: 'Tarde', concluida: false },
  ]);

  const adicionarNovaTarefa = (novaTarefa) => {
    const tarefaComId = {
      ...novaTarefa,
      id: Date.now(),
      concluida: false,
    };
    setTarefas((tarefasAnteriores) => [...tarefasAnteriores, tarefaComId]);
  };

  return (
    <div className={styles.tarefasContainer}>
      <h1 className={styles.mainTitle}>Gestão de Tarefas Diárias 📝</h1>
      <NovaTarefaForm onAdicionarTarefa={adicionarNovaTarefa} />

      <h2 className={styles.sectionTitle}>Minhas Tarefas:</h2>
      {tarefas.length === 0 ? (
        <p className={styles.noTasksMessage}>Nenhuma tarefa adicionada ainda.</p>
      ) : (
        <ul className={styles.taskList}>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className={styles.taskItem}>
              <div className={styles.taskItemText}>
                <span className={styles.taskDescription}>
                  {tarefa.descricao}
                </span>
                <span className={styles.taskPeriod}>
                  {tarefa.periodo}
                </span>
              </div>
              <span className={`${styles.taskStatus} ${tarefa.concluida ? styles.taskStatusCompleted : styles.taskStatusPending}`}>
                {tarefa.concluida ? 'Concluída ✅' : 'Pendente ⏳'}
              </span>
            </li>
          ))}
        </ul>
      )}
      {/* <pre>{JSON.stringify(tarefas, null, 2)}</pre> */}
    </div>
  );
}

export default Tarefas;