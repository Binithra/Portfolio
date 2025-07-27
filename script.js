function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}


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
