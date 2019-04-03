// import all resources here
import css from './c-util.sss';

class Launcher {
    constructor () {
        this.drawLauncherIcon();
    }

    private drawLauncherIcon () {
        // append launcher to dom using absolute positioning
        const launcherIcon = document.createElement('div');
        launcherIcon.innerHTML = '<p>Show launcher</p>';
        launcherIcon.addEventListener('click', () => { alert('hello!'); });

        document.body.appendChild(launcherIcon);
    }
}

const launcher = new Launcher();