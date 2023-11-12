import { useEffect, useState } from 'react';
import { IBeforeInstallPromptEvent } from '../interfaces/Types';

export function useAddToHomescreenPrompt(): [IBeforeInstallPromptEvent | null, () => void, boolean] {
  const [prompt, setState] = useState<IBeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  const promptToInstall = () => {
    if (prompt) {
      prompt.prompt();
      setState(null);
    }
  };

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault();
      setState(e);
    };

    window.addEventListener('beforeinstallprompt', ready);
    return () => window.removeEventListener('beforeinstallprompt', ready);
  }, []);

  useEffect(() => {
    const onInstall = () => setIsInstalled(true);
    window.addEventListener('appinstalled', onInstall);
    return () => window.removeEventListener('appinstalled', onInstall);
  }, []);

  return [prompt, promptToInstall, isInstalled];
}
