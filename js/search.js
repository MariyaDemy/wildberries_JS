const search = () => {
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');

    const showValue = function (e) {
        console.log(input.value);
    };

    searchBtn.addEventListener('click', showValue);
}

search();