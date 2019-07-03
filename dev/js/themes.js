// Body
const body = document.querySelector('body');
// Theme
const themes = document.querySelectorAll('.theme');
let themeClass = document.querySelector('body').classList[0];
const themeWarningBackground = document.querySelector('.theme-warning-background');
// Theme color
const themeColor = document.querySelectorAll('.dark-color');
const themeBackground = document.querySelectorAll('.dark-background');
const themeBorder = document.querySelectorAll('.dark-border');
let themeActive = document.querySelector('.dark-active');
const themeTitle = document.querySelector('.dark-title');
// Restart
const acceptRestart = document.querySelector('#accept-restart');
const declineRestart = document.querySelector('#decline-restart');
// Custom theme
let customValueBody;
let customValueIcons;
let bodyBackgroundColor = `#${rgbHex(window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color'))}`;
let iconsColor = `#${rgbHex(window.getComputedStyle(sessionTitle).getPropertyValue('color'))}`;
const applyCustomTheme = document.querySelector('#apply-custom-theme');
let customThemeActive = false;
// Tab
const themeColorTab = document.querySelector('meta[name="theme-color"]');

// TODO: Modal should also change color OR make it dark mode (not sure which one is better)
// FIXME: User shouldn't be able to select two colors that are very similar, it'll make the icons invisible

function setStorageTheme() {
    if ((window.localStorage.length === 0 || !localStorage.getItem('themeClass')) &&
        storageAvailable('localStorage')) {
        // Theme
        localStorage.setItem('themeClass', JSON.stringify(themeClass));
        // Custom theme
        localStorage.setItem('customThemeActive', JSON.stringify(customThemeActive));
        localStorage.setItem('bodyBackgroundColor', JSON.stringify('#202020'));
        localStorage.setItem('iconsColor', JSON.stringify('#E8E8E8'));
        localStorage.setItem('customBodyBackgroundColor', JSON.stringify('#000080'));
        localStorage.setItem('customIconsColor', JSON.stringify('#c8c8c8'));
    }
}

function loadStorageTheme() {
    let storageTheme;
    themes.forEach(theme => {
        if (theme.classList.contains(JSON.parse(localStorage.getItem('themeClass')))) storageTheme = theme;
    })
    if (!JSON.parse(localStorage.getItem('customThemeActive'))) executeChangeTheme(storageTheme, themeColor, themeBorder, themeActive, themeTitle, pomodoros, modalSettings, false);
    else {
        customThemeChanger(JSON.parse(localStorage.getItem('customBodyBackgroundColor')), JSON.parse(localStorage.getItem('customIconsColor'), false));
    }
}

/**
 * Sets color picking for Spectrum.
 * Calls and checks application of custom theme.
 * 
 * @return {void}
 */
function colorPicker() {
    $('#color-picker-body').spectrum({
        color: `${JSON.parse(localStorage.getItem('customBodyBackgroundColor'))}`,
        showInput: true,
        showInitial: true,
        showAlpha: true,
        preferredFormat: 'hex'
    });
    $('#color-picker-content').spectrum({
        color: `${JSON.parse(localStorage.getItem('customIconsColor'))}`,
        showInput: true,
        showInitial: true,
        showAlpha: true,
        preferredFormat: 'hex'
    });
    customValueBody = $('#color-picker-body').spectrum('get');
    customValueIcons = $('#color-picker-content').spectrum('get');
    $('#color-picker-body').on('change.spectrum', () => {
        customValueBody = $('#color-picker-body').spectrum('get');
    });
    $('#color-picker-content').on('change.spectrum', () => {
        customValueIcons = $('#color-picker-content').spectrum('get');
    });
    applyCustomTheme.addEventListener('click', () => {
        if (((timerStarted || pomodorosCount >= 1) && !longBreakTimeSelected) || timerStarted) timerRestartThemeCustom(acceptRestart, declineRestart, themeWarningBackground, customValueBody, customValueIcons);
        else {
            customThemeActive = true;
            localStorage.setItem('customThemeActive', JSON.stringify(customThemeActive));
            customThemeChanger(customValueBody, customValueIcons, false);
            if (breakSelected) titleBorderColor(null, true);
            else if (longBreakTimeSelected) titleBorderColor(null, true);
        }
    });
}

/**
 * Changes the current theme into tone with the selected custom values.
 * 
 * @param {string} bodyValue
 * @param {string} contentValue
 * @param {boolean} isTimerStarted
 * @return {void}
 */
