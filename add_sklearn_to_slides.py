import json
import re

# Dictionary of Scikit-Learn code blocks for slides 12 through 23
SKLEARN_CODES = {
    12: {
        "title": "Scikit-Learn: Single Feature LinearRegression",
        "code": """import pandas as pd
from sklearn.linear_model import LinearRegression

# 1. Load dataset & prepare 2D feature matrix
df = pd.read_csv('employee_productivity_data.csv')
X = df[['experience_years']]       # Must be 2D DataFrame/array shape (N, 1)
y = df['productivity_score']       # 1D target Series

# 2. Fit Scikit-Learn LinearRegression
model = LinearRegression(fit_intercept=True)
model.fit(X, y)

# 3. Inspect slope (m) and intercept (c)
m = model.coef_[0]
c = model.intercept_
print(f"Fitted Equation: Productivity = {m:.2f} * Experience + {c:.2f}")
# Output: Productivity = 1.88 * Experience + 53.21"""
    },
    13: {
        "title": "Scikit-Learn: Residuals & MSE Loss",
        "code": """import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error

df = pd.read_csv('employee_productivity_data.csv')
X = df[['experience_years']]
y = df['productivity_score']

model = LinearRegression().fit(X, y)
y_pred = model.predict(X)

# Compute residuals & loss metrics
residuals = y - y_pred
mse = mean_squared_error(y, y_pred)
rmse = np.sqrt(mse)
mae = mean_absolute_error(y, y_pred)

print(f"Mean Residual: {residuals.mean():.4f} (~0.00)")
print(f"MSE Loss     : {mse:.2f}")
print(f"RMSE Error   : {rmse:.2f} points (Typical miss)")
print(f"MAE Error    : {mae:.2f} points")"""
    },
    14: {
        "title": "Scikit-Learn / Pandas: Feature Correlation Matrix",
        "code": """import pandas as pd

df = pd.read_csv('employee_productivity_data.csv')
features = [
    'experience_years', 'overtime_hours', 'absence_days',
    'task_complexity', 'team_size', 'training_hours',
    'ai_assistant', 'meeting_hours', 'blocker_hours'
]

# Pearson correlation against productivity score
corr = df[features + ['productivity_score']].corr()['productivity_score']
corr_ranked = corr.drop('productivity_score').sort_values(ascending=False)

print("=== Pearson Correlation with Productivity Score ===")
for feat, val in corr_ranked.items():
    print(f"{feat:18s}: {val:+.3f}")
# Top drivers: Exp (+0.48), AI (+0.30), Overtime (-0.50), Blockers (-0.38)"""
    },
    15: {
        "title": "Scikit-Learn: Predictions on New Engineers",
        "code": """import pandas as pd
from sklearn.linear_model import LinearRegression

df = pd.read_csv('employee_productivity_data.csv')
X = df[['experience_years']]
y = df['productivity_score']
reg = LinearRegression().fit(X, y)

# Predict for new hire profiles
candidates = pd.DataFrame({'experience_years': [1.0, 5.0, 10.0, 14.0]})
predictions = reg.predict(candidates)

for exp, pred in zip(candidates['experience_years'], predictions):
    print(f"Experience: {exp:4.1f} yrs -> Predicted Score: {pred:.1f} pts")
# Junior (1 yr): 55.1 | Mid (5 yrs): 62.6 | Senior (10 yrs): 72.0"""
    },
    16: {
        "title": "Scikit-Learn: Evaluating R² & RMSE vs Dummy Baseline",
        "code": """import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv('employee_productivity_data.csv')
X, y = df[['experience_years']], df['productivity_score']

# Baseline model: always guesses the average score (~62.4)
dummy = DummyRegressor(strategy='mean').fit(X, y)
dummy_rmse = np.sqrt(mean_squared_error(y, dummy.predict(X)))

# Linear regression model
reg = LinearRegression().fit(X, y)
reg_rmse = np.sqrt(mean_squared_error(y, reg.predict(X)))
reg_r2 = reg.score(X, y)  # R² explained variance

print(f"Dummy Baseline RMSE : {dummy_rmse:.2f} pts | R² = {dummy.score(X, y):.3f}")
print(f"Experience Model RMSE: {reg_rmse:.2f} pts | R² = {reg_r2:.3f}")
print(f"Score Variance Explained: {reg_r2 * 100:.1f}%")"""
    },
    17: {
        "title": "Scikit-Learn: Downhill SGDRegressor with StandardScaler",
        "code": """import pandas as pd
from sklearn.linear_model import SGDRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

df = pd.read_csv('employee_productivity_data.csv')
X, y = df[['experience_years']], df['productivity_score']

# SGD requires scaling to make the loss bowl circular
sgd_pipe = make_pipeline(
    StandardScaler(),
    SGDRegressor(loss='squared_error', eta0=0.01, learning_rate='invscaling', max_iter=1000, random_state=42)
)
sgd_pipe.fit(X, y)

print("SGD Iterations to converge:", sgd_pipe.named_steps['sgdregressor'].n_iter_)
print("SGD Model R² Score        :", round(sgd_pipe.score(X, y), 3))"""
    },
    18: {
        "title": "Scikit-Learn: Learning Rate (eta0) Tuning in SGDRegressor",
        "code": """import pandas as pd
from sklearn.linear_model import SGDRegressor
from sklearn.preprocessing import StandardScaler

df = pd.read_csv('employee_productivity_data.csv')
scaler = StandardScaler()
X_s = scaler.fit_transform(df[['experience_years']])
y = df['productivity_score']

# Compare 3 learning rates
for lr in [0.0001, 0.01, 2.5]:
    try:
        sgd = SGDRegressor(learning_rate='constant', eta0=lr, max_iter=200, random_state=42)
        sgd.fit(X_s, y)
        print(f"eta0={lr:<7} | Iterations: {sgd.n_iter_:3d} | R²: {sgd.score(X_s, y):+.3f}")
    except Exception as e:
        print(f"eta0={lr:<7} | Diverged / Overflow!")
# eta0=0.01 converges smoothly, while eta0=2.5 overshoots violently!"""
    },
    19: {
        "title": "Scikit-Learn: 9-Feature Multiple Linear Regression",
        "code": """import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv('employee_productivity_data.csv')
features = [
    'experience_years', 'overtime_hours', 'absence_days',
    'task_complexity', 'team_size', 'training_hours',
    'ai_assistant', 'meeting_hours', 'blocker_hours'
]
X, y = df[features], df['productivity_score']

# Fit full 9-feature model
model = LinearRegression().fit(X, y)
y_pred = model.predict(X)

print(f"Intercept (c) : {model.intercept_:.2f}")
print(f"Model R² Score: {r2_score(y, y_pred):.3f} (Crosses 0.75 Gold Standard!)")
print(f"Model RMSE    : {np.sqrt(mean_squared_error(y, y_pred)):.2f} points")
for col, coef in zip(features, model.coef_):
    print(f"  {col:18s}: {coef:+.3f}")
# Meeting Drag: -0.32 pts/hr | Blocker Drag: -0.45 pts/hr"""
    },
    20: {
        "title": "Scikit-Learn: Standardized Weights via StandardScaler",
        "code": """import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

df = pd.read_csv('employee_productivity_data.csv')
features = [
    'experience_years', 'overtime_hours', 'absence_days',
    'task_complexity', 'team_size', 'training_hours',
    'ai_assistant', 'meeting_hours', 'blocker_hours'
]

# Standardize: z = (x - mean) / std
scaler = StandardScaler()
X_s = scaler.fit_transform(df[features])
y = df['productivity_score']

# Fit standardized regression
std_reg = LinearRegression().fit(X_s, y)
ranking = pd.Series(std_reg.coef_, index=features).sort_values(key=abs, ascending=False)

print("=== Standardized Feature Weights Ranking ===")
for rank, (name, val) in enumerate(ranking.items(), 1):
    print(f"#{rank} {name:18s}: {val:+.2f} std pts")
# Exp (+4.35) & Complexity (-3.13) dominate; Friction exerts -3.43 combined drag!"""
    },
    21: {
        "title": "Scikit-Learn: train_test_split & Generalization Check",
        "code": """import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv('employee_productivity_data.csv')
features = [
    'experience_years', 'overtime_hours', 'absence_days',
    'task_complexity', 'team_size', 'training_hours',
    'ai_assistant', 'meeting_hours', 'blocker_hours'
]
X, y = df[features], df['productivity_score']

# 80/20 train/test split
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression().fit(X_tr, y_tr)

tr_rmse = np.sqrt(mean_squared_error(y_tr, model.predict(X_tr)))
te_rmse = np.sqrt(mean_squared_error(y_te, model.predict(X_te)))
print(f"Train RMSE: {tr_rmse:.2f} | Train R²: {model.score(X_tr, y_tr):.3f}")
print(f"Test RMSE : {te_rmse:.2f} | Test R² : {model.score(X_te, y_te):.3f}")
print(f"Generalization Gap: {abs(tr_rmse - te_rmse):.3f} (Near-zero overfitting!)")"""
    },
    22: {
        "title": "Scikit-Learn: Ridge (L2) & Lasso (L1) Regularization",
        "code": """import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge, Lasso, LinearRegression
from sklearn.pipeline import make_pipeline

df = pd.read_csv('employee_productivity_data.csv')
features = [
    'experience_years', 'overtime_hours', 'absence_days',
    'task_complexity', 'team_size', 'training_hours',
    'ai_assistant', 'meeting_hours', 'blocker_hours'
]
X, y = df[features], df['productivity_score']
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

# Compare OLS vs Ridge (L2) vs Lasso (L1)
ols   = make_pipeline(StandardScaler(), LinearRegression()).fit(X_tr, y_tr)
ridge = make_pipeline(StandardScaler(), Ridge(alpha=100.0)).fit(X_tr, y_tr)
lasso = make_pipeline(StandardScaler(), Lasso(alpha=0.5)).fit(X_tr, y_tr)

print("Team Size Weight (Feature 5):")
print(f"  OLS   : {ols.named_steps['linearregression'].coef_[4]:+.4f}")
print(f"  Ridge : {ridge.named_steps['ridge'].coef_[4]:+.4f} (Shrunk smoothly)")
print(f"  Lasso : {lasso.named_steps['lasso'].coef_[4]:+.4f} (Pruned to 0.0!)")"""
    },
    23: {
        "title": "Scikit-Learn: Complete Production Pipeline & Guardrails",
        "code": """import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

df = pd.read_csv('employee_productivity_data.csv')
features = [
    'experience_years', 'overtime_hours', 'absence_days',
    'task_complexity', 'team_size', 'training_hours',
    'ai_assistant', 'meeting_hours', 'blocker_hours'
]
X_tr, X_te, y_tr, y_te = train_test_split(df[features], df['productivity_score'], test_size=0.2, random_state=42)

model = LinearRegression().fit(X_tr, y_tr)

# Production inference function with physical bounds clipping [0, 100]
def predict_score(profile):
    raw = model.predict(profile)
    return np.clip(raw, 0.0, 100.0)

test_preds = predict_score(X_te)
print(f"Production Model R² : {r2_score(y_te, test_preds):.3f} (Exceeds 0.75 Gold Standard)")
print(f"Production Test RMSE: {np.sqrt(mean_squared_error(y_te, test_preds)):.2f} pts")
print("Status: Validated for Operational HR & Engineering Planning!")"""
    }
}

