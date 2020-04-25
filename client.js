var Client = {};


let country_input = document.getElementById("country");

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
    for (var p in params) {
        if (params.hasOwnProperty (p)) {
            paramString += "?" + p + "=" + encodeURIComponent(params[p]);
        };
    };
    let url = "http://127.0.0.1:8000/country_tweets"
        + paramString;
    console.log("url est ::",url)
    try{
        res = await timeoutPromise(5000,Client.ajax("GET", url));
        return JSON.parse(res);
    }catch(str){
        alert("ERROR")
        res =str
        return res;
    }
};
submit_button.addEventListener("click",function(){
    console.log("helllooooo");
    let jsonexample_param={"country":country_input.value};
    console.log(Client.query(jsonexample_param));
    let results = Client.query(jsonexample_param).then(function(result) {
        console.log('!!');
        console.log(result);
        var myCanvas = document.getElementById("myCanvas");

        var hashtag_keys = result['hashtags'];
        var hashtag_values = result['hashtags_count'];

        var hashtags = {};
        hashtag_keys.forEach((key, i) => hashtags[key] = hashtag_values[i]);
        console.log(hashtags);

        var myBarchart = new Barchart(
            {
                canvas:myCanvas,
                seriesName:"Vinyl records",
                padding:20,
                gridScale:5,
                gridColor:"#eeeeee",
                data:hashtags,
                colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
            }
        );
        myBarchart.draw();
    });
});
