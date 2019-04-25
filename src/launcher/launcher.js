/* eslint-env browser */

class Launcher {
  constructor (config) {
    this.config = config;
    this.drawLauncherIcon();
    this.drawLauncherMenu();
    this.drawModalPopup();
  }

  drawLauncherIcon () {
    const launcherIcon = document.createElement('div');
    launcherIcon.classList.add('/* @echo webpackageName */_cubx-launcher-root');
    launcherIcon.innerHTML = `<i class="/* @echo webpackageName */_material-icons">${this.config.launcherIcon.collapsed}</i>`;

    launcherIcon.addEventListener('click', () => { this.toggleMenu(); });
    // launcherIcon.addEventListener('mouseover  ', () => { this.toggleMenu(); });

    document.body.appendChild(launcherIcon);
    this.launcherIcon = launcherIcon;
  }

  drawLauncherMenu () {
    const launcherMenu = document.createElement('div');
    launcherMenu.style.visibility = 'hidden';
    launcherMenu.classList.add('/* @echo webpackageName */_cubx-launcher-menu');

    let markup = '<ul>';
    this.config.apps.forEach((config, index) => {
      markup += `<li class="/* @echo webpackageName */_cubx-launcher-app-icon" data-index="${index}"><i class="/* @echo webpackageName */_material-icons">${config.icon}</i></li>`;
    });
    markup += '</ul>';

    launcherMenu.innerHTML = markup;
    launcherMenu.querySelectorAll('li').forEach(node => {
      ((node) => {
        node.addEventListener('click', () => {
          const index = parseInt(node.getAttribute('data-index'));
          this.showModal(this.config.apps[index]);
        });
      })(node);
    });
    document.body.appendChild(launcherMenu);
    this.launcherMenu = launcherMenu;
  }

  drawModalPopup () {
    const launcherModal = document.createElement('div');
    launcherModal.classList.add('/* @echo webpackageName */_cubx-launcher-modal');
    launcherModal.style.visibility = 'hidden';

    launcherModal.innerHTML = `<div class="/* @echo webpackageName */_cubx-launcher-modal-content">
        <span data-close class="/* @echo webpackageName */_cubx-launcher-modal-close"><i class="/* @echo webpackageName */_material-icons">close</i></span>
        <div data-content-anchor></div>
      </div>`;

    launcherModal.querySelector('[data-close]').addEventListener('click', () => { this.closeModal(); });

    document.body.appendChild(launcherModal);
    this.launcherModal = launcherModal;
  }

  showModal (config) {
    console.log(config);
    this.launcherModal.style.visibility = 'visible';
    this.toggleMenu();
    this.injectContent(config);
  }

  closeModal () {
    this.launcherModal.style.visibility = 'hidden';
    // cleare content
    this.clearContent();
  }

  toggleMenu () {
    const elem = this.launcherIcon.querySelector('i');
    switch (elem.innerText) {
      case this.config.launcherIcon.collapsed:
        elem.innerText = this.config.launcherIcon.expanded;
        this.launcherMenu.style.visibility = 'visible';
        break;
      case this.config.launcherIcon.expanded:
        elem.innerText = this.config.launcherIcon.collapsed;
        this.launcherMenu.style.visibility = 'hidden';
        break;
    }
  }

  injectContent (config) {
    const parent = this.launcherModal.querySelector('[data-content-anchor]');

    switch (config.type) {
      case 'web':
        this.injectIframe(parent, config);
    }
  }

  injectIframe (parent, config) {
    const frame = document.createElement('iframe');
    frame.src = config.url;
    frame.width = '100%';
    frame.height = '100%';
    frame.marginHeight = 0;
    frame.marginWidth = 0;
    parent.appendChild(frame);
  }

  clearContent () {
    const parent = this.launcherModal.querySelector('[data-content-anchor]');
    parent.innerHTML = '';
  }

  getExternalStyleUrl (url) {
    if (this.config.hasOwnProperty('externalStyle') && typeof this.config.externalStyle === 'string') {
      return this.config.externalStyle;
    } else {
      let pathname = url.pathname;
      pathname = pathname.substring(0, pathname.lastIndexOf('/'));
      url.pathname = `${pathname}/launcher_main.css`;
      return url.toString();
    }
  }
}

export default Launcher;
