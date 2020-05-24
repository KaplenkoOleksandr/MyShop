function slowScroll(id) {
    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 2000);
    return false;
}

const uri = 'api/Categories';
let categories = [];




function getCategories() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayCategories(data))
        .catch(error => console.error('Unable to get categories.', error));
}

function _displayCategories(data) {
    const div = document.getElementById('categories');
    const li = document.getElementById('listcat');
    data.forEach(category => {

        if (category.isActive)
        {
            div.innerHTML += `
            <div id="${category.id}" style="height:120vh; width:100%; background-image:url(${category.backgroundImagePath}); background-size: cover; background-attachment:fixed; position:relative;">
                <div class="cat_header">
                    <div class="cat_header_in">
                        ${category.name}
                    </div>
                </div>
                <div  style="position:absolute; top:8px; right:3px; height:60vh; width:35px; ">
                    <button id="open_modal_window" class="setting_button" style="position:sticky; top:10px;" onclick="openModalWindow(${category.id});">
                        <div class="setting_button_anim"></div>
                    </button>    
                    <div id="modal_window${category.id}" class="modal_window" onclick="closeModalWindow(${category.id})">
                        <div class="modal_window_content" style="padding-top:15px;">
                                  <button onclick='displayEditForm(${category.id})' class="edit-delet">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Edit
                                    </button>
                                    <button class="edit-delet" onclick='deleteCategory(${ category.id })'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Delete
                                    </button>
                    <form style="position:absolute; top:70%; left:50%; transform: translate(-50%, -50%);" action="javascript:void(0);" onsubmit="updateCategory(${category.id})">
                        <input type="hidden" id="edit-id${category.id}">
                        <input type="text" class="form-control" id="edit-name${category.id}">
                        <input type="checkbox" id="edit-act${category.id}">
                        <input type="file" accept="image/*" id="edit-path${category.id}">
                        <input type="submit" value="Save">
                    </form>
                        </div>
                    </div>
                </div>


                <div  class="searchprod">
                    <a style="color:white" onclick="displayProductsPage(); getProducts(${category.id})" class="searchprod_text">Search</a>
                </div>
            </div >`;

            li.innerHTML += `
                <li style="margin-top:10px">
                    <a href="javascript://0" onclick="slowScroll('#${category.id}')"><div class="content">${category.name}</div><img src="../menu/button.png"></a>
                </li>`;
        
        }

    });

    categories = data;
}

function getNonActiveCategories() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayNonActiveCategories(data))
        .catch(error => console.error('Unable to get categories.', error));
}

function n_displayNonActiveCategories(data) {
    const div = document.getElementById('nonactivecategories');
    const li = document.getElementById('listnonactivecat');
    data.forEach(category => {

        if (!category.isActive) {
            div.innerHTML += `
            <div id="${category.id}" style="height:120vh; width:100%; background-image:url(${category.backgroundImagePath}); background-size: cover; background-attachment:fixed; position:relative;">
                <div  style="position:absolute; top:10px; right:3px; height:60vh; width:35px; ">
                    <button id="open_modal_window" class="setting_button" style="position:sticky; top:10px;" onclick="openModalWindow(${category.id});">
                        <div class="setting_button_anim"></div>
                    </button>    
                    <div id="modal_window${category.id}" class="modal_window" onclick="closeModalWindow(${category.id})">
                        <div class="modal_window_content">
                                   <button onclick='displayEditForm(${category.id})' class="edit-delet">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Edit
                                    </button>
                                    <button class="edit-delet" onclick='deleteCategory(${ category.id })'>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Delete
                                    </button>
                    <form style="position:absolute; top:70%; left:50%; transform: translate(-50%, -50%);" action="javascript:void(0);" onsubmit="updateCategory(${category.id})">
                        <input type="hidden" id="edit-id${category.id}">
                        <input type="text" class="form-control" id="edit-name${category.id}">
                        <input type="checkbox" id="edit-act${category.id}">
                        <input type="file" accept="image/*" id="edit-path${category.id}">
                        <input type="submit" value="Save">
                    </form>
                        </div>
                    </div>
                </div>
            </div >`;

            li.innerHTML += `
                <li style="margin-top:10px">
                    <a href="javascript://0" onclick="slowScroll('#${category.id}')"><div class="content">${category.name}</div><img src="../menu/button.png"></a>
                </li>`;

        }

    });

    categories = data;
}


