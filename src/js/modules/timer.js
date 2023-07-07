export default function timer() {
    
    const deadline = '2023-09-01';

    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 24);
        const seconds = Math.floor(t / 1000 % 60);
    
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }
    
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    
    function setClock(selector, endtime) {
        const timer = $(selector);
        const days = timer.find('#days');
        const hours = timer.find('#hours');
        const minutes = timer.find('#minutes');
        const seconds = timer.find('#seconds');
        const timeInterval = setInterval(updateClock, 1000);
    
        updateClock();
    
        function updateClock() {
            const t = getTimeRemaning(endtime);
    
            days.text(getZero(t.days));
            hours.text(getZero(t.hours));
            minutes.text(getZero(t.minutes));
            seconds.text(getZero(t.seconds));
    
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    
    setClock('.timer', deadline);
}