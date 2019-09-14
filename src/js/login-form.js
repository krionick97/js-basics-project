/*
Курс JavaScript/DOM/Интерфейсы" для новичков
Проект, компонента LoginForm:

Что нужно сделать:
Создать класс компонеты LoginForm, которая будет рисовать форму регистрации для новых пользователей внутрь заданного элемента.
Конструктор класса принимает элемент, в который он вставляет свою разметку.

1. Отрисовать компоненту формы

* Верстка компоненты:
<div class="row justify-content-center">
    <div class="col-md-6">
        <form name="loginForm">
            <div class="alert alert-danger" role="alert" style="display: none;">
                Passwords should be the same!
            </div>
            <div class="jumbotron jumbotron-light jumbotron-form">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Password Check</label>
                    <input type="password" name="passwordCheck" class="form-control" id="exampleInputPassword2" placeholder="Password" required>
                </div>

                <div class="form-check mb-4">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>

                <button type="submit" class="btn btn-primary btn-lg by-now-button">Buy now</button>
            </div>
        </form>
        <div class="h4 text-center font-weight-normal text-uppercase my-5 d-none d-lg-block">or</div>
        <div class="socials mb-5">
            <a href="#" class="btn btn-primary btn-social -fb">
                <img src="assets/icons/icon-facebook.svg" alt="">
                Facebook
            </a>
            <a href="#" class="btn btn-primary btn-social -vk">
                <img src="assets/icons/icon-vk.svg" alt="">
                Vkontakte
            </a>
            <a href="#" class="btn btn-primary btn-social -twitter">
                <img src="assets/icons/icon-twitter.svg" alt="">
                Twitter
            </a>
        </div>
    </div>
</div>

2. Реализовать проверку идентичности паролей в двух полях ввода: в основном и проверочном

* Для основного input с паролем: name="password"
* Для проверочного input с паролем: name="passwordCheck"
* Проверку идентичности паролей нужно сделать после того, как пользователь ввел оба пароля и ушел из этих полей
(событие "blur").
* Также нужно показывать ошибку, которая есть на странице
Класс блока с ошибкой: "alert-danger". Чтобы его показать нужно поменять его стили и сделать ему display: block,
через свойство style элемента (подробнее как это делать, вот тут - http://learn.javascript.ru/styles-and-classes#element-style)
* Каждый раз, когда пользователь возвращается в любое из полей с паролем, нужно прятать ошибку (событие "focus").

3. Сделать отправку формы без перезагрузки страницы по событию "submit" на форме с помощью fetch на адрес "https://httpbin.org/post"
Как это делать можно посмореть вот здесь https://codepen.io/Dolgach/pen/gOYmQoY?editors=1011

*/

'use strict';

class LoginForm {
    constructor(element) {
        // Ваш код
        this.getComponent(element);

        const url = 'https://httpbin.org/post';
        const alertForm = document.querySelector('.alert-danger');
        const loginForm = document.forms.loginForm;
        let inputEmail = loginForm.elements.email;
        let password = loginForm.elements.password;
        let passCheck = loginForm.elements.passwordCheck;
        const checkbox = document.getElementById('exampleCheck1');

        password.addEventListener('blur', () => {
            let passValue = password.value;
            let passCheckValue = passCheck.value;
            if (passValue !== passCheckValue) {
                alertForm.style.display = 'block';
            } else if (passValue === passCheckValue) {
                alertForm.style.display = 'none';
            }
        });
        
        passCheck.addEventListener('blur', () => {
            let passValue = password.value;
            let passCheckValue = passCheck.value;
            if (passValue !== passCheckValue) {
                alertForm.style.display = 'block';
            } else if (passValue === passCheckValue) {
                alertForm.style.display = 'none';
            }
        });
        
        inputEmail.addEventListener('focus', () => {
            if (alertForm.style.display === 'block') {
                alertForm.style.display = 'none';
            }
        });

        password.addEventListener('focus', () => {
            if (alertForm.style.display === 'block') {
                alertForm.style.display = 'none';
            }
        });

        passCheck.addEventListener('focus', () => {
            if (alertForm.style.display === 'block') {
                alertForm.style.display = 'none';
            }
        });

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let passValue = password.value;
            let passCheckValue = passCheck.value;
            let checkMeOut = false;
            if (passValue !== passCheckValue) {
                alertForm.style.display = 'block';
            } else if (passValue === passCheckValue) {
                alertForm.style.display = 'none';
            }

            if (checkbox.checked) {
                checkMeOut = true;
            } else {
                checkMeOut = false;
            }
            
            let user = {
                login: inputEmail.value,
                password: passValue,
                checkbox: checkMeOut
            }
            let userJSON = JSON.stringify(user);

            fetch(url, {
                method: 'POST',
                body: userJSON
            });

            loginForm.reset();
        });
    } // end of constructor

    getComponent(component) {
        const loginForm = document.createElement('div');
        loginForm.classList.add('row', 'justify-content-center');
        loginForm.innerHTML = `
            <div class="col-md-6">
                <form name="loginForm">
                    <div class="alert alert-danger" role="alert" style="display: none;">
                        Passwords should be the same!
                    </div>
                    <div class="jumbotron jumbotron-light jumbotron-form">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" autocomplete="username" required>
                        </div>
        
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" autocomplete="current-password" required>
                        </div>
        
                        <div class="form-group">
                            <label for="exampleInputPassword2">Password Check</label>
                            <input type="password" name="passwordCheck" class="form-control" id="exampleInputPassword2" placeholder="Password" autocomplete="current-password" required>
                        </div>
        
                        <div class="form-check mb-4">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
        
                        <button type="submit" class="btn btn-primary btn-lg by-now-button">Buy now</button>
                    </div>
                </form>
                <div class="h4 text-center font-weight-normal text-uppercase my-5 d-none d-lg-block">or</div>
                <div class="socials mb-5">
                    <a href="#" class="btn btn-primary btn-social -fb">
                        <img src="assets/icons/icon-facebook.svg" alt="">
                        Facebook
                    </a>
                    <a href="#" class="btn btn-primary btn-social -vk">
                        <img src="assets/icons/icon-vk.svg" alt="">
                        Vkontakte
                    </a>
                    <a href="#" class="btn btn-primary btn-social -twitter">
                        <img src="assets/icons/icon-twitter.svg" alt="">
                        Twitter
                    </a>
                </div>
            </div>`;

        component.append(loginForm);

    }
}


// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.LoginForm = LoginForm;