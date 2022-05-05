import {loginModule} from './LoginModule.js';
import {authorModule} from './AuthorModule.js';
import {bookModule} from './BookModule.js';

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
            <h3 id="titlePageAuthor" class="card-header w-100 text-center ">Добавление автор</h3>
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
                <input type="text" class="form-control" id="birth_year" placeholder="Год рождения">
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
            document.getElementById('titlePageAuthor').innerHTML = 'Автор изменён';
        });
        document.getElementById("select_authors").addEventListener('change', (e)=>{
            e.preventDefault();
            authorModule.editAuthor();
            document.getElementById('btn_add_author').classList.add('d-none');
            document.getElementById('btn_update_author').classList.remove('d-none');
            document.getElementById('titlePageAuthor').innerHTML = 'Редактирование данных автора';
        });
        authorModule.insertListAuthors(true);
    };
   showNewBookForm(){
        const content = document.getElementById('content');
        content.innerHTML = `
        <div class="card border-secondary mb-3 mx-auto" style="max-width: 30rem;">
            <h3 id="titlePageBook" class="card-header w-100 text-center ">Добавление книги</h3>
            <div class="card-body">
              <div class="form-group">
                <label for="bookName" class="form-label mt-4">Название книги</label>
                <input type="hidden" id="book_id">
                <input type="text" class="form-control" id="bookName" placeholder="Название">
              </div>
              <div class="form-group mt-2">
                <label for="select_authors" class=" col-form-label mt-2">Список авторов</label>
                <select multiple row="5" class="col-sm-10 form-select form-control-plaintext" id="select_authors">
                </select>
              </div>
              <div class="form-group">
                <label for="publishedYear" class="form-label mt-4">Год издания</label>
                <input type="text" class="form-control" id="publishedYear" placeholder="Год">
              </div>
              <div class="form-group">
                <label for="quantity" class="form-label mt-4">Количество экземпляров</label>
                <input type="text" class="form-control" id="quantity" placeholder="Экземпляры">
              </div>
              <button id='btn_add_book' type="submit" class="w-50 btn btn-primary my-3 d-flex justify-content-center mx-auto">Добавить книгу</button>
              <button id='btn_update_book' type="submit" class="w-50 btn btn-primary my-3 d-flex justify-content-center mx-auto d-none">Изменить книгу</button>
            </div>
        </div>
        <div class="card border-secondary mb-3 mx-auto" style="max-width: 40rem;">
            <div class="card-body d-flex justify-content-center">
                <div class="w-100 form-group">
                    <label for="select_books" class="form-label mt-2">Список Книг</label>
                    <select class="form-select" id="select_books">
                    </select>
                </div>
            </div>
        </div>`;
        document.getElementById("btn_add_book").addEventListener('click', (e)=>{
            e.preventDefault();
            bookModule.createNewBook();
        });
        document.getElementById("btn_update_book").addEventListener('click', (e)=>{
            e.preventDefault();
            //bookModule.updateBook();
            document.getElementById('btn_add_book').classList.remove('d-none');
            document.getElementById('btn_update_book').classList.add('d-none');
            document.getElementById('titlePageBook').innerHTML = 'Книга изменена';
        });
        document.getElementById("select_books").addEventListener('change', (e)=>{
            e.preventDefault();
            //bookModule.editBook();
            document.getElementById('btn_add_book').classList.add('d-none');
            document.getElementById('btn_update_book').classList.remove('d-none');
            document.getElementById('titlePageBook').innerHTML = 'Редактирование данных книги';
        });
        authorModule.insertListAuthors(false);
        bookModule.insertListBooks();
    };

}

const viewModule = new ViewModule();
export {viewModule};