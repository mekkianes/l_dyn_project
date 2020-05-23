from tweets import Tweets

tweet = Tweets()

print("Nombre de tweets dans tout le dataframe: ", tweet.get_number_tweets())
print('Tweets pourcentage per country: ', tweet.get_number_tweets_countries())
print("Dictionnaire pour la France: ", tweet.get_number_tweets_country("France", ""))