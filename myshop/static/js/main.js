document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Логика для кнопок сортировки (Sort Options) ---
    const sortButtons = document.querySelectorAll('.sort-options .sort-button');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            sortButtons.forEach(btn => btn.classList.remove('active-sort'));
            this.classList.add('active-sort');
        });
    });

    // --- 2. Логика для пагинации (Pagination) ---
    const paginationLinks = document.querySelectorAll('.pagination-list .pagination__link');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            paginationLinks.forEach(lnk => lnk.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- 3. Логика для удаления тегов фильтра (Keywords) ---
    const keywordsList = document.querySelector('.keywords-list');
    if (keywordsList) {
        keywordsList.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-keyword-icon')) {
                const keywordTag = event.target.closest('.keyword-tag');
                if (keywordTag) {
                    // Перед удалением тега, снимем соответствующий чекбокс
                    const keywordText = keywordTag.textContent.trim().slice(0, -1).trim(); // "Hops X" -> "Hops"
                    const checkbox = document.querySelector(`input[data-keyword="${keywordText}"]`);
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                    keywordTag.remove();
                }
            }
        });
    }

    // --- 4. Логика для чекбоксов и синхронизации с Keywords ---
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        // Присваиваем data-атрибут каждому чекбоксу для легкой идентификации
        const labelText = checkbox.closest('.checkbox-container').textContent.trim();
        checkbox.setAttribute('data-keyword', labelText);

        // Слушаем событие 'change', которое срабатывает при клике на чекбокс
        checkbox.addEventListener('change', function() {
            const keyword = this.getAttribute('data-keyword');

            if (this.checked) {
                // Если чекбокс был отмечен, добавляем тег
                addKeywordTag(keyword);
            } else {
                // Если с чекбокса сняли галочку, удаляем тег
                removeKeywordTag(keyword);
            }
        });
    });

    function addKeywordTag(keywordText) {
        // Проверяем, не существует ли уже такой тег
        if (document.querySelector(`.keyword-tag[data-keyword="${keywordText}"]`)) {
            return;
        }

        // Создаем HTML для нового тега
        const newTag = document.createElement('span');
        newTag.className = 'keyword-tag';
        newTag.setAttribute('data-keyword', keywordText);
        newTag.innerHTML = `${keywordText} <i class="fa-solid fa-xmark remove-keyword-icon"></i>`;

        // Добавляем новый тег в список
        keywordsList.appendChild(newTag);
    }

    function removeKeywordTag(keywordText) {
        // Находим тег по data-атрибуту и удаляем его
        const tagToRemove = document.querySelector(`.keyword-tag[data-keyword="${keywordText}"]`);
        if (tagToRemove) {
            tagToRemove.remove();
        }
    }

});

// --- 5. Логика симуляции входа и выхода ---
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const body = document.body;

    // Функция для проверки состояния входа при загрузке страницы
    function checkLoginStatus() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            body.classList.add('user-logged-in');
        } else {
            body.classList.remove('user-logged-in');
        }
    }

    // Симуляция входа: при отправке формы на странице login.html
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Отменяем реальную отправку формы

            // "Запоминаем" состояние входа в локальном хранилище браузера
            localStorage.setItem('isLoggedIn', 'true');

            // Перенаправляем на главную страницу
            window.location.href = 'home.html';
        });
    }

    // Симуляция выхода: при клике на кнопку Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();

            // "Забываем" состояние входа
            localStorage.removeItem('isLoggedIn');

            // Обновляем вид хедера и перезагружаем страницу для чистоты
            checkLoginStatus();
            // window.location.reload(); // Можно перезагрузить, чтобы все сбросилось
        });
    }

    // Проверяем статус при каждой загрузке страницы
    checkLoginStatus();
});

// --- 6. Логика для аккордеона ---
document.addEventListener('DOMContentLoaded', function() {
    const accordionTitle = document.querySelector('.accordion-title');
    if (accordionTitle) {
        accordionTitle.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            accordionItem.classList.toggle('active');
        });
    }
});

// --- 7. Логика для кнопки "Add to Cart" и счетчика ---
document.addEventListener('DOMContentLoaded', function() {
    const cartControls = document.querySelector('.cart-controls');

    if (cartControls) {
        const addToCartBtn = cartControls.querySelector('#add-to-cart-btn');
        const quantityCounter = cartControls.querySelector('#quantity-counter');
        const decreaseBtn = quantityCounter.querySelector('[data-action="decrease"]');
        const increaseBtn = quantityCounter.querySelector('[data-action="increase"]');
        const quantityValueSpan = quantityCounter.querySelector('.quantity-value');

        let quantity = 0;

        function updateView() {
            if (quantity === 0) {
                // Если товара в корзине нет, показываем кнопку "Add to Cart"
                addToCartBtn.classList.remove('is-hidden');
                quantityCounter.classList.add('is-hidden');
            } else {
                // Если товар есть, показываем счетчик
                addToCartBtn.classList.add('is-hidden');
                quantityCounter.classList.remove('is-hidden');
                quantityValueSpan.textContent = `${quantity} in cart`;
            }
        }

        // Клик по "Add to Cart"
        addToCartBtn.addEventListener('click', function() {
            quantity = 1;
            updateView();
        });

        // Клик по "-"
        decreaseBtn.addEventListener('click', function() {
            if (quantity > 0) {
                quantity--;
                updateView();
            }
        });

        // Клик по "+"
        increaseBtn.addEventListener('click', function() {
            quantity++;
            updateView();
        });

        // Инициализируем вид при загрузке страницы
        updateView();
    }
});