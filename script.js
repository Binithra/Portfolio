function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Toggle job details visibility
function toggleJobDetails(button) {
    // Find the nearest details-list that comes after the button
    let detailsList = button.nextElementSibling;
    
    // Skip the date paragraph if it's between button and details-list
    if (detailsList && detailsList.classList.contains('timeline-date')) {
        detailsList = detailsList.nextElementSibling;
    }
    
    if (detailsList && detailsList.classList.contains('details-list')) {
        const isCollapsed = detailsList.classList.contains('collapsed');
        
        if (isCollapsed) {
            // Expanding - show tasks
            detailsList.classList.remove('collapsed');
            button.innerHTML = '<span class="toggle-text">Hide Tasks</span> <span class="toggle-icon">▲</span>';
        } else {
            // Collapsing - hide tasks
            detailsList.classList.add('collapsed');
            button.innerHTML = '<span class="toggle-text">View Tasks</span> <span class="toggle-icon">▼</span>';
        }
    }
}

// Toggle career details on mobile
function toggleCareerDetails(button) {
    const timelineContent = button.closest('.timeline-content');
    timelineContent.classList.toggle('expanded');
    timelineContent.classList.toggle('collapsed');
    button.textContent = timelineContent.classList.contains('expanded') ? 'Hide Details' : 'Show Details';
}

// Initialize mobile career toggles
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 900;
    if (isMobile) {
        const timelineContents = document.querySelectorAll('.timeline-content');
        timelineContents.forEach(content => {
            // Add collapsed state and toggle button
            if (content.querySelector('ul')) {
                content.classList.add('collapsed');
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'timeline-toggle-btn';
                toggleBtn.textContent = 'Show Details';
                toggleBtn.onclick = function(e) {
                    e.preventDefault();
                    toggleCareerDetails(this);
                };
                content.appendChild(toggleBtn);
            }
        });
    }
});


    // 3D Carousel Auto-Rotate
    const carouselImgs = document.querySelectorAll('.carousel-3d-img');
    let carouselIndex = 0;

    function updateCarousel3D() {
      carouselImgs.forEach((img, i) => {
        img.classList.remove('center', 'left', 'right', 'hidden');
        if (i === carouselIndex) {
          img.classList.add('center');
        } else if (i === (carouselIndex + 1) % carouselImgs.length) {
          img.classList.add('right');
        } else if (i === (carouselIndex - 1 + carouselImgs.length) % carouselImgs.length) {
          img.classList.add('left');
        } else {
          img.classList.add('hidden');
        }
      });
    }

    function autoRotateCarousel() {
      carouselIndex = (carouselIndex + 1) % carouselImgs.length;
      updateCarousel3D();
    }

    if (carouselImgs.length) {
      updateCarousel3D();
      setInterval(autoRotateCarousel, 3000);
    }

    // Reset carousel to first image when About section comes into view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            carouselIndex = 0;
            updateCarousel3D();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(aboutSection);
    }

    document.addEventListener('DOMContentLoaded', function () {
  const badge = document.getElementById('education-badge');
  const aboutSection = document.getElementById('about');
  const modal = document.getElementById('education-modal');
  const closeModal = document.getElementById('close-education-modal');

  // Show badge when about section is in view
  function showBadgeOnAbout() {
    const rect = aboutSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      badge.classList.add('visible');
    } else {
      badge.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', showBadgeOnAbout);
  showBadgeOnAbout();

  // Drag and drop functionality
  let isDragging = false, offsetX = 0, offsetY = 0, dragMoved = false;

  badge.addEventListener('mousedown', function (e) {
    isDragging = true;
    dragMoved = false;
    offsetX = e.clientX - badge.offsetLeft;
    offsetY = e.clientY - badge.offsetTop;
    badge.style.transition = 'none';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      dragMoved = true;
      badge.style.left = (e.clientX - offsetX) + 'px';
      badge.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', function (e) {
    if (isDragging) {
      isDragging = false;
      badge.style.transition = '';
      document.body.style.userSelect = '';
    }
  });

  // Touch drag for mobile
  badge.addEventListener('touchstart', function (e) {
    isDragging = true;
    dragMoved = false;
    const touch = e.touches[0];
    offsetX = touch.clientX - badge.offsetLeft;
    offsetY = touch.clientY - badge.offsetTop;
    badge.style.transition = 'none';
  });

  document.addEventListener('touchmove', function (e) {
    if (isDragging) {
      dragMoved = true;
      const touch = e.touches[0];
      badge.style.left = (touch.clientX - offsetX) + 'px';
      badge.style.top = (touch.clientY - offsetY) + 'px';
    }
  });

  document.addEventListener('touchend', function () {
    if (isDragging) {
      isDragging = false;
      badge.style.transition = '';
    }
  });

  // Only open modal if not dragging
  badge.addEventListener('click', function (e) {
    if (!dragMoved) {
      modal.style.display = 'block';
    }
  });

  closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Hide modal when clicking outside
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
