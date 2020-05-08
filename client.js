var Client = {};


let country_input = document.getElementById("country");
let pattern_input = document.getElementById("text");

let submit_button = document.getElementById("submitButton");

console.log('Client 1');

const timeoutPromise = function(ms, promise){

    // Creer une promesse qui est rejeter au bout de ms en millisecondes
    let timeout = new Promise((resolve, reject) => {
      let id = setTimeout(() => {
        clearTimeout(id);
        reject('Timed out in '+ ms + 'ms.')
      }, ms)
    })
  
    // race retourne la promesse qui se manifeste en premier CAD qui retourne soit un resolve ou un reject
    return Promise.race([
      promise,
      timeout
    ])
  }
  
Client.ajax = function (method, url) {
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange",  function () {
            /* quand la requête change à l'état 'terminé' */
            if (this.readyState == 4) {
                if (this.status == 200)
                    resolve(this.response);
                else
                    reject(this.status + " : " + this.responseText);
            }
        });

        /* on commence la requête HTTP */
        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8"); // type de retour
        xhr.setRequestHeader( 'Api-User-Agent', 'M1Info/1.0' ); //spécifique à Wikimedia        /* on définit quelques en-têtes */
        /* on envoie la requête */
        xhr.send();
    })
};


Client.query = async function (params) {
    let paramString = "";
    number_of_params = Object.keys(params).length
    if(number_of_params != 0){
        firstKey = Object.keys(params)[0];
        paramString += "?" + firstKey + "=" + encodeURIComponent(params[firstKey]);

    }
      
    //we concatenate other parameters
    for (var p in params) {
        if(p != "country"){
            if (params.hasOwnProperty (p)) {
                paramString += "&" + p + "=" + encodeURIComponent(params[p]);
            };
        }
    };
    let url = "http://127.0.0.1:8000/country_tweets"
        + paramString;
    console.log("url est ::",url)
    try{
        res = await timeoutPromise(50000,Client.ajax("GET", url));
        return JSON.parse(res);
    }catch(str){
        alert("ERROR")
        res =str
        return res;
    }
};


