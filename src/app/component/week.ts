export function getDate(timezone: string): string {
    localStorage.setItem('timezone', JSON.stringify(timezone));
    let indiaTime = new Date().toLocaleString("en-US", { timeZone: timezone });
    const date = new Date(indiaTime);
    let daysRu = new Array('ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ');
    let MonthArrayRu = new Array('января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');
    let daysEn = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
    let MonthArrayEn = new Array('january', 'february', 'mMarch', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');
    let daysBe = new Array('Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб');
    let MonthArrayBe = new Array('cтудзеня', 'лютага', 'сакавiка', 'красавiка', 'мая', 'червеня', 'лiпеня', 'жнiвня', 'верасня', 'кастрычнiка', 'лiстапада', 'снежня');
    const hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    if (localStorage.language) {
        if (localStorage.language.substr(1, 2) === 'en') {
            return daysEn[date.getDay()] + ' ' + date.getDate() + ' ' + MonthArrayEn[date.getMonth()] + ' ' + hours + ':' + minutes;
        }
        if (localStorage.language.substr(1, 2) === 'ru') {
            return daysRu[date.getDay()] + ' ' + date.getDate() + ' ' + MonthArrayRu[date.getMonth()] + ' ' + hours + ':' + minutes;
        }
        if (localStorage.language.substr(1, 2) === 'be') {
            return daysBe[date.getDay()] + ' ' + date.getDate() + ' ' + MonthArrayBe[date.getMonth()] + ' ' + hours + ':' + minutes;
        }
    } else {
        return daysEn[date.getDay()] + ' ' + date.getDate() + ' ' + MonthArrayEn[date.getMonth()] + ' ' + hours + ':' + minutes;
    }
}



export function getWeekDays(timezone: string): Array<string> {
    let zoneTime = new Date().toLocaleString("en-US", { timeZone: timezone });
    const date = new Date(zoneTime);
    let daysRu = new Array('Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота');
    let daysEn = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    let daysBe = new Array('Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацьвер', 'Пятніца', 'Субота');
    if (localStorage.language) {
        if (localStorage.language.substr(1, 2) === 'en') {
            return [daysEn[(date.getDay() + 1) % 7], daysEn[(date.getDay() + 2) % 7], daysEn[(date.getDay() + 3) % 7]];
        }
        if (localStorage.language.substr(1, 2) === 'ru') {
            return [daysRu[(date.getDay() + 1) % 7], daysRu[(date.getDay() + 2) % 7], daysRu[(date.getDay() + 3) % 7]];
        }
        if (localStorage.language.substr(1, 2) === 'be') {
            return [daysBe[(date.getDay() + 1) % 7], daysBe[(date.getDay() + 2) % 7], daysBe[(date.getDay() + 3) % 7]];
        }
    } else {
        return [daysEn[date.getDay() + 1], daysEn[date.getDay() + 2], daysEn[date.getDay() + 3]];
    }
}