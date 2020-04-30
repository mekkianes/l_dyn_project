import http.server
import socketserver
from http import HTTPStatus
from urllib.parse import urlparse, parse_qs
from urllib import parse
from tweets import Tweets
import json
import os
import files


from http.server import HTTPServer
from socketserver import ThreadingMixIn


tweet = Tweets()


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        #print("optionnnnnnnnnnnns")
        self.send_response(200, "ok")

        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        #print("optionnnnnnnnnnnns")
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

        self.end_headers()
        #print("finop")

    def do_GET(self):
        #print("hello")
        self.my_params = parse_qs(urlparse(self.path).query)
        path = parse.urlparse(self.path).path
        #print("Path : !!!!!!!!!!!!!   ", path)
        print(path)
        params = parse_qs(urlparse(self.path).query)
        #Nous verifions si on demande au serveur un fichier
        #file = 'client.js'
        #mimetype = "application/javascript" 
        file, mimetype= files.verify_if_file(path)
        #si nous trouvons bien le fichier nous le retournons sinon on continue
        if file!=False:
            try:
                #On lit le fichier
                #print("try to open",file)
                #print(os.getcwd()+"/"+file)
                file_to_open = open(os.getcwd()+"/"+file,'rb')
                self.send_response(200)
                self.send_header('Content-type',mimetype)
                self.end_headers()
                self.wfile.write(file_to_open.read())
                file_to_open.close() 
            except Exception as e:# Sinon not found 404
                #print("Fichier indisponible",e,"dans le iffile de serveur")
                self.send_error(404,'File Not Found %s' %file)
                #self.send_error(404,'File Not Found %s' %file)       
            return            

        services_list = ['/', '/country_tweets']
        if path in services_list:
            #print(path)
            if path == '/':
                #print('here!!')
                f = open('index.html','rb')
                obj = f.read()
                f.close()
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(obj)


            if path == '/country_tweets': #/country_tweets?country=France
                country = "" 
                pattern = ""
                print(params)
                if 'country' in params:
                    country = params['country'][0]
                if 'pattern' in params:
                    pattern = params['pattern'][0]
                
                json_result = tweet.get_number_tweets_country(country,pattern)
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


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
        """Handle requests in a separate thread."""



if __name__ == '__main__':
    print("hello")
    server = ThreadedHTTPServer(('localhost',8000), Handler)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('Shut the server down')
        server.socket.close()
