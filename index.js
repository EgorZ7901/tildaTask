const reviewContainer = document.querySelector('.review-container');
const rates = document.querySelectorAll('.rate');
const submitButton = document.querySelector('.submit-button');
const feedbackInput = document.querySelector('.feedback');
const rateData = {
    0: {
        title: 'Видим что вам ничего не понравилось :(',
        text: 'Мы очень хотим улучшаться, вы можете оставить обратную связь ниже и связаться с нами по номеру: ',
        addNumber: true,
    },
    1: {
        title: 'Видим что вам многое понравилось :(',
        text: 'Мы очень хотим улучшаться, вы можете оставить обратную связь ниже и связаться с нами по номеру: ',
        addNumber: true,
    },
    2: {
        title: 'Мы рады что оценка положительная, но видим что есть куда развиваться!',
        text: 'Вы можете оставить обратную связь ниже',
    },
};
let selectedValue = getSelectedValue();
let feedbackText = localStorage.getItem('feedback');

function getSelectedValue() {
    const result = localStorage.getItem('rate-value');
    if (!result) {
        initFeedback();
        return;
    }
    rates[result].classList.add('selected');
    return result;
}

function initFeedback() {
    submitButton.addEventListener('click', () => saveFeedback());
    rates.forEach((elem, index) => {
        elem.classList.add('active');
        elem.addEventListener('mouseover', () => elem.classList.add('hovered'));
        elem.addEventListener('mouseout', () => elem.classList.remove('hovered'));
        elem.addEventListener('click', () => saveResult(elem, index));
    });

    function saveResult(elem, index) {
        if (typeof selectedValue === 'number') {
            return;
        }
        selectedValue = index;
        localStorage.setItem('rate-value', index);
        deactivateRates();
        elem.classList.add('selected');
        if (selectedValue < 3) {
            openForm();
        }
    }

    function deactivateRates() {
        rates.forEach(elem => elem.classList.remove('active'));
    }

    function openForm() {
        const data = rateData[selectedValue];
        reviewContainer.querySelector('h2').innerHTML = data.title;
        reviewContainer.querySelector('div').innerHTML = data.addNumber ? data.text + '<a href="tel:+79111111111">+79111111111</a>' : data.text;
        reviewContainer.classList.add('visible');
    }

    function saveFeedback() {
        localStorage.setItem('feedback', feedbackInput.value);
        alert('Ваш фидбэк: ' + feedbackInput.value + '\nСпасибо за ваше мнение. Мы выйдем с вами на связь в ближайшее время!');
        closeForm()
    }

    function closeForm() {
        reviewContainer.classList.remove('visible');
    }
}
