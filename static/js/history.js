    // Элементы управления
  const profileButton = document.getElementById("profile-button");
  const loginPanel = document.getElementById("login-panel");
  const closePanelButton = document.getElementById("close-panel");
  const signupButton = document.getElementById("button-signup");
  const registrationModal = document.getElementById("registration-modal");
  const closeRegistrationModalButton = document.getElementById("close-registration-modal");
  const profilePanel = document.getElementById("profile-panel");
  const closeProfilePanelButton = document.getElementById("close-profile-panel");
  const logoutButton = document.getElementById("logout-button");
  
  const rememberMeCheckbox = document.getElementById("rememberMe");
  const errorMessageLogin = document.getElementById("error-message");
  const errorMessageRegistration = document.getElementById("error-message-registration");
  const successMessage = document.getElementById("success-message");
  
  // Функция для показа панели
  function showPanel(panel) {
    if (panel) {
      panel.classList.add("show");
      panel.classList.remove("hidden");
    }
  }
  
  // Функция для скрытия панели
  function hidePanel(panel) {
    if (panel) {
      panel.classList.remove("show");
      panel.classList.add("hidden");
    }
  }
  
  // Функция для переключения панели
  function togglePanel(panel) {
    if (panel) {
      if (panel.classList.contains("hidden")) {
        showPanel(panel);
      } else {
        hidePanel(panel);
      }
    }
  }
  
  // Обновление данных пользователя на странице
  function updateUserProfile(userData) {
    document.getElementById("user-name").textContent = userData.name;
    document.getElementById("user-email").textContent = userData.email;
  }
  
  // Проверка состояния "Запомнить меня" при загрузке страницы
  document.addEventListener("DOMContentLoaded", function () {
    hidePanel(loginPanel);
    hidePanel(profilePanel);
  });
  
  // Открытие меню по кнопке "Профиль"
  profileButton?.addEventListener("click", function (event) {
    event.stopPropagation();
    
  
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (localStorage.getItem("rememberMe") === "true" && userData) {
      updateUserProfile(userData);
      togglePanel(profilePanel);
    } else {
      togglePanel(loginPanel);
    }
  });
  
  // Закрытие по "крестику"
  closePanelButton?.addEventListener("click", function () {
    hidePanel(loginPanel);
  });
  
  // Открытие модального окна регистрации
  signupButton?.addEventListener("click", function () {
    showPanel(registrationModal);
    hidePanel(loginPanel);
  });
  
  // Закрытие модального окна регистрации по "крестику"
  closeRegistrationModalButton?.addEventListener("click", function () {
    hidePanel(registrationModal);
    showPanel(loginPanel);
  });
  
  // Закрытие панели профиля
  closeProfilePanelButton?.addEventListener("click", function () {
    hidePanel(profilePanel);
  });
  
  // Логика успешного входа
  document.getElementById("button-login")?.addEventListener("click", async function (event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    clearErrorMessages();
  
    if (!validateEmail(email)) {
      errorMessageLogin.textContent = "Неверный формат электронной почты.";
      return;
    }
  
    if (!validatePassword(password)) {
      errorMessageLogin.textContent = "Пароль должен содержать минимум 6 символов.";
      return;
    }
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Ошибка сервера");
      }
  
      const result = await response.json();
      updateUserProfile(result.user);
  
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("userData", JSON.stringify(result.user));
        location.reload(); // Обновляем всю страницу только если пользователь хочет быть запомненным
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("userData");
        showPanel(profilePanel); // Показываем панель профиля без перезагрузки страницы
      }
    } catch (error) {
      errorMessageLogin.textContent = error.message;
    }
  });
  
  // Логика успешной регистрации
  document.getElementById("button-submit-registration")?.addEventListener("click", async function (event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email-registration").value.trim();
    const password = document.getElementById("password-registration").value.trim();
  
    clearErrorMessages();
  
    if (!name) {
      errorMessageRegistration.textContent = "Имя не может быть пустым.";
      return;
    }
  
    if (!validateEmail(email)) {
      errorMessageRegistration.textContent = "Неверный формат электронной почты.";
      return;
    }
  
    if (!validatePassword(password)) {
      errorMessageRegistration.textContent = "Пароль должен содержать минимум 6 символов.";
      return;
    }
  
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
  
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Ошибка сервера");
      }
  
      const result = await response.json();
  
      const newUser = { name, email };
      updateUserProfile(newUser);
  
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("userData", JSON.stringify(newUser));
      }
  
      location.reload(); // Обновляем всю страницу после успешной регистрации
    } catch (error) {
      errorMessageRegistration.textContent = error.message;
    }
  });
  
  // Логика выхода
  logoutButton?.addEventListener("click", async function () {
    try {
      const response = await fetch('/logout', { method: 'POST' });
  
      if (!response.ok) {
        throw new Error("Ошибка выхода");
      }
  
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("userData");
  
      location.reload(); // Обновляем всю страницу после выхода
    } catch (error) {
      console.error("Ошибка выхода:", error.message);
    }
  });
  
  // Вспомогательные функции
  function clearErrorMessages() {
    errorMessageLogin.textContent = "";
    errorMessageRegistration.textContent = "";
  }
  
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 6;
  }
  
  function showSuccessMessage(message) {
    successMessage.textContent = message;
    successMessage.classList.add("show");
  
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 3000);
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const profilePhoto = document.getElementById("profile-photo");
    const profilePhotoInput = document.getElementById("profile-photo-input");
  
    // Загрузка данных профиля
    try {
      const response = await fetch("/get_users"); // Запрос к серверу для получения данных текущего пользователя
      if (!response.ok) throw new Error("Ошибка загрузки профиля");
  
      const currentUser = await response.json();
  
      if (currentUser.error) {
        throw new Error(currentUser.error);
      }
  
      // Обновляем данные профиля
      document.getElementById("user-name").textContent = currentUser.name;
      document.getElementById("user-email").textContent = currentUser.email;
      profilePhoto.src = currentUser.profile_photo || "/static/icon_users/default.png";
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error.message);
    }
  
    // Открытие диалога выбора файла
    profilePhoto.addEventListener("click", () => {
      profilePhotoInput.click();
    });
  
    // Отправка фото на сервер
    profilePhotoInput.addEventListener("change", async () => {
      const file = profilePhotoInput.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("profile_photo", file);
  
        try {
          const response = await fetch("/update_profile_photo", {
            method: "POST",
            body: formData,
          });
  
          if (!response.ok) throw new Error("Ошибка загрузки фото");
  
          const result = await response.json();
          profilePhoto.src = result.new_photo_url;
        } catch (error) {
          console.error("Ошибка загрузки фото:", error.message);
          alert("Не удалось обновить фото.");
        }
      }
    });
  });
  
  
  let likeCount = 0; // Количество лайкнутых товаров
  let likedProducts = {}; // Объект для хранения лайкнутых товаров
  
  // Загрузка лайков из базы данных при загрузке страницы
  document.addEventListener("DOMContentLoaded", async function () {
    try {
      const response = await fetch('/get_likes');
      if (!response.ok) {
        throw new Error("Ошибка сервера при получении лайков");
      }
      const result = await response.json();
  
      if (result.liked_products) {
        likedProducts = {};
        result.liked_products.forEach(product => {
          likedProducts[product.product_id] = product.product_name;
        });
  
        likeCount = Object.keys(likedProducts).length;
        document.getElementById("likeCount").textContent = likeCount;
        updateLikedItemsList();
        markLikedProducts(); // Устанавливаем состояние кнопок для лайкнутых товаров
      }
    } catch (error) {
      console.error("Ошибка загрузки лайков с сервера:", error);
    }
  });
  
  // Удаление лайка
  async function removeLike(productId) {
    try {
      // Удаляем товар из объекта likedProducts
      delete likedProducts[productId];
      likeCount--;
      document.getElementById("likeCount").textContent = likeCount;
      updateLikedItemsList(); // Обновляем список лайков
  
      // Сбрасываем состояние кнопки лайка на странице
      const likeButton = document.querySelector(`.products__card-btn[data-product-id="${productId}"]`);
      if (likeButton) {
        const heartIcon = likeButton.querySelector(".heart-icon");
        heartIcon.classList.remove("liked"); // Убираем выделение иконки
      }
  
      // Отправляем запрос на сервер для удаления лайка
      const response = await fetch('/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
      });
  
      if (!response.ok) {
        throw new Error("Ошибка при удалении лайка на сервере");
      }
    } catch (error) {
      console.error("Ошибка при удалении лайка:", error);
    }
  }
  
  // Установка состояния кнопок лайков
  function markLikedProducts() {
    Object.keys(likedProducts).forEach(productId => {
      const likeButton = document.querySelector(`.products__card-btn[data-product-id="${productId}"]`);
      if (likeButton) {
        const heartIcon = likeButton.querySelector(".heart-icon");
        heartIcon.classList.add("liked"); // Добавляем класс для выделения
      }
    });
  }
  
  
  // Функция для добавления/удаления товара из лайкнутых
  async function toggleLikeProduct(buttonElement) {
    const productId = buttonElement.getAttribute("data-product-id");
    let productName;
    const heartIcon = buttonElement.querySelector(".heart-icon");
  
    try {
      // Получаем название товара только при добавлении, чтобы избежать ошибок
      if (!likedProducts[productId]) {
        productName = buttonElement
          .closest(".products__card")
          .querySelector(".products__card-title").textContent;
      }
  
      if (likedProducts[productId]) {
        // Удаление лайка
        delete likedProducts[productId]; // Удаляем из объекта
        if (heartIcon) heartIcon.classList.remove("liked"); // Убираем красный цвет с иконки
        likeCount--; // Уменьшаем счетчик лайков
        updateLikedItemsList(); // Обновляем список лайкнутых товаров
  
        // Отправка запроса на сервер для удаления лайка
        const response = await fetch('/like', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: productId })
        });
  
        if (!response.ok) {
          throw new Error("Ошибка при удалении лайка на сервере");
        }
      } else {
        // Добавление лайка
        likedProducts[productId] = productName; // Добавляем товар в объект
        if (heartIcon) heartIcon.classList.add("liked"); // Делаем иконку красной
        likeCount++; // Увеличиваем счетчик лайков
        updateLikedItemsList(); // Обновляем список лайкнутых товаров
  
        // Отправка запроса на сервер для добавления лайка
        const response = await fetch('/like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: productId, product_name: productName })
        });
  
        if (!response.ok) {
          throw new Error("Ошибка при добавлении лайка на сервере");
        }
  
        showNotification(`Товар "${productName}" добавлен в избранное`);
      }
  
      document.getElementById("likeCount").textContent = likeCount;
      localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    } catch (error) {
      console.error("Ошибка обработки лайка:", error);
    }
  }
  
  
  // Обновление списка лайкнутых товаров
  function updateLikedItemsList() {
    const list = document.getElementById("likedItemsList");
    list.innerHTML = ""; // Очищаем текущий список
  
    // Проверяем, есть ли лайкнутые товары
    if (Object.keys(likedProducts).length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.textContent = "Нет лайкнутых товаров.";
      emptyMessage.style.textAlign = "center";
      emptyMessage.style.color = "#888";
      list.appendChild(emptyMessage);
      return;
    }
  
    // Добавляем каждый лайкнутый товар в список
    for (const [productId, productName] of Object.entries(likedProducts)) {
      const listItem = document.createElement("li");
      listItem.classList.add("liked-item");
  
      // Создаём элемент с названием товара
      const productLink = document.createElement("a");
      productLink.href = `/product/${productId.replace("product-", "")}`; // Ссылка на страницу товара
      productLink.textContent = productName;
      productLink.style.textDecoration = "none";
      productLink.style.color = "#000";
      productLink.style.flexGrow = "1";
  
      // Добавляем обработчик для перехода на страницу товара
      productLink.addEventListener("click", (event) => {
        event.preventDefault(); // Предотвращаем стандартное действие
        window.location.href = productLink.href; // Переход по ссылке
      });
  
      // Кнопка удаления (крестик)
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-btn");
      removeButton.innerHTML = "&times;";
  
      // Обработчик удаления товара из списка
      removeButton.addEventListener("click", async (event) => {
        event.stopPropagation(); // Останавливаем всплытие события, чтобы клик не активировал переход
        try {
          // Удаляем товар из объекта likedProducts
          delete likedProducts[productId];
          likeCount--;
          document.getElementById("likeCount").textContent = likeCount;
          updateLikedItemsList(); // Обновляем список лайков
  
          // Сбрасываем состояние кнопки лайка на странице
          const likeButton = document.querySelector(`.products__card-btn[data-product-id="${productId}"]`);
          if (likeButton) {
            const heartIcon = likeButton.querySelector(".heart-icon");
            heartIcon.classList.remove("liked"); // Убираем выделение иконки
          }
  
          // Отправляем запрос на сервер для удаления лайка
          const response = await fetch('/like', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId }),
          });
  
          if (!response.ok) {
            throw new Error("Ошибка при удалении лайка на сервере");
          }
        } catch (error) {
          console.error("Ошибка удаления товара:", error);
        }
      });
  
      // Добавляем элементы в список
      listItem.appendChild(productLink);
      listItem.appendChild(removeButton);
  
      list.appendChild(listItem);
    }
  }
  
  
  
  
  
  function markLikedProducts() {
    Object.keys(likedProducts).forEach(productId => {
      const buttonElement = document.querySelector(`.products__card-btn[data-product-id="${productId}"]`);
      if (buttonElement) {
        const heartIcon = buttonElement.querySelector(".heart-icon");
        heartIcon.classList.add("liked"); // Добавляем класс для подсветки лайков
      }
    });
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
  
  async function removeLike(productId) {
    try {
      // Удаляем товар из объекта likedProducts
      delete likedProducts[productId];
      likeCount--;
      document.getElementById("likeCount").textContent = likeCount;
      updateLikedItemsList(); // Обновляем список лайков
  
      // Сбрасываем состояние кнопки лайка на странице
      const likeButton = document.querySelector(`.products__card-btn[data-product-id="${productId}"]`);
      if (likeButton) {
        const heartIcon = likeButton.querySelector(".heart-icon");
        heartIcon.classList.remove("liked"); // Убираем выделение иконки
      }
  
      // Отправляем запрос на сервер для удаления лайка
      const response = await fetch('/like', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
      });
  
      if (!response.ok) {
        throw new Error("Ошибка при удалении лайка на сервере");
      }
    } catch (error) {
      console.error("Ошибка при удалении лайка:", error);
    }
  }
  
  // Установка состояния кнопок лайков
  function markLikedProducts() {
    Object.keys(likedProducts).forEach(productId => {
      const likeButton = document.querySelector(`.products__card-btn[data-product-id="${productId}"]`);
      if (likeButton) {
        const heartIcon = likeButton.querySelector(".heart-icon");
        heartIcon.classList.add("liked"); // Добавляем класс для выделения
      }
    });
  }
  
  let basket = {}; // Объект для хранения товаров в корзине
  let basketTotal = 0; // Общая стоимость товаров в корзине
  let isAuthenticated = false; // Переменная для проверки авторизации
  
  // Загрузка корзины с сервера при загрузке страницы
  document.addEventListener("DOMContentLoaded", async function () {
    try {
      const response = await fetch('/get_basket');
      if (!response.ok) {
        throw new Error("Ошибка сервера при получении корзины");
      }
      const result = await response.json();
  
      if (result.is_authenticated) {
        basket = result.basket;
        basketTotal = result.basketTotal;
  
        document.getElementById("basketCount").textContent = Object.keys(basket).length;
        document.getElementById("basketTotal").textContent = basketTotal.toFixed(2);
  
        updateBasketList();
        markBasketButtons();
      } else {
        console.log("Пользователь не авторизован");
      }
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    }
  });
  
  
  // Функция для добавления или удаления товара в корзине
  async function toggleBasketProduct(buttonElement) {
    const productId = buttonElement.getAttribute("data-product-id");
    const productName = buttonElement.getAttribute("data-product-name");
    const productPrice = parseFloat(buttonElement.getAttribute("data-product-price"));
    const productImage = buttonElement.getAttribute("data-product-image");  // Получаем URL изображения
    const productTotalElement = document.getElementById("basketTotal");
    const basketItemCount = document.getElementById("basketCount");
  
    // Проверяем, существует ли товар в корзине
    if (basket[productId]) {
      // Удаление товара из корзины
      basketTotal -= basket[productId].totalPrice;
      delete basket[productId]; // Удаляем товар из локального объекта корзины
  
      buttonElement.classList.remove("basket-added");
      buttonElement.classList.add("basket-removed");
  
      // Отправка запроса на сервер для удаления товара
      await fetch('/basket', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId }),
      });
    } else {
      // Добавление товара в корзину с количеством
      const quantity = 1;  // Начальное количество товара (можно заменить на динамическое)
      const totalPrice = productPrice * quantity;
  
      basket[productId] = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity,  // Сохраняем количество товара
        totalPrice: totalPrice
      };
  
      basketTotal += totalPrice; // Обновляем общую сумму корзины
  
      buttonElement.classList.remove("basket-removed");
      buttonElement.classList.add("basket-added");
  
      // Отправка запроса на сервер для добавления товара с изображением и количеством
      await fetch('/basket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          product_name: productName,
          product_price: productPrice,
          image_url: productImage,
          quantity: quantity,
          total_price: totalPrice
        }),
      });
  
      // Показать уведомление
      showNotification(`Товар "${productName}" добавлен в корзину`);
    }
  
    // Обновляем интерфейс
    basketItemCount.textContent = Object.keys(basket).length;
    productTotalElement.textContent = basketTotal.toFixed(2);
    updateBasketList();
    markBasketButtons(); // Обновляем состояние кнопок
  }
  
  function updateBasketList() {
    const basketItemsList = document.getElementById("basketItemsList");
    basketItemsList.innerHTML = ""; // Очищаем список перед рендером
  
    let basketTotal = 0; // Переменная для общей стоимости корзины
  
    for (const productId in basket) {
      const listItem = document.createElement("li");
      listItem.classList.add("basket-item");
  
      // Получаем ID товара без префикса "product-"
      const numericId = productId.replace("product-", "");
  
      // Пересчитываем стоимость товара в зависимости от его количества
      const productTotalPrice = basket[productId].price * basket[productId].quantity;
  
      // Создаём элемент списка с данными товара
      listItem.innerHTML = `
        <div class="basket-item-content">
          <img src="${basket[productId].image}" alt="${basket[productId].name}" class="basket-item-image" />
          <div class="basket-item-details">
            <span>${basket[productId].name} - $${basket[productId].price.toFixed(2)}</span>
            <div class="basket-item-quantity">
              <button class="quantity-btn" data-action="decrease" data-product-id="${productId}" onclick="updateProductQuantity('${productId}', 'decrease')">-</button>
              <input type="number" id="quantity-${productId}" value="${basket[productId].quantity || 1}" min="1"  class="quantity-input" data-product-id="${productId}" readonly>
              <button class="quantity-btn" data-action="increase" data-product-id="${productId}" onclick="updateProductQuantity('${productId}', 'increase')">+</button>
            </div>
            <span id="price-${productId}">Общее: $${productTotalPrice.toFixed(2)}</span> <!-- Отображение обновленной стоимости -->
            <button class="remove-btn" onclick="removeFromBasket('${productId}')">Удалить</button>
          </div>
        </div>
      `;
  
      // Добавляем атрибут `data-href` для перехода на страницу товара
      listItem.setAttribute("data-href", `/product/${numericId}`);
      // Добавляем обработчик клика для перехода
      listItem.addEventListener("click", (event) => {
        if (!event.target.classList.contains("remove-btn") && !event.target.classList.contains("quantity-btn")) {
          window.location.href = listItem.getAttribute("data-href");
        }
      });
  
      basketItemsList.appendChild(listItem);
  
      // Подсчитываем общую стоимость корзины
      basketTotal += productTotalPrice;
    }
  
    // Обновляем общую стоимость корзины
    const basketTotalElement = document.getElementById("basketTotal");
    basketTotalElement.textContent = basketTotal.toFixed(2);
  }
  
  
  
  
  
  
  async function updateProductQuantity(productId, action) {
    const quantityInput = document.querySelector(`#quantity-${productId}`);
    let quantity = parseInt(quantityInput.value, 10);
  
    // Изменяем количество в зависимости от действия
    if (action === 'increase') {
      quantity++;
    } else if (action === 'decrease' && quantity > 1) {
      quantity--;
    }
  
    // Обновляем значение на клиенте
    quantityInput.value = quantity;
  
    // Обновляем локальную корзину (basket) на клиенте
    if (basket[productId]) {
      basket[productId].quantity = quantity;
    }
  
    // Пересчитываем общую стоимость товара
    const productTotalPrice = basket[productId].price * quantity;
    
    // Обновляем цену товара на клиенте
    const priceElement = document.querySelector(`#price-${productId}`);
    priceElement.textContent = `$${productTotalPrice.toFixed(2)}`;
  
    try {
      // Отправляем запрос на сервер для обновления количества товара
      const response = await fetch('/update_quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity
        })
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Quantity updated successfully');
        // Обновляем интерфейс (пересчитываем корзину)
        updateBasketList();
      } else {
        console.error('Error:', result.error);
        alert('Ошибка при обновлении количества товара');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
      alert('Ошибка при обновлении количества товара');
    }
  }
  
  
  
  
  
  
  
  // Функция для обновления общей стоимости корзины
  function updateBasketTotal() {
    let total = 0;
    for (const productId in basket) {
      total += basket[productId].price * (basket[productId].quantity || 1); // Умножаем цену на количество товара
    }
    document.getElementById("basketTotal").textContent = total.toFixed(2); // Обновляем отображение суммы
  }
  
  
  
  
  
  
  
  
  // Функция для удаления товара из корзины
  async function removeFromBasket(productId) {
    if (!basket[productId]) return;
  
    const productPrice = basket[productId].price;
    basketTotal -= productPrice;
    delete basket[productId];
  
    document.getElementById("basketCount").textContent = Object.keys(basket).length;
    document.getElementById("basketTotal").textContent = basketTotal.toFixed(2);
    updateBasketList();
    markBasketButtons(); // Обновляем состояние кнопок
  
    try {
      // Отправляем запрос на сервер для удаления товара
      const response = await fetch('/basket', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId }),
      });
      if (!response.ok) {
        throw new Error("Ошибка удаления товара на сервере");
      }
      const result = await response.json();
      console.log("Товар удалён:", result);
    } catch (error) {
      console.error("Ошибка при удалении товара с сервера:", error);
    }
  }
  
  function markBasketButtons() {
    const allBasketButtons = document.querySelectorAll(".products__card-bkn");
    allBasketButtons.forEach((button) => {
      button.classList.remove("basket-added"); // Убираем активный стиль
      button.classList.add("basket-removed"); // Устанавливаем неактивный стиль
    });
  
    Object.keys(basket).forEach(productId => {
      const buttonElement = document.querySelector(`.products__card-bkn[data-product-id="${productId}"]`);
      if (buttonElement) {
        buttonElement.classList.add("basket-added"); // Добавляем активный стиль для корзины
        buttonElement.classList.remove("basket-removed"); // Убираем неактивный стиль
      }
    });
  }
  
  
  // Открытие и закрытие модального окна корзины
  document.getElementById("basketButton").addEventListener("click", function (event) {
    event.preventDefault();
    const modal = document.getElementById("basketModal");
    modal.style.display = "block";
  });
  
  document.getElementById("closeBasketModal").addEventListener("click", function () {
    const modal = document.getElementById("basketModal");
    modal.style.display = "none";
  });
  
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("basketModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
  document.getElementById("payButton").addEventListener("click", function () {
    // Проверяем, есть ли товары в корзине
    if (Object.keys(basket).length === 0) {
      alert("Ваша корзина пуста. Добавьте товары перед оплатой.");
      return;
    }
  
  
    // Преобразуем объект корзины в массив для сохранения в localStorage
    const basketItemsArray = Object.keys(basket).map(productId => {
      return {
        id: productId,
        name: basket[productId].name,
        price: basket[productId].price,
        quantity: basket[productId].quantity
      };
    });
  
    // Сохраняем данные корзины в localStorage
    localStorage.setItem("checkoutBasketItems", JSON.stringify(basketItemsArray));
    localStorage.setItem("checkoutBasketTotal", basketTotal.toFixed(2));
    localStorage.setItem("checkoutView", "summary");
  
    // Перенаправляем на страницу оформления заказа
    window.location.href = "/checkout"; // Flask маршрут
  });
  
  
  
  // Очистка корзины
  document.getElementById("clearBasketButton").addEventListener("click", async function () {
    basket = {};
    basketTotal = 0;
  
    document.getElementById("basketCount").textContent = "0";
    document.getElementById("basketTotal").textContent = "0.00";
    updateBasketList();
  
    const basketButtons = document.querySelectorAll(".products__card-bkn");
    basketButtons.forEach((button) => {
      button.classList.remove("basket-added");
      button.classList.add("basket-removed");
    });
  
    try {
      // Отправляем запрос на сервер для очистки корзины
      const response = await fetch('/clear_basket', { method: 'DELETE' });
      if (!response.ok) {
        throw new Error("Ошибка очистки корзины на сервере");
      }
      const result = await response.json();
      console.log("Корзина очищена на сервере:", result);
    } catch (error) {
      console.error("Ошибка очистки корзины на сервере:", error);
    }
  });
  
  
  ///////////////////////////////////////////////////////////
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
  
  function showNotification(message, duration = 5000) {
    const container = document.getElementById("notification-container");
  
    // Если контейнер отсутствует, создаём его
    if (!container) {
      const newContainer = document.createElement("div");
      newContainer.id = "notification-container";
      newContainer.classList.add("notification-container");
      document.body.appendChild(newContainer);
    }
  
    // Создаем элемент уведомления
    const notification = document.createElement("div");
    notification.className = "notification";
  
    // Контент уведомления
    notification.innerHTML = `
      <span>${message}</span>
      <button class="close-btn">&times;</button>
    `;
  
    // Добавляем обработчик для кнопки "Закрыть"
    const closeButton = notification.querySelector(".close-btn");
    closeButton.addEventListener("click", () => {
      notification.remove();
    });
  
    // Добавляем уведомление в контейнер
    document.getElementById("notification-container").appendChild(notification);
  
    // Удаляем уведомление через заданное время
    setTimeout(() => {
      notification.remove();
    }, duration);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const historyButton = document.getElementById("history-button");
    
    if (historyButton) {
      historyButton.addEventListener("click", function () {
        window.location.href = "/history"; // Перенаправление на страницу истории заказов
      });
    }
  });
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll('.delete-order-btn'); // Поменяли селектор на delete-order-btn

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const productId = this.getAttribute('data-product-id');  // Извлекаем product_id из кнопки
            const productCard = this.closest('.order-card');  // Находим родительский элемент заказа

            if (!productId) {
                console.error("Неверный или отсутствующий productId:", productId);
                alert("Ошибка: невозможно найти идентификатор товара.");
                return;
            }

            try {
                // Отправляем запрос на удаление конкретного товара с его product_id
                const response = await fetch('/delete_product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ product_id: productId }),  // Передаем product_id в теле запроса
                });

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);  // Показываем сообщение об успешном удалении
                    productCard.remove();   // Удаляем товар из DOM
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || "Ошибка при удалении товара.");
                }
            } catch (error) {
                console.error("Ошибка при удалении:", error);
                alert("Ошибка сервера. Попробуйте позже.");
            }
        });
    });
});




  
  