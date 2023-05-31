import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def movie_recommendation():
    # JSON dosyasını oku
    df = pd.read_json('movies.json')

    # Filmlerin 'title', 'genres', 'director', 'actors' özelliklerini birleştirin
    df['combined_features'] = df['genres'] + df['director'].apply(lambda x: [x]) + df['actors']
    df['combined_features'] = df['combined_features'].apply(lambda x: ' '.join(x))

    # Kullanıcıdan belirli bir türü tercih edip etmediğini sorun
    print("Hangi tür filmleri seversiniz? (Boş bırakabilirsiniz)")
    genre_preference = input()

    # Kullanıcıdan belirli bir yönetmeni tercih edip etmediğini sorun
    print("Hangi yönetmenin filmlerini seversiniz? (Boş bırakabilirsiniz)")
    director_preference = input()

    # Kullanıcıdan belirli bir aktörü tercih edip etmediğini sorun
    print("Hangi aktörün filmlerini seversiniz? (Boş bırakabilirsiniz)")
    actor_preference = input()

    # Kullanıcıdan tercih ettiği bir film ismini sorun
    print("Hangi filmi seversiniz? (Boş bırakabilirsiniz)")
    movie_preference = input()

    # Kullanıcıdan film tercihinin hangi yıl aralığına düştüğünü sorun
    print("Hangi yıl aralığındaki filmleri seversiniz? (Ör: 2000 öncesi veya 2000 sonrası)")
    year_preference = input()

    # Apply the user preferences
    if year_preference:
        if "öncesi" in year_preference:
            year = int(year_preference.split(" ")[0])
            df = df[df['year'] < year]
        elif "sonrası" in year_preference:
            year = int(year_preference.split(" ")[0])
            df = df[df['year'] >= year]

    # Apply the user preferences
    df = df[(df['genres'].apply(lambda x: genre_preference in x if genre_preference else True)) & 
            (df['director'].apply(lambda x: director_preference in x if director_preference else True)) & 
            (df['actors'].apply(lambda x: actor_preference in x if actor_preference else True))]

    # Check if the dataframe is empty
    if df.empty:
        print("No movies found with the given preferences. Please try again with different preferences.")
        return

    # Apply the CountVectorizer and continue as before...
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(df['combined_features'])
    cosine_sim = cosine_similarity(count_matrix)

    def get_title_from_index(index):
        return df[df.index == index]['title'].values[0]

    def get_index_from_title(title):
        return df[df.title == title].index[0]

    # Check if the preferred movie exists in the filtered list
    if movie_preference not in df['title'].values:
        print("The preferred movie is not found in the movies with the given preferences. Please try again.")
        return

    # Seçilen filmi kullanarak benzer filmleri bulun
    movie_index = get_index_from_title(movie_preference)
    similar_movies = list(enumerate(cosine_sim[movie_index]))

    # Check if there are similar movies
    if len(similar_movies) <= 1:
        print("No similar movies found for the preferred movie. Please try again with a different movie.")
        return

    # Benzer filmleri skorlarına göre sıralayın
    sorted_similar_movies = sorted(similar_movies, key=lambda x:x[1], reverse=True)

    # En yüksek 5 benzerliğe sahip filmleri ekrana yazdırın
    i = 0
    for movie in sorted_similar_movies:
        print(get_title_from_index(movie[0]))
        i += 1
        if i > 5:
            break