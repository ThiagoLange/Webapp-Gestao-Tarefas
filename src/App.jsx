// src/App.jsx
import React from 'react';
import Tarefas from './components/Tarefas';
import './App.css'; // Certifique-se que este import existe

function App() {
  return (
    // Você pode remover a div className="App" aqui se os estilos principais
    // estiverem no body ou se Tarefas.jsx já tiver seu próprio container principal
    <Tarefas />
  );
}

export default App;