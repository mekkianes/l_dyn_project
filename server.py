import http.server
import socketserver
from http import HTTPStatus
from urllib.parse import urlparse, parse_qs
from urllib import parse
from tweets import Tweets
import json
import os
import files
from threading import Thread
from http.server import HTTPServer
from socketserver import ThreadingMixIn
import time

tweet = Tweets()
id_url = dict()
count = 0 
class Handler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):

        self.send_response(200, "ok")

        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

        self.end_headers()

    def do_GET(self):

        global count
        global tmp_count
        self.my_params = parse_qs(urlparse(self.path).query)
        path = parse.urlparse(self.path).path
        print(path)
        params = parse_qs(urlparse(self.path).query)
        #Requete au Server pour servir un fichier
        file, typeFichier= files.verify_if_file(path)
        if file!=False:
            try:
                #Si le fichier est trouvé => on le rend
                file_to_open = open(os.getcwd()+"/"+file,'rb')
                self.send_response(200)
                self.send_header('Content-type',typeFichier)
                self.end_headers()
                self.wfile.write(file_to_open.read())
                file_to_open.close() 
            except Exception as e:
                #Sinon on rend une erreur
                self.send_error(404,'File Not Found %s' %file)
            return            
        # Liste des services 
        services_list = ['/', '/country_tweets', '/id']
        if path in services_list:
            #On rend le fichier html 
            if path == '/':
                f = open('index.html','rb')
                obj = f.read()
                f.close()

                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(obj)

            #Service qui rend un json répondant au country et pattern

            if path == '/country_tweets': #/country_tweets?country=France&pattern=hi
                tmp_count = count        
                id_url[tmp_count] = {"url": "http://localhost:8000/id?id="+str(tmp_count), "status": "en cours", "resultat": ""}
                def run_thread():
                    global count
                    
                    country = "" 
                    pattern = ""
                    print(params)
                    if 'country' in params:
                        country = params['country'][0]
                    if 'pattern' in params:
                        pattern = params['pattern'][0]
                    #Appel à la fonction dans le fichier tweets.py
                    json_result = tweet.get_number_tweets_country(country,pattern)
                    
                    id_url[tmp_count]['status'] = "finished"
                    id_url[tmp_count]['resultat'] = json_result
                    print('avant : ', count)
                    count +=1
                    print('apres: ', count)
                #time.sleep(20)
                thread = Thread(target = run_thread)
                thread.start()
                thread.join()
                self.send_response(200)
                self.send_header('Content-type', 'text/json')                
                self.end_headers()
                response_json = {"url": id_url[tmp_count]['url']}
                #Test timeout
                #time.sleep(10)                                                                                                                                                                                                                   
                #rendre le json récupéré par tweets.py
                self.wfile.write(bytes(json.dumps(response_json), "utf8"))
            if path == '/id':
                id = params['id'][0]
                if(id_url[int(id)]['status']=="en cours"):
                    self.send_response(200)
                    self.send_header('Content-type', 'text/json')                
                    self.end_headers()
                    response_json_status = {"status":"en cours", "result":""} 
                    self.wfile.write(bytes(json.dumps(response_json_status), "utf8"))
                else:
                    self.send_response(200)
                    self.send_header('Content-type', 'text/json')                
                    self.end_headers()
                    response_json_status = {"status":"finished", "result": id_url[int(id)]['resultat']} 
                    self.wfile.write(bytes(json.dumps(response_json_status), "utf8"))
                        
        else:
            #Rendre réponse Erreur 
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            html = f"<html><head></head><body><h1>404 ERROR !!!!</h1></body></html>"
            obj = html
            self.wfile.write(bytes(html, "utf8"))
                        

        return

#Gestion de multithreading
class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
        """Handle requests in a separate thread."""



if __name__ == '__main__':
    print("Server started")
    server = ThreadedHTTPServer(('localhost',8000), Handler)

    try:
        #Lancer le serveur
        server.serve_forever()
    except KeyboardInterrupt:
        print('Shut the server down')
        #Arreter le serveur
        server.socket.close()
