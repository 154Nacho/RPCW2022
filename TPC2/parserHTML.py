import json
import re

file = open('cinemaATP.json',encoding='utf-8')

data = json.load(file)

movies = {}
actors = {}

movieID = 1
actorID = 1

for item in data :

     movies[item['title']] = {
         'actors' : set(x for x in item['cast']),
         'ano' : item['year'],
         'genero' : set(x for x in item['genres']),
         'ID' : movieID
     }
     movieID += 1

     for actor in item['cast'] :
         if actor not in actors :
             actors[actor] = {
                 'filmes' : [],
                 'ID' : actorID
             }
             actors[actor]['filmes'].append(item['title'])
             actorID += 1
         else :
             actors[actor]['filmes'].append(item['title'])

movies = dict(sorted(movies.items(), key = lambda x : x[0]))
actors = dict(sorted(actors.items(), key = lambda x : x[0]))
     