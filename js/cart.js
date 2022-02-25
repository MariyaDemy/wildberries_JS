const cart = function () {
    const cartBtn = document.querySelector('.button-cart') //перебирает весь бади
    const cart = document.getElementById('modal-cart'); // заканчивает поиск при нахождении нужного элемента
    const closeBtn = cart.querySelector('.modal-close'); // поиск внутри элемента cart, только по queryS.. or queryS..All

    cartBtn.addEventListener('click', function () {
        cart.style.display = 'flex';
    })

    closeBtn.addEventListener('click', function () {
        cart.style.display = ''; // or 'none'
    })
}

cart()

// этот подход называется инкапсуляция кода : переменные в функции доступны только в рамках функции
// в других функциях можно объявлять переменные с такими же названиями