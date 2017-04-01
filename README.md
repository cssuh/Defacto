# Defacto
An open source, crowd sourcing information initiative to stop the dissemination of so called "fake news" and "alternative facts."

DeFacto utilizes machine learning techniques as well as other apis to help you determine whether or not news sources are credible.
DeFacto also collects helpful data about news sources that can be used for data analysis, tracking, and machine learning seeding.

- Actively collects information on credible and non-credible sources/articles
- Machine learning and NLP
- Changes credibility values based on user input

## REST API
DeFacto's RESTful API can provide useful information such as:  
- Truthiness rating on articles
- User submitted fact checks
- Satire rating
- Article sentiment (A rating of the article's positivity)

### Endpoints
baseURL : localhost:3000/api/  
<table>
    <tr>
        <th> Endpoint </th>
        <th> API </th>
    </tr>
    <tr>
        <td> Article </td>
        <td>
            <table>
                <tr>
                    <th> Method </th>
                    <th> Description </th>
                    <th> Params/Body </th>
                </tr>
                <tr>
                    <td> GET </td>
                    <td> Returns a list of recently uploaded articles </td>
                    <td> 
                        <table>
                            <tr>
                                <td>limit</td><td>The number of articles to return per page</td>
                            </tr>
                            <tr>
                                <td>page</td><td>The page to return</td>
                            </tr>
                            <tr>
                                <td>sort</td><td>The field used to sort results. Possible values: "rating"</td>
                            </tr>
                            <tr>
                                <td>order</td><td>The order results are sorted in. Possible values: "asc", "desc"</td>
                            </tr>
                            <tr>
                                <td>rge</td><td>Only return articles with rating greater than or equal to a value</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td> POST </td>
                    <td> Creates a new article </td>
                    <td> 
                        <table>
                            <tr>
                                <td>title</td><td>Article Title</td>
                            </tr>
                            <tr>
                                <td>Authors</td><td>Comma seperated list of authors</td>
                            </tr>
                            <tr>
                                <td>site</td><td>Name/Url of website article was found on</td>
                            </tr>
                            <tr>
                                <td>url</td><td>URL of article</td>
                            </tr>
                            <tr>
                                <td>comments</td><td>Comments that should be included with the new article</td>
                            </tr>
                            <tr>
                                <td>published</td><td>Article publication date</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td> Article/url/:url </td>
        <td>
            <table>
                <tr>
                    <th> Method </th>
                    <th> Description </th>
                    <th> Params/Body </th>
                </tr>
                <tr>
                    <td> GET </td>
                    <td> Searches for an article by its url in the database </td>
                    <td> 
                        <table>
                            <tr>
                                <td>url</td><td>The url of the article to be searched. The url must be escaped or uri encoded.</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td> PUT </td>
                    <td> Searches for an article by its url in the database and if found uploads it as a comment. </td>
                    <td> 
                        <table>
                            <tr>
                                <td>Comment</td><td>The comment text</td>
                                <td>Author</td><td>The author of the comment</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

#### Response
```js
/*
 * Article Response Fields
 */
{
    // title of article
    title : String,
    // author(s) of article
    authors: [String],
    // summary of article
    summary : String,
    // website article comes from
    site : {
        type : String,
        ref : 'Site'
    },
    // url of article
    url : String,
    // rating of particular article
    rating : Number,
    // article keywords
    keywords : [String],
    // user-moderated content on particular article
    comments : [{author : String, comment : String}],
    // date article was published
    published: {
        default: Date.now(),
        type: Date
    }
}
```


## DeFacto.js
DeFacto's JS library allows you to interact with our API easily.

### Methods

## Extension
[The DeFacto Chrome Extension]()




Chris Suh, Khauri McClain, Noor Rahman, Colin Lightfoot