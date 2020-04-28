import os
import sys
mimetypes = { "jpg" : "image/jpg", "jpeg" : "image/jpeg", "png" : "image/png", "html" : "text/html",
               "js" : "application/javascript", "css" : "text/css", "json" : "application/json",
               "txt":"text/plain"}

def verify_if_file(path):
    try:
        isFile=False
        file=path[1:]
        #print('Files ! : ')
        #print("\n\nfile:",file,"\n\n")
        #print(os.getcwd())
        #Si le fichier demandé est un fichier css alors je rentre dans ce if
        if file.endswith(".css"):
            mimetype= mimetypes['css']
            isFile = True    
        #Si le fichier demandé est un fichier js alors je rentre dans ce if
        if file.endswith(".js"):
            mimetype= mimetypes['js']
            isFile = True
        #Si le fichier demandé est un fichier png alors je rentre dans ce if
        if file.endswith(".png"):
            mimetype= mimetypes['png']
            isFile = True
        #Si le fichier demandé est un fichier txt alors je rentre dans ce if
        if file.endswith(".txt"):
            mimetype= mimetypes['txt']
            isFile = True
        #si le fichier est un des types demandé nous le retournons
        if isFile:
            return file,mimetype
        else:
            return False,False
    except Exception as e:
        #print("Je suis dans le verify_if_file",e," probleme avec le path",path)
        return False,False