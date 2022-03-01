const cart = function () {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart');
    const closeBtn = cart.querySelector('.modal-close');
    cartBtn.addEventListener('click', function () {
        cart.style.display = 'flex'; //add inline styles
    })

    closeBtn.addEventListener('click', function () {
        cart.style.display = ''; // or 'none'
    })
}

cart();

// инкапсуляция кода : переменные в функции доступны только в рамках функции
// в других функциях можно объявлять переменные с такими же названиями