package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.mvc.*;

import scala.util.parsing.json.JSON;
import views.html.*;

import javax.inject.Inject;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    private List<String> wordList;
    private String randomWord;

    @Inject
    public void HomeController(){
        try {
            this.wordList = Files.readAllLines(Paths.get("app/data/wordlist"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Result getRandomWord(){
        Random random = new Random();
        int wordIndex = random.nextInt(wordList.size());
        randomWord = wordList.get(wordIndex);
        return ok(randomWord);
    }

    public Result index() {
        return ok(index.render("Your new application is ready."));
    }
    public Result giveup() {
        return ok(wordList.get(0));
    }

    public Result submit() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String word = json.findPath("word").textValue();
            if(word == null) {
                return badRequest("Missing parameter [name]");
            } else {
                return ok(word);
            }
        }
    }

    public ArrayList<String> myCombinator(String active, String rest, ArrayList<String> wordList){
        String subRest;
        if (rest.length() == 0){
            wordList.add(active);
        }
        else{
            subRest = rest.substring(1);
            myCombinator(active+rest.charAt(0),subRest,wordList);
            myCombinator(active,subRest,wordList);
        }
        return wordList;
    }

}
