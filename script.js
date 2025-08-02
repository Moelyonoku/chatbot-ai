
const chatContainer = document.getElementById("chat-container");
const inputField = document.getElementById("input-field");
const sendButton = document.getElementById("send-button");

function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.innerText = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage() {
  const userInput = inputField.value.trim();
  if (!userInput) return;
  appendMessage("user", userInput);
  inputField.value = "";

  appendMessage("bot", "Sedang mengetik...");

  try {
    const response = await fetch("https://gpt-chat-proxy-render.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    const botMessage = data.reply || "Maaf, saya tidak bisa menjawab saat ini.";
    document.querySelector(".message.bot:last-child").innerText = botMessage;
  } catch (error) {
    document.querySelector(".message.bot:last-child").innerText = "Terjadi kesalahan dalam menghubungi GPT.";
  }
}

sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
