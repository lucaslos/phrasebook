import { anyObject } from 'hookstated/dist/types';

export function sortByFrequencyAndRemoveDuplicates(array: any[]) {
  const frequency: anyObject = {};
  let value;

  // compute frequencies of each value
  for (let i = 0; i < array.length; i++) {
    value = array[i];
    if (value in frequency) {
      frequency[value]++;
    } else {
      frequency[value] = 1;
    }
  }

  // make array from the frequency object to de-duplicate
  const uniques = [];
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (value in frequency) {
    uniques.push(value);
  }

  // sort the uniques array in descending order by frequency
  function compareFrequency(a: any, b: any) {
    return frequency[b] - frequency[a];
  }

  return uniques.sort(compareFrequency);
};
