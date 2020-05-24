const newwidth = document.getElementById('menu');
window.addEventListener("scroll", function () {
    let offset = this.window.pageYOffset;
    var windowCoords = document.documentElement.clientHeight;
    if (document.documentElement.clientHeight - 50  > offset) {
        newwidth.classList.remove(`menu_fix`);
        newwidth.classList.add(`menu_unfixed`);
        newwidth.style.height = windowCoords - offset + "px";
    }
    else {
        newwidth.style.height = 55 + "px";
        newwidth.classList.remove(`menu_unfixed`);
        newwidth.classList.add(`menu_fix`);
    }

});

document.body.onload = function () {
    displayCategoryPage();
    getCategories();

    setTimeout(function () {
        var preloader = document.getElementById(`page-preloader`);
        if (!preloader.classList.contains(`done`)) {
            preloader.classList.add(`done`);
        }
    }, 1700);
}

function hide_preloader() {
    setTimeout(function () {
        var preloader = document.getElementById(`page-preloader`);
        if (!preloader.classList.contains(`done`)) {
            preloader.classList.add(`done`);
        }
    }, 1700);
   
}

function opensModalWindow() {
    var mwind = document.getElementById(`modal_window`);
    mwind.style.display = "block";
}

function closesModalWindow() {
    var mwind = document.getElementById(`modal_window`); 
    window.onclick = function (e) {
        if (e.target == mwind) {
            mwind.style.display = "none";
        }
    }
}


function openModalWindow(id) {
    var mwind = document.getElementById(`modal_window`+id);
    mwind.style.display = "block";
}

function closeModalWindow(id) {
    var mwind = document.getElementById(`modal_window` + id);
    window.onclick = function (e) {
        if (e.target == mwind) {
            mwind.style.display = "none";
        }
    }
}