function getMax(dic){
    keys = Object.keys(dict);
    max = 0 ;
    for (keyi = 0; keyi < keys.length; keyi++) { 
            v = keys[keyi];
            if(max < v ) {
                max = v ;
            }
    }

    return max;
}

    var countries = ['Indonesia', 'Mexico', 'Thailand', '日本', 'United States', 'India',
       'Sri Lanka', 'Ghana', '香港', 'Türkiye', 'México',
       'Dominican Republic', 'Australia', 'Canada', 'Brasil',
       'Republic of Korea', 'Kuwait', 'Malaysia', 'Italia', 'ประเทศไทย',
       'Argentina', 'Nigeria', 'Republic of the Philippines', 'Japan',
       'Estados Unidos', 'Switzerland', 'United Kingdom', 'Ethiopia',
       'South Africa', 'سلطنة عمان', 'Finland', '新加坡', 'France',
       'Colombia', 'Ecuador', "People's Republic of China", 'Qatar',
       'Kingdom of Saudi Arabia', 'The Netherlands',
       'المملكة العربية السعودية', 'Germany', 'Singapore',
       'United Arab Emirates', 'Magyarország', 'Ukraine', 'Turkey',
       'Украина', 'Ireland', 'Sverige', 'Nederland', 'Oman',
       'دولة الكويت', 'Belgium', 'Беларусь', 'المملكة الأردنية الهاشمية',
       'Cyprus', 'Россия', '台灣', 'España', 'Hashemite Kingdom of Jordan',
       'Espanya', 'Austria', 'Latvia', 'Andorra', 'Croacia',
       'Papua New Guinea', 'French Polynesia', 'Kenya', 'Japão', 'Italy',
       'Chile', 'Azerbaijan', 'Svizzera', 'Polska', 'Tailandia',
       'Venezuela', 'Deutschland', 'Taiwan', 'Macau', 'Duitsland',
       'Russia', 'Bulgaria', 'El Salvador', 'Holanda', 'Georgia',
       'الامارات العربية المتحدة', 'Cuba', 'België', 'Irlanda', 'Bhutan',
       'Brazil', "Democratic People's Republic of Korea (North Korea)",
       'भारत', '대한민국', 'New Zealand', 'Frankrijk', 'Tanzania',
       'Etats-Unis', 'Malasia', 'Royaume-Uni', 'Lithuania', 'Namibia',
       'Japon', 'Emiratos Árabes Unidos', 'Nuova Zelanda', 'Sweden',
       'Hungria', 'Україна', 'Malaisie', 'Egypt', 'Suiza', 'Guatemala',
       'Nepal', 'Antarctica', 'Panamá', 'Portugal', 'Hong Kong',
       'Noruega', 'Hrvatska', 'Vietnam', 'Uruguay',
       'Republic of Mauritius', 'Schweiz', 'Costa Rica',
       'Reino de Marruecos', 'Paraguay', 'Peru', 'Česká republika',
       'Österreich', 'Trinidad and Tobago', 'Suíça', 'Bahrain', 'Spain',
       '中华人民共和国', 'Reino Unido', 'Senegal', 'Luxembourg', 'Stati Uniti',
       'Pakistan', 'Danmark', 'Espagne', 'Morocco',
       'Republic of Mozambique', 'Isle of Man', 'Spanje', 'Jamaica',
       'França', 'Dominica', 'Italie', 'Nicaragua', 'مصر', 'Belgique',
       'Rwanda', 'Uganda', 'Haiti', 'Mexique', 'Panama', 'Burundi',
       'Frankrike', 'Zimbabwe', 'República Eslovaca', 'Israel', 'Algeria',
       'ישראל', 'Francia', 'Kazakhstan', 'Greenland', 'Iraq',
       'Islamic Republic of Iran', 'Uruguai', 'Lebanon', 'Espanha',
       'Greece', 'Botswana', 'Япония', 'Iceland', 'Regno Unito', 'Ελλάς',
       'Republika ng Pilipinas', 'Brunei', 'Barbados', 'Bangladesh',
       'Suomi', 'ญี่ปุ่น', 'Inde', 'Việt Nam', 'ニュージーランド', 'România',
       'Bahamas', 'Nueva Zelanda', 'Royaume du Maroc', 'Mexiko',
       'Bolivie', 'Norway', "Lao People's Democratic Republic", 'Angola',
       'Syrian Arab Republic', 'Myanmar', 'Vereinigte Arabische Emirate',
       'Mali', 'Mongolia', 'Suecia', 'Vatican City', 'Benin', 'Albania',
       'Czech Republic', 'Frankreich', "Côte d'Ivoire",
       'Republic of Croatia', 'Former Yugoslav Republic of Macedonia',
       'Slovak Republic', 'Honduras', 'Turchia', 'Republic of Serbia',
       'Cayman Islands', 'تونس', 'مملكة البحرين', 'Bolivia',
       'Republic of Belarus', 'Latvija', 'Romania', 'Poland', 'Canadá',
       'Grenada', 'Islandia', 'Tunisie', 'Norge', 'República Checa',
       'Lesotho', 'Cameroon', 'Allemagne', 'Kanada', 'Monaco', 'България',
       'Zambia', 'Irlande', 'Denmark', 'Luxemburg', 'Saint Lucia',
       'Afghanistan', 'Japón', 'Madagascar', 'Brasile',
       'Polynésie Française', 'French Guiana', 'Liban', 'Malawi',
       'Armenia', 'Jepang', 'Algérie', 'Spanien', 'Storbritannien',
       'Eesti', 'Spagna', 'Alemania', 'Danimarca', 'Republic of Slovenia',
       'جمهوری اسلامی ایران', 'Crna Gora', 'Maldives', 'Gambia',
       'Uzbekistan', 'Ehemalige jugoslawische Republik Mazedonien',
       'Türkei', 'Aruba', 'Rússia', 'Congo', 'Cambodia',
       'Bosnia and Herzegovina', '일본', 'Sint Maarten',
       'Antigua and Barbuda', 'Samoa', 'Moldova', 'Oostenrijk', 'Suisse',
       'Namibië', 'Anguilla', 'République du Bénin', 'Norvegia',
       'Bélgica', 'Hungary', 'Thaïlande', 'Tunisia', 'Slovenija',
       'Swaziland', 'Verenigde Staten', 'Democratic Republic of Congo',
       'Guam', 'Koweït', 'Djibouti', 'Suriname', 'Itália',
       'Saint Barthélemy', 'North Korea', 'Fiji',
       'Turks and Caicos Islands', 'New Caledonia', 'الجزائر', 'Tyskland',
       'Tailândia', 'Ivory Coast', 'Alemanha', 'دولة قطر', 'Guadeloupe',
       'Mauritania', 'پاکستان', 'Srbija', 'Malta', 'Brésil',
       'Burkina Faso', 'Chipre'];
    var list = document.getElementById('anrede');

    countries.forEach(function(item){
       var option = document.createElement('option');
       option.value = item;
       list.appendChild(option);
    });


