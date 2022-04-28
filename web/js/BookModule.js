import {viewModule} from './ViewModule.js';
class BookModule {
    createNewBook(){
        const bookName = document.getElementById('bookName').value;
        const publishedYear = document.getElementById('publishedYear').value;
        const selectAuthors = document.getElementById('select_author').value;
        const quantity = document.getElementById('quantity').value;
        const newBook = {
            "bookName": bookName,
            "publishedYear": publishedYear,
            "selectAuthors": selectAuthors,
            "quantity": quantity
        };
        const promise = fetch('createNewBook',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            body: JSON.stringify(newBook) 
        });
        promise.then(response => response.json())
               .then(response =>{
                   if(response.status){
                       document.getElementById('info').innerHTML = response.info;
                       viewModule.showNewBookForm();
                   }else{
                       document.getElementById('info').innerHTML = response.info;
                       bookName = response.bookName;
                       publishedYear = response.publishedYear;
                       selectAuthors = response.selectAuthors;
                       quantity = response.quantity;
                   }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера: '+error;
                });         
    }
    insertListBooks(){
        const promiseListBooks = fetch('getListBooks',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            }
        });
        promiseListBooks
                .then(response => response.json())
                .then(response =>{
                    if(response.status){
                        const select = document.getElementById('select_books');
                        select.options.length=0;
                        let option = document.createElement('option');
                        option.text = "Выберите книгу";
                        option.value = '';
                        select.add(option);
                        for(let i=0; i<response.books.length; i++){
                            option = document.createElement('option');
                            option.text = response.books[i].bookName+' '+response.books[i].publishedYear;
                            option.value = response.books[i].id;
                            select.add(option);
                        }
                    }else{
                       document.getElementById('info').innerHTML = response.info;  
                    }
                })
                .catch(error=>{
                    document.getElementById('info').innerHTML = 'Ошибка сервера: '+error;
                });
    }
}
const bookModule = new BookModule();
export{bookModule};