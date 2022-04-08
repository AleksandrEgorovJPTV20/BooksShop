var debug = true;
function isDebug(message){
    if(debug) console.log(message);    
}
const menuBooksShop = document.getElementById("menu_book_shop");
menuBooksShop.addEventListener('click', a => {
    a.preventDefault();
    deactivateMenuBtn(menuBooksShop);
});

const menuAddAuthor = document.getElementById("menu_add_author");
menuAddAuthor.addEventListener('click', a => {
    a.preventDefault();
    activeBtnMenu(menuAddAuthor);
});

const menuAddBook = document.getElementById("menu_add_book");
menuAddBook.addEventListener('click', a => {
    a.preventDefault();
    activeBtnMenu(menuAddBook);
});

const menuPurchases = document.getElementById("menu_purchases");
menuPurchases.addEventListener('click', a => {
    a.preventDefault();
    activeBtnMenu(menuPurchases);
});

const menuProfile = document.getElementById("menu_profile");
menuProfile.addEventListener('click', a => {
    a.preventDefault();
    activeBtnMenu(menuProfile);
});

const menuAdminPanel = document.getElementById("menu_admin_panel");
menuAdminPanel.addEventListener('click', a => {
    a.preventDefault();
    activeBtnMenu(menuAdminPanel);
});

const infoElement = document.getElementById("info");
const menuLogin = document.getElementById("menu_login");
menuLogin.addEventListener('click',toggleBtnLogin);
const menuLogout = document.getElementById("menu_logout");
menuLogout.addEventListener('click',toggleBtnLogin);

function toggleBtnLogin(){
    isDebug("Переключаем меню входа");
    if(menuLogin.classList.contains("d-none")){
        showBtnLogin();
        toggleShowMenu();
        infoElement.innerHTML = "Вы вышли";
    }else{
        hiddenBtnLogin();
        toggleShowMenu();
        infoElement.innerHTML = "Вы вошли";
    }
}

function showBtnLogin(){
    isDebug("Показываем кнопку Входа");
    menuLogin.classList.remove("d-none");
    menuLogout.classList.add("d-none");
}

function hiddenBtnLogin(){
    isDebug("Показываем кнопку Выхода");
    menuLogin.classList.add("d-none");
    menuLogout.classList.remove("d-none");
}

function toggleShowMenu(){
    if(menuAddAuthor.classList.contains("d-none")){
        ShowBtnsMenu();
    }else{
        hiddenBtnsMenu();
    }
}

function ShowBtnsMenu() {
    menuAddAuthor.classList.remove("d-none");
    menuAddBook.classList.remove("d-none");
    menuPurchases.classList.remove("d-none");
    menuProfile.classList.remove("d-none");
    menuAdminPanel.classList.remove("d-none");
}

function hiddenBtnsMenu() {
    menuAddAuthor.classList.add("d-none");
    menuAddBook.classList.add("d-none");
    menuPurchases.classList.add("d-none");
    menuProfile.classList.add("d-none");
    menuAdminPanel.classList.add("d-none");    
}

function activeBtnMenu(activeMenuBtn){
    if(!activeMenuBtn.classList.contains('active')){
        isDebug("Добавили active");
        activeMenuBtn.classList.add('active');
    }
    deactivateMenuBtn(activeMenuBtn)
}

function deactivateMenuBtn(activeMenuBtn){
    const listNav = document.getElementsByClassName('nav-link')
    for(let i = 0; i < listNav.length; i++){
        if(listNav[i] !== activeMenuBtn && listNav[i].classList.contains('active')){
            listNav[i].classList.remove('active');
            isDebug("Удалили active");
        }
    }
}