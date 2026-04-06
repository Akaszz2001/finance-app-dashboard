
💰 Finance Dashboard UI

A clean and interactive Finance Dashboard Web Application built using modern frontend technologies.
This project allows users to track financial activities, explore transactions, and understand spending patterns.

---

🚀 Live Demo

👉 https://finance-app-dashboard-dtruio9bf-akaszz2001s-projects.vercel.app/

---

📌 Features

🏠 Dashboard Overview

- Displays Total Balance, Income, and Expenses
- Time-based visualization (trend chart)
- Category-wise breakdown (pie chart)
- Recent transactions section

---

💳 Transactions Management

- View transactions in a structured table
- Add new transactions
- Edit and delete transactions (Admin only)
- Filters available:
  - Date (week/month)
  - Category
  - Type (income/expense)
  - Amount sorting (ascending/descending)
- Load more functionality (Viewer mode)

---

👥 Role-Based UI

- Viewer
  - Can only view transactions and insights
- Admin
  - Can add, edit, and delete transactions
  - Can upload transactions in bulk

---

📂 Bulk Upload (JSON)

- Upload multiple transactions via JSON file
- Sample json transaction data can be downloaded from the bulk uploading window
- Preview transactions before uploading
- Sequential validation logic:
  - Prevents negative balance
  - Skips transactions exceeding balance
  - Rejects future dates
- Displays count of added and skipped transactions

---

📊 Insights Section

- Highest spending category
- Monthly comparison
- Percentage change in spending
- Top 3 spending categories
- Basic smart suggestions based on data

---

💾 Data Persistence

- Uses localStorage to store transactions


---


🛠️ Tech Stack

- Frontend: React (Vite)
- State Management: Zustand
- Styling: Tailwind CSS
- Charts: Recharts
- Icons: Lucide React

---

📁 Project Structure

src/
│
├── components/
├── pages/
├── store/
│   └── useFinanceStore.js
├── App.jsx

---

⚙️ Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/Akaszz2001/finance-app-dashboard.git
cd finance-app-dashboard

---

2️⃣ Install Dependencies

npm install

---

3️⃣ Run Development Server

npm run dev

---

4️⃣ Build for Production

npm run build

---

🧠 Key Concepts Implemented

- Component-based architecture
- State management using Zustand
- Role-based UI rendering
- Data visualization with charts
- JSON file handling and parsing
- Sequential validation in bulk upload
- Responsive UI design

---

⚠️ Edge Case Handling

- Prevents future date transactions
- Prevents negative balance
- Skips invalid bulk upload entries
- Handles empty state UI

---


📬 Contact

👤 Akash Krishna M
7306935086

---

⭐ Conclusion

This project demonstrates strong understanding of:

- Frontend architecture
- State management
- UI/UX design
- Data handling and validation

---