window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event) => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target === tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    let deadLine = "2019-06-25";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        return {
            'total': t,
            'hours': (hours < 10) ? '0' + hours : hours,
            'minutes': (minutes < 10) ? '0' + minutes : minutes,
            'seconds': (seconds < 10) ? '0' + seconds : seconds
        };
    }

    function setClock(id, deadLine) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(deadLine);

            if (t.total <= 0) {
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                clearInterval(timeInterval);
            } else {
                hours.textContent = t.hours;
                minutes.textContent = t.minutes;
                seconds.textContent = t.seconds;
            }
        }
    }

    setClock('timer', deadLine);

    //Modal window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    function showModal() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; //Block to scroll body while open this modal window
    };

    more.addEventListener('click', showModal);

    close.addEventListener('click', () => {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let desBtn = document.querySelectorAll('.description-btn');

    for (let i = 0; i < desBtn.length; i++) {
        desBtn[i].addEventListener('click', showModal);
    }


    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let formCallback = document.querySelector('.main-form'),
        formContact = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function sendForm(elem) {

        elem.addEventListener('submit', function (event) {
            event.preventDefault();
            elem.appendChild(statusMessage);

            let formData = new FormData(elem);
            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            function postData(json) {
                
                return new Promise((resolve, reject) => {

                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    request.onreadystatechange = () => {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    };
                    request.send(json);
                });
            }

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    console.log(input[i]);
                    input[i].value = '';
                }
            }

            postData(json)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => statusMessage.innerHTML = message.success)
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });
    }
    sendForm(formCallback);
    sendForm(formContact);

    // Slider
   
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slide.length;
        }

        slides.forEach(item => item.style.display = 'none');
        dots.forEach(dot => dot.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function changeSlide(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', () => {
        changeSlide(-1);
    });

    next.addEventListener('click', () => {
        changeSlide(1);
    });

    dotsWrap.addEventListener('click', (e) => {
        for (let i = 0; i < dots.length + 1; i++){
            if (e.target.classList.contains('dot') && e.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

        // Calc

        let persons = document.querySelectorAll('.counter-block-input')[0],
            days = document.querySelectorAll('.counter-block-input')[1],
            place = document.getElementById('select'),
            total = document.getElementById('total'),
            personSum = 0,
            daysSum = 0,
            totalSum = 0;

            total.innerHTML = 0;

            persons.addEventListener('change', function() {
                personSum = +this.value;
                totalSum = (daysSum + personSum) * 4000;

                if (days.value == '' || this.value == '') {
                    total.innerHTML = 0;
                } else {
                    total.innerHTML = totalSum;
                }
            });

            days.addEventListener('change', function() {
                daysSum = +this.value;
                totalSum = (daysSum + personSum) * 4000;

                if (persons.value == '' || this.value == '') {
                    total.innerHTML = 0;
                } else {
                    total.innerHTML = totalSum;
                }
            });

            place.addEventListener('change', function() {
                if (persons.value === '' || days.value === '') {
                    total.innerHTML = 0;
                } else {
                    let a = totalSum;
                    total.innerHTML = a * this.options[this.selectedIndex].value;
                }
            })
});