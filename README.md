# 🥔 Potato Disease Classification using Deep Learning

## 📌 Project Overview
This project is a **Potato Disease Classification System** that uses **Deep Learning** to classify potato plant leaves into three categories:
- **Early Blight** 🍂
- **Late Blight** ❄️
- **Healthy** 🌱

The backend is built using **FastAPI** and **TensorFlow**, while the frontend is developed with **React** and **Material-UI**.

---
## 🚀 Getting Started

### 🔧 Prerequisites
Make sure you have the following installed:
- **Python 3.12.4** 🐍
- **Node.js & npm** (for frontend) 🚀
- **TensorFlow & Keras** (for deep learning model) 🧠

---
## 🔙 Backend Setup (FastAPI & TensorFlow)

1️⃣ **Clone the repository:**
```sh
git clone https://github.com/your-repo/potato-disease-classification.git
cd potato-disease-classification
```

2️⃣ **Install backend dependencies:**
```sh
pip install fastapi uvicorn numpy pillow tensorflow keras
```

3️⃣ **Run the API server:**
```sh
python backend.py
```

🎯 The FastAPI server will start at: **`http://localhost:8000`**

📌 **Test if the API is running:**
```sh
http://localhost:8000/ping
```
Expected Response: `"Hello, It Start"`

---
## 🎨 Frontend Setup (React & Material-UI)

1️⃣ **Navigate to the frontend directory:**
```sh
cd frontend
```

2️⃣ **Install frontend dependencies:**
```sh
npm install
```

3️⃣ **Create an `.env` file and set API URL:**
```sh
echo "REACT_APP_API_URL=http://localhost:8000/predict" > .env
```

4️⃣ **Run the React frontend:**
```sh
npm start
```

🎯 The frontend will start at: **`http://localhost:3000`**

---
## 🖼️ How to Use
1. **Upload** an image of a potato leaf 🍃.
2. The model will **process** the image and classify it.
3. You will see the **predicted disease** with a **confidence score** 📊.
4. Click **Clear** to reset and upload another image 🔄.

---
## 🔥 Technologies Used
- **FastAPI** ⚡ (Backend API)
- **React.js** ⚛️ (Frontend UI)
- **TensorFlow/Keras** 🧠 (Deep Learning Model)
- **Material-UI** 🎨 (UI Components)
- **Axios** 🌐 (API Calls)

---
## 📌 Future Enhancements
- ✅ Improve model accuracy 🏆
- ✅ Add support for more plant diseases 🌾
- ✅ Deploy the system online 🌍

---


