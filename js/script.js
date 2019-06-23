window.addEventListener('DOMContentLoaded', function(){
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

        info.addEventListener('click', function(event) {
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
                    seconds = Math.floor( (t/1000) % 60 ) ,
                    minutes = Math.floor( (t/1000/60) % 60 ),
                    hours = Math.floor( (t/ (1000 * 60 * 60) ) );
            return {
                'total': t,
                'hours': (hours < 10)? '0' + hours : hours,
                'minutes': (minutes < 10)? '0' + minutes : minutes,
                'seconds': (seconds < 10)? '0' + seconds : seconds
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

        function showModal(){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden'; //Block to scroll body while open this modal window
        };
        
        more.addEventListener('click', function(){
            showModal.call(this);
        });

        close.addEventListener('click', function(){
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            document.body.style.overflow = '';            
        });

        let desBtn = document.querySelectorAll('.description-btn');

        for (let i = 0; i < desBtn.length; i++){
            desBtn[i].addEventListener('click', function(){
                showModal.apply(this);
            });
        }
});