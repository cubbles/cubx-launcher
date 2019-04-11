import * as axios from 'axios';

class Config {
  constructor () {
    this.configUrl = document.currentScript.getAttribute('data-launcher-config') || 'config.json';
  }

  async get () {
    const config = await axios.get(this.configUrl, {
      responseType: 'json'
    });

    return config.data;
  }
}

export default Config;
