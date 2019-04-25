// import all resources here
import css from './launcher.sss'; // eslint-disable-line no-unused-vars
import Config from './config';
import StyleLoader from './styleLoader';
import Launcher from './launcher';

const config = new Config();
config
  .get()
  .then(() => {
    const launcher = new Launcher(config.getData()); // eslint-disable-line no-unused-vars
    const styleLoader = new StyleLoader(launcher.getExternalStyleUrl(config.getLauncherSrc()));
    styleLoader.process();
  });
