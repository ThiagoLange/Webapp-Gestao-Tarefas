// src/components/Tarefas.jsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import NovaTarefaForm from './NovaTarefaForm';
import PercentualConclusao from './PercentualConclusao';
import styles from './Tarefas.module.css';

function Tarefas() {
  const [tarefas, setTarefas] = useState(() => {
    // Load tasks from localStorage on initial state
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      return JSON.parse(tarefasSalvas);
    }
    return [];
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarNovaTarefa = (novaTarefa) => {
    const tarefaComId = {
      ...novaTarefa,
      id: Date.now(),
      concluida: false,
    };
    setTarefas((tarefasAnteriores) => [...tarefasAnteriores, tarefaComId]);
  };

  const toggleConcluida = (id) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const tarefasManha = tarefas.filter(t => t.periodo === 'Manhã');
  const tarefasTarde = tarefas.filter(t => t.periodo === 'Tarde');
  const tarefasNoite = tarefas.filter(t => t.periodo === 'Noite');

  const concluidasCount = tarefas.filter(t => t.concluida).length;

  const renderListaTarefas = (listaTarefas, periodoNome) => {
    if (listaTarefas.length === 0) {
      return <p className={styles.noTasksInPeriod}>Nenhuma tarefa para {periodoNome.toLowerCase()}.</p>;
    }
    return (
      <ul className={styles.taskListPeriod}>
        {listaTarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className={`${styles.taskItem} ${tarefa.concluida ? styles.taskItemCompleted : ''}`}
          >
            <div className={styles.taskItemContent}>
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => toggleConcluida(tarefa.id)}
                className={styles.taskCheckbox}
              />
              <span className={styles.taskDescription}>
                {tarefa.descricao}
              </span>
            </div>
            <span
              className={`${styles.taskStatus} ${tarefa.concluida ? styles.taskStatusCompleted : styles.taskStatusPending}`}
            >
              {tarefa.concluida ? 'Concluída ✅' : 'Pendente ⏳'}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.tarefasContainer}>
      <h1 className={styles.mainTitle}>Gestão de Tarefas Diárias 📝</h1>
      <NovaTarefaForm onAdicionarTarefa={adicionarNovaTarefa} />

      <PercentualConclusao
        tarefasCompletas={concluidasCount}
        totalTarefas={tarefas.length}
      />

      <h2 className={styles.sectionTitleTarefas}>Minhas Tarefas:</h2>
      {tarefas.length === 0 ? ( // Condição ajustada para mostrar mensagem apenas se não houver tarefas
        <p className={styles.noTasksMessage}>Nenhuma tarefa adicionada ainda. Adicione uma acima! ☝️</p>
      ) : (
        <div className={styles.columnsContainer}>
          <div className={styles.taskColumn}>
            <h3 className={styles.columnHeaderManha}>Manhã 🌅</h3>
            {renderListaTarefas(tarefasManha, "Manhã")}
          </div>
          <div className={styles.taskColumn}>
            <h3 className={styles.columnHeaderTarde}>Tarde ☀️</h3>
            {renderListaTarefas(tarefasTarde, "Tarde")}
          </div>
          <div className={styles.taskColumn}>
            <h3 className={styles.columnHeaderNoite}>Noite 🌙</h3>
            {renderListaTarefas(tarefasNoite, "Noite")}
          </div>
        </div>
      )}
    </div>
  );
}

export default Tarefas;