import { createStore } from 'hookstated';

type appState = {
  activeTab: 'add' | 'list';
};

const appState = createStore<appState>('app', {
  state: {
    activeTab: 'add',
  },
});

export default appState;
