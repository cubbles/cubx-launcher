// import all resources here
import css from './launcher.sss'; // eslint-disable-line no-unused-vars
import Config from './config';
import StyleLoader from './styleLoader';
import Launcher from './launcher';

const config = new Config();
config
  .get()
  .then(value => {
    const launcher = new Launcher(value); // eslint-disable-line no-unused-vars
    const styleLoader = new StyleLoader('https://fonts.googleapis.com/icon?family=Material+Icons');
    styleLoader.process();
  });
