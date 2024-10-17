$(function () {
  $(".intro-top").slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 12000,
    pauseOnFocus: false,
    pauseOnHover: true,
  });

  $(".partners__items").slick({
    dots: false,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnFocus: false,
    pauseOnHover: false,
  });
});

const slides = document.querySelectorAll(".intro-top__slider");

slides.forEach((slide, index) => {
  switch (index) {
    case 0:
      slide.style.backgroundImage = "url('images/content/recom.jpg')";
      break;
    case 1:
      slide.style.backgroundImage = "url('images/content/recom-2.jpg')";
      break;
    case 2:
      slide.style.backgroundImage = "url('images/content/recom-3.jpg')";
      break;
    default:
      slide.style.backgroundColor = "#ccc";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".products__menu-btn"); // Все кнопки с классом .products__menu-btn

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Убираем класс 'active' у всех кнопок
      buttons.forEach((b) => b.classList.remove("active"));

      // Добавляем класс 'active' только к текущей кнопке
      this.classList.add("active");
    });
  });

  // Автоматически сделать первую кнопку активной при загрузке страницы
  buttons[0].classList.add("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".design__menu-btn"); // Все кнопки с классом .design__menu-btn

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Убираем класс 'active' у всех кнопок
      buttons.forEach((b) => b.classList.remove("active"));

      // Добавляем класс 'active' только к текущей кнопке
      this.classList.add("active");
    });
  });

  // Автоматически сделать первую кнопку активной при загрузке страницы
  buttons[0].classList.add("active");
});

// Получаем элементы
const profileButton = document.getElementById("profile-button"); // Кнопка меню
const loginPanel = document.getElementById("login-panel"); // Панель входа
const signupButton = document.getElementById("button-signup"); // Кнопка регистрации в панели входа
const registrationModal = document.getElementById("registration-modal"); // Модальное окно для регистрации
const closeRegistrationModalButton = document.getElementById(
  "close-registration-modal"
); // Кнопка закрытия модального окна

// Крестик для бокового меню
const closePanelButton = document.getElementById("close-panel");

// Инициализация: скрываем панель входа и модальное окно
loginPanel.classList.add("hidden");
registrationModal.classList.add("hidden");

// Обработчик для кнопки меню (выдвигает панель входа)
profileButton.addEventListener("click", function () {
  // Переключаем видимость панели входа
  if (loginPanel.classList.contains("hidden")) {
    loginPanel.classList.remove("hidden");
    loginPanel.classList.add("show");
  } else {
    loginPanel.classList.add("hidden");
    loginPanel.classList.remove("show");
  }
});

// Обработчик для кнопки закрытия бокового меню
closePanelButton.addEventListener("click", function () {
  loginPanel.classList.add("hidden"); // Скрываем боковое меню
  loginPanel.classList.remove("show"); // Убираем класс show
});

// Обработчик для кнопки регистрации, открывающей модальное окно
signupButton.addEventListener("click", function () {
  registrationModal.classList.remove("hidden"); // Показываем модальное окно
  loginPanel.classList.add("hidden"); // Прячем панель входа, если она открыта
});

// Обработчик для кнопки "Закрыть" модального окна регистрации
closeRegistrationModalButton.addEventListener("click", function () {
  registrationModal.classList.add("hidden"); // Скрываем модальное окно
  loginPanel.classList.remove("hidden"); // Показываем панель входа
});
// Функция для проверки правильности ввода электронной почты
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

// Функция для проверки правильности пароля (минимум 6 символов)
function validatePassword(password) {
  return password.length >= 6;
}

// Функция для очистки сообщений об ошибке
function clearErrorMessages() {
  document.getElementById("error-message").textContent = "";
  document.getElementById("error-message-registration").textContent = "";
}

// Логика проверки формы входа
document
  .getElementById("button-login")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Получаем значения из полей ввода
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Очистка сообщений об ошибке
    clearErrorMessages();

    // Проверка на правильность ввода
    if (!validateEmail(email)) {
      document.getElementById("error-message").textContent =
        "Неверный формат электронной почты.";
      return;
    }

    if (!validatePassword(password)) {
      document.getElementById("error-message").textContent =
        "Пароль должен содержать минимум 6 символов.";
      return;
    }

    // Если все в порядке, логика для отправки данных на сервер (например, API)
    // Пример:
    // loginUser(email, password);
    console.log("Логин успешен");
  });

