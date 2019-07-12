import hotkeys, { KeyHandler } from 'hotkeys-js';
import { useEffect } from 'react';

export function useShortCut(shortcut: string, callback: KeyHandler, inputs?: any[]) {
  useEffect(() => {
    hotkeys(shortcut, callback);

    return () => hotkeys.unbind(shortcut, callback);
  }, inputs);
}
