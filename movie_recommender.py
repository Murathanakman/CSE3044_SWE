# Bu, film önerisi işlevlerini ve ilgili sınıfları içerir.
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class MovieRecommender:
    def __init__(self):
        self.df = pd.read_json('movies.json')
        self.df['combined_features'] = self.df['genres']*3 + self.df['cast']*2 + self.df['keywords'].apply(lambda x: x.split()) + self.df['vote_count'].apply(lambda x: [str(x)]) + self.df['vote_average'].apply(lambda x: [str(x)])
        self.df['combined_features'] = self.df['combined_features'].apply(lambda x: ' '.join(x))
        self.preferences = {}

    def get_preferences(self, form):
        self.preferences['has_preferred_movie'] = form['has_preferred_movie'] == 'Yes'
        self.preferences['movie'] = form['movie'] if self.preferences['has_preferred_movie'] else None
        self.preferences['genre'] = form['genre']
        self.preferences['actor'] = form['actor']
        self.preferences['year'] = form['year']

    def recommend_movies(self):
        self.df.reset_index(inplace=True, drop=True)

        if self.preferences['has_preferred_movie']:
            if self.preferences['movie'] not in self.df['title'].values:
                return []
            else:
                cv = CountVectorizer()
                count_matrix = cv.fit_transform(self.df['combined_features'])
                cosine_sim = cosine_similarity(count_matrix)
                movie_index = self.df[self.df.title == self.preferences['movie']].index[0]
                similar_movies = list(enumerate(cosine_sim[movie_index]))
                sorted_similar_movies = sorted(similar_movies, key=lambda x:x[1], reverse=True)

                filtered_df = self.df.copy()
                filtered_df = filtered_df.loc[[index for index, similarity in sorted_similar_movies if index != movie_index]]

                if self.preferences['year']:
                    year = int(self.preferences['year'])
                    filtered_df = filtered_df[filtered_df['year'] > year]

                filtered_df = filtered_df[
                    (filtered_df['genres'].apply(lambda x: self.preferences['genre'] in x if self.preferences['genre'] else True)) & 
                    (filtered_df['cast'].apply(lambda x: self.preferences['actor'] in x if self.preferences['actor'] else True))
                ]

                if filtered_df.empty:
                    return []
                
                return filtered_df['title'].tolist()[:5]
        else:
            filtered_df = self.df.copy()

            if self.preferences['year']:
                year = int(self.preferences['year'])
                filtered_df = filtered_df[filtered_df['year'] > year]

            filtered_df = filtered_df[
                (filtered_df['genres'].apply(lambda x: self.preferences['genre'] in x if self.preferences['genre'] else True)) & 
                (filtered_df['cast'].apply(lambda x: self.preferences['actor'] in x if self.preferences['actor'] else True))
            ]

            if filtered_df.empty:
                return []
            
            return filtered_df['title'].tolist()[:5]