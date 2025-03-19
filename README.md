# ResumeMaster

ResumeMaster is a modern resume-building web application that allows users to create, edit, and enhance their resumes with AI-powered suggestions. It provides multiple resume templates and an intuitive interface for users to generate professional resumes easily.

## 🚀 Features
- **Resume Builder**: Create and edit resumes with an easy-to-use interface.
- **AI Enhancement**: Improve resume content using AI-powered text suggestions.
- **Multiple Templates**: Choose from a variety of professional resume templates.
- **Export Options**: Download your resume as a **PDF** or print directly.
- **User-Friendly Interface**: Responsive design with smooth navigation.
- **Secure Storage**: User data is securely stored in the database.

---

## 🛠️ Tech Stack
**Frontend:**
- React.js (Vite for fast build & development)
- Tailwind CSS (For styling)
- React Hooks & Context API (State Management)

**Backend:**
- Node.js & Express.js (For API handling)
- MongoDB Atlas (Database for storing user resumes)
- OpenAI API (For AI-powered resume enhancement)

---

## 📌 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/resumemaster.git
cd resumemaster
```

### 2️⃣ Install Dependencies
#### Frontend
```sh
cd frontend
npm install
npm run dev  # Starts Vite development server
```

#### Backend
```sh
cd backend
npm install
node server.js  # Starts the backend server
```

---

---



### **Resume Operations**
- `POST /save-resume` - Save user resume
- `GET /get-resume/:id` - Fetch a saved resume
- `POST /enhance-resume` - AI-enhanced resume content

---

## 📜 License
This project is licensed under the **MIT License**.

---

