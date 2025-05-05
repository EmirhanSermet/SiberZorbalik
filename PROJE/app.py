from flask import Flask, request, render_template
import pickle

app = Flask(__name__)

# Sayfalar
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/egitim')
def egitim():
    return render_template('egitim.html')

@app.route('/istatistik')
def istatistik():
    return render_template('istatistik.html')

@app.route('/hakkinda')
def hakkinda():
    return render_template('hakkinda.html')

# Model ve vectorizer'ı yükle
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

# Tahmin
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '').strip()

    if not text:
        return {"tahmin": "Lütfen metin girin."}

    try:
        text_tfidf = vectorizer.transform([text])

        if text_tfidf.nnz == 0:
            return {"tahmin": "Metin eğitim verisindeki kelimeleri içermiyor."}

        prediction = model.predict(text_tfidf)
        return {"tahmin": prediction[0]}

    except Exception as e:
        return {"tahmin": f"Hata: {str(e)}"}
if __name__ == "__main__":
    app.run(debug=True)
