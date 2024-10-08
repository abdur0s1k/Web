$(function () {
    $('.intro-top').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 12000,
        pauseOnFocus: false,
        pauseOnHover: true,
    });

    $('.partners__items').slick({
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

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.products__menu-btn');  // Все кнопки с классом .products__menu-btn

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Убираем класс 'active' у всех кнопок
      buttons.forEach(b => b.classList.remove('active'));

      // Добавляем класс 'active' только к текущей кнопке
      this.classList.add('active');
    });
  });

  // Автоматически сделать первую кнопку активной при загрузке страницы
  buttons[0].classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.design__menu-btn');  // Все кнопки с классом .design__menu-btn

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Убираем класс 'active' у всех кнопок
      buttons.forEach(b => b.classList.remove('active'));

      // Добавляем класс 'active' только к текущей кнопке
      this.classList.add('active');
    });
  });

  // Автоматически сделать первую кнопку активной при загрузке страницы
  buttons[0].classList.add('active');
});

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

let likeCount = 0; // Количество лайкнутых товаров
let likedProducts = {}; // Объект для хранения лайкнутых товаров

// Функция для добавления/удаления товара из лайкнутых
function toggleLikeProduct(productId, productName, buttonElement) {
  const heartIcon = buttonElement.querySelector('.heart-icon');

  // Если товар уже лайкнут, удаляем его из списка
  if (likedProducts[productId]) {
    delete likedProducts[productId]; // Удаляем из объекта
    heartIcon.classList.remove('liked'); // Убираем красный цвет с иконки
    likeCount--; // Уменьшаем счетчик лайков
    updateLikedItemsList(); // Обновляем список лайкнутых товаров
  } else {
    likedProducts[productId] = productName; // Добавляем товар в объект
    heartIcon.classList.add('liked'); // Делаем иконку красной
    likeCount++; // Увеличиваем счетчик лайков
    updateLikedItemsList(); // Обновляем список лайкнутых товаров
  }

  // Обновляем отображение количества лайков на иконке
  document.getElementById('likeCount').textContent = likeCount;
}

// Функция для обновления списка лайкнутых товаров в модальном окне
function updateLikedItemsList() {
  const list = document.getElementById('likedItemsList');
  list.innerHTML = ''; // Очищаем текущий список

  // Добавляем каждый лайкнутый товар в список
  for (const [productId, productName] of Object.entries(likedProducts)) {
    const listItem = document.createElement('li');
    listItem.textContent = productName;
    list.appendChild(listItem);
  }
}

// Открытие модального окна
document.getElementById('likeButton').addEventListener('click', function (event) {
  event.preventDefault(); // Отменяем стандартное действие ссылки
  const modal = document.getElementById('likeModal');
  modal.style.display = 'block'; // Показываем модальное окно
});

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', function () {
  const modal = document.getElementById('likeModal');
  modal.style.display = 'none'; // Скрываем модальное окно
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function (event) {
  const modal = document.getElementById('likeModal');
  if (event.target === modal) {
    modal.style.display = 'none'; // Скрываем модальное окно
  }
});

let basket = {}; // Объект для хранения товаров в корзине
let basketTotal = 0; // Общая стоимость товаров в корзине

// Функция для добавления/удаления товара в корзину
function toggleBasketProduct(productId, productName, productPrice, buttonElement) {
  const basketIcon = buttonElement.querySelector('svg'); // Иконка корзины в кнопке
  const productTotalElement = document.getElementById('basketTotal');
  const basketItemCount = document.getElementById('basketCount');

  if (basket[productId]) {
    // Если товар уже в корзине, удаляем его
    basketTotal -= basket[productId].price;
    delete basket[productId]; // Удаляем товар из корзины
    buttonElement.classList.remove('basket-added'); // Убираем зеленый цвет
    buttonElement.classList.add('basket-removed'); // Возвращаем стандартный цвет
  } else {
    // Если товар не в корзине, добавляем его
    basket[productId] = {
      name: productName,
      price: productPrice
    };
    basketTotal += productPrice; // Добавляем цену товара к общей стоимости
    buttonElement.classList.remove('basket-removed'); // Убираем стандартный цвет
    buttonElement.classList.add('basket-added'); // Добавляем зеленый цвет иконке
  }

  // Обновляем отображение количества товаров в корзине
  basketItemCount.textContent = Object.keys(basket).length;

  // Обновляем общую стоимость в модальном окне корзины
  productTotalElement.textContent = basketTotal.toFixed(2);

  updateBasketList(); // Обновляем список товаров в корзине
}

// Функция обновления списка товаров в корзине
function updateBasketList() {
  const basketItemsList = document.getElementById('basketItemsList');
  basketItemsList.innerHTML = ''; // Очищаем список перед рендером

  // Добавляем каждый товар в корзину
  for (const productId in basket) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${basket[productId].name} - $${basket[productId].price.toFixed(2)}</span>
      <button class="remove-btn" onclick="removeFromBasket('${productId}')">Удалить</button>
    `;
    basketItemsList.appendChild(listItem);
  }
}

// Функция для удаления товара из корзины
function removeFromBasket(productId) {
  const productPrice = basket[productId].price;
  const basketItemCount = document.getElementById('basketCount');
  const productTotalElement = document.getElementById('basketTotal');

  // Убираем товар из корзины
  basketTotal -= productPrice;
  delete basket[productId];

  // Обновляем отображение количества товаров и общей стоимости
  basketItemCount.textContent = Object.keys(basket).length;
  productTotalElement.textContent = basketTotal.toFixed(2);

  // Обновляем список товаров в корзине
  updateBasketList();

  // Возвращаем иконку корзины в исходное состояние
  const productButton = document.querySelector(`[data-product-id="${productId}"]`);
  if (productButton) {
    productButton.classList.remove('basket-added'); // Убираем зеленый цвет
    productButton.classList.add('basket-removed'); // Возвращаем стандартный цвет
  }
}

// Открытие модального окна корзины
document.getElementById('basketButton').addEventListener('click', function (event) {
  event.preventDefault(); // Отменяем стандартное действие ссылки
  const modal = document.getElementById('basketModal');
  modal.style.display = 'block'; // Показываем модальное окно
});

// Закрытие модального окна корзины
document.getElementById('closeBasketModal').addEventListener('click', function () {
  const modal = document.getElementById('basketModal');
  modal.style.display = 'none'; // Скрываем модальное окно
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function (event) {
  const modal = document.getElementById('basketModal');
  if (event.target === modal) {
    modal.style.display = 'none'; // Скрываем модальное окно
  }
});

// Функция очистки корзины
document.getElementById('clearBasketButton').addEventListener('click', function () {
  basket = {}; // Очистить корзину
  basketTotal = 0; // Сбросить общую стоимость
  document.getElementById('basketCount').textContent = '0'; // Обновить количество товаров
  document.getElementById('basketTotal').textContent = '0.00'; // Обновить общую стоимость
  updateBasketList(); // Обновить список товаров

  // Сбросить все иконки корзин на странице товаров
  const basketButtons = document.querySelectorAll('.products__card-bkn');
  basketButtons.forEach(button => {
    button.classList.remove('basket-added'); // Убираем зеленый цвет у всех иконок
    button.classList.add('basket-removed'); // Возвращаем стандартный цвет у всех иконок
  });
});
