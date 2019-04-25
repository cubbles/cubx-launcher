/* eslint-env browser */
import * as axios from 'axios';

class Config {
  constructor () {
    this.configUrl = document.currentScript.getAttribute('data-launcher-config') || 'config.json';
    this.src = new URL(document.currentScript.src);
  }

  async get () {
    const config = await axios.get(this.configUrl, {
      responseType: 'json'
    });

    this.data = config.data;
    return config.data;
  }

  getLauncherSrc () {
    return this.src;
  }

  getData () {
    return this.data;
  }
}

export default Config;
