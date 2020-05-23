import pandas as pd
import json

class Tweets:
    def __init__(self):
        #Chargement du fichier tweets.csv
        self.df = pd.read_csv("tweets.csv").sort_values(by="date")
    
    def get_tweets_id(self, id):
        return self.df[self.df['user_name']==id]
    #Rendre le nombre de tweets
    def get_number_tweets(self):
        return len(self.df)
    #Rendre le nombre de tweets par pays
    def get_number_tweets_countries(self):
        tmp = (self.df.groupby(['place_country']).size()*100.0)/len(self.df)
        result = {}
        for index, row in tmp.iteritems():
            result[index] = row
        return result
    #Compter les mots a partir d'une liste et rend les 10 plus fréquents
    def countWords(self, a_list):
        words = {}
        for i in range(len(a_list)):
            item = a_list[i]
            count = a_list.count(item)
            words[item] = count
        sorted_list = sorted(words.items(), key = lambda item: item[1], reverse=True)
        return sorted_list[:10]
    #Concatener les hashtags 0, 1 et 2 du dataframe    
    def hashtags_count(self, df):
        list_hashtags = []
        list_hashtags.extend(df['hashtag_0'].dropna().values.tolist())
        list_hashtags.extend(df['hashtag_1'].dropna().values.tolist())
        list_hashtags.extend(df['hashtag_2'].dropna().values.tolist())
        
        result = self.countWords(list_hashtags)
        return result
    #Rendre le top 10 des hashtags
    def hashtags_country(self, tmp):
        hashtag_count = self.hashtags_count(tmp)
        hashtags_items = [i[0] for i in hashtag_count]
        hashtags_values = [i[1] for i in hashtag_count]
        return hashtags_items, hashtags_values
    #Rendre le top 10 des places ou il y a le plus de tweets
    def places_country_tweets(self, df):
        
        places_df = df.groupby('place_name').count().sort_values(by='id', ascending = False)
        places_country = places_df.index.tolist()[:10]
        places_count = places_df['id'].values.tolist()[:10]
        
        return places_country, places_count
    #Rendre les longitudes et latitudes 
    def map_tweets(self, df):
        longtitude = df['longitude'].values.tolist()
        latitude = df['latitude'].values.tolist()
        return longtitude, latitude
    #Rendre le top 10 des langues avec le plus de tweets
    def language_tweets(self, df):
        lang_df = df.groupby('lang').count().sort_values(by='id', ascending = False)
        lang_country = lang_df.index.tolist()[:10]
        lang_count = lang_df['id'].values.tolist()[:10]
        
        return lang_country, lang_count

    #Concatener les resultats et rendre un dictionnaire basé sur country et pattern 
    def get_number_tweets_country(self, country, pattern):
        if country != '':
            tmp = self.df[self.df['place_country']==country]
        else:
            tmp = self.df

        if  pattern != '':

            tmp['pattern_exists']= tmp["text"].str.contains(pattern)
            tmp = tmp[tmp['pattern_exists']==True]
            
        total_tweets = len(tmp)

        
        dic = dict()
        dic['length'] = total_tweets
        
        hashtags_items, hashtags_values = self.hashtags_country(tmp)
        dic['hashtags'] = hashtags_items
        dic['hashtags_count'] = hashtags_values
        
        places_country, places_count = self.places_country_tweets(tmp)
        dic['places_country'] = places_country
        dic['places_count'] = places_count

        lang_country, lang_count = self.language_tweets(tmp)
        dic['lang_country'] = lang_country
        dic['lang_count'] = lang_count

        longitude, latitude  = self.map_tweets(tmp)
        dic['longitude'] = longitude
        dic['latitude'] = latitude

        dic['text'] = tmp['text'].values.tolist()[:10]
        return dic
    


    
