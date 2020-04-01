import http.server
import socketserver
from http import HTTPStatus
from tweets import Tweets
import json
tweet = Tweets()

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(HTTPStatus.OK)
        self.end_headers()
        if self.path == '/':
            self.wfile.write(json.dumps(tweet.get_number_tweets_countries()))
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

httpd = socketserver.TCPServer(('', 8000), Handler)
httpd.serve_forever()
