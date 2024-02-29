# app.py
from flask import Flask, request
from transformers import pipeline
from dotenv import load_dotenv
import os

load_dotenv()

# Flask 객체 인스턴스 생성
app = Flask(__name__)

def load_model():
    model_name = os.environ.get('MODEL_NAME')
    print(f"모델을 불러오고 있습니다..", model_name)
    summarization = pipeline("summarization", model=model_name)
    return summarization

# 요약 모델을 전역 변수로 선언
summarization = load_model() 

@app.route('/')
def index():
  return '요청 성공'

@app.route('/summary',methods=['POST'])
def summary_text():
    text = request.json.get('text')
    print("가져온 text: ", text)
    result = summarization(text)
    return result

if __name__=="__main__":
  app.run(debug=True)
  app.run(host="127.0.0.1", port="5000", debug=True)