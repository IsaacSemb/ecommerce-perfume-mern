

// temporarily to see the screen size i be at
window.onload = function() {
    const viewportWidth = window.innerWidth;
    document.getElementById("trker").textContent = `${viewportWidth}`;
};


// the scroll bar in the men category
const scrollContainer = document.getElementById('scroll-container');
const scrollLeftButton = document.getElementById('scroll-left');
const scrollRightButton = document.getElementById('scroll-right');

scrollLeftButton.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
});

scrollRightButton.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
});




  
