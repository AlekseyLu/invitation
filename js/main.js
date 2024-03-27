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
    const photo = document.querySelector(".list-item:last-child");
    if (window.screen.width <= 576) {
      photo.style.display = "none";
    } else {
      photo.style.display = "block";
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

function changeTimezone(date, ianatz) {
  var invdate = new Date(
    date.toLocaleString("en-US", {
      timeZone: ianatz,
    })
  );

  var diff = invdate.getTime() - date.getTime();

  return new Date(date.getTime() - diff);
}

document.addEventListener("DOMContentLoaded", function () {
  // конечная дата
  const x = new Date("2024-07-19T18:00:00");
  // часовой пояс
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  var deadline = changeTimezone(x, "Europe/Ulyanovsk");
  // id таймера
  let timerId = null;
  // склонение числительных
  function declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  }
  // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
  function countdownTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }
    const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    $days.textContent = days < 10 ? "0" + days : days;
    $hours.textContent = hours < 10 ? "0" + hours : hours;
    $minutes.textContent = minutes < 10 ? "0" + minutes : minutes;
    $seconds.textContent = seconds < 10 ? "0" + seconds : seconds;
    $days.dataset.title = declensionNum(days, ["день", "дня", "дней"]);
    $hours.dataset.title = declensionNum(hours, ["час", "часа", "часов"]);
    $minutes.dataset.title = declensionNum(minutes, [
      "минута",
      "минуты",
      "минут",
    ]);
    $seconds.dataset.title = declensionNum(seconds, [
      "секунда",
      "секунды",
      "секунд",
    ]);
  }
  // получаем элементы, содержащие компоненты даты
  const $days = document.querySelector(".timer__days");
  const $hours = document.querySelector(".timer__hours");
  const $minutes = document.querySelector(".timer__minutes");
  const $seconds = document.querySelector(".timer__seconds");
  // вызываем функцию countdownTimer
  countdownTimer();
  // вызываем функцию countdownTimer каждую секунду
  timerId = setInterval(countdownTimer, 1000);
});
