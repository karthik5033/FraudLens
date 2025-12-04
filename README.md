🛡️ FraudLens

AI-powered UPI fraud-text detection that identifies refund scams, impersonation attempts, verification fraud, and phishing — in real time.

🚀 Overview

FraudLens is an NLP model trained on a custom English + Hinglish dataset designed to catch modern Indian social-engineering attacks.
The system classifies incoming messages into:
safe, refund_scam, impersonation, verification_fraud, phishing.

✨ Features

🔍 Real-time fraud text classification

🧠 Custom-trained transformer model (Colab + Python)

🇮🇳 Optimized for Indian UPI fraud patterns & Hinglish slang

⚡ Easy API integration with any app / backend

🔒 Lightweight + production-friendly

🧵 Architecture

Dataset Layer: Custom CSV dataset (100–500 samples), English/Hinglish, labeled into 5 fraud categories.

Model Layer: Fine-tuned BERT / DistilBERT classifier.

API Layer: FastAPI / Node backend exposing /predict.

Frontend: Next.js UI sending text → API → model → prediction.

📂 Project Structure
FraudLens/
├── dataset/
│   └── fraud_text_dataset.csv
├── model/
│   ├── train.ipynb
│   ├── tokenizer/
│   └── model_weights/
├── backend/
│   ├── app.py (FastAPI)
│   └── requirements.txt
├── frontend/
│   └── nextjs-app/
└── README.md

🏋️‍♂️ Model Training (Google Colab)

Upload dataset

Preprocess + encode text

Fine-tune BERT/DistilBERT

Export tokenizer + model weights

Upload to backend for inference

(If you want, I can generate the exact Colab training notebook for you.)

🔌 API Usage

POST /predict

{
  "text": "Sir I accidentally sent ₹500, please refund"
}


Response:

{
  "label": "refund_scam",
  "confidence": 0.94
}

🎯 Use Cases

UPI app safety filters

SMS/WhatsApp spam detection

Fraud-warning popups

Banking chatbot guardrails

Customer security layers

🤝 Team

4-member ML + full-stack squad.
Each team trains different models; FraudLens represents Team 3’s NLP module.

📜 License

MIT — open for innovation.