submit_button.addEventListener("click",function(){
    console.log("helllooooo");
    let jsonexample_param={"country":country_input.value,"pattern":pattern_input.value};
    console.log(Client.query(jsonexample_param));
    let results = Client.query(jsonexample_param).then(function(result) {
        console.log('!!');
        console.log(result);
        
        var tweets_number = document.getElementById("number_tweets");
        tweets_number.innerHTML = "Number of tweets: " + result['length'];
        tweets_number.style.color = '#d00';
        var divHashtags = document.getElementById("hashtagsbar");
        divHashtags.innerHTML = "";
        var hashtag_keys = result['hashtags'];
        var hashtag_values = result['hashtags_count'];

        var hashtags = {};
        hashtag_keys.forEach((key, i) => hashtags[key] = hashtag_values[i]);
        console.log(hashtags);

        values = Object.values(hashtag_values)
        var max = Math.max.apply(Math, values)    // 1

        
        console.log(max);
        
    
        
        hashtag_keys.forEach((key, i) =>{
                console.log(key +"\n")
                var li = document.createElement("LI")

                var hashtagTtile = document.createElement("h3")
                hashtagTtile.innerHTML = key + "( " + hashtags[key] +" )"
                var hashtagSpan1 = document.createElement("span")

                var hashtagSpan2 = document.createElement("span")
                

                hashtagSpan1.setAttribute("class", "bar")
                hashtagSpan2.setAttribute("class","bar" )
                var width =  hashtags[key] *100 / max ; 
                console.log(width);
                hashtagSpan2.style.width = width  +"%";
                /*hashtagSpan2.style = {
                    ...hashtagSpan2.style,
                    width
                };*/
    
                li.appendChild(hashtagTtile)
                hashtagSpan1.appendChild(hashtagSpan2)
                li.appendChild(hashtagSpan1)
                

                divHashtags.appendChild(li)

        });
        console.log('la');
        let res_hashtags = [];
        
        for(let i = 0; i < 10; i++){
            res_hashtags.push({'name':hashtag_keys[i], 'score':hashtag_values[i]});
        }
        
        let res_languages = [];
        for(let i = 0; i < 10; i++){
            res_languages.push({'name':result['lang_country'][i], 'score':result['lang_count'][i]});
        }
        let res_places = [];
        for(let i = 0; i < 10; i++){
            res_places.push({'name':result['places_country'][i], 'score':result['places_count'][i]});
        }
        console.log("avant");
        console.log(result['hashtag_count']);
        createGraph("chart1", "Top hashtags", res_hashtags, Math.max(...result['hashtags_count']));
        createGraph("chart2", "Top languages", res_languages, Math.max(...result['lang_count']));
        createGraph("chart3", "Top places", res_places, Math.max(...result['places_count']));

        let res_coord = [];
        for(let i = 0; i < result['latitude'].length; i++){
            res_coord.push({'lat':result['latitude'][i], 'lon':result['longitude'][i]});
        }
        
        let map_div = document.getElementById("map_container");
        let map = document.getElementById("map");
        let map_size = { x : map.width, y : map.height };
        
        for(let i = 0; i < result['latitude'].length; i++){
               let pt = create_map_point(res_coord[i].lat, res_coord[i].lon, 5, map);
                //pt.innerHTML = "15";
                map_div.appendChild(pt);
        }

        var list_tweets = document.getElementById('text-tweet');
        
        for(let i = 0; i < result['text'].length; i++){
            var text_tweet_i = result['text'][i];
            var entry = document.createElement('li');
            entry.appendChild(document.createTextNode(text_tweet_i));
            list_tweets.appendChild(entry);  
        }



        console.log(res_coord);

        /*var myBarchart = new Barchart(
            {   
                canvas:myCanvas,
                type: "horizontalBar",
                seriesName:"Trends",
                padding:20,
                gridScale:5,
                gridColor:"#eeeeee",
                data:hashtags,
                colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
            }
        );
        myBarchart.draw();*/
    });
});