function customThemeChanger(bodyValue, contentValue, isTimerStarted) {
    body.setAttribute('style', `background-color: ${bodyValue}; color: ${contentValue};`)
    themeColor.forEach(element => {
        element.setAttribute('style', `color: ${contentValue};`);
    });
    themeBorder.forEach(element => {
        element.setAttribute('style', `border-color: ${contentValue}`);
    });
    if (breakSelected) breakTitle.setAttribute('style', `background: linear-gradient(to right, ${contentValue}, ${contentValue}) no-repeat; background-size: 100% 1.5px; background-position: left bottom`);
    else if (longBreakTimeSelected) longBreakTitle.setAttribute('style', `background: linear-gradient(to right, ${contentValue}, ${contentValue}) no-repeat; background-size: 100% 1.5px; background-position: left bottom`);
    else sessionTitle.setAttribute('style', `background: linear-gradient(to right, ${contentValue}, ${contentValue}) no-repeat; background-size: 100% 1.5px; background-position: left bottom`);
    themeTitle.setAttribute('style', `color: ${contentValue}`);
    pomodoros.forEach(pomodoro => {
        pomodoro.style.borderColor = contentValue;
        if (longBreakTimeSelected && !isTimerStarted) pomodoro.style.backgroundColor = contentValue;
    });
    hideModalSettings(modalSettings, settings);
    // Update tab and local storage properties
    bodyBackgroundColor = `#${rgbHex(window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color'))}`;
    iconsColor = `#${rgbHex(window.getComputedStyle(sessionTitle).getPropertyValue('color'))}`;
    themeColorTab.setAttribute('content', bodyBackgroundColor);
    localStorage.setItem('customBodyBackgroundColor', JSON.stringify(bodyBackgroundColor));
    localStorage.setItem('customIconsColor', JSON.stringify(iconsColor));
}

/**
 * Removes the current custom theme and applies the new one.
 * On full remove, a pre-built theme is applied.
 * 
 * @return {void}
 */
function removeCustomTheme(fullRemove = false) {
    if (fullRemove) {
        customThemeActive = false;
        localStorage.setItem('customThemeActive', JSON.stringify(customThemeActive));
    }
    body.style.backgroundColor = '';
    body.style.color = '';
    themeColor.forEach(element => {
        element.style.color = '';
    });
    themeBorder.forEach(element => {
        element.style.borderColor = '';
    });
    breakTitle.style.background = '';
    longBreakTitle.style.background = '';
    themeActive.style.background = '';
    themeActive.style.backgroundSize = '';
    themeActive.style.backgroundPosition = '';
    themeTitle.style.color = '';
    pomodoros.forEach(pomodoro => {
        pomodoro.style.borderColor = '';
        pomodoro.style.backgroundColor = '';
    });
}

/**
 * Asks for a timer restart when a pre-built theme is applied on a timer with progress.
 * 
 * @param {HTMLElement} accept
 * @param {HTMLElement} decline
 * @param {HTMLElement} themeWarning
 * @param {HTMLElement} theme
 * @return {void}
 */
function timerRestartTheme(accept, decline, themeWarning, theme) {
    themeWarning.style.display = 'block';
    accept.addEventListener('click', () => {
        stopTimerHard(stop, sessionSeconds);
        executeChangeTheme(theme, themeColor, themeBorder, themeActive, themeTitle, pomodoros, modalSettings, true);
        if (JSON.parse(localStorage.getItem('customThemeActive'))) {
            removeCustomTheme(true);
        }
        sessionTimeSelected = true;
        breakTimeSelected = false;
        breakSelected = false;
        longBreakTimeSelected = false;
        themeWarning.style.display = 'none';
    });
    decline.addEventListener('click', () => {
        themeWarning.style.display = 'none';
    });
    window.addEventListener('click', function (e) {
        if (e.target === themeWarning) themeWarning.style.display = 'none';
    });
}

/**
 * Asks for a timer restart when a custom theme is applied on a timer with progress.
 * 
 * @param {HTMLElement} accept
 * @param {HTMLElement} decline
 * @param {HTMLElement} themeWarning
 * @param {string} bodyValue
 * @param {string} contentValue
 * @return {void}
 */
function timerRestartThemeCustom(accept, decline, themeWarning, bodyValue, contentValue) {
    themeWarning.style.display = 'block';
    accept.addEventListener('click', () => {
        customThemeActive = true;
        localStorage.setItem('customThemeActive', JSON.stringify(customThemeActive));
        removeCustomTheme(false);
        stopTimerHard(stop, sessionSeconds);
        sessionTimeSelected = true;
        breakTimeSelected = false;
        breakSelected = false;
        longBreakTimeSelected = false;
        customThemeChanger(bodyValue, contentValue, true);
        titleBorderColor(true)
        themeWarning.style.display = 'none';
    });
    decline.addEventListener('click', () => {
        themeWarning.style.display = 'none';
    });
    window.addEventListener('click', function (e) {
        if (e.target === themeWarning) themeWarning.style.display = 'none';
    });
}

