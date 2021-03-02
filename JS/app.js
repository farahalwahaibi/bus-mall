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
// let firstSecImageIndex = 0;
// let secondSecImageIndex = 0;
// let thirdSecImageIndex = 0;
const clickCounter = 25;

function BussMall(name, image) {
  this.name = name;
  this.image = './img/' + image;
  this.clicks = 0;
  this.shown = 0;
  BussMall.all.push(this);
  //LAB 13
 
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

  //LAB 12
  // let previousRound = [firstIndex, secondIndex, thirdIndex];
  // let firstSecIndex = randomNumber(0, BussMall.all.length - 1);
  // firstImage.src = BussMall.all[firstSecIndex].image;
  // firstImage.alt = BussMall.all[firstSecIndex].name;
  // firstSecImageIndex = firstSecIndex;

  // let secondSecIndex;
  // let thirdSecIndex;
  // do {
  //   secondSecIndex = randomNumber(0, BussMall.all.length - 1);
  //   thirdSecIndex = randomNumber(0, BussMall.all.length - 1);
  // } while ((firstSecIndex === secondSecIndex) || (firstSecIndex === thirdSecIndex) || (secondSecIndex === thirdSecIndex));

  // secondImage.src = BussMall.all[secondSecIndex].image;
  // secondImage.alt = BussMall.all[secondSecIndex].name;
  // secondSecImageIndex = secondSecIndex;

  // thirdImage.src = BussMall.all[thirdSecIndex].image;
  // thirdImage.alt = BussMall.all[thirdSecIndex].name;
  // thirdSecImageIndex = thirdSecIndex;

  // let previousRound = [firstIndex, secondIndex, thirdIndex];
  // let currentRound = [firstSecIndex, secondSecIndex, thirdSecIndex];

  // if (previousRound[0] === currentRound[0] || previousRound[1] === currentRound[0] || previousRound[2] === currentRound[0]) {
  //   currentRound[0] = randomNumber(0, BussMall.all.length - 1);
  // } if (previousRound[0] === currentRound[1] || previousRound[1] === currentRound[1] || previousRound[2] === currentRound[1]) {
  //   currentRound[1] = randomNumber(0, BussMall.all.length - 1);
  // } if (previousRound[0] === currentRound[2] || previousRound[1] === currentRound[2] || previousRound[2] === currentRound[2]) {
  //   currentRound[2] = randomNumber(0, BussMall.all.length - 1);
  // } else {


  // LAB 12
  // BussMall.all[firstSecIndex].shown++;
  // BussMall.all[secondSecIndex].shown++;
  // BussMall.all[thirdSecIndex].shown++;
  // }
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

      // if (clickedElement.id === 'firstImage') {
      //   BussMall.all[firstSecImageIndex].clicks++;
      // }

      // if (clickedElement.id === 'secondImage') {
      //   BussMall.all[secondSecImageIndex].clicks++;
      // }

      // if (clickedElement.id === 'thirdImage') {
      //   BussMall.all[thirdSecImageIndex].clicks++;
      // }

      BussMall.counter++;
      renderNewProducts();

      console.log(BussMall.all);

    }
  
  } else {
    localStorage.setItem('BussMall', JSON.stringify(BussMall.all));
    renderChart();
  }

}
imageSection.addEventListener('click', handelClick);


console.log(BussMall.all);


// renderNewProducts();


button.addEventListener('click', getResult);

function getResult() {
  const parentElement = document.getElementById('View-Results');
  const articleElement = document.createElement('article');
  parentElement.appendChild(articleElement);

  for (let i = 0; i < BussMall.all.length; i++) {
    const ulElement = document.createElement('ul');
    articleElement.appendChild(ulElement);
    ulElement.textContent = BussMall.all[i].name + ' had ' + BussMall.all[i].clicks + ' votes, and was seen ' + BussMall.all[i].shown + ' times';
  }

  button.removeEventListener('click', getResult);
  button.textContent = 'Reset';
  button.onclick = function handelClick(event) {
    location.reload();
  };
}
// GLOBAL RANDOM FUNCTION
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// renderNewProducts();

function renderChart() {

  let nameArray = [];
  let clicksArray = [];
  let shownArray = [];

  for (let i = 0; i < BussMall.all.length; i++) {
    nameArray.push(BussMall.all[i].name);
    clicksArray.push(BussMall.all[i].clicks);
    shownArray.push(BussMall.all[i].shown);

  }

  let ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# of Votes',
          data: clicksArray,
          backgroundColor: 'rgba(97, 49, 129, 0.2)',
          borderColor: 'rgba(97, 49, 129, 1)',
          borderWidth: 3
        },
        {
          label: '# of Seen',
          data: shownArray,
          backgroundColor: 'rgba(228, 147, 26, 0.2)',
          borderColor: 'rgba(228, 147, 26, 1)',
          borderWidth: 3
        },
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


//lab 13
function getData() {
  const data = localStorage.getItem('BussMall');
  if (data) {
    const objData = JSON.parse(data);
    BussMall.all = objData;
    renderNewProducts();
  }
}

// Add an event listener to the submit button
// button.addEventListener('click', handelClick);
getData();
//lab13
renderNewProducts();
