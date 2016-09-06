package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.*;

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
    private List<String> acceptedList;
    private String randomWord;

    final String INCORRECT = "-1";
    final String FINISHED = "1";

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

        ArrayList<String> resultList= new ArrayList<String>();
        acceptedList = myCombinator("",randomWord,resultList);

        Iterator<String> iter = acceptedList.iterator();

        while (iter.hasNext()) {
            String word = iter.next();

            if (!wordList.contains(word))
                iter.remove();
        }

        return ok(randomWord);
    }

    public Result index() {
        return ok();
    }
    public Result giveup() {

        ObjectMapper objectMapper = new ObjectMapper();
        Map<Integer,String> map = new HashMap<>();
        int i=0;
        for (String word : acceptedList){
            map.put(i,word);
            ++i;
        }
        JsonNode json = objectMapper.valueToTree(map);
        return ok(json);
    }

    public Result submit() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String word = json.findPath("word").textValue();
            int count = json.findPath("count").intValue();
            if(word == null) {
                return badRequest("Missing parameter word");
            } else {
                if (acceptedList.contains(word))
                    return (count==acceptedList.size()-1)?ok(FINISHED):ok(word);
                return ok(INCORRECT);
            }
        }
    }

    public ArrayList<String> myCombinator(String active, String rest, ArrayList<String> wordList){
        String subRest;
        if (rest.length() == 0){
            if (wordList.isEmpty()
                    || !wordList.contains(active))
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
