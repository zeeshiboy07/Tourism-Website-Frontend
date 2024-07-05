document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('.carousel-image');
  const heading = document.getElementById('carousel-heading');
  const text = 'PLAN YOUR TRIP!';
  let currentIndex = 0;

  function showImage(index) {
      images.forEach((image, i) => {
          image.classList.toggle('active', i === index);
      });
      typeText(heading, text);
  }

  function typeText(element, text) {
      element.textContent = ''; // Clear the text content
      let charIndex = 0;

      function typeChar() {
          if (charIndex < text.length) {
              element.textContent += text.charAt(charIndex);
              charIndex++;
              setTimeout(typeChar, 100); // Adjust typing speed by changing the timeout duration
          }
      }

      typeChar();
  }

  function startCarousel() {
      showImage(currentIndex);
      setInterval(() => {
          currentIndex = (currentIndex + 1) % images.length;
          showImage(currentIndex);
      }, 3000);
  }

  startCarousel();
});



  // Gallery sliding functionality
  const galleryItems = document.querySelectorAll('.gallery-item');

  function slideImages() {
      let nextIndex = 3;
      galleryItems.forEach(item => {
          const currentIndex = parseInt(item.getAttribute('data-index'));
          let newIndex = currentIndex - 1;
          if (newIndex === 0) {
              newIndex = 5;
          }
          item.setAttribute('data-index', newIndex);
          item.style.left = `${(newIndex - nextIndex) * 20}%`;
      });
  }

  setInterval(slideImages, 4000);


  function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.icon');
    if (answer.style.display === "none" || !answer.style.display) {
        answer.style.display = "block";
        icon.textContent = "-";
    } else {
        answer.style.display = "none";
        icon.textContent = "+";
    }
}



  // Package navigation functionality
  const packages = document.querySelectorAll('.package');
  let packageIndex = 0;

  function showPackages() {
      packages.forEach((pkg, index) => {
          if (index >= packageIndex && index < packageIndex + 3) {
              pkg.style.display = 'block';
          } else {
              pkg.style.display = 'none';
          }
      });
  }

  function prevPackage() {
      if (packageIndex > 0) {
          packageIndex--;
          showPackages();
      }
  }

  function nextPackage() {
      if (packageIndex + 3 < packages.length) {
          packageIndex++;
          showPackages();
      }
  }

  document.querySelector('.prev-button').addEventListener('click', prevPackage);
  document.querySelector('.next-button').addEventListener('click', nextPackage);

  showPackages();

  // Counter animation functionality
  const counters = document.querySelectorAll(".count");
  const speed = 350;

  const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
  };

  const resetCounters = () => {
      counters.forEach(counter => {
          counter.innerText = '0';
      });
  };

  const startCounting = (entry) => {
      const updateCount = counter => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const increment = target / speed;

          if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(() => updateCount(counter), 10);
          } else {
              if (target === 10000) {
                  counter.innerText = "10K";
              } else if (target === 500) {
                  counter.innerText = "500+";
              } else if (target === 50000) {
                  counter.innerText = "50K";
              } else {
                  counter.innerText = target;
              }
          }
      };

      counters.forEach(counter => updateCount(counter));
  };

  const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              resetCounters();
              startCounting(entry);
          }
      });
  }, options);

  counters.forEach(counter => {
      observer.observe(counter);
  });

