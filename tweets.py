import pandas as pd
import json
class Tweets:
    def __init__(self):
        self.df = pd.read_csv("tweets.csv").sort_values(by="date")
    
    def get_tweets_id(self, id):
        return self.df[self.df['user_name']==id]
    
    def get_number_tweets(self):
        return len(self.df)
    
    def get_number_tweets_countries(self):
        tmp = (self.df.groupby(['place_country']).size()*100.0)/len(self.df)
        result = {}
        for index, row in tmp.iteritems():
            result[index] = row
        return result
    def get_number_tweets_country(self, country):
        tmp = self.df[self.df['place_country']==country]
        total_tweets = len(tmp)
        return tmp.to_json(orient='records')

