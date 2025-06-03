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
    // { id: 4, descricao: 'Finalizar Relatório XYZ', periodo: 'Tarde', concluida: true },
    // { id: 5, descricao: 'Academia', periodo: 'Noite', concluida: false },
    // { id: 6, descricao: 'Ler 1 capítulo do livro', periodo: 'Noite', concluida: false },
  ]);

  const adicionarNovaTarefa = (novaTarefa) => {
    const tarefaComId = {
      ...novaTarefa,
      id: Date.now(),
      concluida: false,
    };
    setTarefas((tarefasAnteriores) => [...tarefasAnteriores, tarefaComId]);
  };

  // Lógica para marcar tarefa como concluída (será adicionada futuramente)
  // const toggleConcluida = (id) => {
  //   setTarefas(tarefas.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  // };

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
          <li key={tarefa.id} className={`${styles.taskItem} ${tarefa.concluida ? styles.taskItemCompleted : ''}`}>
            <div className={styles.taskItemText}>
              <span className={styles.taskDescription}>
                {/* Adicionar checkbox para marcar como concluída futuramente */}
                {/* <input type="checkbox" checked={tarefa.concluida} onChange={() => toggleConcluida(tarefa.id)} style={{ marginRight: '10px' }} /> */}
                {tarefa.descricao}
              </span>
            </div>
            <span className={`${styles.taskStatus} ${tarefa.concluida ? styles.taskStatusCompleted : styles.taskStatusPending}`}>
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