import React from 'react';
import type { LockButtonProps } from '../types';
import './LockButton.css';

const LockButton: React.FC<LockButtonProps> = ({ isLocked, onToggleLock }) => {
  return (
    <button
      className={`lock-btn${isLocked ? ' locked' : ''}`}
      onClick={onToggleLock}
      aria-pressed={isLocked}
      title={isLocked ? 'Unlock nodes' : 'Lock nodes'}
    >
      <span className="lock-btn-icon" aria-hidden>
        {isLocked ? '🔒' : '🔓'}
      </span>
      <span className="lock-btn-text">{isLocked ? 'Locked' : 'Unlocked'}</span>
    </button>
  );
};

export default LockButton;
