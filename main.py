from flask import Flask, render_template, request
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# JSON dosyasını oku
df = pd.read_json('movies.json')

# Filmlerin 'title', 'genres', 'director', 'actors' özelliklerini birleştirin
df['combined_features'] = df['genres'] + df['director'].apply(lambda x: [x]) + df['actors']
df['combined_features'] = df['combined_features'].apply(lambda x: ' '.join(x))

# Create an index-title dictionary before filtering the data
index_title_dict = pd.Series(df.title.values, index=df.index).to_dict()

@app.route('/', methods=['GET', 'POST'])
def movie_recommendation():
    if request.method == 'POST':
        has_preferred_movie = request.form['has_preferred_movie'] == 'Yes'
        movie_preference = request.form['movie'] if has_preferred_movie else None
        genre_preference = request.form['genre']
        director_preference = request.form['director']
        actor_preference = request.form['actor']
        year_preference = request.form['year']

        # Create a new DataFrame to apply the user preferences
        filtered_df = df.copy()

        # Apply the user preferences
        if year_preference:
            if "öncesi" in year_preference:
                year = int(year_preference.split(" ")[0])
                filtered_df = filtered_df[filtered_df['year'] < year]
            elif "sonrası" in year_preference:
                year = int(year_preference.split(" ")[0])
                filtered_df = filtered_df[filtered_df['year'] >= year]

        filtered_df = filtered_df[
            (filtered_df['genres'].apply(lambda x: genre_preference in x if genre_preference else True)) & 
            (filtered_df['director'].apply(lambda x: director_preference in x if director_preference else True)) & 
            (filtered_df['actors'].apply(lambda x: actor_preference in x if actor_preference else True))
        ]

        if filtered_df.empty:
            return "No movies found with the given preferences. Please try again with different preferences."

        if has_preferred_movie:
            if movie_preference not in filtered_df['title'].values:
                return "The preferred movie is not found in the movies with the given preferences. Please try again."
            else:
                cv = CountVectorizer()
                count_matrix = cv.fit_transform(df['combined_features'])
                cosine_sim = cosine_similarity(count_matrix)
                movie_index = df[df.title == movie_preference].index[0]
                similar_movies = list(enumerate(cosine_sim[movie_index]))
                sorted_similar_movies = sorted(similar_movies, key=lambda x:x[1], reverse=True)
                recommendations = [index_title_dict[index] for index, similarity in sorted_similar_movies if index != movie_index][:5]
        else:
            # Preferred Movie is not provided.
            # Select the top 5 movies based on other preferences.
            recommendations = filtered_df['title'].tolist()[:5]

        return render_template('results.html', movies=recommendations)

    return render_template('form.html')

if __name__ == "__main__":
    app.run(debug=True)