/**
 * Correctly switches the color of the border color under the session/break titles.
 * 
 * @param {boolean} customThemeReset 
 * @return {void}
 */
function titleBorderColor(theme, customThemeReset) {
    if (!JSON.parse(localStorage.getItem('customThemeActive')) && !customThemeReset) {
        let currentActive;
        if (sessionTimeSelected) {
            currentActive = `${theme.classList[1]}-active`;
            sessionTitle.classList = '';
            breakTitle.classList = '';
            longBreakTitle.classList = '';
            sessionTitle.classList.add(currentActive);
        } else if (breakTimeSelected) {
            currentActive = `${theme.classList[1]}-active`;
            sessionTitle.classList = '';
            breakTitle.classList = '';
            longBreakTitle.classList = '';
            breakTitle.classList.add(currentActive);
        } else {
            currentActive = `${theme.classList[1]}-active`;
            sessionTitle.classList = '';
            breakTitle.classList = '';
            longBreakTitle.classList = '';
            longBreakTitle.classList.add(currentActive);
        }
    } else if (customThemeReset) {
        if (breakSelected) customThemeSwitch = 'break';
        else if (longBreakTimeSelected) customThemeSwitch = 'long break';
        else customThemeSwitch = 'session';
        sessionTitle.classList = '';
        breakTitle.classList = '';
        longBreakTitle.classList = '';
    }
}

/**
 * Sets picking for pre-built themes.
 * Calls and checks application od custom theme.
 * 
 * @param {HTMLElement} themes 
 * @return {void}
 */
function changeTheme(themes) {
    themes.forEach(theme => {
        theme.addEventListener('click', function () {
            if (((timerStarted || pomodorosCount >= 1) && !longBreakTimeSelected) || timerStarted) timerRestartTheme(acceptRestart, declineRestart, themeWarningBackground, theme);
            else {
                if (JSON.parse(localStorage.getItem('customThemeActive'))) removeCustomTheme(true);
                setTimeout(() => {
                    if (breakSelected) titleBorderColor(theme, false);
                    else if (longBreakTimeSelected) titleBorderColor(theme, false);
                }, 0);
                executeChangeTheme(theme, themeColor, themeBorder, themeActive, themeTitle, pomodoros, modalSettings, false);
            }
        });
    });
}

/**
 * Changes current theme into the selected pre-built theme.
 * Uses class switching to achieve this.
 * 
 * @param {HTMLElement} theme
 * @param {HTMLElement} themeColor
 * @param {HTMLElement} themeBorder
 * @param {HTMLElement} themeActive
 * @param {HTMLElement} themeTitle
 * @param {HTMLElements} pomodoros
 * @param {HTMLElement} modalSettings
 * @param {boolean} isTimerStarted
 * @return {void}
 */
function executeChangeTheme(theme, themeColor, themeBorder, themeActive, themeTitle, pomodoros, modalSettings, isTimerStarted) {
    body.classList = '';
    body.classList.add(theme.classList[1]);
    themeColor.forEach(element => {
        element.classList.remove(element.classList[element.classList.length - 1]);
        element.classList.add(`${theme.classList[1]}-color`);
    });
    themeBorder.forEach(element => {
        element.classList.remove(element.classList[element.classList.length - 1]);
        element.classList.add(`${theme.classList[1]}-border`);
    });
    themeActive.classList.remove(themeActive.classList[themeActive.classList.length - 1]);
    themeActive.classList.add(`${theme.classList[1]}-active`);
    themeActive = document.querySelector(`.${theme.classList[1]}-active`);
    themeTitle.classList.remove(themeTitle.classList[themeTitle.classList.length - 1]);
    themeTitle.classList.add(`${theme.classList[1]}-title`);
    pomodoros.forEach(pomodoro => {
        pomodoro.classList = '';
        pomodoro.classList.add('pomodoro', `${theme.classList[1]}-border`);
        if (longBreakTimeSelected && !isTimerStarted) pomodoro.classList.add('pomodoro', `${theme.classList[1]}-background`);
    });
    hideModalSettings(modalSettings, settings);
    // Update tab and local storage properties
    setTimeout(() => {
        bodyBackgroundColor = `#${rgbHex(window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color'))}`;
        iconsColor = `#${rgbHex(window.getComputedStyle(sessionTitle).getPropertyValue('color'))}`;
        themeColorTab.setAttribute('content', bodyBackgroundColor);
        localStorage.setItem('themeClass', JSON.stringify(document.querySelector('body').classList[0]));
        localStorage.setItem('bodyBackgroundColor', JSON.stringify(bodyBackgroundColor));
        localStorage.setItem('iconsColor', JSON.stringify(iconsColor));
    }, 0);
}

function mainThemes() {
    setStorageTheme();
    loadStorageTheme();
    changeTheme(themes);
    colorPicker();
}

window.onload = mainThemes();