import React, { useState } from 'react';
import type { SaveButtonProps, ValidationResult } from '../types';
import { validateFlow } from '../utils/flowValidation';
import './SaveButton.css';

const SaveButton: React.FC<SaveButtonProps> = ({ nodes, edges, onSave }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const handleClick = async () => {
    setStatus('loading');
    setMessage('');
    const result: ValidationResult = validateFlow(nodes, edges);
    if (!result.valid) {
      setStatus('error');
  // Show the single, design-specified error message
  setMessage('Cannot save Flow');
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus('success');
    setMessage('Flow saved successfully!');
    if (onSave) onSave();
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="save-btn-container">
      <button
        className={`save-btn${status === 'loading' ? ' loading' : ''}${status === 'success' ? ' success' : ''}${status === 'error' ? ' error' : ''}`}
        onClick={handleClick}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Saving...' : 'Save Flow'}
      </button>
      {message && (
        <div className={`save-btn-message${status === 'error' ? ' error' : ''}${status === 'success' ? ' success' : ''}`}>{message}</div>
      )}
    </div>
  );
};

export default SaveButton;
