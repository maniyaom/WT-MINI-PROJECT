let url = 'https://newsapi.org/v2/top-headlines?';
let API_KEY = 'YOUR_API_KEY';
async function fetchNews(){
    // const result = await fetch(`${url}country=in&apiKey=${API_KEY}`);
    const result = await fetch(`https://newsapi.org/v2/everything?q=india&language=en&from=2023-10-19&to=2023-10-19&sortBy=popularity&apiKey=`+API_KEY);
    
    let data = await result.json();
    localStorage.setItem("newsArticles",JSON.stringify(data.articles));
    fillNews();
}

function fillNews(){
    let data = JSON.parse(localStorage.getItem("newsArticles"));

    document.getElementsByClassName("main")[0].innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        if(data[i].urlToImage === null){
            continue;
        }

        // Id for news card elements
        let news_provider_id = "news_provider_info_"+i;
        let news_title_id = "news_title_"+i;
        let news_description_id = "news_description_"+i;
        let news_image_id = "news_image_"+i;

        document.getElementsByClassName("main")[0].innerHTML += 
        `<div class="news-card">
            <div class="news-card-left">
                <div class="news-provider-info" id=`+news_provider_id+`><b>`+data[i].source.name+`</b> &bull; `+data[i].publishedAt.slice(0,10)+`</div>
                <div class="news-title" id=`+news_title_id+`>
                    <p>`+data[i].title+`</p>
                </div>
                <div class="news-description" id=`+news_description_id+`>
                    <p>`+data[i].description+`</p>
                </div>
            </div>
            <div class="news-card-right">
                <img src=`+data[i].urlToImage+` alt="News-Image" class="news-image" id=`+news_image_id+`>
            </div>
        </div>`
    }
    console.log(data);
    console.log(data[0].source.name);
    console.log(data[0].description);
    console.log(data[0].title);
    console.log(data[0].publishedAt.slice(0,10));
}

fetchNews();