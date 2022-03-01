export const cart = function () {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart');
    const closeBtn = cart.querySelector('.modal-close');
    const goodsContainer = document.querySelector('.long-goods-list');
    const cartTable = document.querySelector(".cart-table__goods");
    const modalForm = document.querySelector(".modal-form");
    const totalPrice = document.querySelector(".card-table__total");
    const nameInput = document.querySelector('[name="nameCustomer"]');
    const phoneInput = document.querySelector("[name='phoneCustomer']");

    // Сохранить товары в localStorage
    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'));
        const clickedGood = goods.find(good => good.id === id);
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : []

        // Добавить элемент в корзину (else) либо вернуть количество нажатых на него раз
        if (cart.some(good => good.id === clickedGood.id)) {
            cart.map((good) => {
                if (good.id === clickedGood.id) {
                    good.count++;
                }
                return good;
            });
        } else {
            clickedGood.count = 1;
            cart.push(clickedGood)
        }

        // Хранение товара в корзине
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Удалить товар из корзины
    const deleteCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart"));

        const newCart = cart.filter((good) => {
            return good.id !== id;
        });

        // Сохранить обновлённые данные и перерисовать корзину
        localStorage.setItem("cart", JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    // Увеличить количество товара в корзине
    const plusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart"));

        const newCart = cart.map((good) => {
            if (good.id === id) {
                good.count++;
            }
            return good;
        });

        localStorage.setItem("cart", JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    // Уменьшить количество товара в корзине
    const minusCartItem = (id) => {
        const cart = JSON.parse(localStorage.getItem("cart"));

        const newCart = cart.map((good) => {
            if (good.id === id) {
                if (good.count > 0) {
                    good.count--;
                }
            }
            return good;
        });

        localStorage.setItem("cart", JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    // Отрисовать элементы товаров в корзине
    const renderCartGoods = (goods) => {
        //Обновить всё, что было в cartTable
        cartTable.innerHTML = ``;

        goods.forEach((good) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
						<td>${good.name}</td>
						<td>$${good.price}</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${good.count}</td>
						<td><button class=" cart-btn-plus"">+</button></td>
						<td data-totalPrice="">$${+good.price * +good.count}</td>
						<td><button class="cart-btn-delete"">x</button></td>
			`;
            cartTable.append(tr);

            // События на кнопках в корзине
            tr.addEventListener("click", (event) => {
                if (event.target.classList.contains("cart-btn-minus")) {
                    minusCartItem(good.id);
                } else if (event.target.classList.contains("cart-btn-plus")) {
                    plusCartItem(good.id);
                } else if (event.target.classList.contains("cart-btn-delete")) {
                    deleteCartItem(good.id);
                }
            });
        });

        // Подсчитать  полную сумму корзины
        let sum = 0;
        goods.forEach(good => {
            const total = good.count * good.price;
            sum = sum + total;
        })
        totalPrice.innerText = `$${sum}`;
    };

    // Отправить данные формы в корзине (имя, телефон)
    const sendForm = (name, phone) => {
        const cart = localStorage.getItem("cart") ?
            JSON.parse(localStorage.getItem("cart")) : [];

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            // тело запроса, куда попадают данные из формы
            body: JSON.stringify({
                cart: cart,
                name: name,
                phone: phone,
            }),
        }).then(() => {
            nameInput.value = "";
            phoneInput.value = "";
            localStorage.removeItem("cart");
            cartTable.innerHTML = ``;
            totalPrice.innerText = `$0`;
        });
    };

    modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const phone = phoneInput.value;
        sendForm(name, phone);
    });

    // Вызвать модальное окно
    cartBtn.addEventListener("click", () => {
        const cartArray = localStorage.getItem("cart") ?
            JSON.parse(localStorage.getItem("cart")) : [];

        renderCartGoods(cartArray);

        cart.style.display = "flex"; //add inline styles
    });

    // Закрыть модальное окно
    closeBtn.addEventListener("click", () => {
        cart.style.display = ""; // or 'none'
    });

    // Закрыть модальное окно по нажатию на область вне окна
    cart.addEventListener("click", (e) => {
        if (!e.target.closest(".modal") && e.target.classList.contains("overlay")) {
            cart.style.display = "";
        }
    });

    // Функция закрытия окна при нажатии на Escape
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            cart.style.display = "";
        }
    });

    // Функция добавления товара в корзину при нажатии на кнопку с ценой

    if (goodsContainer) {
        goodsContainer.addEventListener('click', (event) => {
            if (event.target.closest(".add-to-cart")) {
                const buttonToCart = event.target.closest(".add-to-cart");
                const goodId = buttonToCart.dataset.id;

                addToCart(goodId);
            }
        })
    }
}

// инкапсуляция кода : переменные в функции доступны только в рамках функции
// в других функциях можно объявлять переменные с такими же названиями