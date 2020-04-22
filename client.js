var Client = {};


let country_input = document.getElementById("country");

let submit_button = document.getElementById("submitButton");

console.log('Client 1');

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
        res = await Client.ajax("GET", url)
        return res;
    }catch(str){
        alert("ERROR")
        res =str
    }
    return res;
};
submit_button.addEventListener("click",function(){
    console.log("helllooooo");
    let jsonexample_param={"country":country_input.value};
    console.log(Client.query(jsonexample_param));
    

});