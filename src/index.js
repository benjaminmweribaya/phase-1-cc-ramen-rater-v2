// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  document.querySelector('#ramen-detail img').src = ramen.image;
  document.querySelector('#ramen-detail .name').textContent = ramen.name;
  document.querySelector('#ramen-detail .restaurant').textContent = ramen.restaurant;
  document.querySelector('#rating-display').textContent = ramen.rating;
  document.querySelector('#comment-display').textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add code
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Create a new ramen object from form input values
    const newRamen = {
      name: form.name.value,
      restaurant: form.restaurant.value,
      image: form.image.value,
      rating: form.rating.value,
      comment: form['new-comment'].value
    }

    // Create a new img element for the new ramen
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;

    // Add event listener to the new ramen image to handle clicks
    img.addEventListener('click', () => handleClick(newRamen));

    // Append the new ramen image to the #ramen-menu div
    document.getElementById('ramen-menu').appendChild(img);

    // Clear the form fields after submission
    form.reset();
  });
}

const displayRamens = () => {
  // Add code
  fetch('http://localhost:3000/ramens')
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById('ramen-menu');
      // Iterate through each ramen and add it to the #ramen-menu
      ramens.forEach((ramen, index) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;

        // Add event listener to each ramen image to handle clicks
        img.addEventListener('click', () => handleClick(ramen));

        ramenMenu.appendChild(img);

        // Display the first ramen's details by default
        if (index === 0) handleClick(ramen);
      });
    })
    .catch((error) => console.error('Error fetching ramen data:', error));
};

const main = () => {
  // Invoke displayRamens here
  displayRamens();
  // Invoke addSubmitListener here
  addSubmitListener();
}

document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
