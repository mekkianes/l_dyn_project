import http.server
import socketserver
from http import HTTPStatus
from urllib.parse import urlparse, parse_qs
from urllib import parse
from tweets import Tweets
import json
import os
import files
import time
tweet = Tweets()

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")

        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

        self.end_headers()

    def do_GET(self):
        self.my_params = parse_qs(urlparse(self.path).query)
        path = parse.urlparse(self.path).path
        print(path)
        params = parse_qs(urlparse(self.path).query)
        file, typeFichier= files.verify_if_file(path)
        if file!=False:
            try:
                file_to_open = open(os.getcwd()+"/"+file,'rb')
                self.send_response(200)
                self.send_header('Content-type',typeFichier)
                self.end_headers()
                self.wfile.write(file_to_open.read())
                file_to_open.close() 
            except Exception as e:
                self.send_error(404,'File Not Found %s' %file)
            return            

        services_list = ['/', '/country_tweets']
        if path in services_list:
            if path == '/':
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
                #Test timeout
                #time.sleep(10)                                                                                                                                                                                                                   
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
httpd.allow_reuse_address = True
httpd.timeout = 20 #timeout in seconds
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print('Shut the server down')
    httpd.socket.close()