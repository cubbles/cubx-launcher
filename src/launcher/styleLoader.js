class StyleLoader {
  constructor (url) {
    this.url = url; // needs to point to a .css file
  }

  process () {
    const parent = document.head;
    const style = document.createElement('link');
    style.href = this.url;
    style.type = 'text/css';
    style.rel = 'stylesheet';

    parent.append(style);
  }
}

export default StyleLoader;
