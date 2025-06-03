// src/components/Tarefas.jsx
import React, { useState } from 'react';
import NovaTarefaForm from './NovaTarefaForm';
import styles from './Tarefas.module.css'; // Importa o CSS Module

function Tarefas() {
  const [tarefas, setTarefas] = useState([
    // Exemplos iniciais para visualização (opcional)
    // { id: 1, descricao: 'Café da Manhã Reforçado', periodo: 'Manhã', concluida: true },
    // { id: 2, descricao: 'Reunião de Alinhamento', periodo: 'Manhã', concluida: false },
    // { id: 3, descricao: 'Almoço com Cliente', periodo: 'Tarde', concluida: false },
  ]);

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
            <div className={styles.taskItemContent}> {/* Novo wrapper para checkbox e texto */}
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

      {tarefas.length > 0 && (
        <div className={styles.completedCountContainer}>
          <p className={styles.completedCountText}>
            {concluidasCount} / {tarefas.length} tarefa(s) concluída(s)
          </p>
        </div>
      )}

      <h2 className={styles.sectionTitleTarefas}>Minhas Tarefas:</h2>
      {tarefas.length === 0 ? (
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