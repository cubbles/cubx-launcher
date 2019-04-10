// import all resources here
import css from './launcher.sss'; // eslint-disable-line no-unused-vars
import Config from './config';

class Launcher {
  constructor () {
    this.config = (new Config()).getConfig();
    this.drawLauncherIcon();
    this.drawLauncherMenu();
  }

  drawLauncherIcon () {
      // append launcher to dom using absolute positioning
    const launcherIcon = document.createElement('div');
    launcherIcon.classList.add('/* @echo webpackageName */_cubx-launcher-root');
    launcherIcon.innerHTML = `<i class="/* @echo webpackageName */_material-icons">${this.config.launcherIcon.collapsed}</i>`;

    launcherIcon.addEventListener('click', () => { this.toggleMenu(); });

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
          this.drawModalPopup(this.config.apps[index]);
        });
      })(node);
    });
    document.body.appendChild(launcherMenu);
    this.launcherMenu = launcherMenu;
  }

  drawModalPopup (config) {
    console.log(config);
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
}

const launcher = new Launcher(); // eslint-disable-line no-unused-vars
