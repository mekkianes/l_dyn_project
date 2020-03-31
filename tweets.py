import pandas as pd


ax = { "id":0, "user_name":1, "user_screen_name":2, "user_followers_count":3, "text":4, "place_name":5,"place_country":6,"place_country_code":7,
"longitude":8, "latitude":9,"lang":10,"date":11,"hashtag_0":12,"hashtag_1":13,"hashtag_2":14}

class Tweets:


    def __init__(self,dataFrame):
        self.df = dataFrame


    def copy(self):
        return Tweets(self.df)

    def filter_by_column(self, filter):
        return self.df.filter(items = filter)
    
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


    def select(self, columns):
        return Tweets(self.df.filter(items = columns ))



    #assign new column 

    def select_new_column(self, name_columns,column_param):
        pass
        
    
    


    #conditions is a dictionary 
    def where(self, conditions):
        
        result = self.df
        for cond in conditions:
            if cond["regex"] is not None:
                result  = self.df.filter(regex=cond["regex"], axis = ax[cond["fieled_name"]]) 

            else :
                result  = self.df[self.df[cond["fieled_name"]] == cond["value"]] 

    
        return Tweets(result)
    #aggregation is a dictionnary (column not in the group by -> numpy function .... ) 
    def group_by(self, columns, aggregation):
        
        return Tweets(self.df.groupby(columns).agg(aggregation))

    