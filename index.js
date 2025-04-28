import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent chiama AppRegistry.registerComponent('main', () => App);
// Garantisce inoltre che, sia che tu carichi l'app in Expo Go o in una build nativa,
// l'ambiente sia configurato correttamente
registerRootComponent(App);
