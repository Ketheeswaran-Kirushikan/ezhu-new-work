from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import get_response, predict_class
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from frontend
@app.route('/handle_message', methods=['POST'])
def handle_message():
    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({'response': 'No message received'}), 400
        message = data['message'].strip()
        if not message:
            return jsonify({'response': 'Empty message'}), 400
        intents_list = predict_class(message)
        if not intents_list:
            return jsonify({'response': 'Sorry, I didn’t understand that.'}), 200
        response = get_response(intents_list)
        return jsonify({'response': response})
    except Exception as e:
        print(f"[ERROR]: {e}")
        return jsonify({'response': 'Sorry, an error occurred.'}), 500
if __name__ == '__main__':
    host = '0.0.0.0'
    port = 5000
    print(f"✅ Flask Chatbot running on http://{host}:{port}")
    app.run(host=host, port=port, debug=True)
