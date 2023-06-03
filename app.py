# Bu, Flask uygulama oluşturma ve yönlendirmeleri içerir.
from flask import Flask, render_template, request
from movie_recommender import MovieRecommender

app = Flask(__name__)
movie_recommender = MovieRecommender()

@app.route('/', methods=['GET', 'POST'])
def movie_recommendation():
    if request.method == 'POST':
        movie_recommender.get_preferences(request.form)
        recommendations = movie_recommender.recommend_movies()

        if not recommendations:
            return "No movies found with the given preferences. Please try again with different preferences."
        else:
            return render_template('results.html', movies=recommendations)
    else:
        return render_template('form.html')