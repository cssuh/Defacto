# Defacto
An open sourced initiative to stop the dissemination of so called "fake news" and "alternative facts."

DeFacto utilizes machine learning techniques as well as other apps

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
        <th> Method </th>
        <th> Description </th>
        <th> Params </th>
    </tr>
    <tr>
        <td> /Article </td>
        <td> GET </td>
        <td> Returns a list of recently uploaded articles </td>
        <td> 
            <table>
                <tr>
                    <td>Limit</td><td>The number of articles to return</td>
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