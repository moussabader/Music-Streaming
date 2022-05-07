from tracemalloc import start
import numpy as np
import sys
import json
import pandas as pd

from flask import Flask, jsonify
app = Flask(__name__)

# Class for Popularity based Recommender System model
def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])
class popularity_recommender_py():
    # @staticmethod
    def __init__(self):
        self.train_data = None
        self.user_id = None
        self.item_id = None
        self.popularity_recommendations = None

    # Create the popularity based recommender system model
    # @staticmethod
    def create(self, train_data, user_id, item_id):
        self.train_data = train_data
        self.user_id = user_id
        self.item_id = item_id

        # Get a count of user_ids for each unique song as recommendation score
        train_data_grouped = train_data.groupby([self.item_id]).agg(
            {self.user_id: 'count'}).reset_index()
        train_data_grouped.rename(columns={'user_id': 'score'}, inplace=True)

        # Sort the songs based upon recommendation score
        train_data_sort = train_data_grouped.sort_values(
            ['score', self.item_id], ascending=[0, 1])

        # Generate a recommendation rank based upon score
        train_data_sort['Rank'] = train_data_sort['score'].rank(
            ascending=0, method='first')

        # Get the top 10 recommendations
        self.popularity_recommendations = train_data_sort.head(10)

    # Use the popularity based recommender system model to
    # make recommendations
    # @staticmethod
    def recommend(self, user_id):
        user_recommendations = self.popularity_recommendations

        # Add user_id column for which the recommendations are being generated

        user_recommendations['user_id'] = user_id
        # Bring user_id column to the front
        cols = user_recommendations.columns.tolist()
        cols = cols[-1:] + cols[:-1]
        user_recommendations = user_recommendations[cols]
        ##############################################

        return user_recommendations.song.to_json()
    
   



song_df_1 = pd.read_csv(r'C:\Users\yassi\Documents\BeatZz\server\services\\recommendation\public\\triplets_file.csv', dtype={"user_id": "string", "song_id": "string", "listen_count": "string"})
song_df_1.head()
song_df_2 = pd.read_csv(r'C:\Users\yassi\Documents\BeatZz\server\services\\recommendation\public\song_data.csv', dtype={"song_id": "string", "title": "string", "release": "string", "artist_name": "string"})
song_df_2.head()
song_df = pd.merge(song_df_1, song_df_2.drop_duplicates(
    ['song_id']), on='song_id', how='left')
song_df.head()
song_df['song'] = song_df['title']
song_df.head()
song_df = song_df.head(10000)
song_grouped = song_df.groupby(['song']).agg(
    {'listen_count': 'count'}).reset_index()
song_grouped.head()
grouped_sum=song_grouped['listen_count'].sum()
song_grouped['percentage']=(song_grouped['listen_count'] / grouped_sum) * 100
song_grouped.sort_values(['listen_count', 'song'], ascending = [0, 1])
pr=popularity_recommender_py()
pr.create(song_df, 'user_id', 'song')

# to nodeJS

user_id = read_in()
result=pr.recommend(song_df['user_id'][user_id[0]])
newdata = {'song':result}
print(json.dumps(newdata))


if __name__ == "__main__":
    #   popularity_recommender_py.recommend(user_id=any)
    app.run(debug = True)
