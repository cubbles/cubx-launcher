/* eslint-env browser */
import * as axios from 'axios';
import * as get from 'lodash.get';

class Config {
  constructor () {
    const scriptElement = document.currentScript;

    if (scriptElement.hasAttribute('data-config-namespace')) {
      this.inlineConfig = get(window, scriptElement.getAttribute('data-config-namespace'));
    } else {
      this.configUrl = scriptElement.getAttribute('data-launcher-config') || 'config.json';
    }

    this.src = new URL(scriptElement.src);
  }

  async get () {
    let config;

    if (this.configUrl) {
      config = await axios.get(this.configUrl, { responseType: 'json' });
    } else if (this.inlineConfig) {
      this.configUrl = '/';
      config = { data: this.inlineConfig };
    }

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
