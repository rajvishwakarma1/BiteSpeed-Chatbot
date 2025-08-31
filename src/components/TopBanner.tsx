import React, { useEffect, useState } from 'react';
import './TopBanner.css';

type BannerVariant = 'success' | 'error';

interface BannerState {
  message: string;
  variant: BannerVariant;
  visible: boolean;
}

const TopBanner: React.FC = () => {
  const [state, setState] = useState<BannerState>({ message: '', variant: 'success', visible: false });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ message: string; variant: BannerVariant; timeout?: number }>).detail;
      if (!detail) return;
      setState({ message: detail.message, variant: detail.variant, visible: true });
      const timeout = detail.timeout ?? 2000;
      const timer = setTimeout(() => setState((s) => ({ ...s, visible: false })), timeout);
      return () => clearTimeout(timer);
    };
    window.addEventListener('app:banner', handler as EventListener);
    return () => window.removeEventListener('app:banner', handler as EventListener);
  }, []);

  if (!state.visible) return null;

  return (
    <div className={`top-banner ${state.variant}`} role="status" aria-live="polite">
      {state.message}
    </div>
  );
};

export default TopBanner;
