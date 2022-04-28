package jsontools;

import entity.Author;
import entity.Book;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;


public class BookJsonBuilder {
    public JsonArray getBooksJsonArray(List<Book> listBook){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for(int i = 0; i<listBook.size();i++){
            jab.add(getBookJsonObject(listBook.get(i)));
        }
        return jab.build();
    }
    public JsonObject getBookJsonObject(Book book){
        JsonObjectBuilder job =  Json.createObjectBuilder();
        job.add("id",book.getId());
        job.add("BookName",book.getBookName());
        job.add("publishedYear",book.getPublishedYear());
        job.add("quantity",book.getQuantity());
        return job.build();
    }
}
