import http.server
import socketserver

import pandas as pd 
import json
from tweets import * 




class CostumHttpRequestHandler(http.server.SimpleHTTPRequestHandler):

        #def filter(data_frame, parameters):
                


        def do_GET(self):
                self.send_response(200)

                self.send_header("Content-type", "text/html")
                
                self.end_headers()

                query_components = parse_qs(urlparse(self.path).query)


                html = pd.DataFrame.to_html(data)

                #filtered_frame = filter(global_data_frame, query_components)

                self.wfile.write(bytes(html, "utf8"))
                return 
                
                #return http.server.SimpleHTTPRequestHandler.do_GET(self)
                # get the value of parameters .... 

                #do the right thing depending on the parameters value ... 



        def do_POST(self):
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                print(post_data)
                string_request= post_data.decode('utf8')
                print(string_request)
                json_object_request = json.loads(string_request)
                #columns = json_object_request["projected_fields"]

                data_frame_result = query_execution(json_object_request)
                #results = tweets_frame.filter_by_column(columns)
                json_result = pd.DataFrame.to_json(data_frame_result.df)
                #print(json_result)
                result_bytes = json_result.encode('utf-8')
                self.send_response(200)
                self.send_header('Content-type','application/json')
                self.end_headers()
                self.wfile.write(result_bytes)
                #print(json_object_request["name"])
                #json_request_object = json.loads(my_json_request)             
                #print(json_request_object)




def query_execution (query):
        

        print(query)
        res = tweets_frame.copy()

        where_conditions = query["where"]

        projected_columns = query["select"]

        if (where_conditions is not None):
                res = res.where(where_conditions)
        res = res.select(projected_columns)
        return res



        


PORT = 8000
handler = CostumHttpRequestHandler
df = pd.read_csv("tweets.csv")
tweets_frame = Tweets(df)

with socketserver.TCPServer(("", PORT), handler) as httpd: 
        
        print("Server started at localhost:" +str(PORT))
        httpd.serve_forever()