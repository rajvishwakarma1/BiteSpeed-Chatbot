import React, { useState } from 'react';
import type { SaveButtonProps, ValidationResult } from '../types';
import { validateFlow } from '../utils/flowValidation';
import './SaveButton.css';

const SaveButton: React.FC<SaveButtonProps> = ({ nodes, edges, onSave }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleClick = async () => {
    setStatus('loading');
    const result: ValidationResult = validateFlow(nodes, edges);
    if (!result.valid) {
      setStatus('error');
      // Show error at top center
      window.dispatchEvent(new CustomEvent('app:banner', { detail: { message: 'Cannot save Flow', variant: 'error', timeout: 2500 } }));
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus('success');
    // Show success at top center
    window.dispatchEvent(new CustomEvent('app:banner', { detail: { message: 'Flow saved successfully!', variant: 'success', timeout: 2000 } }));
    if (onSave) onSave();
    setTimeout(() => {
      setStatus('idle');
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
    </div>
  );
};

export default SaveButton;