// Логика проверки формы регистрации
document
  .getElementById("button-submit-registration")
  .addEventListener("click", function (event) {
    event.preventDefault();

    // Получаем значения из полей ввода
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email-registration").value.trim();
    const password = document
      .getElementById("password-registration")
      .value.trim();

    // Очистка сообщений об ошибке
    clearErrorMessages();

    // Проверка на правильность ввода
    if (name.length === 0) {
      document.getElementById("error-message-registration").textContent =
        "Имя не может быть пустым.";
      return;
    }

    if (!validateEmail(email)) {
      document.getElementById("error-message-registration").textContent =
        "Неверный формат электронной почты.";
      return;
    }

    if (!validatePassword(password)) {
      document.getElementById("error-message-registration").textContent =
        "Пароль должен содержать минимум 6 символов.";
      return;
    }

    // Если все в порядке, логика для отправки данных на сервер (например, API)
    // Пример:
    // registerUser(name, email, password);
    console.log("Регистрация успешна");
  });

let likeCount = 0; // Количество лайкнутых товаров
let likedProducts = {}; // Объект для хранения лайкнутых товаров

// Функция для добавления/удаления товара из лайкнутых
function toggleLikeProduct(buttonElement) {
  const productId = buttonElement.getAttribute("data-product-id");
  const productName = buttonElement
    .closest(".products__card")
    .querySelector(".products__card-title").textContent;
  const heartIcon = buttonElement.querySelector(".heart-icon");

  // Если товар уже лайкнут, удаляем его из списка
  if (likedProducts[productId]) {
    delete likedProducts[productId]; // Удаляем из объекта
    heartIcon.classList.remove("liked"); // Убираем красный цвет с иконки
    likeCount--; // Уменьшаем счетчик лайков
    updateLikedItemsList(); // Обновляем список лайкнутых товаров
  } else {
    likedProducts[productId] = productName; // Добавляем товар в объект
    heartIcon.classList.add("liked"); // Делаем иконку красной
    likeCount++; // Увеличиваем счетчик лайков
    updateLikedItemsList(); // Обновляем список лайкнутых товаров
  }

  // Обновляем отображение количества лайков на иконке
  document.getElementById("likeCount").textContent = likeCount;
}

// Функция для обновления списка лайкнутых товаров в модальном окне
function updateLikedItemsList() {
  const list = document.getElementById("likedItemsList");
  list.innerHTML = ""; // Очищаем текущий список

  // Добавляем каждый лайкнутый товар в список
  for (const [productId, productName] of Object.entries(likedProducts)) {
    const listItem = document.createElement("li");
    listItem.textContent = productName;
    list.appendChild(listItem);
  }
}

// Открытие модального окна
document
  .getElementById("likeButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Отменяем стандартное действие ссылки
    const modal = document.getElementById("likeModal");
    modal.style.display = "block"; // Показываем модальное окно
  });

// Закрытие модального окна
document.getElementById("closeModal").addEventListener("click", function () {
  const modal = document.getElementById("likeModal");
  modal.style.display = "none"; // Скрываем модальное окно
});

// Закрытие модального окна при клике вне его
window.addEventListener("click", function (event) {
  const modal = document.getElementById("likeModal");
  if (event.target === modal) {
    modal.style.display = "none"; // Скрываем модальное окно
  }
});

let basket = {}; // Объект для хранения товаров в корзине
let basketTotal = 0; // Общая стоимость товаров в корзине

