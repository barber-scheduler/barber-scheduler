// src/api/api.js
const API_URL = "http://localhost:3333"; 
// 🟡 ATENÇÃO:
// - Android Emulator → 10.0.2.2
// - iOS Simulator → localhost
// - Expo no celular → http://SEU-IP:3333

export async function apiPost(endpoint, body) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return { ok: response.ok, data };
  } catch (error) {
    console.log("API error:", error);
    return { ok: false, data: { error: "Erro de conexão" } };
  }
}

export { API_URL };
