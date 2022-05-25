const pibReg = /^[A-Za-z]{6}\s[A-Za-z]{1}\.[A-Za-z]{1}\.$/;
const optionReg = /^\d{2}$/;
const groupReg = /^[A-Za-z]{2}-\d{2}$/;
const facultyReg = /^[A-Za-z]{4}$/;
const birthReg = /^\d{2}\.\d{2}\.\d{4}$/;

const inputsRegex = {
    'pib': pibReg,
    'option': optionReg,
    'group': groupReg,
    'faculty': facultyReg,
    'birth': birthReg
}

const resultsText = {
    'pib-result': 'ПІБ',
    'option-result': 'Варіант',
    'group-result': 'Група',
    'faculty-result': 'Факультет',
    'birth-result': 'Дата народження'
}

function validateForm() {

    const inputs = document.querySelectorAll('.form-block label input');
    const hasInvalid = Array.from(inputs).map(i => validateElement(i)).some(e => !e);
    const results = document.getElementById('results');

    if (!results) return;

    if (hasInvalid) {

        results.style.display = 'none';
        return;
    }

    showResults(inputs, results);
}

function validateElement(element) {

    const reg = inputsRegex[element.id];

    if (!reg) return;

    const result = reg.test(element.value);
    element.style.backgroundColor = !result ? 'rgb(255, 123, 123)' : 'white';

    return result;
}

function showResults(inputs, block) {

    for (let input of inputs) {

        const rowFromResults = document.getElementById(`${input.id}-result`);
        rowFromResults.innerText = `${resultsText[rowFromResults.id]} ${input.value}`;
    }

    block.style.display = 'block';
}