import Swiper from 'swiper';
import {v4} from 'uuid'


const slideEffect: Array<'slide' | 'cube' | 'coverflow' | 'flip'> = ['slide', 'cube', 'coverflow', 'flip'];

class PreviewImage {
  unionKey = '';
  opts = {
    containerEle: document.body,
    index: -1,
    urls: []
  };
  container: HTMLElement = document.createElement('div');
  galleryContainer: HTMLElement = document.createElement('div');
  swiper: Swiper = new Swiper('');

  constructor(options: any) {
    if (!options.urls && Array.isArray(options.urls)) {
      console.error('urls is required and should be an Array');
      return;
    }

    if (options.index < 0 || options.index >= options.urls.length) {
      console.error('error index ');
      return;
    }
    this.unionKey = v4();
    this.opts = getOption(options);
  }

  preview() {
    this.container = document.createElement('div');
    this.container.className = `preview-image-root-container ${this.isPreviewInBody() ? 'preview-in-body' : 'preview-inside'}`;
    this.container.id = `${this.unionKey}`;
    this.opts.containerEle.style.position = 'relative';
    this.opts.containerEle.style.overflow = 'hidden';
    this.container.innerHTML = `<div class="swiper-wrapper" id="preview-image-container~${this.unionKey}">\
        ${this.generateContainer()}</div>`;
    this.opts.containerEle.appendChild(this.container);

    this.swiper = new Swiper(`#${this.unionKey}`, {
      zoom: true,
      initialSlide: this.opts.index || 0,
      effect: getRandomEffect(),
      passiveListeners: false,
      lazy: {
        loadPrevNext: true,
      },
      on: {
        tap: (event?) => {
          event && event.stopPropagation();
          event && event.preventDefault();
          this.removeItems();
        },
        touchEnd: () => {
        },
        slideChange: (...args) => {

        }
      }
    });
  }

  isPreviewInBody() {
    return this.opts.containerEle.tagName === 'BODY';
  }

  generateContainer() {
    let str = '';
    for (let index in this.opts.urls) {
      str += `<div class="swiper-slide"\
       id="preview-image-container-id${index}~${this.unionKey}"><div class="swiper-zoom-container">\
       <img alt="${this.getImageStr(parseInt(index))}" draggable="false" src="${this.getImageStr(parseInt(index))}"/>\
       </div></div>`;
    }
    return str;
  }

  getImageStr(index: number) {
    return this.opts.urls[index];
  }

  removeItems() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      delete this.container;
      delete this.galleryContainer;
      if (this.isPreviewInBody()) {
        this.opts.containerEle.style.overflow = 'auto';
      }
    }
  }
}

function getRandomEffect(): 'slide' | 'cube' | 'coverflow' | 'flip' {
  const index = Math.floor(Math.random() * slideEffect.length);
  return slideEffect[index]
}

function getOption(options: any) {
  const DEFAULT_OPTIONS = {
    index: 0,
    // required
    urls: [],
    //sometime you may not want your customer to close the preview themselves , then you may give me `false`
    clickToHide: true,
    //当滑动距离大于此值的时候触发上一个或者下一个
    offset: 75,
    smoothly: true,
    urlLabel: 'url',
    //use your own container
    containerEle: document.body,
  };
  return Object.assign({}, DEFAULT_OPTIONS, options);
}

export default PreviewImage;
