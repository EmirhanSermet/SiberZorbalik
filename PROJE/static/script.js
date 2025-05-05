// script.js

const messageInput = document.getElementById("messageInput");
const result = document.getElementById("result");
const exampleCard = document.querySelector(".card:nth-child(1)");

async function analizEt() {
  const mesaj = document.getElementById("metin").value;

  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: mesaj }),
  });

  const data = await response.json();

  const sonucDiv = document.getElementById("sonuc");
  sonucDiv.innerText = data.prediction;
  sonucDiv.className = "alert-box " + (data.bully ? "alert-red" : "alert-green");
}

messageInput.addEventListener("input", () => {
  const text = messageInput.value.toLowerCase();

  // Basit sahte kontrol: bazı kelimelere göre
  const bullyingKeywords = ["aptal", "sefil", "çirkin", "nefret", "kimse seni sevmiyor"];
  const isBullying = bullyingKeywords.some(word => text.includes(word));

  if (text.trim() === "") {
    result.style.display = "none";
    exampleCard.style.display = "none";
  } else if (isBullying) {
    result.textContent = "⚠️ Bu mesaj siber zorbalık içermektedir.";
    result.className = "warning";
    result.style.display = "block";
    exampleCard.style.display = "block";
  } else {
    result.textContent = "✅ Bu mesaj güvenlidir.";
    result.className = "safe";
    result.style.display = "block";
    exampleCard.style.display = "none";
  }
});
