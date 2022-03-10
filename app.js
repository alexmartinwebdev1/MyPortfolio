const btnShowcase = document.querySelector('.btn-showcase');
const btnAbout = document.querySelector('.btn-about');
const navItems = document.querySelector('.nav-items');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header')
const hamburger = document.querySelector('.hamburger');

const typing = document.querySelector('.typing');
const text = 'I\'m a creative designer and full stack web developer that is very passionate and dedicated to his work.'
let letter = 0;
let index = 1;
function type() {
  typing.style.opacity = 1;
  letter = text.slice(0, ++index);
  typing.textContent = letter;
  if(letter.length === text.length) {
    index = 0
    return;
  }
  setTimeout(type, 50)
};

setTimeout(type, 3000)

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active')
  navItems.classList.toggle('active')
});

let query = window.matchMedia("(max-width: 600px)")
if(query.matches) {
  nav.classList.add('sticky')
} else {
  const changeNavLinkOpacity = (e, opacity) => {
    if(e.target.classList.contains('nav-link')) {
      const link = e.target
      const siblings = link.closest('.nav').querySelectorAll('.nav-link')
      const logo = link.closest('.nav').querySelector('h5');
      siblings.forEach(el => {
        if(el !== link) el.style.opacity = opacity;
      })
      logo.style.opacity = opacity;
    }
  }
  
  nav.addEventListener('mouseover', e => {
    changeNavLinkOpacity(e, 0.4);
  });
  
  nav.addEventListener('mouseout', e => {
    changeNavLinkOpacity(e, 1);
  });
  
  const stickyNav = entries => {
    const [entry] = entries;
    if(!entry.isIntersecting) {
      nav.classList.add('sticky')
    } else {
      nav.classList.remove('sticky')
    }
  }
  
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0
  });
  
  headerObserver.observe(header)
}

document.querySelectorAll('.nav-link').forEach(el => el.addEventListener('click', () => {
  hamburger.classList.remove('active')
  navItems.classList.toggle('active')
}))

btnShowcase.addEventListener('click', (e) => {
  e.preventDefault();
  scrollIntoViewWithOffset('#about', 60)
});

btnAbout.addEventListener('click', (e) => {
  e.preventDefault();
  scrollIntoViewWithOffset('#projects', 60)
});

navItems.addEventListener('click', e => {
  e.preventDefault();
  if(e.target.classList.contains('nav-link')) {
    const id = e.target.getAttribute('href');
    scrollIntoViewWithOffset(id, 60)
  }
})

const revealSection = (entries, observer) => {
  const [entry] = entries
  if(!entry.isIntersecting) return
  entry.target.classList.remove('section-hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

const allSections = document.querySelectorAll('.section');
allSections.forEach(section => {
  sectionObserver.observe(section)
  section.classList.add('section-hidden');
})

const scrollIntoViewWithOffset = (selector, offset) => {
  window.scrollTo({
    behavior: 'smooth',
    top:
      document.querySelector(selector).getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      offset,
  })
}
