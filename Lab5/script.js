let addedPic;

(function(window, document, undefined){

    window.onload = addListeners;
    
    function addListeners(){

        let placeElement = document.getElementById('place');

        if (placeElement) {
            placeElement.addEventListener('click', () => {
                placeElement.style.backgroundColor = 'green';
                placeElement.style.color = 'white';
            })
        }

        let educationElement = document.querySelector('#place + p');

        if (educationElement) {
            educationElement.addEventListener('click', () => {
                educationElement.style.backgroundColor = 'yellow';
                educationElement.style.color = 'white';
            });
        }
    }

})(window, document, undefined);

function addPicture() {

    if (addedPic) return;

    let img = document.getElementById('pic');
    let newPicContainer = document.querySelector('.second-pic');

    if (!img || !newPicContainer) return;

    addedPic = document.createElement('img');
    addedPic.setAttribute('src', img.getAttribute('src'));
    addedPic.setAttribute('id', 'pic2');
    newPicContainer.appendChild(addedPic);
}

function removePicture() {

    if (addedPic) {
        addedPic.remove();
        addedPic = null;
    }
}

function zoomIn() {

    if (!addedPic) return;

    addedPic.style.width = '150%';
}

function zoomOut() {

    if (!addedPic) return;

    addedPic.style.width = '100%';
}