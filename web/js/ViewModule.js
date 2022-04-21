import {loginModule} from './LoginModule.js';
import {authorModule} from './AuthorModule.js';

class ViewModule {
    showLoginForm(){
        const content = document.getElementById('content');
        content.innerHTML = `
        <div class="card border-secondary mb-3 mx-auto" style="max-width: 30rem;">
            <h3 class="card-header w-100 text-center ">Авторизация</h3>
            <div class="card-body">
              <div class="form-group">
                <label for="login" class="form-label mt-4">Логин</label>
                <input type="text" class="form-control" id="login" placeholder="Логин">
              </div>
              <div class="form-group">
                <label for="password" class="form-label mt-4">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Пароль">
              </div>
              <button id='button_login' type="submit" class="w-50 btn btn-primary my-3 d-flex justify-content-center mx-auto">Войти</button>
            </div>
        </div>`;
        const buttonLogin = document.getElementById("button_login");
        buttonLogin.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.sendCredential();
        });
    };
   showNewAuthorForm(){
        const content = document.getElementById('content');
        content.innerHTML = `
        <div class="card border-secondary mb-3 mx-auto" style="max-width: 30rem;">
            <h3 class="card-header w-100 text-center ">Добавление автор</h3>
            <div class="card-body">
              <div class="form-group">
                <label for="firstname" class="form-label mt-4">Имя</label>
                <input type="hidden" id="author_id">
                <input type="text" class="form-control" id="firstname" placeholder="Имя">
              </div>
              <div class="form-group">
                <label for="lastname" class="form-label mt-4">Фамилия</label>
                <input type="text" class="form-control" id="lastname" placeholder="Фамилия">
              </div>
              <div class="form-group">
                <label for="birth_year" class="form-label mt-4">Год рождения</label>
                <input type="test" class="form-control" id="birth_year" placeholder="Год рождения">
              </div>
              <button id='btn_add_author' type="submit" class="w-50 btn btn-primary my-3 d-flex justify-content-center mx-auto">Добавить автора</button>
              <button id='btn_update_author' type="submit" class="w-50 btn btn-primary my-3 d-flex justify-content-center mx-auto d-none">Изменить автора</button>
            </div>
        </div>
        <div class="card border-secondary mb-3 mx-auto" style="max-width: 40rem;">
            <div class="card-body d-flex justify-content-center">
                <div class="w-100 form-group">
                    <label for="select_authors" class="form-label mt-2">Список авторов</label>
                    <select class="form-select" id="select_authors">
                    </select>
                </div>
            </div>
        </div>`;
        document.getElementById("btn_add_author").addEventListener('click', (e)=>{
            e.preventDefault();
            authorModule.createNewAuthor();
        });
        document.getElementById("btn_update_author").addEventListener('click', (e)=>{
            e.preventDefault();
            authorModule.updateAuthor();
            document.getElementById('btn_add_author').classList.remove('d-none');
            document.getElementById('btn_update_author').classList.add('d-none');
        });
        document.getElementById("select_authors").addEventListener('change', (e)=>{
            e.preventDefault();
            authorModule.editAuthor();
            document.getElementById('btn_add_author').classList.add('d-none');
            document.getElementById('btn_update_author').classList.remove('d-none');
        });
        authorModule.insertListAuthors();
    };
}

const viewModule = new ViewModule();
export {viewModule};