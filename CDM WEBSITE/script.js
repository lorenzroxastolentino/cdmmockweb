window.onscroll = function() {
    handleScroll();
};

function handleScroll() {
    const navbar = document.querySelector('#navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

   
}


const carousel = document.querySelector('.course-carousel');
const courseItems = document.querySelectorAll('.course-item');
const totalItems = courseItems.length;
let isDragging = false;
let startX, scrollLeft;
let interval;

// Clone items to create infinite loop effect
function cloneItems() {
    const firstItems = Array.from(courseItems);
    firstItems.forEach(item => {
        const clone = item.cloneNode(true); // Clone the item
        carousel.appendChild(clone); // Append clone to the end
    });
}

// Function to move carousel automatically
function moveCarousel() {
    const scrollAmount = courseItems[0].offsetWidth + 20; // Width of one item + margin
    const currentTranslateX = parseInt(getComputedStyle(carousel).transform.split(',')[4]) || 0;

    // Move carousel by one item width
    carousel.style.transform = `translateX(${currentTranslateX - scrollAmount}px)`;

    // If we've scrolled past the original items, reset back to the start for infinite loop
    if (Math.abs(currentTranslateX) >= scrollAmount * totalItems) {
        carousel.style.transition = 'none'; // Disable transition for reset
        carousel.style.transform = 'translateX(0)';
        setTimeout(() => {
            carousel.style.transition = 'transform 1s ease-in-out'; // Re-enable transition
        }, 50); // Small delay for reset
    }
}

// Start auto-scrolling every 3 seconds
function startAutoScroll() {
    interval = setInterval(moveCarousel, 3000); // 3 seconds per item scroll
}

// Stop the auto-scrolling when dragging starts
function stopAutoScroll() {
    clearInterval(interval);
}

// Start the drag functionality
carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add('dragging');
    stopAutoScroll(); // Stop auto-scrolling while dragging
});

// Handle dragging (mouse move)
carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    const walk = (x - startX) * 2; // Adjust scroll speed by changing multiplier
    carousel.scrollLeft = scrollLeft - walk;
});

// Stop dragging on mouseup or mouseleave
carousel.addEventListener('mouseup', () => {
    isDragging = false;
    carousel.classList.remove('dragging');
    startAutoScroll(); // Restart auto-scrolling
});

carousel.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        carousel.classList.remove('dragging');
        startAutoScroll(); // Restart auto-scrolling
    }
});

// Start everything: clone items and start auto-scrolling
cloneItems();
startAutoScroll();


// Get elements
const toggleBtn = document.querySelector('.toggle_btn');
const dropdownMenu = document.querySelector('.dropdown_menu');
const icon = toggleBtn.querySelector('i');

// Add click event to toggle button
toggleBtn.addEventListener('click', function() {
    // Toggle the active class on both the button and the dropdown menu
    dropdownMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active');
});



    // Get the form and modal elements
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');

    // Add an event listener to the form submit event
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission (so the page doesn't reload)
        event.preventDefault();

        // Here, you could handle the form data or send it to the server via AJAX
        // For simplicity, we just show the success message here

        // Show the success message modal
        modal.style.display = 'block';

        // Optionally, you can reset the form fields after submission
        form.reset();
    });

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }