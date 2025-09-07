# TraceMail Analyzer - Frontend

Frontend client for viewing processed emails and testing manual header analysis.  
Built with **React, Vite, TailwindCSS, Axios**.

---

## 🔧 Setup

### 1. Clone & Install
```bash
git clone <frontend-repo-url>
cd frontend
npm install
```

### 2. Environment Variables
Create `.env` file in root:
```bash
VITE_API_URL=http://localhost:3000/api
VITE_TEST_EMAIL=analyze.tracemail@gmail.com
VITE_TEST_SUBJECT_TOKEN=[TEST_TOKEN_ABC123]
```

### 3. Run
```bash
npm run dev
```
Frontend will run at http://localhost:5173

---

## 📱 Features

### Home Page:
- Copy analyzer email & subject token with one click
- Instructions for sending test email
- Link to Dashboard with guided arrow
- "Check someone else's email?" → paste raw header to analyze manually

### Dashboard:
- List of processed emails
- Shows ESP + receiving chain
- Clickable cards → detailed view

### Email Detail:
- Subject, From, To
- ESP detection details (provider, confidence, reasons)
- Full receiving chain
- Raw headers (formatted, copyable)

---

## 🔄 Workflow

### Option A (auto mode)
1. Send email to analyzer inbox (`VITE_TEST_EMAIL`) with subject containing `VITE_TEST_SUBJECT_TOKEN`.
2. Wait a few seconds → click **See Results** → Dashboard shows processed mail.

### Option B (manual mode)
1. Copy raw headers from any email (**Show Original** in Gmail).
2. Paste into "Check someone else's email?" section.
3. Click **Analyze Header** → redirected to Dashboard to view results.
