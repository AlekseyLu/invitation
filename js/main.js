ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map(
    "map",
    {
      center: [59.945303, 30.364846],
      zoom: 14,
    },
    {
      searchControlProvider: "yandex#search",
    }
  );
  // Создаем геообъект с типом геометрии "Точка".

  myMap.geoObjects.add(
    new ymaps.Placemark(
      [59.945303, 30.364846],
      {
        balloonContent:
          "<a href='https://yandex.ru/maps/2/saint-petersburg/?ll=30.374434%2C59.942091&mode=whatshere&whatshere%5Bpoint%5D=30.364846%2C59.945303&whatshere%5Bzoom%5D=16&z=13.19'>Открыть Яндекс.Карты</a>",
      },
      {
        preset: "islands#icon",
        iconColor: "#0095b6",
      }
    )
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const up = document.querySelector(".up");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      up.style.display = "block";
    } else {
      up.style.display = "none";
    }
  });

  up.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

const photos = document.querySelectorAll(".list-img");
const preview = document.querySelector(".preview");
const photosBlock = document.querySelector(".list-image");
const photosElem = document.querySelectorAll(".list-item");

const fn = (photo, ind) => {
  document.querySelector("body").style.overflow = "hidden";
  preview.style.display = "flex";

  const img = document.createElement("img");
  const btn = document.createElement("button");

  img.src = `/images/${ind + 1}.jpg`;
  btn.innerText = "X";

  img.classList.add("pre-img");
  btn.classList.add("close");

  preview.append(img);
  preview.append(btn);

  btn.addEventListener("click", () => {
    document.querySelector("body").style.overflow = "scroll";
    preview.style.display = "none";
    preview.innerHTML = "";
  });
};

photos.forEach((photo, ind) =>
  photo.addEventListener("click", () => fn(photo, ind))
);

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("resize", () => {
    if (window.screen.width <= 576) {
      const photo = document.querySelector(".list-item:last-child");
      photo.style.display = "none";
    } else {
      photos.style.display = "block";
    }
  });
});

const renderImg = (flag) => {
  for (let i = 0; i < photosElem.length; i++) {
    if (flag) {
      if (i < 3) {
        photosBlock.append(photosElem[i]);
      }
    } else {
      photosBlock.append(photosElem[i]);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let limit = true;
  if (window.screen.width < 480) {
    photosBlock.innerHTML = "";
    renderImg(limit);
  }

  const more = document.querySelector(".btn-more");
  more.addEventListener("click", () => {
    limit = false;
    more.style.display = "none";
    renderImg(limit);
  });
});

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav__list");

burger.addEventListener("click", () => {
  if (burger.classList.contains("active")) {
    burger.classList.remove("active");
    nav.classList.remove("active");
    document.querySelector("body").style.overflow = "scroll";
  } else {
    burger.classList.add("active");
    nav.classList.add("active");
    document.querySelector("body").style.overflow = "hidden";
  }
});

const navItem = document.querySelectorAll(".nav__item");

navItem.forEach((item) =>
  item.addEventListener("click", () => {
    burger.classList.remove("active");
    nav.classList.remove("active");
    document.querySelector("body").style.overflow = "scroll";
  })
);
