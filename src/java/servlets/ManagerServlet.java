/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.Author;
import entity.Book;
import entity.Reader;
import entity.Role;
import entity.User;
import entity.UserRoles;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jsontools.AuthorJsonBuilder;
import jsontools.BookJsonBuilder;
import session.AuthorFacade;
import session.BookFacade;
import session.ReaderFacade;
import session.RoleFacade;
import session.UserFacade;
import session.UserRolesFacade;
import tools.PasswordProtected;

@WebServlet(name = "ManagerServlet", urlPatterns = {
    "/createNewAuthor",
    "/getListAuthors",
    "/getAuthor",
    "/updateAuthor",
    "/createNewBook",
    "/getListBooks",
    "/getBook",
    "/updateBook",
})
public class ManagerServlet extends HttpServlet {
    @EJB private AuthorFacade authorFacade;
    @EJB private UserFacade userFacade;
    @EJB private ReaderFacade readerFacade;
    @EJB private RoleFacade roleFacade;
    @EJB private UserRolesFacade userRolesFacade;
    @EJB private BookFacade bookFacade;
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        HttpSession session = null;
        JsonObjectBuilder job = Json.createObjectBuilder();
        String path = request.getServletPath();
        switch (path) {
            case "/createNewAuthor":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jsonObject = jsonReader.readObject();
                String firstname = jsonObject.getString("firstname","");
                String lastname = jsonObject.getString("lastname","");
                String birthYear = jsonObject.getString("birthYear","");
                if("".equals(firstname) || "".equals(lastname) || "".equals(birthYear)){
                    job.add("info","Заполните все поля")
                        .add("firstname",firstname)
                        .add("lastname",lastname)
                        .add("birthYear",birthYear);
                    try (PrintWriter out = response.getWriter()){
                       out.println(job.build().toString()); 
                    }
                    break;
                }
                Author newAuthor = new Author();
                newAuthor.setFirstname(firstname);
                newAuthor.setLastname(lastname);
                newAuthor.setBirthYear(Integer.parseInt(birthYear));
                authorFacade.create(newAuthor);
                job.add("info", "Вы добавили автора: "+newAuthor.getFirstname()+ " " + newAuthor.getLastname())
                    .add("status",true);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getListAuthors":
                List<Author> listAuthors = authorFacade.findAll();
                AuthorJsonBuilder ajb = new AuthorJsonBuilder();
                job.add("status",true);
                job.add("info","Создан массив авторов");
                job.add("authors",ajb.getAuthorsJsonArray(listAuthors));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getAuthor":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String authorId = jsonObject.getString("authorId","");
                Author author = authorFacade.find(Long.parseLong(authorId));
                ajb = new AuthorJsonBuilder();
                job.add("info", "Редактируем автора: "+author.getFirstname()+" "+author.getLastname());
                job.add("status", true);
                job.add("author", ajb.getAuthorJsonObject(author));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/updateAuthor":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                authorId = jsonObject.getString("authorId","");
                firstname = jsonObject.getString("firstname","");
                lastname = jsonObject.getString("lastname","");
                birthYear = jsonObject.getString("birthYear","");
                Author updateAuthor = authorFacade.find(Long.parseLong(authorId));
                updateAuthor.setBirthYear(Integer.parseInt(birthYear));
                updateAuthor.setLastname(lastname);
                updateAuthor.setFirstname(firstname);
                authorFacade.edit(updateAuthor);
                job.add("info", "Автор изменен");
                job.add("status", true);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/createNewBook":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String bookName = jsonObject.getString("bookName","");
                String publishedYear = jsonObject.getString("publishedYear","");
                JsonArray selectAuthors = jsonObject.getJsonArray("selectAuthors");
                String quantity = jsonObject.getString("quantity","");
                if("".equals(bookName) || "".equals(quantity) || "".equals(publishedYear) || selectAuthors.isEmpty()){
                    job.add("info","Заполните все поля")
                        .add("status",false)
                        .add("bookName",bookName)
                        .add("publishedYear",publishedYear)
                        .add("selectAuthors",selectAuthors)
                        .add("quantity",quantity);
                    try (PrintWriter out = response.getWriter()){
                       out.println(job.build().toString()); 
                    }
                    break;
                }
                Book newBook = new Book();
                newBook.setBookName(bookName);
                newBook.setPublishedYear(Integer.parseInt(publishedYear));
                List<Author> authors = new ArrayList<>();
                for(int i=0; i< selectAuthors.size();i++){
                    String jsonAuthorId = selectAuthors.getString(i);
                    authors.add(authorFacade.find(Long.parseLong(jsonAuthorId)));
                }
                newBook.setAuthor(authors);
                newBook.setQuantity(Integer.parseInt(quantity));
                newBook.setCount(newBook.getQuantity());
                bookFacade.create(newBook);
                job.add("info", "Вы добавили книгу: "+newBook.getBookName())
                    .add("status",true);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getListBooks":
                List<Book> listBooks = bookFacade.findAll();
                BookJsonBuilder bjb = new BookJsonBuilder();
                job.add("status",true);
                job.add("info","Создан массив книг");
                job.add("books",bjb.getBooksJsonArray(listBooks));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getBook":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String bookId = jsonObject.getString("bookId","");
                Book book = bookFacade.find(Long.parseLong(bookId));
                bjb = new BookJsonBuilder();
                job.add("info", "Редактируем книгу: "+book.getBookName());
                job.add("status", true);
                job.add("book", bjb.getBookJsonObject(book));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/updateBook":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                bookId = jsonObject.getString("bookId","");
                bookName = jsonObject.getString("bookName","");
                publishedYear = jsonObject.getString("publishedYear","");
                selectAuthors = jsonObject.getJsonArray("selectAuthors");
                quantity = jsonObject.getString("quantity","");
                if("".equals(bookName) || "".equals(quantity) || "".equals(publishedYear) || selectAuthors.isEmpty()){
                    job.add("info","Заполните все поля")
                        .add("status",false)
                        .add("bookName",bookName)
                        .add("publishedYear",publishedYear)
                        .add("selectAuthors",selectAuthors)
                        .add("quantity",quantity);
                    try (PrintWriter out = response.getWriter()){
                       out.println(job.build().toString()); 
                    }
                    break;
                }
                Book updateBook = bookFacade.find(Long.parseLong(bookId));
                updateBook.setBookName(bookName);
                updateBook.setPublishedYear(Integer.parseInt(publishedYear));
                authors = new ArrayList<>();
                for(int i=0; i< selectAuthors.size();i++){
                    String jsonAuthorId = selectAuthors.getString(i);
                    authors.add(authorFacade.find(Long.parseLong(jsonAuthorId)));
                }
                updateBook.setAuthor(authors);
                updateBook.setQuantity(Integer.parseInt(quantity));
                updateBook.setCount(updateBook.getQuantity());
                bookFacade.edit(updateBook);
                job.add("info", "Книга изменена!")
                    .add("status",true);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
