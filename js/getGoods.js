const getGoods = () => {

    const links = document.querySelectorAll('.navigation-link');

    const getData = () => {
        fetch('https://wildberriesjs-b8f72-default-rtdb.firebaseio.com/db.json')
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('data', JSON.stringify(data));
            })
    }

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            getData();
        })
    })


    localStorage.setItem('goods', JSON.stringify({
        name: 'all'
    }))

    const goods = JSON.parse(localStorage.getItem('goods'));
    console.log(goods)

    localStorage.removeItem('goods');
    console.log(localStorage);

}
getGoods();

// из-за .then код внутри () отработает только тогда, когда все данные точно загрузятся при помощи fetch
// затем только когда все данные конвертируются в json сработает код внутри .then()