# 🚀 Dynamic Portfolio with AI Chatbot

A next-generation portfolio website featuring a **physics-based interactive background**, **Apple-style glassmorphism UI**, and a **Groq-powered AI assistant** trained on your resume.

![Portfolio Preview](https://via.placeholder.com/1200x600?text=Portfolio+Preview+Placeholder)

## ✨ Features

- **🎨 Dynamic Visuals**:
    - **Google Gradient Rays**: Moving ambient background with vibrant, shifting colors.
    - **Glassmorphism UI**: Premium frosted glass effects (`backdrop-filter`) on cards and navigation.
    - **Apple-Inspired Design**: Sleek transitions, subtle shadows, and a modern aesthetic.

- **⚛️ Physics-Based Interaction**:
    - **Floating 3D Icons**: Background icons (Unity, Python, code, etc.) that float upward.
    - **Mouse Repulsion**: Icons react to your cursor using a custom physics engine, floating away when touched.

- **🤖 AI Chatbot Assistant**:
    - **Smart Responses**: Powered by **Llama 3 (via Groq API)**.
    - **Context-Aware**: System-prompted with your specific resume data `data.py`.
    - **Minimizable Widget**: A non-intrusive, collapsible chat interface.

- **📱 Responsive & Smooth**:
    - **Scroll Snapping**: Full-screen sections snap into place for an app-like feel.
    - **Mobile-Ready**: Fully responsive layout for all devices.

## 🛠️ Tech Stack

- **Backend**: Python (Flask)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla - No heavy frameworks)
- **AI Engine**: [Groq SDK](https://groq.com/) (Llama-3.3-70b-versatile)
- **Deployment**: Ready for [Render](https://render.com/) (includes `gunicorn` & `requirements.txt`)

## ⚙️ Setup & Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Configure Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add your Groq API key:
      ```env
      GROQ_API_KEY=your_groq_api_key_here
      ```

4.  **Run Locally**:
    ```bash
    python app.py
    ```
    Visit `http://127.0.0.1:5000` in your browser.

## 📂 Project Structure

```
portfolio/
├── app.py              # Flask application & Chatbot logic
├── data.py             # Resume data (Edit this to update content)
├── requirements.txt    # Project dependencies
├── .env                # API Keys (Not pushed to GitHub)
├── templates/
│   ├── base.html       # Base layout & metadata
│   └── index.html      # Main portfolio page
└── static/
    ├── css/
    │   └── style.css   # Styles (Glassmorphism, Gradients, Animations)
    └── js/
        └── script.js   # Logic (Physics Engine, Chat, Scroll)
```

## 🚀 Deployment (Render)

1.  Push your code to a **GitHub repository**.
2.  Log in to [Render](https://dashboard.render.com/) and create a **New Web Service**.
3.  Connect your repo and use these settings:
    - **Build Command**: `pip install -r requirements.txt`
    - **Start Command**: `gunicorn app:app`
4.  Add your `GROQ_API_KEY` in the **Environment Variables** section.

## 📝 Customization

- **Edit Content**: Modify `data.py` to update your name, skills, projects, and contact info. The website updates automatically!
- **Tweak Physics**: Adjust speed and repulsion radius in `static/js/script.js`.
- **Change Colors**: Update the CSS variables in `static/css/style.css`.

---

Developed with ❤️ by [Kushal Das](https://github.com/KushalDas12)
