export default class SimpleSlide {
  constructor(config) {
    this.config = {
      slide: config.slide,
      auto: config.auto === false ? false : true,
      nav: config.nav ? config.nav : false,
      time: config.time ? config.time : 5000,
      pauseOnHover: config.pauseOnHover ? config.pauseOnHover : false,
    };
    this.pause = false;
    this.activeClass = 'active';
    this.slide = document.querySelector(`[data-slide="${this.config.slide}"]`);
    if (this.slide) {
      this.items = [...this.slide.children];
      this.init();
    }
  }
  activateSlide(slide) {
    this.items.forEach((item) => item.classList.remove(this.activeClass));
    if (slide) {
      slide.classList.add(this.activeClass);
      this.activateNav(slide);
    } else {
      this.items[0].classList.add(this.activeClass);
      this.activateNav(this.items[0]);
    }
  }
  activateNav(slide) {
    if (this.config.nav) {
      const index = this.items.indexOf(slide);
      const navItems = [...this.nav.children];
      navItems.forEach((item) => item.classList.remove(this.activeClass));
      navItems[index].classList.add(this.activeClass);
    }
  }
  pauseOnHover() {
    this.items.forEach((item) => {
      item.addEventListener('mouseenter', () => (this.pause = true));
      item.addEventListener('mouseleave', () => (this.pause = false));
    });
  }
  rotateSlide() {
    if (!this.pause) {
      const activeSlide = this.slide.querySelector('.active');
      const nextSlide = activeSlide.nextElementSibling;
      this.activateSlide(nextSlide);
    }
  }
  initAutoSlide() {
    if (this.config.auto === true) {
      clearInterval(this.autoSlide);
      this.autoSlide = setInterval(this.rotateSlide, this.config.time);
    }
  }
  createNavigation() {
    this.nav = document.createElement('div');
    this.nav.setAttribute('data-slide-nav', this.config.slide);
    this.items.forEach((item, i) => {
      this.nav.innerHTML += `<button data-slide-item="${i}">${i + 1}</button>`;
    });
    this.slide.after(this.nav);
  }
  handleNavigationEvent({ currentTarget }) {
    const item = currentTarget.getAttribute('data-slide-item');
    this.activateSlide(this.items[item]);
    this.initAutoSlide();
  }
  bindEventsToNavigation() {
    const navItems = [...this.nav.children];
    navItems.forEach((item) => {
      item.addEventListener('click', this.handleNavigationEvent);
    });
  }
  initNavigation() {
    this.createNavigation();
    this.bindEventsToNavigation();
  }
  bindFunctions() {
    this.rotateSlide = this.rotateSlide.bind(this);
    this.handleNavigationEvent = this.handleNavigationEvent.bind(this);
  }
  init() {
    this.bindFunctions();
    this.initAutoSlide();
    if (this.config.nav) this.initNavigation();
    if (this.config.pauseOnHover) this.pauseOnHover();

    this.activateSlide(this.items[0]);
  }
}
