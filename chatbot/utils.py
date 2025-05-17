import json
import random
import pickle
import numpy as np
import nltk
nltk.download('punkt', quiet=True)
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import load_model
nltk.download('punkt')  # ✅ Add this line to download the tokenizer model
lemmatizer = WordNetLemmatizer()
words = pickle.load(open('model/words.pkl', 'rb'))
classes = pickle.load(open('model/classes.pkl', 'rb'))
model = load_model('model/chatbot_model.keras')
intents = json.load(open('intents.json'))  # Make sure this file is placed in chatbot root

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bow = bag_of_words(sentence)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return [{'intent': classes[r[0]], 'probability': str(r[1])} for r in results]

def get_response(intents_list):
    tag = intents_list[0]['intent']
    for i in intents['intents']:
        if i['tag'] == tag:
            return random.choice(i['responses'])
    return "Sorry, I didn't understand that."
