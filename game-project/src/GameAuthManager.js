const API_URL = "https://blender-threejs-mongo.onrender.com/api/auth";

const GameAuthManager = {
  // Registro de usuario
  async register(username, email, password) {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error en el registro");
    return data;
  },

  // Login de usuario
  async login(email, password) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error en el login");

    localStorage.setItem("gameToken", data.token);
    return data;
  },

  getToken() {
    return localStorage.getItem("gameToken");
  },

  async getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const res = await fetch(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) return null;
      return data.user || data;
    } catch {
      return null;
    }
  },

  // SCORE SYSTEM

  async saveScore(score, level = 1, timeCompleted = 0, playerName = null) {
    const token = this.getToken();

    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const body = {
      score,
      level,
      timeCompleted,
    };

    if (playerName) {
      body.playerName = playerName;
    }

    const res = await fetch(
      "https://blender-threejs-mongo.onrender.com/api/scores/final",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Error al guardar puntaje");
    return data.data || data;
  },

  async getUserScores() {
    const token = this.getToken();
    if (!token) return [];

    const res = await fetch(
      "https://blender-threejs-mongo.onrender.com/api/scores/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (!res.ok) return [];
    return data.data || [];
  },

  async getUserHighScore() {
    try {
      const scores = await this.getUserScores();
      if (!scores || scores.length === 0) return 0;
      return Math.max(...scores.map((s) => s.score || 0));
    } catch {
      return 0;
    }
  },

  async getLeaderboard(limit = 10) {
    const res = await fetch(
      `https://blender-threejs-mongo.onrender.com/api/scores/leaderboard?limit=${limit}`
    );

    const data = await res.json();
    if (!res.ok) return [];
    return data.data || [];
  },

  async getUserLeaderboardPosition() {
    const token = this.getToken();
    if (!token) return null;

    const res = await fetch(
      "https://blender-threejs-mongo.onrender.com/api/scores/user/position",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (!res.ok) return null;
    return data.data || null;
  },

  async getUserStats() {
    const token = this.getToken();
    if (!token) return null;

    const res = await fetch(
      "https://blender-threejs-mongo.onrender.com/api/scores/user/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (!res.ok) return null;
    return data.data || null;
  },

  logout() {
    localStorage.removeItem("gameToken");
  },
};

export default GameAuthManager;