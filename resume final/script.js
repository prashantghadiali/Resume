var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');

var interval;

for (var i = 0; i < navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click', function (event) {
        event.preventDefault();

        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);
        console.log(targetSection);
        
        // interval = setInterval(scrollVertically, 50, targetSection);   (also we can use like this)
        interval = setInterval(function(){
            scrollVertically(targetSection);
        }, 50);
    });
}


function scrollVertically(targetSection) {
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if (targetSectionCoordinates.top <= 0){
        clearInterval(interval);
        return;
    }
    window.scrollBy(0,70);
}


var progressBars = document.querySelectorAll('.skill-progress > div');
var skillsContainer = document.getElementById('skills-container');
window.addEventListener('scroll', checkScroll);
var animationDone = false;

function initializeBars(){
    for(let bar of progressBars){
        bar.style.width = 0 + "%";
    }
}

initializeBars();

function fillBars() {
    for (let bar of progressBars) {
        let targetWidth = bar.getAttribute('data-bar-width');
        let currentWidth = 0;
        let interval = setInterval(function(){
            if (currentWidth > targetWidth){
                clearInterval(interval);
                return;
            }
            currentWidth++;
            bar.style.width = currentWidth + '%';
        }, 15);
    }
}

function checkScroll() {
    // You have to check wheather still container is visible
    var coordinates = skillsContainer.getBoundingClientRect();
    if (!animationDone && coordinates.top < window.innerHeight){
        animationDone = true;
        console.log('skills section vis');
        fillBars();
    }
    else if (coordinates.top > window.innerHeight){
        animationDone = false;
        initializeBars();
    }
}