/*
Курс JavaScript/DOM/Интерфейсы" для новичков
Проект, компонента ProductList:

Что нужно сделать:
Создать класс компонеты ProductList, которая будет рисовать список товаров внутрь заданного элемента.
Конструктор класса принимает элемент, в который он вставляет свою разметку. Массив товаров нужно получить с сервера, сделав запрос.

Примерный алгоритм выполнения:
1. Сделать GET запрос за МАССИВОМ товаров с помощь fetch('data/products.json'); !!! Не забудьте преобразовать ответ, вызвав метод "json()". В результате этого шага вы получите массив объектов товаров
* Пример объекта для ОДНОГО товара:
const product = {
    title: 'Название товара',
    imageUrl: '/ссылка на картинку',
    // Свойство rating либо объект, либо null, если никто не оставил отзыв
    rating: {
        stars: 4, // Число от 0 до 5, количество звезд рейтинга
        reviewsAmount: 12, // Количество отзывов на товар
    },
    price: '$353', // Строка с текущей ценой цена
    oldPrice: null, // Строка со старой ценой или null, если старой цены нет. Если старая цена есть, ее нужно показать
}

2. Отрисовать разметку компоненты:
* Основа разметки всей компоненты, в которую нужно вставить список карточек:
<div class="row justify-content-end">
    <div class="col-lg-9">
        <h3 class="section-title">Top Recommendations for You</h3>
        <div class="row homepage-cards">
            <!--ВОТ ЗДЕСЬ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
    </div>
</div>

* Разметка карточки товара:
<div class="col-md-6 col-lg-4 mb-4">
    <div class="card">
        <div class="card-img-wrap">
            <img class="card-img-top" src="https://iliakan.github.io/course-project/assets/images/turntable.png" alt="Card image cap">
        </div>
        <div class="card-body">
            <h5 class="card-title">Victrola Pro USB Bluetooth Turntable Vinyl to MP3 Function</h5>
            <div class="rate">
                <i class="icon-star checked"></i>
                <i class="icon-star checked"></i>
                <i class="icon-star checked"></i>
                <i class="icon-star checked"></i>
                <i class="icon-star checked"></i>
                <span class="rate-amount ml-2">24</span>
            </div>
            <p class="card-text price-text discount"><strong>€ 129.92</strong>
            <small class="ml-2">€ 250</small></p>
        </div>
    </div>
</div>

* https://codepen.io/Dolgach/pen/EqbeEx?editors=0010 вот здесь мы уже рисовали звезды. !!! Обратите внимание на то, что там используется другой подход и другие CSS классы, просто скопировать и вставить не получится.
* CSS Классы для звездочек
"icon-star" - базовый класс, который должен быть у всех звезд
"checked" - если звезда закрашена
"active" - если звезда не закрашена, но активна (Активная звезда имеет желтую окантовку, неактивная - серую)

* Разметка для цены имеет несколько состояний:
Обычная цена, когда у нас нет старой цены:
<p class="card-text price-text">
    <strong>€ 47.31</strong>
</p>

Цена, когда на товар скидка и у нас есть старая цена:
<p class="card-text price-text discount">
    <strong>€ 79.99</strong>
    <small class="ml-2">€ 90.55</small>
</p>

* В итоге вы получите что-то похожее:
<div class="row justify-content-end">
    <div class="col-lg-9">
        <h3 class="section-title">Top Recommendations for You</h3>
        <div class="row homepage-cards">
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-img-wrap">
                        <img class="card-img-top" src="https://iliakan.github.io/course-project/assets/images/headphones.png" alt="Card image cap">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Nuraphone - Wireless Bluetooth Over-Ear Headphones</h5>
                        <div class="rate">
                            <i class="icon-star checked"></i>
                            <i class="icon-star checked"></i>
                            <i class="icon-star checked"></i>
                            <i class="icon-star checked"></i>
                            <i class="icon-star active"></i>
                            <span class="rate-amount ml-2">24</span>
                        </div>
                        <p class="card-text price-text"><strong>€ 399</strong></p>
                    </div>
                </div>
            </div>
            <!--Здесь будет больше карточек, для примера только одна-->
        </div>
    </div>
</div>

3. Втставить разметку в элемент, который передается как параметр в конструктор при создании компоненты
*/

'use strict';

class ProductList {
    constructor(element){
        // ВАШ КОД
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row', 'justify-content-end');
        rowDiv.innerHTML = `
            <div class="col-lg-9">
                <h3 class="section-title">Top Recommendations for You</h3>
                <div class="row homepage-cards">
                    <!--ВОТ ЗДЕСЬ БУДУТ КАРТОЧКИ ТОВАРОВ-->
                </div>
            </div>`;
        element.append(rowDiv);
        const cardsPlace = document.querySelector('.homepage-cards');

        const url = '../data/products.json';
        fetch(url).then(response => response.json()).then(result => result).then(result => {
            result.forEach(item => {
                const cardCol = document.createElement('div');
                const card = document.createElement('div');
                const cardImage = document.createElement('div');
                const cardBody = document.createElement('div');
                const cardTitle = document.createElement('div');
                const rate = document.createElement('div');
                const reviewsAmount = document.createElement('span');
                cardCol.classList.add('col-md-6', 'col-lg-4', 'mb-4');
                card.classList.add('card');
                cardImage.classList.add('card-img-wrap');
                cardBody.classList.add('card-body');
                cardTitle.classList.add('card-title');
                rate.classList.add('rate');
                reviewsAmount.classList.add('rate-amount', 'ml-2');
                cardImage.innerHTML = `<img class="card-img-top" src="${item.imageUrl}" alt="Card image cap">`;
                cardTitle.textContent = `${item.title}`;
                let price = '';
                let rating = {};
                if (item.oldPrice === null) {
                    price = `<p class="card-text price-text discount"><strong>${item.price}</strong></p>`;
                } else {
                    price = `<p class="card-text price-text discount"><strong>${item.price}</strong><small class="ml-2">${item.oldPrice}</small></p>`;
                }
                if (item.rating === null) {
                    rating.stars = 0;
                    rating.reviewsAmount = 0;
                }
                else {
                    rating.stars = item.rating.stars;
                    rating.reviewsAmount = item.rating.reviewsAmount;
                }

                for (let i = 0; i < 5; i++) {
                    let icon = document.createElement('i');
                    icon.classList.add('icon-star');
                    if (rating.stars === 0) {
                        icon.classList.add('active');
                        rate.append(icon);
                    } else {
                        rating.stars -=1;
                        icon.classList.add('checked');
                        rate.append(icon);
                    }
                }
                reviewsAmount.textContent = `${rating.reviewsAmount}`;
                rate.append(reviewsAmount);

                cardBody.append(cardTitle);
                cardBody.append(rate);
                cardBody.insertAdjacentHTML("beforeend", price);
                card.append(cardImage);
                card.append(cardBody);
                cardCol.append(card);
                cardsPlace.append(cardCol);
                                
            }); // result.forEach()-method

            
        }); // end of fetch (response from server)
    } // end of constructor
} // end of Class


// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
