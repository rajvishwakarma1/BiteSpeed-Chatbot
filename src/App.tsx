
import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import './App.css';
import { Layout } from './components';

const App: React.FC = () => {
  return (
    <ReactFlowProvider>
      <div className="app-container">
        <Layout />
      </div>
    </ReactFlowProvider>
  );
};

export default App;