function addCategory() {
    const addNameTextbox = document.getElementById('add-name');
    const addBackgroundImagePathTextbox = document.getElementById('add-path');
    const addIsActiveTextbox = document.getElementById('add-act');


    const category = {
        name: addNameTextbox.value.trim(),
        backgroundImagePath: /Categories/ + $('#add-path').val().substring($('#add-path').val().lastIndexOf("\\")+1, $('#add-path').val().length),
        isActive: addIsActiveTextbox.checked
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
        .then(response => response.json())
        .then(() => {
            addNameTextbox.value = '';
            addBackgroundImagePathTextbox.value = '';
            addIsActiveTextbox.value = '';
            location.reload();
        })
        .catch(error => console.error('Unable to add category.', error));
}





function deleteCategory(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .catch(error => console.error('Unable to delete category.', error));

    setTimeout(function () {
        location.reload();
    }, 700);
}

function displayEditForm(id) {
    const category = categories.find(cat => cat.id == id);

    document.getElementById(`edit-id${category.id}`).value = category.id;
    document.getElementById(`edit-name${category.id}`).value = category.name;
    document.getElementById(`edit-act${category.id}`).checked = category.isActive;
}

function updateCategory(id) {

    const path = /Categories/ + $(`#edit-path${id}`).val().substring($(`#edit-path${id}`).val().lastIndexOf("\\") + 1, $(`#edit-path${id}`).val().length);

    const category = {
        id: id,
        name: document.getElementById(`edit-name${id}`).value.trim(),
        backgroundImagePath: path,
        isActive: document.getElementById(`edit-act${id}`).checked
    };

    fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
        
    })
    .catch(error => console.error('Unable to update category.', error));
    setTimeout(function () {
        location.reload();
    }, 700);

}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function displayCategoryPage() {
    page.innerHTML = `
    <div id="page-preloader" class="preloader" style="z-index:100000">
        <div class="loader"></div>
        <div class="loader-text">Loading</div>
        <div class="shop-text">Shop</div>
    </div>
        <div class="user_icon" onclick="checkAuthU()">
            <div id="modal_window" class="modal_window" onclick="closesModalWindow()">
                <div class="modal_window_content">
                    <div style="width:100%; position:fixed; display:flex; justify-content:space-around; top:15px;">
                        <label for="s1" class="edit-delet">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Sign In
                        </label>
                        <label for="s2" class="edit-delet">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Register
                        </label>
                    </div>
                    <div style="width:100%; position:fixed; top:120px; height:280px;">
                        <input type="radio" name="worksheet" id="s1" checked="checked" />
                        <div style="color:white">
                                <form action="javascript:void(0);" onsubmit="registerUser(); hide_preloader();">
                                <input type="text" id="select-name">
                                <input type="text" id="select-password">
                                <input type="submit" value="Enter" class="edit-delet">
                            </form>
                        </div>
                        <input type="radio" name="worksheet" id="s2" />
                        <div style="color:white">
                            <form action="javascript:void(0);" method="POST" onsubmit="addUser();">
                                <input type="text" id="create-name">
                                <input type="password" id="create-password">
                                <input class="edit-delet" type="submit" value="Add">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="first" style="height: 100vh; width: 100%; background-image: url(/menu/main.jpg); background-size:cover;">
            <nav style="position:fixed; right:50px; top:100px;">
                <ul class="nav-links-vertical">
                    <li>
                        <a href="javascript://0" onclick="slowScroll('#first')"><div class="content">First page</div><img src="../menu/button.png"></a>
                    </li>
                    <li id="listcat"></li>
                    <li style="margin-top:10px;">
                        <a href="javascript://0" onclick="slowScroll('#last')"><div class="content">Last page</div><img style="opacity:0.5" src="../menu/blue.png"></a>
                    </li>
                    <li id="listnonactivecat"></li>
                </ul>
            </nav>
        </div>
        <div id="categories"></div>
        <div id="last" style="height:120vh; width:100%; background-color:black; position:relative;">
            <div class="admin">
                <div id="editCategory">
                    <h3>Add Category</h3>
                    <div style="height:270px; width:480px;"><img id="image_preview" src="" style="height:inherit; width:inherit" alt="" /></div>
                    <button class="btn btn-secondary delete-link remove" type="button" onclick="DeleteImg();">Удалить</button>
                    <form action="javascript:void(0);" method="POST" onsubmit="addCategory()">
                        <input type="text" id="add-name">
                        <input type="checkbox" id="add-act">
                        <input type="file" class="test" accept="image/*" onchange="AddImg();" id="add-path">
                        <input type="submit" value="Add">
                    </form>
                </div>
            </div>
        </div>
        <div id="nonactivecategories"></div>
`;
    hide_preloader();
}