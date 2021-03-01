'use strict';

let productsArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg',
];

const imageSection = document.getElementById('imageSectionProduct');
const firstImage = document.getElementById('firstImage');
const secondImage = document.getElementById('secondImage');
const thirdImage = document.getElementById('thirdImage');
const button = document.getElementById('Results');

let firstImageIndex = 0;
let secondImageIndex = 0;
let thirdImageIndex = 0;
const clickCounter = 25;

function BussMall(name, image) {
  this.name = name;
  this.image = './img/' + image;
  this.clicks = 0;
  this.shown = 0;
  BussMall.all.push(this);
}

BussMall.all = [];
BussMall.counter = 0;

for (let i = 0; i < productsArray.length; i++) {
  new BussMall(getName(productsArray[i]), productsArray[i]);
}

function getName(fileName) {
  return fileName.split('.').slice(0, -1).join('.');
}

function renderNewProducts() {
  let firstIndex = randomNumber(0, BussMall.all.length - 1);
  firstImage.src = BussMall.all[firstIndex].image;
  firstImage.alt = BussMall.all[firstIndex].name;
  firstImageIndex = firstIndex;

  let secondIndex;
  let thirdIndex;
  do {
    secondIndex = randomNumber(0, BussMall.all.length - 1);
    thirdIndex = randomNumber(0, BussMall.all.length - 1);
  } while ((firstIndex === secondIndex) || (firstIndex === thirdIndex) || (secondIndex === thirdIndex));

  secondImage.src = BussMall.all[secondIndex].image;
  secondImage.alt = BussMall.all[secondIndex].name;
  secondImageIndex = secondIndex;

  thirdImage.src = BussMall.all[thirdIndex].image;
  thirdImage.alt = BussMall.all[thirdIndex].name;
  thirdImageIndex = thirdIndex;

  BussMall.all[firstIndex].shown++;
  BussMall.all[secondIndex].shown++;
  BussMall.all[thirdIndex].shown++;

}


function handelClick(event) {

  if (BussMall.counter < clickCounter) {
    const clickedElement = event.target;
    if (clickedElement.id === 'firstImage' || clickedElement.id === 'secondImage' || clickedElement.id === 'thirdImage') {
      if (clickedElement.id === 'firstImage') {
        BussMall.all[firstImageIndex].clicks++;
      }

      if (clickedElement.id === 'secondImage') {
        BussMall.all[secondImageIndex].clicks++;
      }

      if (clickedElement.id === 'thirdImage') {
        BussMall.all[thirdImageIndex].clicks++;
      }

      BussMall.counter++;
      renderNewProducts();

      console.log(BussMall.all);
    }
  }
}

imageSection.addEventListener('click', handelClick);

console.log(BussMall.all);


renderNewProducts();

button.addEventListener('click', getResult);

function getResult() {
  const parentElement = document.getElementById('View-Results');
  const articleElement = document.createElement('article');
  parentElement.appendChild(articleElement);

  for (let i = 0; i < BussMall.all.length; i++) {
    const pElement = document.createElement('p');
    articleElement.appendChild(pElement);
    pElement.textContent = BussMall.all[i].name + 'had' + BussMall.all[i].clicks + 'votes, and was seen' + BussMall.all[i].shown + 'times';
  }

  button.removeEventListener('click', getResult);
  button.textContent = 'Reset';
  button.onclick = function handelClick (event) {
    location.reload();
  };
}
// GLOBAL RANDOM FUNCTION
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


