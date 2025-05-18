from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import get_response, predict_class
app = Flask(__name__)
# ✅ Recommended: Allow specific domain
CORS(app, origins=["https://ezhu-new-work.vercel.app"], supports_credentials=True)
@app.route('/handle_message', methods=['POST', 'OPTIONS'])
def handle_message():
    if request.method == "OPTIONS":
        # Handle preflight request directly
        response = app.make_default_options_response()
        return response

    try:
        data = request.get_json()
        print("[REQUEST]:", data)

        if not data or 'message' not in data:
            return jsonify({'response': 'No message received'}), 400

        message = data['message'].strip()
        print("[MESSAGE]:", message)

        if not message:
            return jsonify({'response': 'Empty message'}), 400

        intents_list = predict_class(message)
        print("[INTENTS]:", intents_list)

        response = get_response(intents_list)
        print("[RESPONSE]:", response)

        return jsonify({'response': response})
    except Exception as e:
        print(f"[ERROR]: {e}")
        return jsonify({'response': 'Sorry, an error occurred.'}), 500

    
if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))  # <- dynamic port
    print(f"✅ Flask Chatbot running on http://0.0.0.0:{port}")
    app.run(host='0.0.0.0', port=port)
