import { Person } from './person.js';

const API = 'https://randomuser.me/api';
const REQUESTS = 5;

let status;
let mainBlock;

(function(window, document, undefined) {
    
    window.onload = async () => {

        let downloadBtn = document.getElementById('download-btn');
        status = document.getElementById('status');
        mainBlock = document.querySelector('main');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', async () => {

                status.innerHTML = '...';
                const persons = await getPersons();
                updateCards(persons);

                if (mainBlock) {
                    mainBlock.style.display = 'flex';
                }
            });
        }
    }   
})(window, document, undefined);

function updateCards(persons) {

    const personCards = document.getElementsByClassName('person-card');
    const length = personCards.length <= persons.length
                 ? personCards.length
                 : persons.length

    for (let i = 0; i < length; i++) {
        
        let [divPic, divInfo] = personCards[i].children;

        if (divPic) {
            divPic.style.backgroundImage = `url(${persons[i].picture})`;
        }

        if (divInfo) {

            if (divInfo.childElementCount > 0) {
                removeNestedNodes(divInfo);
            }

            const nameElement = document.createElement('p');
            nameElement.innerHTML = `Name: ${persons[i].name}`;
            divInfo.appendChild(nameElement);

            const locationElement = document.createElement('p');
            locationElement.innerHTML = `Location: ${persons[i].location}`;
            divInfo.appendChild(locationElement);

            const cityElement = document.createElement('p');
            cityElement.innerHTML = `City: ${persons[i].city}`;
            divInfo.appendChild(cityElement);

            const postcodeElement = document.createElement('p');
            postcodeElement.innerHTML = `Postcode: ${persons[i].postcode}`;
            divInfo.appendChild(postcodeElement);
        }
    }
}

async function getPersons() {

    const results = await downloadData();
    const persons = [];

    if (results && results.length > 0) {

        for (let result of results) {

            let person = new Person(
                result['picture']['large'],
                result['location']['city'],
                result['location']['postcode'],
                result['location']['state'],
                result['name']['title'] + ' ' + result['name']['first'] + ' '  + result['name']['last']
            );
            persons.push(person);
        }
    }

    return persons;
}

async function downloadData() {

    const promises = [];

    for (let i = 0; i < REQUESTS; i++) {
        const personalDataPromise = fetchPersonData();
        promises.push(personalDataPromise);
    }

    try {
        const responses = await Promise.all(promises);
        status.innerHTML = 'success';

        return responses;
    } catch (error) {
        console.log(error);

        if (status) {
            status.innerHTML = 'error';
        }
    }
}

async function fetchPersonData() {

    var response = await fetch(API);

    if (!response.ok)
        throw new Error(`An error has occurred: ${response.status}`);

    var data = await response.json();
    var results = data['results'];
    
    if (results) {
        return results[0];
    }
    else {
        throw new Error('No results property');
    }
}

function removeNestedNodes(element) {

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}