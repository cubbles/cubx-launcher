// import all resources here
import css from './launcher.sss';

class Launcher {
    constructor () {
        this.drawLauncherIcon();
    }

    drawLauncherIcon () {
        // append launcher to dom using absolute positioning
        const launcherIcon = document.createElement('div');
        launcherIcon.classList.add('/* @echo webpackageName */_cubx-launcher-root');
        launcherIcon.innerHTML = '<i class="/* @echo webpackageName */_material-icons">chevron_left</i>';
        launcherIcon.addEventListener('click', () => { alert('hello!'); });

        document.body.appendChild(launcherIcon);
    }
}

const launcher = new Launcher();