import os
import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Dropout, Input
from tensorflow.keras.optimizers import SGD
# Initialize NLTK lemmatizer
lemmatizer = WordNetLemmatizer()
nltk.download('punkt')  # ✅ Add this line to download the tokenizer model
# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join("model")
INTENTS_PATH = os.path.join("intents.json")
# Load and validate intents
try:
    with open(INTENTS_PATH) as file:
        intents = json.load(file)
    for intent in intents['intents']:
        if not intent.get('tag') or not intent.get('patterns') or not intent.get('responses'):
            raise ValueError(f"Invalid intent: {intent}")
except FileNotFoundError:
    raise FileNotFoundError(f"Intents file not found: {INTENTS_PATH}")
except Exception as e:
    raise Exception(f"Error loading intents: {str(e)}")
# Data preparation
words = []
classes = []
documents = []
ignore_letters = ['?', '!', '.', ',']
for intent in intents['intents']:
    for pattern in intent['patterns']:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])
# Lemmatize and sort
words = [lemmatizer.lemmatize(word.lower()) for word in words if word not in ignore_letters]
words = sorted(set(words))
classes = sorted(set(classes))
# Save words and classes
os.makedirs(MODEL_DIR, exist_ok=True)
pickle.dump(words, open(os.path.join(MODEL_DIR, 'words.pkl'), 'wb'))
pickle.dump(classes, open(os.path.join(MODEL_DIR, 'classes.pkl'), 'wb'))
# Prepare training data
training = []
output_empty = [0] * len(classes)
for document in documents:
    bag = []
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in document[0]]
    bag = [1 if word in word_patterns else 0 for word in words]
    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append([bag, output_row])
random.shuffle(training)
training = np.array(training, dtype=object)
train_x = list(training[:, 0])
train_y = list(training[:, 1])
# Build model
model = Sequential()
model.add(Input(shape=(len(train_x[0]),)))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))
# Optimizer
sgd = SGD(learning_rate=0.01, weight_decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
# Train and save
model.fit(
    np.array(train_x),
    np.array(train_y),
    epochs=100,
    batch_size=5,
    verbose=1,
    validation_split=0.2
)
model.save(os.path.join(MODEL_DIR, 'chatbot_model.keras'))