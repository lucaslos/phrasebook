import { useState } from 'react';
import { debounce } from 'lodash-es';
import googleTranslateApi from 'google-translate-api';

const debouncedTranslate = debounce(
  (text: string) => googleTranslateApi(text, { from: 'en', to: 'pt' }),
  1000,
);

export default function useGoogleTranslate() {
  const [translation, setTranslation] = useState<string>();

  function translate(text: string) {
    debouncedTranslate(text).then(response => {
      setTranslation(response.text);
    });
  }

  return [translation, translate] as const;
}
