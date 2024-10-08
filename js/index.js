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
