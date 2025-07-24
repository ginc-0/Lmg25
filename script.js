document.addEventListener("DOMContentLoaded", () => {
  // ✅ Initialize AOS
  AOS.init({
    duration: 1000, // animation duration in ms
    once: true      // animation happens once on scroll
  });

  // ✅ View More button in Portfolio
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function () {
      const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
      hiddenItems.forEach(item => item.classList.remove('hidden'));
      this.style.display = 'none'; // hide the button after revealing items
    });
  }

  // ✅ Fade-in Section IntersectionObserver (can be used alongside AOS if you want custom fade-ins)
  const faders = document.querySelectorAll('.fade-in-section');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // ✅ Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // ✅ Typewriter effect
  const typewriter = document.querySelector('.typewriter');
  const textArray = ["Curating Global Experiences", "Your Event, Our Passion"];
  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (typewriter && charIndex < textArray[textIndex].length) {
      typewriter.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (typewriter && charIndex > 0) {
      typewriter.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 1000);
    }
  }

  if (typewriter) type();

  // ✅ Slider
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  function showSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (slideIndex + 1) % slides.length;
    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
  }
  if (slides.length > 0) setInterval(showSlides, 4000);

  // ✅ Animated Counters
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });

  // ✅ Testimonial Rotation
  const testimonials = [
    {
      text: "This service changed the way I do business. Highly recommend!",
      author: "Jane Wambui"
    },
    {
      text: "Amazing experience from start to finish. 5 stars!",
      author: "George Kiplagat"
    },
    {
      text: "Professional, reliable, and creative. Exactly what I needed.",
      author: "Brian Otieno"
    },
    {
      text: "Their website and branding blew me away. Worth every shilling.",
      author: "Shiku Njeri"
    }
  ];

  let testimonialIndex = 0;
  const textEl = document.getElementById("testimonial-text");
  const authorEl = document.getElementById("testimonial-author");

  function showTestimonial(i) {
    if (textEl && authorEl) {
      textEl.textContent = testimonials[i].text;
      authorEl.textContent = `– ${testimonials[i].author}`;
    }
  }

  if (textEl && authorEl) {
    showTestimonial(testimonialIndex);
    setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      showTestimonial(testimonialIndex);
    }, 5000);
  }

  // ✅ Fallback Fade-in if not using AOS
  const fadeElements = document.querySelectorAll('.fade-in, .animate-fade-in');
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fadeElements.forEach(el => fadeObserver.observe(el));
});