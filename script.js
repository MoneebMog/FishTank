// create an array to hold the fish and food elements
let fish = [];
let food = [];

// create a function to add fish to the container element
function addFish() {
  // create a new fish element
  let newFish = document.createElement('div');
  newFish.className = 'fish';
  newFish.style.left = Math.random() * (window.innerWidth - 20) + 'px';
  newFish.style.top = Math.random() * (window.innerHeight - 20) + 'px';
  // add the fish element to the container element
  document.body.appendChild(newFish);
  // add the new fish element to the fish array
  fish.push(newFish);
}


// create a function to move the fish around randomly
function moveFish() {
    fish.forEach(function(fishElement) {
      // generate random numbers to change the position of the fish element
      let x = Math.random() * 10 - 5;
      let y = Math.random() * 10 - 5;
      // get the current position of the fish element
      let currentLeft = parseFloat(fishElement.style.left);
      let currentTop = parseFloat(fishElement.style.top);
      // calculate the new position of the fish element
      let newLeft = currentLeft + x;
      let newTop = currentTop + y;
      // check if the new position is within the boundaries of the container element
      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft > window.innerWidth - 20) {
        newLeft = window.innerWidth - 20;
      }
      if (newTop < 0) {
        newTop = 0;
      } else if (newTop > window.innerHeight - 20) {
        newTop = window.innerHeight - 20;
      }
      // set the new position of the fish element using CSS transition
      fishElement.style.transition = 'transform 0.1s ease-out';
      fishElement.style.transform = `translate(${newLeft}px, ${newTop}px)`;
    });
  }

// disable scrollbars because its so annoying for it to be having a dance party in the middle of my screen like are you kidding me why the h e double hockey stick are you doing????
document.body.style.overflow = 'hidden';

function addFood() {
  // create a new food element
  let newFood = document.createElement('div');
  newFood.className = 'food';
  newFood.style.left = Math.random() * window.innerWidth - 125 + 'px';
  newFood.style.top = Math.random() * window.innerHeight - 125 + 'px';
  // add the food element to the container element
  document.body.appendChild(newFood);
  // add the new food element to the food array
  food.push(newFood);
}

// create a function to check if a fish is near the food and make it eat the food
function checkFood() {
    fish.forEach(function(fishElement) {
      food.forEach(function(foodElement) {
        // calculate the distance between the fish and food elements
        let dx = parseFloat(fishElement.style.left) - parseFloat(foodElement.style.left);
        let dy = parseFloat(fishElement.style.top) - parseFloat(foodElement.style.top);
        let distance = Math.sqrt(dx * dx + dy * dy);
        // if the fish is close enough to the food, move it to the food and remove the food
        if (distance < 20) {
          fishElement.style.left = foodElement.style.left;
          fishElement.style.top = foodElement.style.top;
          // remove the food after 1x10e^-100 seconds
          setTimeout(function() {
            if (!food.includes(foodElement)) return;
            foodElement.remove();
            food.splice(food.indexOf(foodElement), 1);
          }, 1);
        }
      });
    });
  }

  
// add event listeners to the window object to start the animations
window.addEventListener('load', function() {
	// add fish to the container element every second
	setInterval(addFish, 1000);
	// move the fish around randomly every 50 milliseconds
	setInterval(moveFish, 50);
	// add food to the container element every 5 seconds
	setInterval(addFood, 2500);
	// check if a fish is near the food and make it eat the food every 50 milliseconds
	setInterval(checkFood, 50);
});