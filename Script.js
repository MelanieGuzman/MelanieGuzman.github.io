let xPos = 0;
const totalImages = document.querySelectorAll('.img').length;
const imageAngle = 360 / totalImages;

gsap.timeline()
.set('.ring',{rotationY:180,cursor:'grab'})
.set('.img',{
rotateY:(i)=>i * -imageAngle,
transformOrigin:'50% 50% 500px',
z:-500,
backgroundPosition:(i)=>getBgPos(i),
backfaceVisibility:'hidden'
})
.from('.img',{
duration:1.5,
y:200,
opacity:0,
stagger:0.1,
ease:'expo'
})

.add(()=>{

$('.img').on('mouseenter',(e)=>{
let current=e.currentTarget;

gsap.to('.img',{
opacity:(i,t)=>(t==current)?1:0.5
})

})

$('.img').on('mouseleave',()=>{
gsap.to('.img',{opacity:1})
})

},'-=0.5')

$(window).on('mousedown touchstart',dragStart)
$(window).on('mouseup touchend',dragEnd)

function dragStart(e){
if (e.touches || (e.originalEvent && e.originalEvent.touches)) {
    let touch = e.touches ? e.touches[0] : e.originalEvent.touches[0];
    xPos = Math.round(touch.clientX);
} else {
    xPos = Math.round(e.clientX);
}

gsap.set('.ring',{cursor:'grabbing'})

$(window).on('mousemove touchmove',drag)

}

function drag(e){
let currentX;
let isMouse = true;

if (e.touches || (e.originalEvent && e.originalEvent.touches)) {
    let touch = e.touches ? e.touches[0] : e.originalEvent.touches[0];
    currentX = Math.round(touch.clientX);
    isMouse = false;
} else {
    currentX = Math.round(e.clientX);
}

let deltaX = currentX - xPos;
let movementFactor = isMouse ? deltaX * 1.2 : deltaX * 0.4;

gsap.to('.ring',{
rotationY:'-=' + movementFactor,
onUpdate:()=>{
gsap.set('.img',{
backgroundPosition:(i)=>getBgPos(i)
})
}
})

xPos = currentX;
}

function dragEnd(){
$(window).off('mousemove touchmove',drag)
gsap.set('.ring',{cursor:'grab'})
}

// Arrow Button Navigation Logic
$('.next-arrow').on('click', () => {
    gsap.to('.ring', {
        rotationY: '-=' + imageAngle,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
            gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) });
        }
    });
});

$('.prev-arrow').on('click', () => {
    gsap.to('.ring', {
        rotationY: '+=' + imageAngle,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
            gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) });
        }
    });
});

function getBgPos(i){
return (100-gsap.utils.wrap(0,360,
gsap.getProperty('.ring','rotationY')-180-i * imageAngle
)/360*500)+'px 0px'
}

const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      projectObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '0px 0px -15% 0px',
  threshold: 0.15
});

projectCards.forEach(card => projectObserver.observe(card));

const phoneReveal = document.querySelector('.phone-reveal');
if (phoneReveal) {
  const defaultLabel = 'Phone';
  const phoneNumber = phoneReveal.dataset.number;

  const revealNumber = () => {
    phoneReveal.textContent = phoneNumber;
    phoneReveal.classList.add('revealed');
  };

  const resetLabel = () => {
    phoneReveal.textContent = defaultLabel;
    phoneReveal.classList.remove('revealed');
  };

  phoneReveal.addEventListener('click', (event) => {
    event.preventDefault();
    revealNumber();
  });
  phoneReveal.addEventListener('mouseenter', revealNumber);
  phoneReveal.addEventListener('mouseleave', resetLabel);
  phoneReveal.addEventListener('focus', revealNumber);
  phoneReveal.addEventListener('blur', resetLabel);
  phoneReveal.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      revealNumber();
    }
  });
}
