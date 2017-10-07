#! usr/bin/python
import facebook
import json
import requests
import re



def main():
    #token for posting
    token ="EAACEdEose0cBAEcBP9h5JKzWzhilLSpZAQZBoPZAh5DlJSKK5D3VGgoJq6kU7n2gQfH4J8PzKSJR8wRAhD44GyTUb8ZA7JZAYiFieaZBuqzT1AL7m3sZCM8rrmTJGdP2tWoEkd2tlEacqYuvozvcGkRukHHLoZAF4DFi1VteAJrHXFiShKr3YWwVJiRWj8JUzIEJX1pNDxNYvwZDZD"
    graph = facebook.GraphAPI(token)

    #friend's facebook username
    friendID = ""

    profile = graph.get_object(friendID)
    posts = graph.get_connections(profile['id'],'posts')


if __name__ == "__main__":
    main()
