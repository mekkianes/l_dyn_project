import os
import sys
types = { "png" : "image/png", "html" : "text/html",
               "js" : "application/javascript", "css" : "text/css", "json" : "application/json"}

def verify_if_file(path):
    try:
        isFile=False
        file=path[1:]
        #Demander fichier css
        if file.endswith(".css"):
            type_file = types['css']
            isFile = True    
        #Demander fichier javascript
        if file.endswith(".js"):
            type_file= types['js']
            isFile = True
        #Demander image png
        if file.endswith(".png"):
            type_file= types['png']
            isFile = True
        #Demander fichier txt
        if file.endswith(".txt"):
            mimetype_filetype= types['txt']
            isFile = True
        #si le fichier est un des types demandé nous le retournons
        if isFile:
            return file,type_file
        else:
            return False,False
    except Exception as e:
        #Probleme
        return False,False