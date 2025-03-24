(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  document.addEventListener("DOMContentLoaded", function() {
    const continentLinks = document.querySelectorAll('.continents-list li[data-country]');
    const parkItems = document.querySelectorAll('#all .grid-item');

    continentLinks.forEach(link => {
        link.addEventListener('click', function() {
            const country = this.getAttribute('data-country');

            parkItems.forEach(item => {
                if (country === 'all' || item.getAttribute('data-continent') === country) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    // Filter for Gallery Categories
    const categoryLinks = document.querySelectorAll('.gallery-list li[data-library]');
    const galleryItems = document.querySelectorAll('.grid-item');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function() {
            const category = this.getAttribute('data-library');

            galleryItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
  });

})();

var map = L.map('map').setView([20, 0], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var parks = [
  { name: "Yellowstone", lat: 44.6, lon: -110.5, img: "images/parks/yellow stone.avif", info: "Oldest US park", link: "https://www.google.com/maps?q=Yellowstone+National+Park" },
  { name: "Banff", lat: 51.4968, lon: -115.9281, img: "images/parks/banff.avif", info: "Canada's first national park", link: "https://www.google.com/maps?q=Banff+National+Park" },
  { name: "Lake District", lat: 54.4609, lon: -3.0886, img: "images/parks/lake district.avif", info: "Famous UK park", link: "https://www.google.com/maps?q=Lake+District+National+Park" },
  { name: "Kakadu", lat: -12.4259, lon: 132.9933, img: "images/parks/kakadu.avif", info: "Largest Australian national park", link: "https://www.google.com/maps?q=Kakadu+National+Park" },
  { name: "Jim Corbett", lat: 29.5300, lon: 78.7747, img: "images/parks/jimcorbett.avif", info: "India's oldest national park", link: "https://www.google.com/maps?q=Jim+Corbett+National+Park" },
  { name: "Deosai", lat: 34.9947, lon: 75.4786, img: "images/parks/deosai.avif", info: "Roof of the world, Pakistan", link: "https://www.google.com/maps?q=Deosai+National+Park" },
  { name: "Iguazu", lat: -25.6953, lon: -54.4367, img: "images/parks/iguazu.avif", info: "Famous waterfalls in Brazil", link: "https://www.google.com/maps?q=Iguazu+National+Park" },
  { name: "Zhangjiajie", lat: 29.1176, lon: 110.4786, img: "images/parks/zhangjiaje.avif", info: "Avatar mountains, China", link: "https://www.google.com/maps?q=Zhangjiajie+National+Forest+Park" },
  { name: "Lake Baikal", lat: 53.5932, lon: 108.9946, img: "images/parks/lake baikal.avif", info: "Deepest lake, Russia", link: "https://www.google.com/maps?q=Lake+Baikal+National+Park" },
  { name: "Kruger", lat: -23.9884, lon: 31.5547, img: "images/parks/kruger.avif", info: "Largest South African park", link: "https://www.google.com/maps?q=Kruger+National+Park" },
  { name: "Vanoise", lat: 45.3925, lon: 6.7589, img: "images/parks/vanoise.avif", info: "France's first national park", link: "https://www.google.com/maps?q=Vanoise+National+Park" },
  { name: "Black Forest", lat: 48.5346, lon: 8.2099, img: "images/parks/black forest.avif", info: "Mystical forest in Germany", link: "https://www.google.com/maps?q=Black+Forest+National+Park" },
  { name: "Gran Paradiso", lat: 45.5236, lon: 7.2684, img: "images/parks/gran paradiso.avif", info: "Famous Italian Alps park", link: "https://www.google.com/maps?q=Gran+Paradiso+National+Park" },
  { name: "Fuji-Hakone-Izu", lat: 35.3622, lon: 138.7305, img: "images/parks/fuji.avif", info: "Japan's famous volcano park", link: "https://www.google.com/maps?q=Fuji+Hakone+Izu+National+Park" },
  { name: "Los Glaciares", lat: -50.4695, lon: -73.0232, img: "images/parks/losglaciers.avif", info: "Glacier park in Argentina", link: "https://www.google.com/maps?q=Los+Glaciares+National+Park" },
  { name: "Cumbres de Monterrey", lat: 25.5476, lon: -100.3056, img: "images/parks/cumbres.avif", info: "Famous mountains in Mexico", link: "https://www.google.com/maps?q=Cumbres+de+Monterrey+National+Park" },
  { name: "Ras Mohammed", lat: 27.7257, lon: 34.2522, img: "images/parks/ras mohammed.avif", info: "Marine park in Egypt", link: "https://www.google.com/maps?q=Ras+Mohammed+National+Park" },
  { name: "Asir", lat: 18.2164, lon: 42.4750, img: "images/parks/asir.avif", info: "Saudi Arabia's mountain park", link: "https://www.google.com/maps?q=Asir+National+Park" },
  { name: "Dubai Desert Conservation", lat: 24.7275, lon: 55.6623, img: "images/parks/uae desert sanctuary.avif", info: "UAE's desert sanctuary", link: "https://www.google.com/maps?q=Dubai+Desert+Conservation+Reserve" },
  { name: "Göreme", lat: 38.6530, lon: 34.8355, img: "images/parks/goreme.avif", info: "Rock formations in Turkey", link: "https://www.google.com/maps?q=Goreme+National+Park" }
];

parks.forEach(park => {
    var marker = L.marker([park.lat, park.lon]).addTo(map);
    var tooltipContent = `<img src='${park.img}' class='tooltip-img'><br><b>${park.name}</b><br>${park.info}`;
    marker.bindTooltip(tooltipContent, { permanent: false, direction: "top" });
    marker.on("click", function () { window.open(park.link, "_blank"); });
});

document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".wildlife-card");

  cards.forEach(card => {
      card.addEventListener("click", () => {
          alert("More wildlife details coming soon!");
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".wildlife-card");

  cards.forEach(card => {
      card.addEventListener("mouseenter", () => {
          card.style.boxShadow = "0 15px 30px rgba(0, 255, 127, 0.7)";
      });

      card.addEventListener("mouseleave", () => {
          card.style.boxShadow = "0 8px 20px rgba(0, 255, 127, 0.3)";
      });
  });
});
// JavaScript File

// Reference To Buttons
var btnLeft = document.getElementById('prev_btn');
var btnRight = document.getElementById('next_btn');

// Reference To Slider
var slider = document.querySelector('.container .slider');

btnRight.addEventListener('click', nextSlide);
function nextSlide(){
	slider.appendChild(slider.firstElementChild);
}

btnLeft.addEventListener('click', prevSlide);
function prevSlide(){
	slider.prepend(slider.lastElementChild);
}

// Auto Sliding
function autoSlide(){
	deleteInterval = setInterval(timer, 4000); // 4000 mile sec = 4 sec
	function timer(){
		nextSlide();
	}
}
autoSlide();

// Stop Auto Sliding When Mouse is Over
slider.addEventListener('mouseover', deleteAutoSliding);
btnRight.addEventListener('mouseover', deleteAutoSliding);
btnLeft.addEventListener('mouseover', deleteAutoSliding);

function deleteAutoSliding(){
	clearInterval(deleteInterval);
}

// Resume Auto Sliding When Mouse is Out
slider.addEventListener('mouseout', autoSlide);
btnRight.addEventListener('mouseout', autoSlide);
btnLeft.addEventListener('mouseout', autoSlide);


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchPark");
    const filterCountry = document.getElementById("filterCountry");
    const filterActivity = document.getElementById("filterActivity");
    const parkCards = document.querySelectorAll("#parksList .col-md-4");

    function filterParks() {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCountry = filterCountry.value;
        const selectedActivity = filterActivity.value;

        parkCards.forEach(card => {
            const parkName = card.querySelector("h3").textContent.toLowerCase();
            const country = card.getAttribute("data-country");
            const activity = card.getAttribute("data-activity");

            const matchesSearch = parkName.includes(searchQuery);
            const matchesCountry = selectedCountry === "" || country === selectedCountry;
            const matchesActivity = selectedActivity === "" || activity === selectedActivity;

            if (matchesSearch && matchesCountry && matchesActivity) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("input", filterParks);
    filterCountry.addEventListener("change", filterParks);
    filterActivity.addEventListener("change", filterParks);
});
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn => {
      btn.addEventListener("mouseenter", () => {
          btn.style.transform = "scale(1.1)";
      });

      btn.addEventListener("mouseleave", () => {
          btn.style.transform = "scale(1)";
      });
  });
});
document.querySelectorAll('.sticky-sidebar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const countrySections = document.querySelectorAll(".country-section");
  const countryLinks = document.querySelectorAll(
    ".continents-list li[data-country]"
  );
  const allSection = document.getElementById("all");
  const gridContainer = allSection.querySelector(".grid-container");
  const gridItems = Array.from(gridContainer.children);
  const gridIcon = document.querySelector(
    ".material-symbols-outlined.grid_view"
  );

  // Function to shuffle the grid items
  function shuffleGridItems() {
    for (let i = gridItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gridItems[i], gridItems[j]] = [gridItems[j], gridItems[i]];
    }

    // Append the shuffled items back to the grid container
    gridItems.forEach((item) => gridContainer.appendChild(item));
  }

  // Shuffle the grid items on page load
  shuffleGridItems();

  // Add event listener to the grid icon to shuffle the parks
  gridIcon.addEventListener("click", shuffleGridItems);

  countryLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const country = this.getAttribute("data-country");

      // Hide all sections
      countrySections.forEach((section) => {
        section.style.display = "none";
      });

      // Show the selected country section
      document.getElementById(country).style.display = "block";
    });
  });
});

const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryControls = ["previous", "next"];
const galleryItems = document.querySelectorAll(".gallery-item");

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove("gallery-item-1");
      el.classList.remove("gallery-item-2");
      el.classList.remove("gallery-item-3");
      el.classList.remove("gallery-item-4");
      el.classList.remove("gallery-item-5");
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }
  setCurrentState(direction) {
    if (direction.className == "gallery-controls-previous") {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }
  setControls() {
    this.carouselControls.forEach((control) => {
      galleryControlsContainer.appendChild(
        document.createElement("button")
      ).className = `gallery-controls-${control}`;
      document.querySelector(`.gallery-controls-${control}`).innerText =
        control;
    });
  }
  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}
const exampleCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls
);

exampleCarousel.setControls();
exampleCarousel.useControls();


