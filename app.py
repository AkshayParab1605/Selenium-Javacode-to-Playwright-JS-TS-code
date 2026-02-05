import os
import logging
from flask import Flask, render_template, request, jsonify
import ollama

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

SYSTEM_PROMPT = """
You are an expert Automation Architect. Your task is to convert Selenium Java test automation code into Playwright TypeScript code.
Rules:
1. Maintain functional parity.
2. Use Playwright best practices (auto-waits, strict locators, fixtures).
3. Do not use generic waits (Thread.sleep).
4. Use `test` and `expect` from `@playwright/test`.
5. Return the result in a Markdown code block (```typescript ... ```).
6. If the input is not code or unclear, provide a polite error in a comment.
"""

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/convert', methods=['POST'])
def convert():
    try:
        data = request.json
        java_code = data.get('java_code', '')
        
        if not java_code:
            return jsonify({'error': 'No Java code provided'}), 400

        logging.info("Sending request to Ollama...")
        
        response = ollama.chat(model='codellama', messages=[
            {'role': 'system', 'content': SYSTEM_PROMPT},
            {'role': 'user', 'content': f"Convert this Selenium Java code to Playwright TypeScript:\n\n{java_code}"},
        ])
        
        converted_code = response['message']['content']
        
        return jsonify({'playwright_code': converted_code})
        
    except Exception as e:
        logging.error(f"Error during conversion: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting server on http://localhost:5000")
    app.run(debug=True, port=5000)
