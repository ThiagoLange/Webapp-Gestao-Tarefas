// src/components/PercentualConclusao.jsx
import React from 'react';
import styles from './PercentualConclusao.module.css';

function PercentualConclusao({ tarefasCompletas, totalTarefas }) {
  let progresso = 0;
  if (totalTarefas > 0) {
    progresso = (tarefasCompletas / totalTarefas) * 100;
  }

  // Para garantir que o progresso não exceda 100% ou seja menor que 0 (embora não deva acontecer com a lógica atual)
  progresso = Math.min(100, Math.max(0, progresso));

  return (
    <div className={styles.containerProgresso}>
      <p className={styles.textoProgresso}>
        Progresso: {progresso.toFixed(0)}%
      </p>
      <div className={styles.infoTarefas}>
        ({tarefasCompletas} de {totalTarefas} tarefas concluídas)
      </div>
      <div className={styles.barraProgressoContainer}>
        <div
          className={styles.barraProgresso}
          style={{ width: `${progresso}%` }}
          role="progressbar"
          aria-valuenow={progresso.toFixed(0)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {/* Opcional: mostrar a porcentagem dentro da barra se houver espaço */}
          {/* {progresso.toFixed(0)}% */}
        </div>
      </div>
    </div>
  );
}

export default PercentualConclusao;