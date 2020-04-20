import http.server
import socketserver
from http import HTTPStatus
from urllib.parse import urlparse, parse_qs
from urllib import parse
from tweets import Tweets
import json

tweet = Tweets()

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):

        path = parse.urlparse(self.path).path
        params = parse_qs(urlparse(self.path).query)

        services_list = ['/', '/country_tweets']
        if path in services_list:
            if path == '/':
                f = open('index.html','rb')
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(f.read())
                f.close()

            if path == '/country_tweets': #/country_tweets?country=France
                if 'country' in params:
                    country = params['country'][0]
                json_result = tweet.get_number_tweets_country(country)
                self.send_response(200)
                self.send_header('Content-type', 'text/json')
                self.end_headers()
                self.wfile.write(bytes(json.dumps(json_result), "utf8"))
        
        else:
            self.send_response(404)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            html = f"<html><head></head><body><h1>404 ERROR !!!!</h1></body></html>"
            self.wfile.write(bytes(html, "utf8"))
        return

httpd = socketserver.TCPServer(('', 8000), Handler)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print('Shut the server down')
    httpd.socket.close()