# 🔑 Debug Challenges: Instructor & Student Answer Key

This document provides complete solutions, error explanations, and pedagogical notes for all interactive debug challenges in `Employee_Productivity_NumPy_Linear_Regression.ipynb`.

---

## Table of Contents
1. [Part C – Simple Linear Regression: Challenge C4](#challenge-c4-simple-linear-regression-1d-vs-2d-array-error)
2. [Part D – Gradient Descent: Challenge D3](#challenge-d3-gradient-descent-learning-rate-explosion)
3. [Part E – Multiple Linear Regression: Challenge E4](#challenge-e4-multiple-regression-input-feature-count-mismatch)
4. [Part F – Feature Importance: Challenge F5](#challenge-f5-standardised-weights-mean-vs-standard-deviation)
5. [Part G – Model Diagnostics & Multicollinearity: Challenge G4](#challenge-g4-vif-regressing-target-vs-feature)
6. [Part H – Generalization & Validation: Challenge H5](#challenge-h5-train-vs-test-sample-mismatch-data-leakage)

---

## Challenge C4: Simple Linear Regression (1D vs 2D Array Error)

### 📍 Location in Notebook
- **Section**: Part C – Simple regression: one feature (experience) &rarr; `### C4. Debug Challenge: Find and Fix the Bug`

### ❌ The Buggy Code
```python
# Feature column 1 is training_hours
X_training = F[:, 1]  # 💥 Bug: 1D array slice of shape (N,)
y_target = y

debug_lr = LinearRegression()
debug_lr.fit(X_training, y_target)  # Crashes here!

print("Slope m:", round(debug_lr.coef_[0], 3))
print("Intercept c:", round(debug_lr.intercept_, 3))
```

### 💥 Error Message
```text
ValueError: Expected 2D array, got 1D array instead:
array=[...].
Reshape your data either using array.reshape(-1, 1) if your data has a single feature
or array.reshape(1, -1) if it contains a single sample.
```

### 🔍 Why It Fails
In scikit-learn, predictor inputs $X$ must always be a 2D matrix of shape `(n_samples, n_features)`. Slicing with a single integer index `F[:, 1]` drops the dimension in NumPy, returning a 1D vector of shape `(5838,)` instead of a 2D column of shape `(5838, 1)`.

### ✅ Fixed Solution Code
```python
# Option 1: 2D column slice using list indexing [1] (Recommended)
X_training = F[:, [1]]
y_target = y

debug_lr = LinearRegression()
debug_lr.fit(X_training, y_target)

print("Slope m:", round(debug_lr.coef_[0], 3))
print("Intercept c:", round(debug_lr.intercept_, 3))
```

*Alternative valid fix:*
```python
# Option 2: Reshaping the 1D slice into 2D
X_training = F[:, 1].reshape(-1, 1)
```

### 💡 Expected Output
```text
Slope m: 0.407
Intercept c: 59.988
```

---

## Challenge D3: Gradient Descent (Learning Rate Explosion)

### 📍 Location in Notebook
- **Section**: Part D – Gradient descent and the learning rate &rarr; `### D3. Debug Challenge: Find and Fix the Bug`

### ❌ The Buggy Code
```python
sgd_broken = make_pipeline(
    StandardScaler(),
    SGDRegressor(loss="squared_error", penalty=None, learning_rate="constant",
                 eta0=5.0, max_iter=1000, random_state=42)  # 💥 eta0=5.0 is way too large!
)

sgd_broken.fit(x, y)
print("Sample predictions:", sgd_broken.predict(x[:3]))
print("RMSE:", round(rmse(y, sgd_broken.predict(x)), 2))
```

### 💥 Error Message / Symptoms
```text
ValueError: Floating point issues in SGDRegressor (e.g. loss overflow or infinite values)
due to a too large eta0 or too few epochs.
```
*Or, on some platforms, weights overflow to `inf` / `nan` values.*

### 🔍 Why It Fails
Gradient descent updates parameters via $w \leftarrow w - \eta \cdot \nabla L$. When the learning rate $\eta_0$ (`eta0`) is set to `5.0`, each gradient step massively overshoots the minimum of the parabolic loss surface. The loss compounds exponentially each step, triggering a floating-point overflow.

### ✅ Fixed Solution Code
```python
# Fix: Set eta0 to a standard step size (e.g., 0.01)
sgd_fixed = make_pipeline(
    StandardScaler(),
    SGDRegressor(loss="squared_error", penalty=None, learning_rate="constant",
                 eta0=0.01, max_iter=1000, random_state=42)
)

sgd_fixed.fit(x, y)
print("Sample predictions:", sgd_fixed.predict(x[:3]).round(1))
print("RMSE:", round(rmse(y, sgd_fixed.predict(x)), 2))
```

### 💡 Expected Output
```text
Sample predictions: [62.6 66.4 60.7]
RMSE: 8.01
```

---

## Challenge E4: Multiple Regression (Input Feature Count Mismatch)

### 📍 Location in Notebook
- **Section**: Part E – All nine features together &rarr; `### E4. Debug Challenge: Find and Fix the Bug`

### ❌ The Buggy Code
```python
# Candidate provided with only 7 features:
# [experience, training, complexity, ai_assistant, rework, absent, team_size]
candidate = np.array([[4, 10, 3, 1, 2, 1, 8]])  # 💥 Missing meeting_hours and blocker_hours!

predicted_score = model.predict(candidate)
print("Predicted productivity score:", round(predicted_score[0], 1))
```

### 💥 Error Message
```text
ValueError: X has 7 features, but LinearRegression is expecting 9 features as input.
```

### 🔍 Why It Fails
The model in Part E was fitted on the full dataset with 9 features:
`['experience_years', 'training_hours', 'task_complexity', 'ai_assistant', 'rework_tickets', 'absent_days', 'team_size', 'meeting_hours', 'blocker_hours']`.
Linear regression requires matrix multiplication $X \cdot w$. If $X$ has 7 columns and $w$ has 9 weights, matrix multiplication is mathematically undefined.

### ✅ Fixed Solution Code
```python
# Fix: Add values for the 8th and 9th features (meeting_hours, blocker_hours)
# Example: 14 meeting hours, 6 blocker hours
candidate = np.array([[4, 10, 3, 1, 2, 1, 8, 14, 6]])  # 9 features

predicted_score = model.predict(candidate)
print("Predicted productivity score:", round(predicted_score[0], 1))
```

### 💡 Expected Output
```text
Predicted productivity score: 66.8
```

---

## Challenge F5: Standardised Weights (Mean vs. Standard Deviation)

### 📍 Location in Notebook
- **Section**: Part F – Which features affect productivity? &rarr; `### F5. Debug Challenge: Find and Fix the Bug`

### ❌ The Buggy Code
```python
# Student mistakenly used scaler.mean_ instead of scaler.scale_!
manual_std_weights = model.coef_ * scaler.mean_  # 💥 Mean is NOT standard deviation!

matches = np.allclose(manual_std_weights, std_w)
print("Do manual weights match pipeline std_w?:", matches)
```

### 💥 Symptom
```text
Do manual weights match pipeline std_w?: False
```
*Outputs are completely mismatched because means and standard deviations have different units and magnitudes.*

### 🔍 Why It Fails
Standardization transforms each feature as $z = \frac{x - \mu}{\sigma}$, where $\mu$ is the mean (`scaler.mean_`) and $\sigma$ is the standard deviation (`scaler.scale_`).
The relationship between raw regression weights and standardized weights is:
$$\beta_{\text{std}} = \beta_{\text{raw}} \times \sigma$$
Multiplying by $\mu$ instead of $\sigma$ scales by the feature's center, not its spread.

### ✅ Fixed Solution Code
```python
# Fix: Multiply by scaler.scale_ (the standard deviation sigma), or 'sd' from E2
manual_std_weights = model.coef_ * scaler.scale_

matches = np.allclose(manual_std_weights, std_w)
print("Do manual weights match pipeline std_w?:", matches)
print(f"{'Feature':18s} {'Manual':>10s} {'Actual std_w':>12s}")
for nme, mw, sw in zip(names, manual_std_weights, std_w):
    print(f"{nme:18s} {mw:10.2f} {sw:12.2f}")
```

### 💡 Expected Output
```text
Do manual weights match pipeline std_w?: True
Feature                Manual  Actual std_w
experience_years         4.12         4.12
training_hours           0.82         0.82
task_complexity          2.95         2.95
ai_assistant             2.14         2.14
rework_tickets          -2.61        -2.61
absent_days             -2.84        -2.84
team_size                0.04         0.04
meeting_hours           -0.65        -0.65
blocker_hours           -1.18        -1.18
```

---

## Challenge G4: Model Diagnostics & Multicollinearity (VIF Bug)

### 📍 Location in Notebook
- **Section**: Part G – Can we trust the model? &rarr; `### G4. Debug Challenge: Find and Fix the Bug`

### ❌ The Buggy Code
```python
other_features = [1, 2, 3, 4, 5, 6, 7, 8]

# 💥 Bug: Regressing against target 'y' (productivity score) instead of feature 0 (F[:, 0])!
vif_model = LinearRegression().fit(F[:, other_features], y)
wrong_r2 = vif_model.score(F[:, other_features], y)
wrong_vif = 1 / (1 - wrong_r2)

print("Student's calculated VIF:", round(wrong_vif, 2))
```

### 💥 Symptom
```text
Student's calculated VIF: 3.87
```
*The student calculates ~3.87, which is completely incorrect. True VIF for `experience_years` is ~1.08.*

### 🔍 Why It Fails
Variance Inflation Factor (VIF) measures **multicollinearity between input features** (unsupervised).
$$\text{VIF}_j = \frac{1}{1 - R_j^2}$$
where $R_j^2$ is obtained by regressing feature $X_j$ against all other features $X_{-j}$.
The target label $y$ should **never** appear in a VIF calculation. When the student passed $y$, they computed the regression score of the remaining 8 features predicting the productivity score, not multicollinearity!

### ✅ Fixed Solution Code
```python
other_features = [1, 2, 3, 4, 5, 6, 7, 8]

# Fix: Regress feature 0 (F[:, 0]) on the other 8 features
vif_model = LinearRegression().fit(F[:, other_features], F[:, 0])
correct_r2 = vif_model.score(F[:, other_features], F[:, 0])
correct_vif = 1 / (1 - correct_r2)

print("Correct VIF for experience_years:", round(correct_vif, 2))
```

### 💡 Expected Output
```text
Correct VIF for experience_years: 1.08
```

---

## Challenge H5: Generalization & Validation (Sample Count Mismatch)

### 📍 Location in Notebook
- **Section**: Part H – Working on new data &rarr; `### H5. Debug Challenge: Find and Fix the Bug`

### ❌ The Buggy Code
```python
F_train, F_test, y_train, y_test = train_test_split(F, y, test_size=0.2, random_state=42)
eval_model = LinearRegression().fit(F_train, y_train)

# 💥 Bug: Comparing y_test (1,168 samples) with predictions on F_train (4,670 samples)!
test_rmse = np.sqrt(mean_squared_error(y_test, eval_model.predict(F_train)))
print("Honest Test RMSE:", round(test_rmse, 2))
```

### 💥 Error Message
```text
ValueError: Found input variables with inconsistent numbers of samples: [1168, 4670]
```

### 🔍 Why It Fails
`train_test_split(..., test_size=0.2)` divides the 5,838 rows into:
- Training set: 4,670 samples (`F_train`, `y_train`)
- Test set: 1,168 samples (`F_test`, `y_test`)

The student called `eval_model.predict(F_train)` (4,670 predictions) and passed it to `mean_squared_error` alongside `y_test` (1,168 labels). The arrays have mismatched lengths and represent completely different observations.

### ✅ Fixed Solution Code
```python
F_train, F_test, y_train, y_test = train_test_split(F, y, test_size=0.2, random_state=42)
eval_model = LinearRegression().fit(F_train, y_train)

# Fix: Evaluate predictions on F_test!
test_rmse = np.sqrt(mean_squared_error(y_test, eval_model.predict(F_test)))
print("Honest Test RMSE:", round(test_rmse, 2))
```

### 💡 Expected Output
```text
Honest Test RMSE: 4.54
```
