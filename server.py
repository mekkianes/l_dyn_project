import http.server
import socketserver
from http import HTTPStatus
from urllib.parse import urlparse, parse_qs
from urllib import parse
from tweets import Tweets
import json
import os
import files
tweet = Tweets()

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.my_params = parse_qs(urlparse(self.path).query)
        path = parse.urlparse(self.path).path
        print("Path : !!!!!!!!!!!!!   ", path)
        params = parse_qs(urlparse(self.path).query)
        #Nous verifions si on demande au serveur un fichier
        #file = 'client.js'
        #mimetype = "application/javascript" 
        file, mimetype= files.verify_if_file(path)
        #si nous trouvons bien le fichier nous le retournons sinon on continue
        if file!=False:
            try:
                #On lit le fichier
                print("try to open",file)
                print(os.getcwd()+"/"+file)
                file_to_open = open(os.getcwd()+"/"+file,'rb')
                self.send_response(200)
                self.send_header('Content-type',mimetype)
                self.end_headers()
                self.wfile.write(file_to_open.read())
                file_to_open.close() 
            except Exception as e:# Sinon not found 404
                print("Fichier indisponible",e,"dans le iffile de serveur")
                self.send_error(404,'File Not Found %s' %file)
                #self.send_error(404,'File Not Found %s' %file)       
            return            

        services_list = ['/', '/country_tweets']
        if path in services_list:
            print(path)
            if path == '/':
                print('here!!')
                f = open('index.html','rb')
                obj = f.read()
                f.close()
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(obj)


            if path == '/country_tweets': #/country_tweets?country=France
                if 'country' in params:
                    country = params['country'][0]
                json_result = tweet.get_number_tweets_country(country)
                self.send_response(200)
                self.send_header('Content-type', 'text/json')
                self.end_headers()
                obj = json.dumps(json_result)
                self.wfile.write(bytes(json.dumps(json_result), "utf8"))
        
        else:
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            html = f"<html><head></head><body><h1>404 ERROR !!!!</h1></body></html>"
            obj = html
            self.wfile.write(bytes(html, "utf8"))
                        

        return

httpd = socketserver.TCPServer(('', 8000), Handler)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print('Shut the server down')
    httpd.socket.close()