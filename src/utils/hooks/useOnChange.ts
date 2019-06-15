import { useEffect } from 'react';
import usePrevious from 'utils/hooks/usePrevious';

export default function useOnChange<T>(value: T, callBack: (last: T) => void) {
  const last = usePrevious(value, value);
  useEffect(() => {
    if (value !== last) {
      callBack(last);
    }
  });
}
