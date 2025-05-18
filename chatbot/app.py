
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import get_response, predict_class

app = Flask(__name__)

# Configure CORS to allow requests from the frontend origin
CORS(app, origins=["https://ezhu-new-work.vercel.app"], supports_credentials=True)

@app.route('/handle_message', methods=['POST', 'OPTIONS'])
def handle_message():
    if request.method == "OPTIONS":
        # Handle preflight request
        response = app.make_response('')
        response.headers['Access-Control-Allow-Origin'] = 'https://ezhu-new-work.vercel.app'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Max-Age'] = '86400'  # Cache preflight response for 24 hours
        return response

    try:
        data = request.get_json()
        print("[REQUEST]:", data)

        if not data or 'message' not in data:
            response = jsonify({'response': 'No message received'})
            response.headers['Access-Control-Allow-Origin'] = 'https://ezhu-new-work.vercel.app'
            return response, 400

        message = data['message'].strip()
        print("[MESSAGE]:", message)

        if not message:
            response = jsonify({'response': 'Empty message'})
            response.headers['Access-Control-Allow-Origin'] = 'https://ezhu-new-work.vercel.app'
            return response, 400

        intents_list = predict_class(message)
        print("[INTENTS]:", intents_list)

        response = get_response(intents_list)
        print("[RESPONSE]:", response)

        response = jsonify({'response': response})
        response.headers['Access-Control-Allow-Origin'] = 'https://ezhu-new-work.vercel.app'
        return response
    except Exception as e:
        print(f"[ERROR]: {e}")
        response = jsonify({'response': 'Sorry, an error occurred.'})
        response.headers['Access-Control-Allow-Origin'] = 'https://ezhu-new-work.vercel.app'
        return response, 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    print(f"✅ Flask Chatbot running on http://0.0.0.0:{port}")
    app.run(host='0.0.0.0', port=port)