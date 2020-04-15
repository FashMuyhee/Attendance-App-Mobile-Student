/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainApp from './MainApp';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => MainApp);
