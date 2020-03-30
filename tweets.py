import pandas as pd

class Tweets:
    def __init__(self):
        self.df = pd.read_csv("tweets.csv")
    
    def get_tweets_id(self, id):
        return self.df[self.df['user_name']==id].sort_values(by="date")
    
    def get_number_tweets(self):
        return len(self.df)
    
    def get_number_tweets_countries(self):
        return self.df.sort_values(by="date").groupby(['place_country']).size()
    
    def get_number_tweets_country(self, country):
        tmp = self.df[self.df['place_country']==country].sort_values(by="date")
        total_tweets = len(tmp)
        return tmp

