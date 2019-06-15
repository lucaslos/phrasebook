// made for use in Quokka.js extension for VSCode

import quickTest from 'quick-test';

// @ts-ignore
function test({ variable }) {
  // code

  return false;
}

console.log(quickTest({
  expect: () => test({
    variable: 0.5,
  }),
  toBe: 1,
}));