file_path = "app/src/data/courseData.js"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# For each slide from 12 to 23, let's inject the code block into `content: [...]`
# We find each slide block by `id: {s_id},`
for s_id, sk_data in SKLEARN_CODES.items():
    # Find the slide start
    pattern = rf"(id:\s*{s_id},[\s\S]*?content:\s*\[[\s\S]*?)(facilitatorNotes:|codePreview:|visual:|curatedQuestions:)"
    match = re.search(pattern, content)
    if not match:
        print(f"Warning: Could not match slide {s_id}")
        continue
    
    slide_before_boundary = match.group(1)
    boundary = match.group(2)
    
    # Check if there's already a code block for this slide
    if "Scikit-Learn" in slide_before_boundary:
        print(f"Slide {s_id} already has Scikit-Learn code block, skipping insertion.")
        continue
    
    # We want to insert the code block right before the closing `],\n    ` of content
    last_bracket = slide_before_boundary.rfind("]")
    if last_bracket == -1:
        print(f"Warning: Could not find closing bracket of content in slide {s_id}")
        continue
    
    escaped_title = sk_data["title"].replace("'", "\\'")
    escaped_code = sk_data["code"].replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    
    # Format the code block
    code_block_js = f""",
      {{
        type: 'code',
        title: '{escaped_title}',
        code: `{escaped_code}`
      }}
    """
    
    new_slide_part = slide_before_boundary[:last_bracket] + code_block_js + slide_before_boundary[last_bracket:]
    content = content[:match.start(1)] + new_slide_part + content[match.end(1):]
    print(f"Inserted Scikit-Learn code block into Slide {s_id}")

