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
    this._processStyleUrl();

    return config.data;
  }

  getLauncherSrc () {
    return this.src;
  }

  getData () {
    return this.data;
  }

  _processStyleUrl () {
    if (this.data.hasOwnProperty('externalStyle') && typeof this.data.externalStyle === 'string' && this.data.externalStyle.length > 0) {
      const configUrl = this._qualifyUrl(this.configUrl);
      const styleUrl = new URL(this.data.externalStyle, configUrl); 
      this.data.externalStyle = styleUrl.toString();
    }
  }

  _qualifyUrl (url) {
    const a = document.createElement('a');
    a.href = url;
    return a.href;
  }
}

export default Config;
