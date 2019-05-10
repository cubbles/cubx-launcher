/* eslint-env browser */

class Launcher {
  constructor (config) {
    this.config = config;

    this.hiddenClasses = {
      'materialIcons': '/* @echo webpackageName */_material-icons_hidden',
      'modal': '/* @echo webpackageName */_launcher-modal_hidden',
      'menu': '/* @echo webpackageName */_launcher-menu_hidden'
    };

    this.drawLauncherIcon();
    this.drawLauncherMenu();
    this.drawModalPopup();
  }

  drawLauncherIcon () {
    const launcherTouchPoint = document.createElement('div');

    launcherTouchPoint.classList.add('/* @echo webpackageName */_cubx-launcher-root');
    launcherTouchPoint.classList.add('collapsed');

    launcherTouchPoint.innerHTML = `<i data-action="open" class="/* @echo webpackageName */_material-icons">${this.config.launcherIcon.collapsed}</i>`;
    launcherTouchPoint.innerHTML += `<i data-action="close" class="/* @echo webpackageName */_material-icons ${this.hiddenClasses.materialIcons}">${this.config.launcherIcon.expanded}</i>`;

    launcherTouchPoint.addEventListener('click', () => { this.toggleMenu(); });

    document.body.appendChild(launcherTouchPoint);
    this.launcherTouchPoint = launcherTouchPoint;
  }

  drawLauncherMenu () {
    const launcherMenu = document.createElement('div');
    launcherMenu.classList.add(this.hiddenClasses.menu);
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
    launcherModal.classList.add(this.hiddenClasses.modal);

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
    this.launcherModal.classList.remove(this.hiddenClasses.modal);
    this.toggleMenu();
    this.injectContent(config);
  }

  closeModal () {
    this.launcherModal.classList.add(this.hiddenClasses.modal);
    // cleare content
    this.clearContent();
  }

  toggleMenu () {
    const openIcon = this.launcherTouchPoint.querySelector('i[data-action="open"]');
    const closeIcon = this.launcherTouchPoint.querySelector('i[data-action="close"]');

    if (this.launcherTouchPoint.classList.contains('collapsed')) {
      openIcon.classList.add(this.hiddenClasses.materialIcons);
      closeIcon.classList.remove(this.hiddenClasses.materialIcons);
      this.launcherMenu.classList.remove(this.hiddenClasses.menu);
      this.launcherTouchPoint.classList.remove('collapsed');
      this.launcherTouchPoint.classList.add('expanded');
    } else if (this.launcherTouchPoint.classList.contains('expanded')) {
      openIcon.classList.remove(this.hiddenClasses.materialIcons);
      closeIcon.classList.add(this.hiddenClasses.materialIcons);
      this.launcherMenu.classList.add(this.hiddenClasses.menu);
      this.launcherTouchPoint.classList.add('collapsed');
      this.launcherTouchPoint.classList.remove('expanded');
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

  // getExternalStyleUrl (url) {
  //   if (this.config.hasOwnProperty('externalStyle') && typeof this.config.externalStyle === 'string' && url) {
  //     let pathname = url.pathname.split('/');
  //     pathname.pop();
  //     pathname.push(this.config.externalStyle);
  //     url.pathname = pathname.join('/');

  //     return url.toString();
  //   } else {
  //     return undefined;
  //   }
  // }
  getExternalStyleUrl () {
    if (this.config.hasOwnProperty('externalStyle') && typeof this.config.externalStyle === 'string') {
      return this.config.externalStyle;
    } else {
      return undefined;
    }
  }

  getDefaultStyleUrl (url) {
    let pathname = url.pathname;
    pathname = pathname.substring(0, pathname.lastIndexOf('/'));
    url.pathname = `${pathname}/launcher_main.css`;
    return url.toString();
  }
}

export default Launcher;