// Функция для добавления/удаления товара в корзину
function toggleBasketProduct(buttonElement) {
  const productId = buttonElement.getAttribute("data-product-id");
  const productName = buttonElement.getAttribute("data-product-name");
  const productPrice = parseFloat(
    buttonElement.getAttribute("data-product-price")
  );
  const basketIcon = buttonElement.querySelector("svg"); // Иконка корзины в кнопке
  const productTotalElement = document.getElementById("basketTotal");
  const basketItemCount = document.getElementById("basketCount");

  if (basket[productId]) {
    // Если товар уже в корзине, удаляем его
    basketTotal -= basket[productId].price;
    delete basket[productId]; // Удаляем товар из корзины
    buttonElement.classList.remove("basket-added"); // Убираем зеленый цвет
    buttonElement.classList.add("basket-removed"); // Возвращаем стандартный цвет
  } else {
    // Если товар не в корзине, добавляем его
    basket[productId] = {
      name: productName,
      price: productPrice,
    };
    basketTotal += productPrice; // Добавляем цену товара к общей стоимости
    buttonElement.classList.remove("basket-removed"); // Убираем стандартный цвет
    buttonElement.classList.add("basket-added"); // Добавляем зеленый цвет иконке
  }

  // Обновляем отображение количества товаров в корзине
  basketItemCount.textContent = Object.keys(basket).length;

  // Обновляем общую стоимость в модальном окне корзины
  productTotalElement.textContent = basketTotal.toFixed(2);

  updateBasketList(); // Обновляем список товаров в корзине
}

// Функция обновления списка товаров в корзине
function updateBasketList() {
  const basketItemsList = document.getElementById("basketItemsList");
  basketItemsList.innerHTML = ""; // Очищаем список перед рендером

  // Добавляем каждый товар в корзину
  for (const productId in basket) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${basket[productId].name} - $${basket[productId].price.toFixed(
      2
    )}</span>
      <button class="remove-btn" onclick="removeFromBasket('${productId}')">Удалить</button>
    `;
    basketItemsList.appendChild(listItem);
  }
}

// Функция для удаления товара из корзины
function removeFromBasket(productId) {
  const productPrice = basket[productId].price;
  const basketItemCount = document.getElementById("basketCount");
  const productTotalElement = document.getElementById("basketTotal");

  // Убираем товар из корзины
  basketTotal -= productPrice;
  delete basket[productId];

  // Обновляем отображение количества товаров и общей стоимости
  basketItemCount.textContent = Object.keys(basket).length;
  productTotalElement.textContent = basketTotal.toFixed(2);

  // Обновляем список товаров в корзине
  updateBasketList();

  // Возвращаем иконку корзины в исходное состояние
  const productButton = document.querySelector(
    `[data-product-id="${productId}"]`
  );
  if (productButton) {
    productButton.classList.remove("basket-added"); // Убираем зеленый цвет
    productButton.classList.add("basket-removed"); // Возвращаем стандартный цвет
  }
}

// Открытие модального окна корзины
document
  .getElementById("basketButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Отменяем стандартное действие ссылки
    const modal = document.getElementById("basketModal");
    modal.style.display = "block"; // Показываем модальное окно
  });

// Закрытие модального окна корзины
document
  .getElementById("closeBasketModal")
  .addEventListener("click", function () {
    const modal = document.getElementById("basketModal");
    modal.style.display = "none"; // Скрываем модальное окно
  });

// Закрытие модального окна при клике вне его
window.addEventListener("click", function (event) {
  const modal = document.getElementById("basketModal");
  if (event.target === modal) {
    modal.style.display = "none"; // Скрываем модальное окно
  }
});

// Функция очистки корзины
document
  .getElementById("clearBasketButton")
  .addEventListener("click", function () {
    basket = {}; // Очистить корзину
    basketTotal = 0; // Сбросить общую стоимость
    document.getElementById("basketCount").textContent = "0"; // Обновить количество товаров
    document.getElementById("basketTotal").textContent = "0.00"; // Обновить общую стоимость
    updateBasketList(); // Обновить список товаров

    // Сбросить все иконки корзин на странице товаров
    const basketButtons = document.querySelectorAll(".products__card-bkn");
    basketButtons.forEach((button) => {
      button.classList.remove("basket-added"); // Убираем зеленый цвет у всех иконок
      button.classList.add("basket-removed"); // Возвращаем стандартный цвет у всех иконок
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target); // Прекращаем наблюдение после появления
        }
      });
    });
  
    elements.forEach(el => {
      observer.observe(el);
    });
  });
  