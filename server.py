import http.server
import socketserver

import pandas as pd 




class CostumHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
        def do_GET(self):
                self.send_response(200)

                self.send_header("Content-type", "text/html")
                
                self.end_headers()

                # get the value of self.path 
                if self.path == '/':
                        data = pd.read_csv("tweets.csv")
                        html = pd.DataFrame.to_html(data)


                        self.wfile.write(bytes(html, "utf8"))
                        return 
                #return http.server.SimpleHTTPRequestHandler.do_GET(self)
                # get the value of parameters .... 

                #do the right thing depending on the parameters value ... 










PORT = 8000
handler = CostumHttpRequestHandler



with socketserver.TCPServer(("", PORT), handler) as httpd: 
        print("Server started at localhost:" +str(PORT))
        httpd.serve_forever()