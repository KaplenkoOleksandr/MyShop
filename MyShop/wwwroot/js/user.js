var page = document.getElementById('page');
var scripts = document.getElementById('page_scripts');

const uriU = 'api/Users';
let users = [];

let userId = 0;

function setUserId(id){
    window.localStorage.setItem('userId', id);
}
function getUserId() {
    return window.localStorage.getItem('userId');
}

function getUsers(id) {
    fetch(`${uriU}/${id}`)
        .then(response => response.json())
        .then(data => _displayUsers(data))
        .catch(error => console.error('Unable to get categories.', error));
}

function _displayUsers(data) {
    const div = document.getElementById('user_info');
        div.innerHTML = `
            <div style="height:99%; width:99%; background-color:black; margin:auto; top:0.5%; position:relative; border-radius:30px; color:white">
                ${data.id} </br>
                ${data.name} </br>
                ${data.password} </br>
                ${data.role} </br>
                ${data.money} </br>
<div style="color:white" onclick="setUserId(0); location.reload();">Exit</div>
            </div>
    `;

    users = data;
}

function registerUser() {
    const uname = document.getElementById('select-name').value.trim();
    const upassword = document.getElementById('select-password').value.trim();
    findUserWithOutId(uname, upassword);
}

function addUser() {

    const uname = document.getElementById('create-name').value.trim();
    const upassword = document.getElementById('create-password').value.trim();

    const user = {
        name: uname,
        password: upassword,
        role: "user",
        money: 0,
    };

    fetch(uriU, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.error('Unable to add category.', error));

    setTimeout(function () { location.reload(); }, 1700);
}

function findUserWithOutId(name, password) {
    fetch(uriU)
        .then(response => response.json())
        .then(data => _selectUser(data, name, password))
        .catch(error => console.error('Unable to get categories.', error));
}

function _selectUser(data, name, password) {

    fetch(uriU, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .catch(error => console.error('Unable to add category.', error));

    data.forEach(us => {

        if (us.name == name && us.password == password) {
            setUserId(us.id);
            checkAuthU();
        }
    });
}

function displayUserPage() {
    page.innerHTML = `
    <div id="page-preloader" class="preloader" style="z-index:100000">
        <div class="loader"></div>
        <div class="loader-text">Loading</div>
        <div class="shop-text">Shop</div>
    </div>
    <div style="height:100vh; width:65%; position:absolute; left:35%; background-color:black">
        <div id="user_info" style="position:relative; margin:auto; margin-top:40px; width:80%; height:90vh; background-color: rgba(255, 254, 225, 0.90); border-radius:30px;">

        </div>
    </div>
`;
    hide_preloader();
}

function checkAuthU() {
    if (getUserId() == 0) {
        opensModalWindow();
    }
    else {
        getUsers(getUserId());
        displayUserPage();
    }
}