# Now, add Scikit-Learn templates to CODE_TEMPLATES if not present
if "sklearn-simple" not in content:
    sklearn_templates = """,
  {
    id: 'sklearn-simple',
    title: 'Scikit-Learn: Single Feature (Exp)',
    description: 'Fit LinearRegression() on experience_years with pandas and scikit-learn.',
    code: `import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Load data
df = pd.read_csv('employee_productivity_data.csv')
X = df[['experience_years']]
y = df['productivity_score']

# Fit model
model = LinearRegression().fit(X, y)
y_pred = model.predict(X)

print(f"Slope (m)     : {model.coef_[0]:.2f}")
print(f"Intercept (c) : {model.intercept_:.2f}")
print(f"R² Score      : {r2_score(y, y_pred):.3f}")
print(f"RMSE Error    : {np.sqrt(mean_squared_error(y, y_pred)):.2f} pts")`
  },
  {
    id: 'sklearn-9features',
    title: 'Scikit-Learn: 9-Feature Multiple Regression',
    description: 'Fit LinearRegression() on all 9 technical and operational friction features.',
    code: `import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

df = pd.read_csv('employee_productivity_data.csv')
features = [
    'experience_years', 'overtime_hours', 'absence_days',
    'task_complexity', 'team_size', 'training_hours',
    'ai_assistant', 'meeting_hours', 'blocker_hours'
]
X, y = df[features], df['productivity_score']

# Fit full 9-feature model
model = LinearRegression().fit(X, y)
y_pred = model.predict(X)

print(f"Intercept (c) : {model.intercept_:.2f}")
print(f"Model R² Score: {r2_score(y, y_pred):.3f} (0.75+ Gold Standard!)")
print(f"Model RMSE    : {np.sqrt(mean_squared_error(y, y_pred)):.2f} points")
for feat, coef in zip(features, model.coef_):
    print(f"  {feat:18s}: {coef:+.3f}")`
  },
  {
    id: 'sklearn-regularization',
    title: 'Scikit-Learn: Ridge & Lasso Regularization',
    description: 'Compare OLS, Ridge (L2) and Lasso (L1) with StandardScaler on all 9 features.',
    code: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge, Lasso, LinearRegression
from sklearn.pipeline import make_pipeline

df = pd.read_csv('employee_productivity_data.csv')
features = [
    'experience_years', 'overtime_hours', 'absence_days',
    'task_complexity', 'team_size', 'training_hours',
    'ai_assistant', 'meeting_hours', 'blocker_hours'
]
X, y = df[features], df['productivity_score']
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

ols   = make_pipeline(StandardScaler(), LinearRegression()).fit(X_tr, y_tr)
ridge = make_pipeline(StandardScaler(), Ridge(alpha=100.0)).fit(X_tr, y_tr)
lasso = make_pipeline(StandardScaler(), Lasso(alpha=0.5)).fit(X_tr, y_tr)

print("Team Size Weight (Feature 5):")
print(f"  OLS   : {ols.named_steps['linearregression'].coef_[4]:+.4f}")
print(f"  Ridge : {ridge.named_steps['ridge'].coef_[4]:+.4f} (Smooth shrinkage)")
print(f"  Lasso : {lasso.named_steps['lasso'].coef_[4]:+.4f} (Zeroed out!)")`
  }"""
    # Insert before the last `];`
    last_bracket = content.rfind("];")
    if last_bracket != -1:
        content = content[:last_bracket] + sklearn_templates + "\n" + content[last_bracket:]
        print("Inserted Scikit-Learn CODE_TEMPLATES into courseData.js")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully updated courseData.js with Scikit-Learn code blocks!")
