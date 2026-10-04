# Employee Productivity Score Predictor & ML Classroom

An interactive machine learning teaching lab and web application for understanding and predicting employee productivity scores using NumPy, Scikit-Learn, and Linear Regression.

## 🚀 Overview

- **Interactive Web App (`/app`)**: Built with React, Vite, Tailwind/Lucide icons, and in-browser Pyodide WebAssembly to run Python/NumPy/Scikit-Learn/Pandas directly in the client.
- **Teaching Materials**: Includes Jupyter notebooks (`Employee_Productivity_NumPy_Linear_Regression.ipynb`), lecture notes, and slide automation scripts.
- **Datasets**: Sample productivity datasets and model weights for linear regression demonstrations.

## 📁 Repository Structure

```text
├── app/                                                # React + Vite interactive classroom application
│   ├── src/                                            # Components, Pyodide runner, UI
│   ├── package.json
│   └── vite.config.js
├── Employee_Productivity_NumPy_Linear_Regression.ipynb # Step-by-step NumPy & ML notebook
├── employee_productivity_data.csv                      # Dataset for employee productivity metrics
├── models_overs_5_to_19.json                           # Pre-computed model checkpoints
├── *.docx / *.txt                                      # Lecture & curriculum notes
└── .gitignore
```

## 🛠️ Getting Started with the Web App

1. Navigate to the `app` folder:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open the browser link (usually `http://localhost:5173`) to launch the interactive workspace.

## 📓 Running the Notebook

You can open `Employee_Productivity_NumPy_Linear_Regression.ipynb` using Jupyter Notebook, JupyterLab, VS Code, or upload it to Google Colab.
