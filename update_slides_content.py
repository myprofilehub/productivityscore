import json

slides = [
  {
    "id": 1,
    "module": 0,
    "title": "NumPy Basics & Complete Linear Regression",
    "badge": "2-Hour Corporate Fresher Training",
    "badgeColor": "blue",
    "content": [
      {
        "type": "lead",
        "text": "Welcome! Today we will learn NumPy and Linear Regression from scratch by building a real-world T20 Cricket Score Projector (Overs 5 to 19)."
      },
      {
        "type": "grid",
        "items": [
          {
            "title": "Real Match Dataset",
            "color": "blue",
            "text": "3,281 International Matches",
            "subtext": "Real ball-by-ball Cricsheet records (2005–2026), split into past matches (train) and future matches (test)."
          },
          {
            "title": "Zero-Install Sandbox",
            "color": "green",
            "text": "Interactive In-Browser Code",
            "subtext": "Write and run real Python and NumPy directly in your browser with instant visual feedback."
          },
          {
            "title": "The Big Question",
            "color": "orange",
            "text": "Why TV Run-Rate Graphics Fail",
            "subtext": "Discover how machine learning learns to predict final scores by factoring in wickets in hand and death overs acceleration."
          }
        ]
      },
      {
        "type": "callout",
        "color": "blue",
        "title": "Our Learning Goal",
        "text": "By the end of this session, you will know how to manipulate data with NumPy, fit linear regression models from scratch, and evaluate predictions using industry best practices."
      }
    ]
  },
  {
    "id": 2,
    "module": 0,
    "title": "Session Agenda & Learning Roadmap",
    "badge": "Roadmap • 4 Core Pillars",
    "badgeColor": "green",
    "content": [
      {
        "type": "lead",
        "text": "We will guide you step-by-step through four interconnected milestones:"
      },
      {
        "type": "grid",
        "items": [
          {
            "title": "Pillar 1: NumPy Foundations",
            "color": "blue",
            "text": "Arrays, Slicing & Broadcasting",
            "subtext": "Understand computer memory, the slicing trap, filtering with boolean masks, and matrix math."
          },
          {
            "title": "Pillar 2: Linear Regression Theory",
            "color": "orange",
            "text": "The Line & The Loss Bowl",
            "subtext": "Why errors are squared, what slope and intercept mean, and how gradient descent steps downhill."
          },
          {
            "title": "Pillar 3: Over-by-Over Score Projector",
            "color": "green",
            "text": "Live Cricket Analytics",
            "subtext": "Watch how weights adjust from Over 5 to 19 as wickets fall and unplayed overs run out."
          },
          {
            "title": "Pillar 4: Model Evaluation",
            "color": "blue",
            "text": "RMSE, MAE, R² & Time Split",
            "subtext": "How engineering teams test models on unseen future matches to avoid overfitting."
          }
        ]
      },
      {
        "type": "callout",
        "color": "green",
        "title": "Interactive Format",
        "text": "Every section includes interactive polls, conceptual quizzes, and live code exercises to test your understanding."
      }
    ]
  },
  {
    "id": 3,
    "module": 2,
    "title": "1. NumPy Arrays: The Numerical Engine",
    "badge": "NumPy Core • Memory Architecture",
    "badgeColor": "blue",
    "content": [
      {
        "type": "lead",
        "text": "Why do data scientists use NumPy instead of regular Python lists? Python lists store scattered object pointers in RAM. NumPy stores numbers in one continuous memory block."
      },
      {
        "type": "visual",
        "visualType": "memory"
      },
      {
        "type": "code",
        "lang": "python",
        "code": """# 6 Hand-typed T20 innings: runs at over 10, wickets at over 10, final score
import numpy as np

runs10 = np.array([89, 93, 88, 92, 54, 83])
wkts10 = np.array([ 4,  2,  1,  1,  4,  1])
final  = np.array([214, 179, 133, 209, 126, 201])

print("Shape:", runs10.shape)  # (6,) -> 6 matches
print("Dtype:", runs10.dtype)  # int64 -> exactly 8 bytes per number"""
      },
      {
        "type": "points",
        "items": [
          "Single Data Type: Every number in an array has the exact same byte size (e.g. 64-bit integer).",
          "Shape is Key: (rows, columns). In data science, rows = samples (matches), columns = measurements (runs, wickets).",
          "50x Speedup: Because numbers sit side-by-side, the CPU can read them together at compiled C speed."
        ]
      }
    ],
    "pollId": "poll-1"
  },
  {
    "id": 4,
    "module": 2,
    "title": "2. Indexing, Slicing & The 'View vs Copy' Trap",
    "badge": "NumPy Core • Slicing & Views",
    "badgeColor": "orange",
    "content": [
      {
        "type": "lead",
        "text": "The most common rookie bug in NumPy: A slice is just a window (VIEW) looking into the original array, NOT a new copy!"
      },
      {
        "type": "visual",
        "visualType": "slicing"
      },
      {
        "type": "code",
        "lang": "python",
        "code": `s = runs10[:3]       # s looks at the first 3 innings\ns[0] = 999           # We modify s...\nprint(runs10[0])     # 999! THE ORIGINAL ARRAY CHANGED!\n\n# To make a safe, independent duplicate:\nruns10[0] = 89\nsafe = runs10[:3].copy()  # Independent copy in memory`
      },
      {
        "type": "callout",
        "color": "orange",
        "title": "Simple Analogy for Freshers",
        "text": "A slice is like looking through a window into a room. If you paint the wall through the window, the room itself changed! If you want an independent room, use .copy()."
      }
    ]
  },
  {
    "id": 5,
    "module": 2,
    "title": "3. Boolean Masking: Filtering Without Loops",
    "badge": "NumPy Core • Filtering",
    "badgeColor": "green",
    "content": [
      {
        "type": "lead",
        "text": "Never write slow for-loops with if-statements to filter data. In NumPy, a comparison creates a True/False mask that filters instantly."
      },
      {
        "type": "visual",
        "visualType": "masking"
      },
      {
        "type": "code",
        "lang": "python",
        "code": `# Find matches with high run rate and few wickets:\nmask = (runs10 > 70) & (wkts10 <= 2)\nprint("Mask:   ", mask)      # [False, True, True, True, False, True]\n\n# Keep only the True positions:\nprint("Filtered:", final[mask])  # [179, 133, 209, 201]`
      },
      {
        "type": "callout",
        "color": "blue",
        "title": "Syntax Golden Rule",
        "text": "Always use bitwise '&' and '|' with round brackets '(cond1) & (cond2)'. Standard Python 'and' / 'or' will throw an error on arrays."
      }
    ],
    "pollId": "poll-2"
  },
  {
    "id": 6,
    "module": 3,
    "title": "4. Vectorisation & Broadcasting Mechanics",
    "badge": "NumPy Core • Broadcasting",
    "badgeColor": "blue",
    "content": [
      {
        "type": "lead",
        "text": "Broadcasting lets NumPy combine arrays of different shapes automatically by stretching dimensions of size 1 across the array."
      },
      {
        "type": "visual",
        "visualType": "broadcasting"
      },
      {
        "type": "code",
        "lang": "python",
        "code": `# Standardising features (Z-Score: mean 0, std 1)\n# The scalar mean and std are stretched across all rows:\nx_centered = (runs10 - runs10.mean()) / runs10.std()\nprint("Standardised runs:", x_centered.round(2))\n# Output: [ 0.43,  0.73,  0.36,  0.66, -2.17, -0.01]`
      },
      {
        "type": "points",
        "items": [
          "No Explicit Loops: Vectorised operations run compiled C loops under the hood.",
          "Broadcasting Rule: Dimensions match from right to left if they are equal or if one of them is 1.",
          "Standardisation: Crucial for gradient descent so that all features learn at the same pace."
        ]
      }
    ],
    "pollId": "poll-3"
  },
  {
    "id": 7,
    "module": 4,
    "title": "5. Matrix Algebra: Element-wise '*' vs Matrix Dot '@'",
    "badge": "NumPy Core • Linear Algebra",
    "badgeColor": "orange",
    "content": [
      {
        "type": "lead",
        "text": "In linear regression, predictions are computed with matrix multiplication. Mixing up '*' and '@' is the #1 bug in machine learning code."
      },
      {
        "type": "visual",
        "visualType": "matrix-mult"
      },
      {
        "type": "visual",
        "visualType": "axis"
      },
      {
        "type": "code",
        "lang": "python",
        "code": `A = np.array([[1, 2], [3, 4]])\nv = np.array([5, 6])\n\nprint("Element-wise A * A:\\n", A * A)   # Cell by cell\nprint("Matrix dot A @ v:    \\n", A @ v)   # [1*5 + 2*6, 3*5 + 4*6] = [17, 39]`
      }
    ],
    "quizId": "quiz-1"
  },
  {
    "id": 8,
    "module": 5,
    "title": "6. Linear Regression: The Line & The Error",
    "badge": "Regression • Intuition & The Line",
    "badgeColor": "blue",
    "content": [
      {
        "type": "lead",
        "text": "What is linear regression? It finds the single straight line that passes as close as possible to all data points in a scatter cloud."
      },
      {
        "type": "visual",
        "visualType": "scatter-line"
      },
      {
        "type": "grid",
        "items": [
          {
            "title": "Slope (m = 1.62)",
            "color": "blue",
            "text": "Momentum / Rate of Change",
            "subtext": "Each extra run at Over 10 adds about +1.62 runs to the projected final score."
          },
          {
            "title": "Intercept (c = 39.1)",
            "color": "orange",
            "text": "Baseline Mathematical Anchor",
            "subtext": "The line's value at x = 0 (the foundation from which projected runs build up)."
          },
          {
            "title": "Residual (y - y_hat)",
            "color": "green",
            "text": "The Prediction Miss",
            "subtext": "Vertical distance between where the match actually finished and what the line projected."
          }
        ]
      }
    ],
    "quizId": "quiz-2"
  },
  {
    "id": 9,
    "module": 5,
    "title": "7. The Loss Function: Mean Squared Error (MSE)",
    "badge": "Regression • Loss Function",
    "badgeColor": "orange",
    "content": [
      {
        "type": "lead",
        "text": "Why don't we simply add up the errors? Because positive and negative errors cancel out (+20 and -20 would add to 0!). We square each error and take the average."
      },
      {
        "type": "visual",
        "visualType": "loss-bowl"
      },
      {
        "type": "code",
        "lang": "python",
        "code": `# Mean Squared Error formula:\nMSE = np.mean((y_actual - y_predicted) ** 2)\n\n# Root Mean Squared Error (in original units of runs!):\nRMSE = np.sqrt(MSE)`
      },
      {
        "type": "points",
        "items": [
          "Squaring removes negative signs so errors cannot cancel each other out.",
          "Severe Penalty for Big Misses: Missing by 20 runs counts 4x as much as missing by 10 runs (400 vs 100).",
          "The Loss Bowl: MSE forms a smooth convex bowl over all possible (slope, intercept) combinations. The bottom of the bowl is the optimal model!"
        ]
      }
    ]
  },
  {
    "id": 10,
    "module": 5,
    "title": "8. Two Ways to Reach the Bottom: Closed-Form vs Gradient Descent",
    "badge": "Regression • Solving Methods",
    "badgeColor": "blue",
    "content": [
      {
        "type": "lead",
        "text": "How does a computer find the slope and intercept at the bottom of the loss bowl? There are two classic approaches:"
      },
      {
        "type": "grid",
        "items": [
          {
            "title": "1. Closed-Form (Normal Equation)",
            "color": "blue",
            "text": "θ = (X^T X)^(-1) X^T y",
            "subtext": "Exact, one-step analytical matrix formula (np.linalg.solve). Fast and exact when data fits in RAM."
          },
          {
            "title": "2. Gradient Descent",
            "color": "orange",
            "text": "w = w - learning_rate × gradient",
            "subtext": "Step-by-step optimization downhill. Essential for massive big-data datasets or deep neural networks."
          }
        ]
      },
      {
        "type": "callout",
        "color": "green",
        "title": "Future-Proof Validation: Time-Based Split",
        "text": "A score projector will only ever be used on FUTURE matches. Therefore, we fit on matches before 2024 (train: 1,826 matches) and evaluate exclusively on 2024–2026 (test: 1,455 matches)."
      }
    ]
  },
  {
    "id": 11,
    "module": 6,
    "title": "9. Fitting Simple Regression Live on Real Data",
    "badge": "Regression • Live Fitting",
    "badgeColor": "green",
    "content": [
      {
        "type": "lead",
        "text": "Let's fit the real Cricsheet data at Over 10 on 1,826 training matches and test on 1,455 unseen future matches."
      },
      {
        "type": "code",
        "lang": "python",
        "code": `# Closed-form analytical slope and intercept:\nx_tr, y_tr = runs10[train], final[train]\nm = np.sum((x_tr - x_tr.mean()) * (y_tr - y_tr.mean())) / np.sum((x_tr - x_tr.mean())**2)\nc = y_tr.mean() - m * x_tr.mean()\n\nprint(f"Fitted Equation: Final = {m:.2f} * Runs10 + {c:.1f}")\n# Output: Final = 1.62 * Runs10 + 39.1\n\n# Compare on 1,455 unseen future matches:\n# Naive TV Run-rate RMSE: 24.8 runs\n# Regression RMSE:        22.6 runs (Beats TV baseline!)`
      },
      {
        "type": "callout",
        "color": "blue",
        "title": "Cricket Interpretation",
        "text": "If a team is 80 at Over 10, the TV formula projects 160 (8 x 20). Linear regression projects: 1.62 * 80 + 39.1 = 168.7 runs. Regression correctly captures the extra second-half acceleration!"
      }
    ],
    "pollId": "poll-4"
  },
  {
    "id": 12,
    "module": 7,
    "title": "10. Gradient Descent: The Learning Rate Experiment",
    "badge": "Optimization • Learning Rate",
    "badgeColor": "orange",
    "content": [
      {
        "type": "lead",
        "text": "Gradient descent is like walking down a foggy hill in the dark. The gradient tells you which way is downhill; the learning rate (lr) decides how big your step is."
      },
      {
        "type": "visual",
        "visualType": "learning-rate"
      },
      {
        "type": "points",
        "items": [
          "Too Small (lr = 0.001): Crawls like a turtle. After 200 steps, loss is still ~11,300 (never reaches the bottom).",
          "Optimal (lr = 0.1): Smooth, confident descent. Lands at the exact minimum (loss 490) within 50 steps.",
          "Too Large (lr = 1.5): Overshoots the bottom, bounces up the opposite hill, and explodes into infinity (NaN)!"
        ]
      }
    ],
    "pollId": "poll-5"
  },
  {
    "id": 13,
    "module": 8,
    "title": "11. Multiple Regression: Adding Wickets Lost",
    "badge": "Regression • Multiple Features",
    "badgeColor": "blue",
    "content": [
      {
        "type": "lead",
        "text": "A team at 80/1 is in a vastly superior position to a team at 80/5. We expand from a 2D line to a 3D regression plane with two inputs: Runs and Wickets."
      },
      {
        "type": "visual",
        "visualType": "multiple-plane"
      },
      {
        "type": "code",
        "lang": "python",
        "code": `# Build Design Matrix X with leading column of 1s for intercept\nX_train = np.column_stack([np.ones(len(x_tr)), runs10[train], wkts10[train]])\n\n# Solve Normal Equation: (X^T X)^(-1) X^T y\ntheta = np.linalg.solve(X_train.T @ X_train, X_train.T @ y_tr)\nb, wr, ww = theta\n\nprint(f"Model: Final = {b:.1f} + {wr:.2f}*runs - {abs(ww):.2f}*wkts")\n# Output: Final = 62.4 + 1.45*runs - 4.52*wkts`
      },
      {
        "type": "points",
        "items": [
          "Runs Weight (+1.45): Each extra run scored adds +1.45 runs to the total.",
          "Wickets Penalty (-4.52): Each wicket lost subtracts ~4.5 runs from the projected total!",
          "Test RMSE drops from 22.6 down to 22.1 runs."
        ]
      }
    ],
    "quizId": "quiz-3"
  },
  {
    "id": 14,
    "module": 9,
    "title": "12. Over-by-Over Score Projection: The Real-World Physics",
    "badge": "Cricket ML • Over Progression",
    "badgeColor": "green",
    "content": [
      {
        "type": "lead",
        "text": "Here is how linear regression behaves when fitted over-by-over from Over 5 to Over 19. Watch the mathematical parameters reflect cricket reality:"
      },
      {
        "type": "grid",
        "items": [
          {
            "title": "1. Runs Weight -> 1.0",
            "color": "blue",
            "text": "Over 5: 1.90 -> Over 19: 1.04",
            "subtext": "Early runs reflect team batting caliber. By Over 19, scored runs are simply banked 1:1."
          },
          {
            "title": "2. Wickets Penalty -> 0",
            "color": "orange",
            "text": "Over 5: -5.40 -> Over 19: -0.96",
            "subtext": "Losing a wicket in Over 5 damages 15 future overs. In Over 19, only 6 balls remain."
          },
          {
            "title": "3. Intercept -> 0",
            "color": "green",
            "text": "Over 5: +91.9 -> Over 19: +10.3",
            "subtext": "Baseline unplayed potential naturally shrinks to near zero as overs run out."
          },
          {
            "title": "4. Test RMSE Plunges",
            "color": "blue",
            "text": "Over 5: 31.5 runs -> Over 19: 5.2 runs",
            "subtext": "Uncertainty collapses as the innings approaches completion."
          }
        ]
      }
    ]
  },
  {
    "id": 15,
    "module": 9,
    "title": "13. Why is RMSE Higher Early in the Match?",
    "badge": "Evaluation • Uncertainty Funnel",
    "badgeColor": "orange",
    "content": [
      {
        "type": "lead",
        "text": "Does an RMSE of 31.5 runs at Over 5 mean our regression model is inaccurate? NO! It reflects the natural 'fog of war' when 77% of the match is still unplayed."
      },
      {
        "type": "visual",
        "visualType": "banked-ratio"
      },
      {
        "type": "grid",
        "items": [
          {
            "title": "Model Error vs Real Noise",
            "color": "orange",
            "text": "Total Error = Model Error + Human Noise",
            "subtext": "No algorithm on Earth can predict early scores with ±2 runs accuracy because cricket is played by humans, not deterministic robots."
          },
          {
            "title": "The Weather Analogy",
            "color": "blue",
            "text": "10-Day Forecast vs Tomorrow Morning",
            "subtext": "Over 5 is like a 10-day weather forecast (natural chaos). Over 19 is like forecasting tomorrow morning (almost everything has happened!)."
          }
        ]
      }
    ]
  },
  {
    "id": 16,
    "module": 10,
    "title": "14. The 4 Core Evaluation Metrics (In Cricket Terms)",
    "badge": "Evaluation • Core Metrics",
    "badgeColor": "blue",
    "content": [
      {
        "type": "lead",
        "text": "Every evaluation metric answers a distinct business and sporting question. Here is how to understand them in plain English:"
      },
      {
        "type": "grid",
        "items": [
          {
            "title": "1. RMSE (Root Mean Squared Error)",
            "color": "blue",
            "text": "Typical Miss (Penalizes Blunders)",
            "subtext": "At Over 10: 22.1 runs. Squaring means missing by 70 runs hurts 49x more than missing by 10 runs!"
          },
          {
            "title": "2. MAE (Mean Absolute Error)",
            "color": "green",
            "text": "Everyday Average Miss in Runs",
            "subtext": "At Over 10: 17.5 runs. On an average day, our projection is within 17.5 runs of the actual total."
          },
          {
            "title": "3. R-squared (Explained Variance)",
            "color": "orange",
            "text": "% of Variance Explained",
            "subtext": "Over 5: 50.6% explained (half signal, half noise). Over 18: 96.9% explained (almost pure certainty)!"
          },
          {
            "title": "4. Systematic Bias (Mean Error)",
            "color": "blue",
            "text": "Is the Scale Tilted High or Low?",
            "subtext": "TV Formula has +8.8 runs bias (systematically underestimates). Our ML model has ~0 bias (fair & balanced)."
          }
        ]
      }
    ]
  },
  {
    "id": 17,
    "module": 10,
    "title": "15. How to Assess Model Performance: The 4 Industry Rules",
    "badge": "Evaluation • Industry Framework",
    "badgeColor": "green",
    "content": [
      {
        "type": "lead",
        "text": "A single number like RMSE = 22.1 is meaningless in a vacuum. Industry data science teams assess models with 4 rigorous checks:"
      },
      {
        "type": "points",
        "items": [
          "1. The Baseline Test: Must beat simple baselines. Predict-the-mean = 44.7 runs, TV run-rate = 24.8 runs. Regression beats both at 22.1 runs!",
          "2. Future-Proof Time Split: Fit on past (<2024: 1,826 matches), test on future (>=2024: 1,455 matches). If Train RMSE (21.5) and Test RMSE (22.1) are close, there is NO overfitting.",
          "3. Business Units Rule: Never report 'MSE = 488' to stakeholders. Always report in original real-world units: 'RMSE is 22.1 runs'.",
          "4. Residual Diagnostics: Verify that residuals (Actual - Predicted) are bell-shaped and centered at 0. In our data, 96% of errors fall within 2 standard deviations."
        ]
      },
      {
        "type": "callout",
        "color": "blue",
        "title": "Rule of Thumb for Freshers",
        "text": "A model has only 'earned its place' in production if it beats a simple baseline on UNSEEN future data, without a large gap between train and test error."
      }
    ],
    "quizId": "quiz-5"
  },
  {
    "id": 18,
    "module": 12,
    "title": "16. Summary & Key Takeaways",
    "badge": "Module 12 • Wrap-up",
    "badgeColor": "blue",
    "content": [
      {
        "type": "lead",
        "text": "Key concepts mastered today by connecting fundamental NumPy programming with real-world linear regression:"
      },
      {
        "type": "points",
        "items": [
          "NumPy: Use array slicing carefully (.copy()), boolean masking '&', and '@' for matrix products.",
          "Linear Regression: Minimizes Mean Squared Error by finding the bottom of the loss bowl.",
          "Two Solvers: Normal Equation gives exact weights; Gradient Descent scales iteratively.",
          "Broadcast Projectors: As overs progress, uncertainty vanishes, runs weight converges to 1.0, and wicket penalties decay to 0.",
          "Evaluation: Always test on unseen future data, compare against baselines, and report in real-world units (runs)."
        ]
      },
      {
        "type": "callout",
        "color": "green",
        "title": "Next Steps",
        "text": "Explore the live Over-by-Over Projector tab to test custom match situations, or jump into the Code Sandbox to run NumPy regression yourself!"
      }
    ]
  }
]

with open('app/src/data/courseData.js', 'r', encoding='utf-8') as f:
    text = f.read()

prefix, rest = text.split('export const SLIDES = [', 1)
_, suffix = rest.split('export const CODE_TEMPLATES = [', 1)

new_slides_js = json.dumps(slides, indent=2)

new_text = prefix + 'export const SLIDES = ' + new_slides_js + ';\n\nexport const CODE_TEMPLATES = [' + suffix

with open('app/src/data/courseData.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Updated courseData.js with simple phrasing and rich visual diagrams!")
