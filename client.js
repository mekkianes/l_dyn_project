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

submit_button.addEventListener("click",function(){
    console.log("helllooooo");
    let jsonexample_param={"country":country_input.value,"pattern":pattern_input.value};
    console.log(Client.query(jsonexample_param));
    let results = Client.query(jsonexample_param).then(function(result) {
        console.log('!!');
        console.log(result);
        var divHashtags = document.getElementById("hashtagsbar");

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
                hashtagTtile.innerHTML = key 
                var hashtagSpan1 = document.createElement("span")

                var hashtagSpan2 = document.createElement("span")
                

                hashtagSpan1.setAttribute("class", "bar")
                hashtagSpan2.setAttribute("class","bar" )
                var width =  hashtags[key] *100 / max ; 
                console.log(width);
                hashtagSpan2.style = {
                    ...hashtagSpan2.style,
                    width
                };
    
                li.appendChild(hashtagTtile)
                hashtagSpan1.appendChild(hashtagSpan2)
                li.appendChild(hashtagSpan1)
                

                divHashtags.appendChild(li)

        });


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
