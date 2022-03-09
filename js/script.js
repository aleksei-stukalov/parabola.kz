const w = window, d = document;

const
  navContainer = d.querySelector('#navigation'),
  navLinks = d.querySelector('#navigation__links'),
  navLinksArray = Array.from(navLinks.querySelectorAll('.navigation__link')),
  heroLogo = d.querySelector('#hero__logo'),
  heroParagraph = d.querySelector('#hero__descro'),
  teamCards = Array.from(d.querySelector('#team__forground').children),
  teamBackground = Array.from(d.querySelector('#team__background').children),
  sectionsArray = Array.from(d.querySelector('#main').children),
  heroVideo = d.querySelector('#hero__video'),
  serviceVideo = d.querySelector('#service__video'),
  topSectionVideosArray = [heroVideo, serviceVideo];

let viewportHeight = w.innerHeight;
w.addEventListener('resize', () => viewportHeight = w.innerHeight)

let changer = {
  setTop: (_element, _value) => { _element.style.top = _value },
  transform: (_element, _value) => { _element.style.transform = _value },
  setDisplay: (_element, _value) => { _element.style.display = _value },
  addClass: (_element, _class) => { _element.classList.add(_class) },
  removeClass: (_element, _class) => { _element.classList.remove(_class) },
  setClass: (_element, _class) => { _element.className = _class },
  calculateTop: (_element) => { return _element.getBoundingClientRect().top + w.pageYOffset; },
  play: (_element) => { _element.play(); },
  pause: (_element) => { _element.pause(); },
};

d.addEventListener('scroll', () => {
  const _scrollTop = d.documentElement.scrollTop
  // Navigation drops down after scrolled down for 200px
  if (_scrollTop >= 200 && navContainer.style.top != '0px') changer.setTop(navContainer, '0px');
  else if (_scrollTop < 200 && navContainer.style.top != '-60px') changer.setTop(navContainer, '-60px');
  // Links parallex effect unless scrolled down for 200px
  if (_scrollTop < 200) changer.setTop(navLinks, `${(_scrollTop * -0.25) + 100}px`);
  else if (navLinks.style.top != '0px') changer.setTop(navLinks, '0px');
  // Hero section parallex effect unless scrolled full page down
  if (_scrollTop <= viewportHeight) {
    changer.setTop(heroLogo, `${_scrollTop * 0.6}px`);
    changer.setTop(heroParagraph, `${_scrollTop * 0.5}px`);
  }

  changer.setTop(serviceVideo, `${_scrollTop - viewportHeight}px`);
})

teamCards.forEach((element, index) => {
  element.addEventListener('mouseenter', () => {
    if (element.classList.contains('team__card-toggled')) return;
    changer.addClass(element, 'team__card-toggled');
    teamCards.forEach((_element, _index) => {
      _index === index ? null : changer.removeClass(_element, 'team__card-toggled');
    });
    teamBackground.forEach((_element, _index) => {
      _index === index ? changer.addClass(_element, 'show') : changer.removeClass(_element, 'show');
    })
  });
})

// Smooth scroll to section
navLinksArray.forEach((element, index) => {
  element.addEventListener('click', () => {
    event.preventDefault();
    w.scrollTo({
      top: changer.calculateTop(sectionsArray[index]) - (index === 0 ? 0 : 60),
      behavior: 'smooth',
    });
    return false;
  });
});

// Starting Top Section hero-video and service-video at the same time!
let videoCounter = 0;
topSectionVideosArray.forEach((element) => {
  _videoPlaySynched = () => {
    videoCounter++;
    if (videoCounter === topSectionVideosArray.length) {
      videoCounter = 0;
      topSectionVideosArray.forEach((element) => {
        element.play();
      });
    }
  }
  // Below I'm checking if current video is cached, if not i add event listener.
  if (element.readyState === 4) {
    _videoPlaySynched();
  }
  element.addEventListener('canplaythrough', _videoPlaySynched);
  element.addEventListener('ended', _videoPlaySynched);
});
