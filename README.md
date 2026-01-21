<img width="1897" height="899" alt="image" src="https://github.com/user-attachments/assets/39b3395c-90d8-4b84-835f-773a0a80a43d" /># 📊 BizPulse – Business Analytics Dashboard

BizPulse is a full-stack business analytics and order management dashboard built using the **MERN stack**. It provides a clean admin panel to manage orders, customers, and revenue insights using interactive charts, powerful filtering, and **CSV import support**.

This project is designed to follow **industry-style development practices** with a modular backend, reusable frontend components, and analytics-focused APIs.

---

##  Features

### ✅ Dashboard Insights

* Total Orders, Total Revenue, Total Customers (overview cards)
* Monthly Sales Trends (**Line Chart**)
* Category-wise Sales Analytics
* City-based distribution insights


<img width="1897" height="899" alt="image" src="https://github.com/user-attachments/assets/093ce8f3-53a5-4c97-b8c0-df8ea95c060a" />
<img width="1919" height="890" alt="image" src="https://github.com/user-attachments/assets/7498bbb6-ad02-4d64-a0dc-6c2db22b6f4c" />



### ✅ Orders Management

* View all orders in a structured table
* Search orders by **customer / product**
* Filter orders by **category / payment mode / city**
* Pagination support for large datasets
* View order details

<img width="1919" height="844" alt="image" src="https://github.com/user-attachments/assets/077fa8bc-cc0a-46c1-86e1-62cc40621672" />


### ✅ CSV Upload Support

* Upload bulk order data using a `.csv` file
* Automatic parsing + validation before database insertion
* Designed for importing real-world datasets

<img width="1907" height="828" alt="image" src="https://github.com/user-attachments/assets/edbd6b6a-f2a6-4906-9ecc-8c1d4b553c26" />


### ✅ REST API Backend

* Structured Express APIs for Orders and Analytics
* Centralized error handling
* Clean, scalable folder structure

### ✅ Developer-Friendly

* Environment-based configuration (`.env`)
* API service layer in frontend
* Reusable components & clean UI structure
* Testing-ready endpoints

---

## 🛠 Tech Stack

### Frontend

* **React + TypeScript**
* **Vite**
* **Recharts** (data visualizations)
* **Tailwind CSS** (UI styling)

### Backend

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **Multer + csv-parser** (CSV upload)

---

## 📁 Project Structure

```
BizPulse/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   └── orderRoutes.js
│   │   ├── controllers/
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── OrdersPage.tsx
│   │   │   └── UploadCSV.tsx
│   │   ├── components/
│   │   │   ├── MonthlySalesChart.tsx
│   │   │   ├── OrderTable.tsx
│   │   │   └── StatCard.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## ✅ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/<your-username>/bizpulse.git
cd bizpulse
```

---

## ⚙ Backend Setup

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Create `.env` File

Create a `.env` file inside the `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

✅ Example (Local MongoDB):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bizpulse
```

### 4️⃣ Start Backend Server

```bash
npm run dev
```

Backend will run at:

📌 **[http://localhost:5000](http://localhost:5000)**

---

## 🎨 Frontend Setup

### 5️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 6️⃣ Start Frontend Server

```bash
npm run dev
```

Frontend will run at:

📌 **[http://localhost:5173](http://localhost:5173)**

---

## 🔥 API Endpoints

### ✅ Orders APIs

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| GET    | `/api/orders`     | Fetch all orders             |
| POST   | `/api/orders`     | Add a new order              |
| POST   | `/api/orders-csv` | Upload CSV and import orders |

### ✅ Analytics APIs

| Method | Endpoint                        | Description                |
| ------ | ------------------------------- | -------------------------- |
| GET    | `/api/analytics/monthly-sales`  | Monthly sales summary      |
| GET    | `/api/analytics/category-sales` | Category revenue breakdown |

---

## 📌 CSV Format

Your CSV file must contain the following columns:

| orderId | customerName | productName | category | quantity | amount | city | paymentMode | orderDate |
| ------: | ------------ | ----------- | -------- | -------- | ------ | ---- | ----------- | --------- |

✅ Example Row:

```csv
1001,Rahul Sharma,iPhone 15,Electronics,1,79999,Mumbai,UPI,2025-01-15
```

---

## 🧪 Testing Guide

### Backend Testing (Postman / Thunder Client)

✅ Server Health Check:

* `GET http://localhost:5000/`

✅ Fetch Orders:

* `GET http://localhost:5000/api/orders`

✅ Upload CSV:

* `POST http://localhost:5000/api/orders-csv`
* Request Type: `form-data`
* Key: `file`
* Value: Upload `.csv`

---

## 📌 Future Improvements

* Admin authentication (JWT)
* Export analytics reports as PDF/Excel
* Date-range filters (weekly/monthly/custom)
* Role-based access control
* Docker support + CI/CD pipeline

---

## 👨‍💻 Author

**Shreyansh Singh**
Engineering Student | Full Stack Developer
Project: **BizPulse (BigPulz)**

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
