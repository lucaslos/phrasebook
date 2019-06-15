import { useState } from 'react';

export default function useForceUpdate() {
  const [, setIt] = useState(false);
  return () => setIt(it => !it);
}
