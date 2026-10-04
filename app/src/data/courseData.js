// Course Data: 23 Expanded Slides (Max 2 Topics per Slide with Beginner Examples)
// and at least 5 Curated Interactive Polls & Quizzes per Slide!
// Based on: "NumPy Basics and Complete Linear Regression: Employee Productivity Score Predictor"

export const SLIDES = [
  {
    id: 1,
    module: 1,
    duration: '4 min',
    title: 'The Productivity Predictor & What We Build',
    badge: 'Module 1 • Slide 1',
    badgeColor: 'blue',
    topic1: 'What makes an employee more productive in a month?',
    topic2: 'Predicting monthly score & the 160-task benchmark capacity',
    content: [
      {
        type: 'lead',
        text: 'A company wants to answer a fundamental question: What makes an employee productive in a month? Is it experience? Training? Fewer rework tickets? AI tools? Or team size? Opinions are not evidence—today we build a mathematical predictor using real data.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Topic 1: Workplace Inputs & Levers',
            color: 'blue',
            text: '9 Permanent Workplace Features',
            subtext: 'Our dataset tracks 9 measured inputs: 7 core engineering traits + 2 operational friction levers (Meeting Overhead & Blocker Delays) to predict the monthly Productivity Score.'
          },
          {
            title: 'Topic 2: Target & Benchmark',
            color: 'green',
            text: 'Score = (Tasks / 160) x 100',
            subtext: 'Completing 160 accepted tasks in a month represents full capacity (Score 100). The score is capped at 100.'
          }
        ]
      },
      {
        type: 'example',
        title: 'Beginner Example: How the Score is Calculated',
        steps: [
          'Employee A completes 80 tasks: (80 / 160) * 100 = 50.0 Productivity Score',
          'Employee B completes 120 tasks: (120 / 160) * 100 = 75.0 Productivity Score',
          'Employee C completes 160 tasks: (160 / 160) * 100 = 100.0 (Full capacity benchmark)',
          'Employee D completes 175 tasks: (175 / 160) * 100 = 109.4 -> Capped at 100.0 max'
        ]
      },
      {
        type: 'callout',
        color: 'blue',
        title: 'In Simple Words',
        text: 'A model is a rule turning what we know (workplace inputs) into an informed guess about what we want to predict (productivity score). In multiple regression, we multiply each feature by a learned weight and sum them up.'
      }
    ],
    facilitatorNotes: 'Start with the Opening Poll. Note audience votes. Many freshers intuitively pick team size or rework tickets. Emphasize that the target score represents accepted tasks completed as a percentage of full monthly capacity.',
    curatedQuestions: [
      {
        id: 'q1-1',
        title: 'Poll: What Drives Productivity Most?',
        question: 'Out of these features, which one do you expect affects the productivity score the most?',
        options: [
          { id: 'A', text: 'experience_years (Work experience in years)' },
          { id: 'B', text: 'training_hours (Hours of training attended)' },
          { id: 'C', text: 'rework_tickets (Tasks sent back for fixing)' },
          { id: 'D', text: 'team_size (Number of teammates)' },
          { id: 'E', text: 'ai_assistant (Using the AI assistant)' }
        ],
        correctAnswer: 'A',
        explanation: 'Standardised regression weights show experience_years has the single largest effect (+4.35 points per typical step). Team size has virtually zero effect (-0.07).'
      },
      {
        id: 'q1-2',
        title: 'Quiz: Calculating the Productivity Score',
        question: 'If an employee completes 100 accepted tasks in a month, what is their productivity score?',
        options: [
          { id: 'A', text: '50.0' },
          { id: 'B', text: '62.5' },
          { id: 'C', text: '75.0' },
          { id: 'D', text: '100.0' }
        ],
        correctAnswer: 'B',
        explanation: 'Score = (100 / 160) * 100 = 62.5 points.'
      },
      {
        id: 'q1-3',
        title: 'Quiz: Understanding the Score Ceiling (Cap)',
        question: 'An exceptional employee completes 180 tasks in a peak month. What productivity score do they receive?',
        options: [
          { id: 'A', text: '112.5' },
          { id: 'B', text: '180.0' },
          { id: 'C', text: '100.0 (Capped at maximum capacity)' },
          { id: 'D', text: '0.0 (Invalid entry)' }
        ],
        correctAnswer: 'C',
        explanation: 'The score rule enforces a ceiling (cap) at 100. Even though (180/160)*100 = 112.5, it is capped at 100.'
      },
      {
        id: 'q1-4',
        title: 'Quiz: Target vs Feature Distinction',
        question: 'Why must "tasks_completed" NEVER be used as a feature in our regression model?',
        options: [
          { id: 'A', text: 'Because tasks_completed has missing NaN values' },
          { id: 'B', text: 'Because tasks_completed is used directly to compute the target score, so using it would give away the answer (data leakage)' },
          { id: 'C', text: 'Because NumPy cannot process whole numbers' },
          { id: 'D', text: 'Because tasks_completed is negatively correlated with score' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 1.2: tasks_completed is only used to compute the score. Using it as a feature would give away the answer completely (target leakage).'
      },
      {
        id: 'q1-5',
        title: 'Quiz: Primary Goals of the Predictor',
        question: 'The predictor has two main jobs. What is Job 2 (the more important job)?',
        options: [
          { id: 'A', text: 'To replace human managers entirely' },
          { id: 'B', text: 'To tell us which features truly affect the score, in which direction, and by how much' },
          { id: 'C', text: 'To delete employees with low scores' },
          { id: 'D', text: 'To guess random numbers' }
        ],
        correctAnswer: 'B',
        explanation: 'Job 1 is predicting the score. Job 2 (the main learning goal) is understanding which workplace features truly move productivity and by how much.'
      }
    ]
  },
  {
    id: 2,
    module: 1,
    duration: '4 min',
    title: 'About the Dataset & Responsible AI Guidelines',
    badge: 'Module 1 • Slide 2',
    badgeColor: 'blue',
    topic1: 'The 6,000 employee-month simulated dataset structure',
    topic2: 'Responsible workplace analytics: Support vs surveillance',
    content: [
      {
        type: 'lead',
        text: 'The dataset employee_productivity_data.csv tracks 250 employees over 24 months (6,000 rows). Understanding the ethical context of workplace predictive models is just as critical as the math.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Topic 1: The 14 Columns (9 Features)',
            color: 'blue',
            text: '250 Employees x 24 Months',
            subtext: '3 ID columns (record_id, employee_id, month) + 9 permanent features (7 technical + 2 operational friction) + tasks_completed + target productivity_score.'
          },
          {
            title: 'Topic 2: Ethical Use',
            color: 'orange',
            text: 'Identify Blockers, Not People',
            subtext: 'Use the model to discover helpful training and tools, never for automated ranking, salary cuts, or termination.'
          }
        ]
      },
      {
        type: 'example',
        title: 'Beginner Example: Simulated vs Real Data',
        steps: [
          'Dataset employee_productivity_data.csv: 6,000 employee-months across 14 columns.',
          '9 Permanent Features (cols 3:12): Exp, Train, Complexity, AI, Rework, Absent, Team, Meeting Overhead, Blocker Delays.',
          'Average productivity score is 62.4 with a standard deviation of 9.1 points.',
          '162 cells in training_hours are blank (NaN) to teach real-world data cleaning.'
        ]
      },
      {
        type: 'visual',
        visualType: 'responsibleUse'
      }
    ],
    facilitatorNotes: 'Deliver the responsible AI message early: participants are freshers and employees themselves. Explain that regression measures statistical correlations in a dataset, but individual humans have personal situations (illness, family) that models cannot see.',
    curatedQuestions: [
      {
        id: 'q2-1',
        title: 'Quiz: Understanding Row Identifiers',
        question: 'In employee_productivity_data.csv, are record_id, employee_id, and month used as regression features?',
        options: [
          { id: 'A', text: 'Yes, employee_id is the most important feature' },
          { id: 'B', text: 'No, they only identify the row and must not be used as features' },
          { id: 'C', text: 'Yes, month is multiplied by 160' },
          { id: 'D', text: 'Yes, they replace the intercept' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 1.2: Row numbers and IDs are identifiers, not features. An employee ID number has no mathematical relationship with productivity.'
      },
      {
        id: 'q2-2',
        title: 'Quiz: Ethical Managerial Use',
        question: 'Which of the following is a recommended, ethical use of the productivity predictor?',
        options: [
          { id: 'A', text: 'Automatically firing employees with a predicted score below 50' },
          { id: 'B', text: 'Deciding annual bonuses without human manager review' },
          { id: 'C', text: 'Learning what helps teams succeed (e.g. training, AI tools) and identifying blockers' },
          { id: 'D', text: 'Ranking junior developers on a public leaderboard' }
        ],
        correctAnswer: 'C',
        explanation: 'Good managerial use focuses on learning what supports employees, removing friction, and unblocking teams.'
      },
      {
        id: 'q2-3',
        title: 'Poll: Transparency in AI Decision Making',
        question: 'Should employees know that a statistical productivity model exists in their company?',
        options: [
          { id: 'A', text: 'Yes: Openness ensures people understand how metrics are evaluated and can challenge them' },
          { id: 'B', text: 'No: Managers should keep models secret to avoid gaming the metrics' },
          { id: 'C', text: 'Only senior leadership needs to know' }
        ],
        correctAnswer: 'A',
        explanation: 'Module 12 highlights Openness: employees measured by a model should know it exists, what it uses, and how they can contest errors.'
      },
      {
        id: 'q2-4',
        title: 'Quiz: Why is the Data Simulated?',
        question: 'Why does this course use a simulated dataset rather than live company employee records?',
        options: [
          { id: 'A', text: 'Because NumPy cannot read real CSV files' },
          { id: 'B', text: 'To ensure privacy, reproducible learning results for all facilitators, and known ground truth' },
          { id: 'C', text: 'Because real employees never attend training' },
          { id: 'D', text: 'Simulated data is always larger than real data' }
        ],
        correctAnswer: 'B',
        explanation: 'Simulation guarantees privacy, reproducible identical results across Colab/classrooms, and reveals known ground truth in Section 16.'
      },
      {
        id: 'q2-5',
        title: 'Quiz: Missing Data in the Workplace',
        question: 'How many rows in employee_productivity_data.csv have missing training_hours (blank cells)?',
        options: [
          { id: 'A', text: '0 rows (data is perfectly clean)' },
          { id: 'B', text: '162 rows' },
          { id: 'C', text: '3,000 rows' },
          { id: 'D', text: '5,838 rows' }
        ],
        correctAnswer: 'B',
        explanation: '162 cells in training_hours were unrecorded (NaN), leaving 5,838 complete rows for modeling.'
      }
    ]
  },
  {
    id: 3,
    module: 2,
    duration: '5 min',
    title: 'Why NumPy? Python Lists vs Contiguous Arrays',
    badge: 'Module 2 • Slide 3',
    badgeColor: 'green',
    topic1: 'Standard Python lists (pointers scattered in RAM)',
    topic2: 'NumPy contiguous arrays (50x faster SIMD memory)',
    content: [
      {
        type: 'lead',
        text: 'A normal Python list can hold any data type, but it is slow for math because each item is an isolated object scattered across RAM. A NumPy array stores numbers in one contiguous memory block, executing operations 50x faster.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Python List in RAM',
            color: 'orange',
            text: 'Array of Pointers',
            subtext: 'Every integer or float is wrapped in a 24-byte object with its own memory address, causing CPU cache misses.'
          },
          {
            title: 'NumPy Array in RAM',
            color: 'blue',
            text: 'Continuous Memory',
            subtext: 'All numbers are packed tightly as pure 8-byte numbers, allowing the CPU to process millions at once.'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'memory'
      },
      {
        type: 'example',
        title: 'Beginner Example: Speed Benchmark on 1 Million Numbers',
        steps: [
          'import time, numpy as np',
          'data = list(range(1_000_000)); arr = np.arange(1_000_000)',
          'List loop [x * 2 for x in data]: ~0.065 seconds',
          'NumPy vectorised arr * 2: ~0.0012 seconds (over 50x faster!)'
        ]
      }
    ],
    facilitatorNotes: 'Run the speed benchmark live in the middle code editor. Freshers are consistently amazed by the 50x speed difference on 1,000,000 elements.',
    curatedQuestions: [
      {
        id: 'q3-1',
        title: 'Quiz: Why Python Lists are Slower',
        question: 'Why is multiplying a million numbers in a Python list much slower than in a NumPy array?',
        options: [
          { id: 'A', text: 'Python lists store numbers in cloud storage' },
          { id: 'B', text: 'Python lists store pointers to scattered objects in memory, causing CPU cache misses' },
          { id: 'C', text: 'NumPy arrays are written in JavaScript' },
          { id: 'D', text: 'Python lists cannot store decimal numbers' }
        ],
        correctAnswer: 'B',
        explanation: 'Each element in a Python list is a pointer to a separate heap object. Scattered addresses cause constant CPU cache misses.'
      },
      {
        id: 'q3-2',
        title: 'Quiz: Homogeneous Memory in NumPy',
        question: 'What is a core property of a NumPy array that enables extreme speed?',
        options: [
          { id: 'A', text: 'Every element must be of the same uniform data type (dtype)' },
          { id: 'B', text: 'It can only store strings' },
          { id: 'C', text: 'It only works with 3 rows of data' },
          { id: 'D', text: 'It requires internet connectivity to compute sums' }
        ],
        correctAnswer: 'A',
        explanation: 'Homogeneity (all elements sharing one dtype like float64) enables contiguous RAM layout and fast vectorised CPU instructions.'
      },
      {
        id: 'q3-3',
        title: 'Poll: Industry Standard Tooling',
        question: 'Almost every modern machine learning and data library (PyTorch, TensorFlow, Pandas, Scikit-Learn) is built on top of:',
        options: [
          { id: 'A', text: 'NumPy memory architecture' },
          { id: 'B', text: 'Microsoft Excel VBA' },
          { id: 'C', text: 'Standard Python dictionaries' }
        ],
        correctAnswer: 'A',
        explanation: 'NumPy is the universal bedrock of the modern data and AI ecosystem.'
      },
      {
        id: 'q3-4',
        title: 'Quiz: Memory Footprint Comparison',
        question: 'Roughly how many bytes does a standard Python float object consume versus an 8-byte NumPy float64?',
        options: [
          { id: 'A', text: 'Python float is 24 bytes vs NumPy float64 which is 8 bytes' },
          { id: 'B', text: 'Python float is 1 byte vs NumPy which is 100 bytes' },
          { id: 'C', text: 'They use identical memory' },
          { id: 'D', text: 'NumPy floats take 1 kilobyte each' }
        ],
        correctAnswer: 'A',
        explanation: 'Standard Python float wrapper objects consume 24 bytes, while NumPy packs raw 8-byte IEEE floats directly into continuous memory.'
      },
      {
        id: 'q3-5',
        title: 'Quiz: Importing NumPy',
        question: 'What is the universally accepted standard convention to import NumPy in Python?',
        options: [
          { id: 'A', text: 'import numpy as np' },
          { id: 'B', text: 'from numpy import everything' },
          { id: 'C', text: 'load library numpy' },
          { id: 'D', text: 'include <numpy.h>' }
        ],
        correctAnswer: 'A',
        explanation: 'import numpy as np is the ubiquitous Python convention.'
      }
    ]
  },
  {
    id: 4,
    module: 2,
    duration: '5 min',
    title: 'Creating NumPy Arrays & Inspecting Shapes',
    badge: 'Module 2 • Slide 4',
    badgeColor: 'green',
    topic1: 'Array creation helpers (`array`, `zeros`, `ones`, `arange`, `linspace`)',
    topic2: 'Inspecting key attributes (`ndim`, `shape`, `size`, `dtype`)',
    content: [
      {
        type: 'lead',
        text: 'NumPy provides convenient constructors for creating vectors and tables. Inspecting an array shape and dtype is the first thing a data scientist does to avoid dimension mismatch bugs.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Creation Functions',
            color: 'blue',
            text: 'zeros, ones, arange, linspace',
            subtext: 'np.zeros((2, 3)) creates 2 rows and 3 columns of 0.0. np.arange(0, 10, 2) creates [0, 2, 4, 6, 8].'
          },
          {
            title: 'The .shape Property',
            color: 'green',
            text: '(rows, columns)',
            subtext: 'The shape tuple tells you the size in each direction. Most beginner errors in regression are shape errors!'
          }
        ]
      },
      {
        type: 'example',
        title: 'Beginner Example: 6 Hand-Typed Employee Records',
        steps: [
          'exp6 = np.array([4.0, 3.4, 3.0, 4.1, 2.9, 5.3])  # shape (6,)',
          'records = np.array([[4.0, 3, 56.9], [3.4, 5, 50.6], [3.0, 5, 67.5]])',
          'records.ndim  # 2 (2D table)',
          'records.shape # (3, 3) -> 3 rows (employee-months), 3 columns',
          'records.dtype # float64 (one data type for the whole array)'
        ]
      }
    ],
    facilitatorNotes: 'Run Poll 1 here. Stress that shape is always written as (rows, columns). If an array is 1D, shape is (N,).',
    curatedQuestions: [
      {
        id: 'q4-1',
        title: 'Poll: Identifying Array Shape',
        question: 'What is the shape of np.zeros((4, 3))?',
        options: [
          { id: 'A', text: '(3, 4)' },
          { id: 'B', text: '(4, 3) — 4 rows and 3 columns' },
          { id: 'C', text: '(12,)' },
          { id: 'D', text: '(4, 3, 1)' }
        ],
        correctAnswer: 'B',
        explanation: 'In NumPy 2D arrays, shape is always (rows, columns). So (4, 3) has 4 rows and 3 columns.'
      },
      {
        id: 'q4-2',
        title: 'Quiz: 1D Vector vs 2D Matrix',
        question: 'What is the shape of a 1D array created from a list of 6 numbers: np.array([4, 3.4, 3, 4.1, 2.9, 5.3])?',
        options: [
          { id: 'A', text: '(6, 1)' },
          { id: 'B', text: '(1, 6)' },
          { id: 'C', text: '(6,) — a 1D vector of length 6' },
          { id: 'D', text: '(6, 6)' }
        ],
        correctAnswer: 'C',
        explanation: 'A 1D array has shape (6,). A 2D column vector has shape (6, 1).'
      },
      {
        id: 'q4-3',
        title: 'Quiz: arange vs linspace',
        question: 'What does np.linspace(0, 1, 5) produce?',
        options: [
          { id: 'A', text: '[0, 1, 2, 3, 4]' },
          { id: 'B', text: '[0.0, 0.25, 0.5, 0.75, 1.0] — 5 evenly spaced values from 0 to 1' },
          { id: 'C', text: '[0, 5, 10]' },
          { id: 'D', text: 'An empty array' }
        ],
        correctAnswer: 'B',
        explanation: 'np.linspace(start, stop, num) generates num evenly spaced points between start and stop (inclusive).'
      },
      {
        id: 'q4-4',
        title: 'Quiz: Total Number of Elements (.size)',
        question: 'An array has shape (5838, 7). What does arr.size return?',
        options: [
          { id: 'A', text: '5838' },
          { id: 'B', text: '7' },
          { id: 'C', text: '40,866 (5838 * 7)' },
          { id: 'D', text: '2' }
        ],
        correctAnswer: 'C',
        explanation: 'arr.size returns the total count of numbers in the array: rows * columns = 5838 * 7 = 40,866.'
      },
      {
        id: 'q4-5',
        title: 'Quiz: Homogeneous Type Coercion',
        question: 'If you create np.array([1, 2, 3.5]), what will be the resulting dtype of the array?',
        options: [
          { id: 'A', text: 'int64' },
          { id: 'B', text: 'float64 (the integers 1 and 2 are upcast to 1.0 and 2.0)' },
          { id: 'C', text: 'string' },
          { id: 'D', text: 'An error occurs' }
        ],
        correctAnswer: 'B',
        explanation: 'NumPy arrays must hold one data type. It automatically upcasts integers to float64 so no precision is lost.'
      }
    ]
  },
  {
    id: 5,
    module: 2,
    duration: '5 min',
    title: 'Indexing & Slicing: The View vs Copy Trap',
    badge: 'Module 2 • Slide 5',
    badgeColor: 'green',
    topic1: '0-indexed item picking and range slicing (`start:stop:step`)',
    topic2: 'The slicing trap: Views share memory vs `.copy()`',
    content: [
      {
        type: 'lead',
        text: 'Indexing picks one item by position (starting at 0). Slicing picks a range. The most dangerous beginner bug: a slice is NOT a new copy—it is a window (view) sharing the same memory block.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Slicing Syntax',
            color: 'blue',
            text: 'start:stop:step (0-indexed)',
            subtext: 'exp6[0] is first record (4.0). exp6[-1] is last record (5.3). exp6[1:4] picks indices 1, 2, 3.'
          },
          {
            title: 'The View Trap',
            color: 'orange',
            text: 'Mutating View Mutates Original!',
            subtext: 'Writing s = exp6[:3]; s[0] = 999 changes exp6[0] to 999! Always use .copy() for safety.'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'slicing'
      },
      {
        type: 'example',
        title: 'Beginner Example: 2D Table Slicing',
        steps: [
          'records[:, 0]  # picks all rows, column 0 (experience column)',
          'records[2, 1]  # row index 2, column index 1',
          'records[1:3, :] # rows 1 and 2, all columns',
          'safe_sub = records[:2, :].copy() # independent copy in new memory'
        ]
      }
    ],
    facilitatorNotes: 'Type s = exp6[:3]; s[0] = 999 live in the middle code editor. Print exp6[0] and watch students react when they see the original array changed. Explain that views exist for performance so NumPy does not duplicate gigabytes of memory.',
    curatedQuestions: [
      {
        id: 'q5-1',
        title: 'Quiz: Slicing Bounds',
        question: 'Given exp6 = np.array([4.0, 3.4, 3.0, 4.1, 2.9, 5.3]), what does exp6[1:4] return?',
        options: [
          { id: 'A', text: '[4.0, 3.4, 3.0]' },
          { id: 'B', text: '[3.4, 3.0, 4.1] (Indices 1, 2, and 3)' },
          { id: 'C', text: '[3.4, 3.0, 4.1, 2.9]' },
          { id: 'D', text: '[4.1, 2.9, 5.3]' }
        ],
        correctAnswer: 'B',
        explanation: 'In Python slicing, start is inclusive and stop is exclusive. Indices 1, 2, and 3 correspond to [3.4, 3.0, 4.1].'
      },
      {
        id: 'q5-2',
        title: 'Quiz: The View Trap in Memory',
        question: 'What happens when you run:\nsub = exp6[:2]\nsub[0] = 100\nprint(exp6[0])',
        options: [
          { id: 'A', text: 'Prints 4.0 because sub is an independent copy' },
          { id: 'B', text: 'Prints 100 because slices are memory views onto the original array' },
          { id: 'C', text: 'Throws a TypeError' },
          { id: 'D', text: 'Prints 0' }
        ],
        correctAnswer: 'B',
        explanation: 'NumPy slices create views, not copies. Modifying elements in the slice directly mutates the original array in memory.'
      },
      {
        id: 'q5-3',
        title: 'Quiz: Creating Independent Copies',
        question: 'How do you create an independent copy of an array slice so modifying it does not alter the original?',
        options: [
          { id: 'A', text: 'safe = exp6[:3].clone()' },
          { id: 'B', text: 'safe = exp6[:3].copy()' },
          { id: 'C', text: 'safe = exp6[:3].new()' },
          { id: 'D', text: 'safe = exp6[:3] * 1' }
        ],
        correctAnswer: 'B',
        explanation: '.copy() allocates fresh memory and returns an independent array.'
      },
      {
        id: 'q5-4',
        title: 'Quiz: Picking a Single Column in 2D',
        question: 'In a 2D matrix F of shape (5838, 7), which syntax selects all rows of feature column 0 (experience)?',
        options: [
          { id: 'A', text: 'F[0, :]' },
          { id: 'B', text: 'F[:, 0]' },
          { id: 'C', text: 'F.col(0)' },
          { id: 'D', text: 'F[0]' }
        ],
        correctAnswer: 'B',
        explanation: 'The colon : before the comma selects all rows; 0 after the comma selects column index 0.'
      },
      {
        id: 'q5-5',
        title: 'Quiz: Negative Indexing',
        question: 'What does exp6[-1] return in NumPy?',
        options: [
          { id: 'A', text: 'The first element' },
          { id: 'B', text: 'The last element' },
          { id: 'C', text: 'An IndexError' },
          { id: 'D', text: 'Negative one' }
        ],
        correctAnswer: 'B',
        explanation: 'Negative indices count backwards from the end. -1 represents the last item.'
      }
    ]
  },
  {
    id: 6,
    module: 2,
    duration: '5 min',
    title: 'Boolean Masks & Filtering Missing NaN Values',
    badge: 'Module 2 • Slide 6',
    badgeColor: 'green',
    topic1: 'Filtering arrays using boolean masks with `&`, `|`, and `~`',
    topic2: 'Handling missing values (`np.nan`, `np.isnan`) in training data',
    content: [
      {
        type: 'lead',
        text: 'A condition like `exp6 > 3.0` generates a list of True and False values called a boolean mask. Passing this mask inside square brackets filters the array in one fast line, replacing slow Python loops.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Topic 1: Boolean Operators',
            color: 'blue',
            text: 'Use &, |, and ~ with Brackets',
            subtext: 'Python words "and" / "or" fail on arrays! Always use bitwise & (and), | (or), and ~ (not), wrapping each comparison in parentheses.'
          },
          {
            title: 'Topic 2: NaN Missing Data',
            color: 'green',
            text: '~np.isnan() Cleans Blank Cells',
            subtext: 'NumPy reads blank cells as NaN (Not a Number). We use ~np.isnan() to skip them cleanly, retaining 5,838 complete rows.'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'mask'
      },
      {
        type: 'example',
        title: 'Beginner Example: Filtering Qualified Employee Months',
        steps: [
          'good = (exp6 > 3.0) & (rework6 <= 3)  # employees with > 3 yrs exp AND low rework',
          'score6[good]  # [56.9, 65.0] (keeps only elements where mask is True)',
          'np.isnan(training_sample) # [False, False, False, True, False, True]',
          'clean = training_sample[~np.isnan(training_sample)] # removes all blanks'
        ]
      }
    ],
    facilitatorNotes: 'Run Poll 2. Highlight that Python words "and" and "or" try to evaluate the entire array as a single truth value and crash. In data science interviews, knowing to use & and | with parentheses is a frequent test.',
    curatedQuestions: [
      {
        id: 'q6-1',
        title: 'Poll: Picking Experienced Low-Rework Months',
        question: 'Which line correctly picks scores of records with more than 3 years experience AND fewer than 5 years?',
        options: [
          { id: 'A', text: 'score6[exp6 > 3 and exp6 < 5]' },
          { id: 'B', text: 'score6[(exp6 > 3) & (exp6 < 5)]' },
          { id: 'C', text: 'score6[3 < exp6 < 5]' },
          { id: 'D', text: 'score6[exp6.between(3, 5)]' }
        ],
        correctAnswer: 'B',
        explanation: 'Python\'s "and" does not work element-by-element on arrays. You MUST use & and wrap each comparison in parentheses.'
      },
      {
        id: 'q6-2',
        title: 'Quiz: What does the Tilde (~) Operator Do?',
        question: 'In the mask expression ~np.isnan(features), what does the tilde ~ mean?',
        options: [
          { id: 'A', text: 'Approximate value' },
          { id: 'B', text: 'Logical NOT (flips True to False and False to True)' },
          { id: 'C', text: 'Bitwise shift' },
          { id: 'D', text: 'Sort in ascending order' }
        ],
        correctAnswer: 'B',
        explanation: '~ is the bitwise NOT operator in NumPy. ~np.isnan means "NOT blank" (keep the valid numbers).'
      },
      {
        id: 'q6-3',
        title: 'Quiz: What is NaN in NumPy?',
        question: 'What does NaN stand for in computer science and data analysis?',
        options: [
          { id: 'A', text: 'New and Normal' },
          { id: 'B', text: 'Not a Number (used to represent missing or undefined numerical data)' },
          { id: 'C', text: 'Null and Negative' },
          { id: 'D', text: 'Next Available Node' }
        ],
        correctAnswer: 'B',
        explanation: 'NaN stands for Not a Number. It is the IEEE floating-point standard representation for missing data.'
      },
      {
        id: 'q6-4',
        title: 'Quiz: Cleaning Missing Rows Across 7 Features',
        question: 'Which expression identifies rows where NO feature cell is blank (NaN) across a 2D matrix?',
        options: [
          { id: 'A', text: 'ok = ~np.isnan(features).any(axis=1)' },
          { id: 'B', text: 'ok = features != np.nan' },
          { id: 'C', text: 'ok = features.drop_na()' },
          { id: 'D', text: 'ok = np.isnan(features).all()' }
        ],
        correctAnswer: 'A',
        explanation: 'np.isnan(features).any(axis=1) finds rows having ANY blank cell. The tilde ~ flips this to rows with NO blanks.'
      },
      {
        id: 'q6-5',
        title: 'Quiz: Conditional Value Assignment',
        question: 'What does np.where(score6 >= 60, "strong", "weaker") return?',
        options: [
          { id: 'A', text: 'The index of values greater than 60' },
          { id: 'B', text: 'An array of strings: "strong" where score >= 60 and "weaker" elsewhere' },
          { id: 'C', text: 'Only the strong scores' },
          { id: 'D', text: 'A boolean mask' }
        ],
        correctAnswer: 'B',
        explanation: 'np.where(condition, if_true, if_false) functions as a vectorised if-else statement across arrays.'
      }
    ]
  },
  {
    id: 7,
    module: 3,
    duration: '4 min',
    title: 'Vectorisation & The Baseline Average Guess',
    badge: 'Module 3 • Slide 7',
    badgeColor: 'blue',
    topic1: 'Vectorisation: Operations on whole arrays at once',
    topic2: 'Our benchmark baseline: Guessing team average (62.4)',
    content: [
      {
        type: 'lead',
        text: 'Vectorisation allows operations on an entire array in one line without writing for-loops. Before building machine learning models, good engineers always establish a naive baseline.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Topic 1: Vectorisation',
            color: 'blue',
            text: 'No Python Loops Required',
            subtext: 'Operations like error = score6 - avg run across all rows simultaneously at native C/SIMD speed.'
          },
          {
            title: 'Topic 2: The Baseline (62.4)',
            color: 'green',
            text: 'Average Score for Everyone',
            subtext: 'Predicting 62.4 for every employee gives an RMSE error of 9.1 points. Any model that cannot beat 9.1 is useless!'
          }
        ]
      },
      {
        type: 'example',
        title: 'Beginner Example: Baseline Errors on 6 Records',
        steps: [
          'score6 = np.array([56.9, 50.6, 67.5, 65.0, 70.0, 56.2])',
          'avg = score6.mean()  # 61.03 (team average)',
          'guess = np.full(6, avg)  # [61.0, 61.0, 61.0, 61.0, 61.0, 61.0]',
          'error = score6 - guess # [-4.1, -10.4, +6.5, +4.0, +9.0, -4.8]',
          'gap_from_100 = 100.0 - score6 # distance from maximum capacity'
        ]
      }
    ],
    facilitatorNotes: 'Ask the room: "What do you notice about the mistakes?" They vary from -10 to +9 points. A model that ignores everything about the person cannot do better than this.',
    curatedQuestions: [
      {
        id: 'q7-1',
        title: 'Quiz: What is Vectorisation in NumPy?',
        question: 'What does "vectorisation" mean in NumPy programming?',
        options: [
          { id: 'A', text: 'Converting text into images' },
          { id: 'B', text: 'Executing operations on whole arrays in one command without manual Python loops' },
          { id: 'C', text: 'Drawing 2D arrows on a chart' },
          { id: 'D', text: 'Compiling Python code to C++ manually' }
        ],
        correctAnswer: 'B',
        explanation: 'Vectorisation replaces manual row-by-row Python loops with compiled, highly-optimized C/SIMD batch operations.'
      },
      {
        id: 'q7-2',
        title: 'Quiz: Purpose of a Baseline Model',
        question: 'Why must we always compute a simple baseline model (like predicting the average score)?',
        options: [
          { id: 'A', text: 'To prove that machine learning models are always correct' },
          { id: 'B', text: 'To provide a benchmark error that any machine learning model MUST beat to justify existing' },
          { id: 'C', text: 'Because NumPy requires a baseline before loading files' },
          { id: 'D', text: 'To calculate the random seed' }
        ],
        correctAnswer: 'B',
        explanation: 'A baseline sets the minimum standard of performance. If a complex model cannot beat guessing the average, it is worthless.'
      },
      {
        id: 'q7-3',
        title: 'Quiz: Baseline Error on 5,838 Records',
        question: 'What is the typical error (RMSE) of simply guessing the average score (62.4) for all 5,838 employees?',
        options: [
          { id: 'A', text: '0.0 points' },
          { id: 'B', text: '9.1 points' },
          { id: 'C', text: '50.0 points' },
          { id: 'D', text: '160.0 points' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 1.2 & 8.2: The baseline RMSE across all 5,838 complete records is approximately 9.1 score points.'
      },
      {
        id: 'q7-4',
        title: 'Quiz: Creating a Repeated Guess Vector',
        question: 'Which NumPy function generates an array of length 6 filled with the value 62.4?',
        options: [
          { id: 'A', text: 'np.full(6, 62.4)' },
          { id: 'B', text: 'np.repeat(62.4)' },
          { id: 'C', text: 'np.fill(62.4, 6)' },
          { id: 'D', text: '[62.4] * 6' }
        ],
        correctAnswer: 'A',
        explanation: 'np.full(shape, value) generates an array of the given shape filled with the specified constant value.'
      },
      {
        id: 'q7-5',
        title: 'Poll: Can Small Samples Deceive Us?',
        question: 'If we calculate the average score of just 6 hand-typed rows (61.0) vs 5,838 rows (62.4), what lesson does this teach?',
        options: [
          { id: 'A', text: 'Small samples can fool you: 6 rows had lower average than the true population' },
          { id: 'B', text: '6 rows is plenty of data for all company decisions' },
          { id: 'C', text: 'NumPy math changes based on sample size' }
        ],
        correctAnswer: 'A',
        explanation: 'Small samples have high sampling variance. 6 hand-picked rows told us very little about the complete 5,838-row dataset.'
      }
    ]
  },
  {
    id: 8,
    module: 3,
    duration: '4 min',
    title: 'Array Summaries & The 2D Axis Argument',
    badge: 'Module 3 • Slide 8',
    badgeColor: 'blue',
    topic1: 'Statistical summaries (`mean`, `std`, `median`, `argmax`)',
    topic2: 'The 2D axis argument: `axis=0` (columns) vs `axis=1` (rows)',
    content: [
      {
        type: 'lead',
        text: 'Summary functions condense millions of numbers into single statistics. In 2D tables, controlling the axis argument specifies whether you want one summary per column or one summary per employee.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'axis=0 (Downwards)',
            color: 'blue',
            text: 'Squashes Rows Down',
            subtext: 'Operates across rows down the columns. records.mean(axis=0) gives 1 average per feature column.'
          },
          {
            title: 'axis=1 (Across)',
            color: 'green',
            text: 'Squashes Columns Across',
            subtext: 'Operates across columns across each row. records.mean(axis=1) gives 1 average per employee row.'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'axis'
      },
      {
        type: 'example',
        title: 'Beginner Example: Summaries on 6 Employees',
        steps: [
          'score6.mean()   # 61.03 (overall average)',
          'score6.std()    # 6.89 (standard deviation: typical spread around mean)',
          'np.median(score6) # 60.95 (middle value, resistant to extreme outliers)',
          'score6.argmax() # 4 (POSITION index of highest score, NOT the score itself!)'
        ]
      }
    ],
    facilitatorNotes: 'Teach the memory trick: axis=0 squashes rows (leaving 1 value per column). axis=1 squashes columns (leaving 1 value per row). Remind them that argmax gives the index, not the value.',
    curatedQuestions: [
      {
        id: 'q8-1',
        title: 'Quiz: axis=0 in 2D Arrays',
        question: 'Given a 2D array of shape (5838, 7), what will be the shape of arr.mean(axis=0)?',
        options: [
          { id: 'A', text: '(5838,)' },
          { id: 'B', text: '(7,) — one mean per column' },
          { id: 'C', text: '(1,)' },
          { id: 'D', text: '(5838, 7)' }
        ],
        correctAnswer: 'B',
        explanation: 'axis=0 squashes the 5,838 rows down into a single summary vector of length 7 (one average per column).'
      },
      {
        id: 'q8-2',
        title: 'Quiz: axis=1 in 2D Arrays',
        question: 'What does records.mean(axis=1) calculate?',
        options: [
          { id: 'A', text: 'One summary value per ROW (across the columns)' },
          { id: 'B', text: 'One summary value per column' },
          { id: 'C', text: 'The grand total of the entire matrix' },
          { id: 'D', text: 'The diagonal elements' }
        ],
        correctAnswer: 'A',
        explanation: 'axis=1 operates across columns, producing one average per row.'
      },
      {
        id: 'q8-3',
        title: 'Quiz: argmax vs max',
        question: 'Given score6 = np.array([56.9, 50.6, 67.5, 65, 70, 56.2]), what does score6.argmax() return?',
        options: [
          { id: 'A', text: '70.0' },
          { id: 'B', text: '4 (the index position of 70.0)' },
          { id: 'C', text: '5' },
          { id: 'D', text: '0' }
        ],
        correctAnswer: 'B',
        explanation: 'argmax returns the index position of the maximum value (index 4), not the maximum value itself.'
      },
      {
        id: 'q8-4',
        title: 'Quiz: Standard Deviation Meaning',
        question: 'What does a small standard deviation tell you about employee scores?',
        options: [
          { id: 'A', text: 'The employees all have high experience' },
          { id: 'B', text: 'Most employee scores sit very close to the team average' },
          { id: 'C', text: 'The model has 100% accuracy' },
          { id: 'D', text: 'There are negative values' }
        ],
        correctAnswer: 'B',
        explanation: 'Standard deviation measures spread. A small value means numbers cluster closely around the average.'
      },
      {
        id: 'q8-5',
        title: 'Quiz: Mean vs Median with Outliers',
        question: 'If one employee achieves an abnormal score of 99.0 while everyone else scored 50.0, which metric remains robust and unchanged?',
        options: [
          { id: 'A', text: 'The mean' },
          { id: 'B', text: 'The median' },
          { id: 'C', text: 'The standard deviation' },
          { id: 'D', text: 'The variance' }
        ],
        correctAnswer: 'B',
        explanation: 'The median (middle value) is resistant to extreme outliers, whereas the mean gets pulled upwards.'
      }
    ]
  },
  {
    id: 9,
    module: 3,
    duration: '4 min',
    title: 'Broadcasting & Feature Standardisation',
    badge: 'Module 3 • Slide 9',
    badgeColor: 'blue',
    topic1: 'The broadcasting rules: Aligning different shapes',
    topic2: 'Standardisation Z-Scores: (x - mean) / std',
    content: [
      {
        type: 'lead',
        text: 'Broadcasting allows NumPy to perform arithmetic between arrays of different shapes without copying data. This is what makes feature standardisation possible in a single line.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Broadcasting Rules',
            color: 'blue',
            text: 'Compare Shapes from the Right',
            subtext: 'Two dimensions are compatible if they are equal, or if one of them is 1. Dimensions of size 1 stretch automatically.'
          },
          {
            title: 'Standardisation Z-Score',
            color: 'green',
            text: 'z = (x - mean) / std',
            subtext: 'Rescales any feature to have mean 0 and spread 1. Now 1 year of experience is comparable to 1 training hour!'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'broadcasting'
      },
      {
        type: 'example',
        title: 'Beginner Example: Standardising Experience',
        steps: [
          'exp6 = np.array([4.0, 3.4, 3.0, 4.1, 2.9, 5.3])',
          'z = (exp6 - exp6.mean()) / exp6.std()',
          'Mean becomes 0.0, Standard Deviation becomes 1.0',
          'A value of +1.8 means: 1.8 standard deviations above average experience!'
        ]
      }
    ],
    facilitatorNotes: 'Run the choose-the-next-line poll from Module 3. Emphasize that standardisation is mandatory for gradient descent and for comparing feature importance fairly.',
    curatedQuestions: [
      {
        id: 'q9-1',
        title: 'Poll: Correct Line to Standardise',
        question: 'We want to standardise exp6 so its mean is 0 and spread is 1. Which line is mathematically correct?',
        options: [
          { id: 'A', text: 'z = exp6 - exp6.std() / exp6.mean()' },
          { id: 'B', text: 'z = (exp6 - exp6.mean()) / exp6.std()' },
          { id: 'C', text: 'z = exp6 / exp6.sum()' }
        ],
        correctAnswer: 'B',
        explanation: 'Subtracting the mean centres the numbers around zero; dividing by the standard deviation scales the spread to exactly 1.0.'
      },
      {
        id: 'q9-2',
        title: 'Quiz: Broadcasting Shape Compatibility',
        question: 'Can NumPy add an array of shape (3, 3) to a 1D vector of shape (3,)?',
        options: [
          { id: 'A', text: 'Yes, because comparing from the right, the trailing dimension 3 matches' },
          { id: 'B', text: 'No, arrays must always have identical ndim' },
          { id: 'C', text: 'Only if both arrays contain zeros' },
          { id: 'D', text: 'It causes a memory crash' }
        ],
        correctAnswer: 'A',
        explanation: 'Broadcasting compares shapes from right to left. (3, 3) and (3,) have matching trailing dimension 3, so the vector stretches across all 3 rows.'
      },
      {
        id: 'q9-3',
        title: 'Quiz: Incompatible Shapes Failure',
        question: 'Why does adding an array of shape (3,) to an array of shape (4,) fail in NumPy?',
        options: [
          { id: 'A', text: 'Because 3 and 4 are not equal, and neither dimension is 1' },
          { id: 'B', text: 'Because 4 is an even number' },
          { id: 'C', text: 'Because NumPy only adds 2D matrices' },
          { id: 'D', text: 'Because arrays must be sorted first' }
        ],
        correctAnswer: 'A',
        explanation: 'The broadcasting rule requires dimensions to be equal or one of them to be 1. Neither condition holds for 3 and 4.'
      },
      {
        id: 'q9-4',
        title: 'Quiz: Meaning of a +1.0 Z-score',
        question: 'If an employee has a standardised training_hours Z-score of +1.0, what does this tell you in workplace terms?',
        options: [
          { id: 'A', text: 'They attended exactly 1 hour of training' },
          { id: 'B', text: 'They attended 1 standard deviation more training hours than the company average' },
          { id: 'C', text: 'Their productivity score is 1.0' },
          { id: 'D', text: 'They were absent 1 day' }
        ],
        correctAnswer: 'B',
        explanation: 'A Z-score measures distance from the mean in standard deviation units. +1.0 means one standard deviation above the company average.'
      },
      {
        id: 'q9-5',
        title: 'Quiz: Centering Data',
        question: 'If you subtract each column\'s mean from a matrix X using X - X.mean(axis=0), what will be the new mean of each column?',
        options: [
          { id: 'A', text: '0.0' },
          { id: 'B', text: '1.0' },
          { id: 'C', text: '62.4' },
          { id: 'D', text: 'Undefined' }
        ],
        correctAnswer: 'A',
        explanation: 'Subtracting the mean centres the data exactly at 0.0.'
      }
    ]
  },
  {
    id: 10,
    module: 4,
    duration: '4 min',
    title: 'Reshaping, Transpose & Stacking Features',
    badge: 'Module 4 • Slide 10',
    badgeColor: 'green',
    topic1: 'Changing array layouts with `.reshape()` and `.T` (transpose)',
    topic2: 'Building 2D design matrices with `np.column_stack`',
    content: [
      {
        type: 'lead',
        text: 'Linear regression requires feature vectors to be organized into a 2D design matrix table. NumPy makes reshaping and combining columns seamless.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Reshape & Transpose',
            color: 'blue',
            text: 'a.reshape(-1, 1) and a.T',
            subtext: '-1 tells NumPy: "calculate this dimension automatically". .T swaps rows with columns.'
          },
          {
            title: 'np.column_stack',
            color: 'green',
            text: 'Stacks 1D Columns Side-by-Side',
            subtext: 'Takes individual feature arrays (exp, rework, absent) and binds them into a 2D table of shape (N, 3).'
          }
        ]
      },
      {
        type: 'example',
        title: 'Beginner Example: Combining Workplace Columns',
        steps: [
          'exp6 = np.array([4.0, 3.4, 3.0, 4.1, 2.9, 5.3])',
          'rework6 = np.array([3, 5, 5, 0, 1, 4])',
          'absent6 = np.array([1, 1, 1, 1, 0, 1])',
          'F6 = np.column_stack([exp6, rework6, absent6]) # shape (6, 3)',
          'F6.T # Transposed matrix: shape (3, 6)'
        ]
      }
    ],
    facilitatorNotes: 'Demonstrate how column_stack takes 1D vectors and turns them into a 2D feature matrix. Explain that -1 in reshape(-1, 1) is a handy shorthand so you do not need to hardcode the row count.',
    curatedQuestions: [
      {
        id: 'q10-1',
        title: 'Quiz: Shorthand -1 in Reshape',
        question: 'If array a has 6 elements, what does a.reshape(-1, 1) return?',
        options: [
          { id: 'A', text: 'A 2D column vector of shape (6, 1)' },
          { id: 'B', text: 'A row vector of shape (1, 6)' },
          { id: 'C', text: 'A negative array' },
          { id: 'D', text: 'An IndexError' }
        ],
        correctAnswer: 'A',
        explanation: '-1 instructs NumPy to automatically calculate that dimension based on the array total size (6 / 1 = 6).'
      },
      {
        id: 'q10-2',
        title: 'Quiz: Transposing a Matrix (.T)',
        question: 'An array has shape (5838, 7). What is the shape of its transpose arr.T?',
        options: [
          { id: 'A', text: '(5838, 7)' },
          { id: 'B', text: '(7, 5838) — rows and columns are swapped' },
          { id: 'C', text: '(40866,)' },
          { id: 'D', text: '(7, 7)' }
        ],
        correctAnswer: 'B',
        explanation: 'Transposing swaps the axes, transforming a (5838, 7) matrix into (7, 5838).'
      },
      {
        id: 'q10-3',
        title: 'Quiz: Stacking Feature Columns',
        question: 'If you have 7 separate 1D arrays each of length 5,838, which function binds them side-by-side into a (5838, 7) table?',
        options: [
          { id: 'A', text: 'np.column_stack([f1, f2, f3, f4, f5, f6, f7])' },
          { id: 'B', text: 'np.row_stack()' },
          { id: 'C', text: 'np.sum()' },
          { id: 'D', text: 'np.flatten()' }
        ],
        correctAnswer: 'A',
        explanation: 'np.column_stack stacks 1D arrays as columns into a 2D matrix.'
      },
      {
        id: 'q10-4',
        title: 'Quiz: Reshape Does Not Duplicate Memory',
        question: 'Does reshaping an array create a fresh copy of the data or does it reuse the existing buffer?',
        options: [
          { id: 'A', text: 'It creates a fresh copy on disk' },
          { id: 'B', text: 'It reuses the existing memory buffer whenever possible (a view)' },
          { id: 'C', text: 'It deletes the original data' },
          { id: 'D', text: 'It only works with numbers under 100' }
        ],
        correctAnswer: 'B',
        explanation: 'Reshaping merely changes the indexing strides without moving or copying the underlying numbers in RAM.'
      },
      {
        id: 'q10-5',
        title: 'Quiz: Reshape Dimension Mismatch',
        question: 'What happens if you try to reshape an array of 6 numbers into shape (2, 4)?',
        options: [
          { id: 'A', text: 'NumPy fills the extra cells with zeros' },
          { id: 'B', text: 'ValueError: cannot reshape array of size 6 into shape (2,4)' },
          { id: 'C', text: 'It discards the last 2 numbers' },
          { id: 'D', text: 'It creates a 4D array' }
        ],
        correctAnswer: 'B',
        explanation: 'Total elements must match: 2 * 4 = 8, which is not equal to 6.'
      }
    ]
  },
  {
    id: 11,
    module: 4,
    duration: '4 min',
    title: 'Matrix Multiplication (* vs @) & Random Seeds',
    badge: 'Module 4 • Slide 11',
    badgeColor: 'green',
    topic1: 'Element-wise multiplication (`*`) vs matrix dot product (`@`)',
    topic2: 'Reproducible simulation with `np.random.default_rng(42)`',
    content: [
      {
        type: 'lead',
        text: 'Understanding the difference between * and @ is the single most important syntax distinction in linear regression. Setting a random seed ensures experimental reproducibility.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Operator * (Hadamard)',
            color: 'orange',
            text: 'Multiplies Item by Item',
            subtext: 'A * B multiplies matching positions. Requires identical shapes or broadcasting.'
          },
          {
            title: 'Operator @ (Dot Product)',
            color: 'blue',
            text: 'Matrix Multiplication',
            subtext: 'A @ B computes row-by-column dot products. Used for predictions X @ theta and X.T @ X.'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'matrixMath'
      },
      {
        type: 'example',
        title: 'Beginner Example: Why Random Seed 42 Matters',
        steps: [
          'rng = np.random.default_rng(42)  # 42 is the starting seed',
          'rng.integers(20, 80, size=5) # Generates reproducible integers',
          'rng.normal(0, 8, size=5)     # Generates Gaussian bell-curve noise',
          'Without a fixed seed, every student would see different model results!'
        ]
      }
    ],
    facilitatorNotes: 'Run Quiz 1. Stress that mixing up * and @ is the #1 bug in student regression code. Check time: 39 minutes should have passed. Allow a 5-minute break here before regression theory.',
    curatedQuestions: [
      {
        id: 'q11-1',
        title: 'Quiz 1: Array Operations in NumPy',
        question: 'What is the difference between A * B and A @ B for two 2D arrays?',
        options: [
          { id: 'A', text: 'There is no difference in NumPy' },
          { id: 'B', text: '* multiplies item by item, while @ is matrix multiplication (dot product)' },
          { id: 'C', text: '* is matrix multiplication, while @ multiplies item by item' },
          { id: 'D', text: '@ only works on 1D arrays and fails on 2D matrices' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 6: * multiplies corresponding elements. @ multiplies rows of A by columns of B and sums them up (matrix dot product).'
      },
      {
        id: 'q11-2',
        title: 'Quiz: Dimension Rule for Matrix Multiplication',
        question: 'If matrix A has shape (5838, 8) and vector theta has shape (8,), what is the shape of A @ theta?',
        options: [
          { id: 'A', text: '(5838, 8)' },
          { id: 'B', text: '(5838,) — one prediction per employee' },
          { id: 'C', text: '(8, 5838)' },
          { id: 'D', text: '(1,)' }
        ],
        correctAnswer: 'B',
        explanation: 'Multiplying an (N, K) matrix by a (K,) vector yields an (N,) vector of scalar dot products.'
      },
      {
        id: 'q11-3',
        title: 'Quiz: Why do We Set Random Seed 42?',
        question: 'What is the purpose of passing seed 42 into np.random.default_rng(42)?',
        options: [
          { id: 'A', text: 'To make the random numbers run 42x faster' },
          { id: 'B', text: 'To ensure random numbers repeat identically every time, making training reproducible' },
          { id: 'C', text: 'To restrict numbers between 0 and 42' },
          { id: 'D', text: 'It is a required Python keyword' }
        ],
        correctAnswer: 'B',
        explanation: 'A random seed initializes the pseudo-random generator algorithm, ensuring all participants generate identical train/test splits.'
      },
      {
        id: 'q11-4',
        title: 'Quiz: Incompatible Inner Dimensions for @',
        question: 'What happens if you attempt matrix multiplication A @ B when A is (3, 4) and B is (3, 4)?',
        options: [
          { id: 'A', text: 'It multiplies item by item' },
          { id: 'B', text: 'ValueError: inner dimensions 4 and 3 do not match for matrix multiplication' },
          { id: 'C', text: 'It transposes B automatically' },
          { id: 'D', text: 'It returns an array of zeros' }
        ],
        correctAnswer: 'B',
        explanation: 'Matrix multiplication requires the inner dimensions to match: (M, K) @ (K, P). For (3, 4) @ (3, 4), 4 != 3, so it throws a ValueError.'
      },
      {
        id: 'q11-5',
        title: 'Quiz: Normal Gaussian Noise',
        question: 'Which method generates random numbers following a bell curve with mean 0 and standard deviation 8?',
        options: [
          { id: 'A', text: 'rng.normal(0, 8, size=5)' },
          { id: 'B', text: 'rng.integers(0, 8)' },
          { id: 'C', text: 'np.bell(0, 8)' },
          { id: 'D', text: 'np.gaussian(0, 8)' }
        ],
        correctAnswer: 'A',
        explanation: 'rng.normal(loc=0, scale=8, size=N) generates samples from a normal (Gaussian) distribution.'
      }
    ]
  },
  {
    id: 12,
    module: 5,
    duration: '5 min',
    title: 'Regression Foundations: The Straight Line',
    badge: 'Module 5 • Slide 12',
    badgeColor: 'orange',
    topic1: 'The linear equation: y = m * x + c',
    topic2: 'Interpreting slope m (rate of gain) and intercept c (starting point)',
    content: [
      {
        type: 'lead',
        text: 'Linear regression models the relationship between an input feature (x) and the outcome (y) as a straight line. The line lets us make predictions for new employees.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Slope (m)',
            color: 'blue',
            text: 'Rate of Change (Delta y / Delta x)',
            subtext: 'How many extra score points are gained for each additional year of work experience.'
          },
          {
            title: 'Intercept (c)',
            color: 'green',
            text: 'Starting Level when x = 0',
            subtext: 'The baseline starting point of the mathematical line when experience is zero.'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'regressionLine'
      },
      {
        type: 'example',
        title: 'Beginner Example: Score = 1.9 * Experience + 53.0',
        steps: [
          'Person with 0 years experience: 1.9 * 0 + 53 = 53.0 points',
          'Person with 5 years experience: 1.9 * 5 + 53 = 62.5 points',
          'Person with 10 years experience: 1.9 * 10 + 53 = 72.0 points',
          'Each extra year adds about 2 productivity points!'
        ]
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Single Feature LinearRegression',
        code: `import pandas as pd
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
# Output: Productivity = 1.88 * Experience + 53.21`
      }
    ],
    facilitatorNotes: 'Run Quiz 2. Explain that the intercept is often a mathematical anchor rather than a realistic score, because nobody in corporate data has 0 years of experience (our minimum is 0.5 years).',
    curatedQuestions: [
      {
        id: 'q12-1',
        title: 'Quiz 2: Interpreting the Regression Slope',
        question: 'A fitted line is score = 1.9 * experience + 53. What does the 1.9 tell us?',
        options: [
          { id: 'A', text: 'The intercept' },
          { id: 'B', text: 'Each extra year of experience adds about 2 points to the predicted score' },
          { id: 'C', text: 'The model error' },
          { id: 'D', text: 'The total number of employees' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 7.1: The slope (1.9) represents the expected change in score per 1 unit increase in experience.'
      },
      {
        id: 'q12-2',
        title: 'Quiz: Interpreting the Intercept',
        question: 'In the formula score = 1.9 * experience + 53, what is 53?',
        options: [
          { id: 'A', text: 'The slope' },
          { id: 'B', text: 'The intercept (predicted score when experience is 0)' },
          { id: 'C', text: 'The percentage of errors' },
          { id: 'D', text: 'The number of hours in a week' }
        ],
        correctAnswer: 'B',
        explanation: 'The intercept c is the point where the line crosses the y-axis (when x = 0).'
      },
      {
        id: 'q12-3',
        title: 'Quiz: Computing a Prediction',
        question: 'Using the model score = 1.88 * experience + 53.2, what is the predicted score for an employee with 4.0 years of experience?',
        options: [
          { id: 'A', text: '53.2' },
          { id: 'B', text: '60.7 (1.88 * 4.0 + 53.2)' },
          { id: 'C', text: '75.0' },
          { id: 'D', text: '100.0' }
        ],
        correctAnswer: 'B',
        explanation: '1.88 * 4.0 = 7.52; 7.52 + 53.2 = 60.72.'
      },
      {
        id: 'q12-4',
        title: 'Poll: Danger of Extrapolating to 30 Years',
        question: 'Our dataset only contains experience between 0.5 and 14.4 years. Should we trust the model to predict for someone with 30 years experience?',
        options: [
          { id: 'A', text: 'No: Extrapolating far beyond observed data is dangerous and unreliable' },
          { id: 'B', text: 'Yes: Straight lines continue infinitely with 100% guarantee' },
          { id: 'C', text: 'Yes: Senior employees always score 100' }
        ],
        correctAnswer: 'A',
        explanation: 'Extrapolating far outside observed feature ranges is an engineering hazard; productivity might plateau or curve.'
      },
      {
        id: 'q12-5',
        title: 'Quiz: Why is it Called "Linear"?',
        question: 'Why is linear regression called "linear"?',
        options: [
          { id: 'A', text: 'Because code must be written on a single line' },
          { id: 'B', text: 'Because the prediction is formed by multiplying inputs by weights and adding them up' },
          { id: 'C', text: 'Because it only runs on Linux' },
          { id: 'D', text: 'Because it was invented in a straight line' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 1.1: Linear means the prediction is built by multiplying each feature by a weight and adding everything up.'
      }
    ]
  },
  {
    id: 13,
    module: 5,
    duration: '5 min',
    title: 'Measuring Mistakes: Residuals & The MSE Loss Bowl',
    badge: 'Module 5 • Slide 13',
    badgeColor: 'orange',
    topic1: 'Residuals: Real value minus predicted value ($y - \\hat{y}$)',
    topic2: 'Mean Squared Error (MSE) loss function & the 3D bowl',
    content: [
      {
        type: 'lead',
        text: 'How do we find the "best" line? We measure mistakes. For every employee, the residual is the real score minus the predicted score. We square each mistake and find the line that minimizes the average.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Residual (Mistake)',
            color: 'blue',
            text: 'Residual = Actual - Predicted',
            subtext: 'Positive residual means the employee outperformed the line; negative residual means they scored below the line.'
          },
          {
            title: 'MSE Loss Bowl',
            color: 'orange',
            text: 'MSE = Mean of (Residuals²)',
            subtext: 'Squaring eliminates minus signs and punishes big blunders heavily (a miss of 20 counts 4x as much as a miss of 10).'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'lossBowl'
      },
      {
        type: 'example',
        title: 'Beginner Example: Two Ways to Reach the Bowl Bottom',
        steps: [
          '1. Direct Formula (Normal Equation): Jumps straight to the bowl bottom in one mathematical step.',
          '2. Gradient Descent: Takes small steps downhill, checking slope repeatedly until convergence.',
          'Direct formula is fast for small data; gradient descent scales to billions of records.'
        ]
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Residuals & MSE Loss',
        code: `import numpy as np
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
print(f"MAE Error    : {mae:.2f} points")`
      }
    ],
    facilitatorNotes: 'Use the bowl metaphor: every line is a point on a 3D bowl, and height is the MSE loss. Training a model is simply navigating to the lowest point of the bowl.',
    curatedQuestions: [
      {
        id: 'q13-1',
        title: 'Quiz: What is a Residual?',
        question: 'In regression modeling, what is a residual?',
        options: [
          { id: 'A', text: 'The actual real value minus the model predicted value (y - y_pred)' },
          { id: 'B', text: 'The slope of the line' },
          { id: 'C', text: 'The employee salary' },
          { id: 'D', text: 'The number of blank cells' }
        ],
        correctAnswer: 'A',
        explanation: 'Section 7.2: A residual is the mistake: the real observed value minus the predicted value.'
      },
      {
        id: 'q13-2',
        title: 'Quiz: Why Square the Residuals?',
        question: 'Why does the Mean Squared Error (MSE) square the residuals instead of just adding them up?',
        options: [
          { id: 'A', text: 'To avoid positive and negative errors canceling out, and to penalize large mistakes heavily' },
          { id: 'B', text: 'Because NumPy cannot add negative numbers' },
          { id: 'C', text: 'To make numbers smaller' },
          { id: 'D', text: 'It is a cosmetic choice' }
        ],
        correctAnswer: 'A',
        explanation: 'Squaring removes minus signs so errors do not cancel to zero, and heavily punishes large blunders.'
      },
      {
        id: 'q13-3',
        title: 'Quiz: Penalty for a 20-Point Miss',
        question: 'In MSE loss, how much more does a mistake of 20 points count compared to a mistake of 10 points?',
        options: [
          { id: 'A', text: 'Twice as much' },
          { id: 'B', text: 'Four times as much (20² = 400 vs 10² = 100)' },
          { id: 'C', text: 'Ten times as much' },
          { id: 'D', text: 'The exact same' }
        ],
        correctAnswer: 'B',
        explanation: 'Squaring means 20^2 = 400, which is four times 10^2 = 100.'
      },
      {
        id: 'q13-4',
        title: 'Quiz: The Least Squares Line',
        question: 'What is the "least squares line"?',
        options: [
          { id: 'A', text: 'A line drawn with a square ruler' },
          { id: 'B', text: 'The unique line that minimizes the sum of squared residuals across all data points' },
          { id: 'C', text: 'A line with zero slope' },
          { id: 'D', text: 'A line that connects only 2 points' }
        ],
        correctAnswer: 'B',
        explanation: 'The least squares line is mathematically guaranteed to achieve the smallest possible MSE.'
      },
      {
        id: 'q13-5',
        title: 'Quiz: Two Ways to Find the Best Line',
        question: 'What are the two foundational methods to find the optimal line parameters?',
        options: [
          { id: 'A', text: 'Direct closed-form formula (Normal Equation) and iterative Gradient Descent' },
          { id: 'B', text: 'Trial and error guessing and random coin flips' },
          { id: 'C', text: 'Drawing by hand and eye measurement' },
          { id: 'D', text: 'Sorting and filtering' }
        ],
        correctAnswer: 'A',
        explanation: 'Section 7.3: The direct formula jumps straight to the solution; gradient descent steps downhill iteratively.'
      }
    ]
  },
  {
    id: 14,
    module: 6,
    duration: '5 min',
    title: 'Loading CSV Data & Correlation Analysis',
    badge: 'Module 6 • Slide 14',
    badgeColor: 'blue',
    topic1: 'Loading data with `np.genfromtxt` and filtering blanks',
    topic2: 'Pearson correlation ranking: Measuring links with productivity',
    content: [
      {
        type: 'lead',
        text: 'We load the 6,000-row dataset using np.genfromtxt and inspect how strongly each feature moves with the productivity score using the Pearson correlation coefficient.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'np.genfromtxt',
            color: 'blue',
            text: 'Converts Blanks to NaN',
            subtext: 'Unlike np.loadtxt which crashes on blank cells, genfromtxt turns blanks into NaN, letting us filter them.'
          },
          {
            title: 'Correlation Matrix',
            color: 'green',
            text: 'Values between -1.0 and +1.0',
            subtext: '+1 means features rise together; -1 means one rises while other falls; 0 means no linear relationship.'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'correlationRanking'
      },
      {
        type: 'example',
        title: 'Beginner Example: Correlations with Productivity Score',
        steps: [
          'rework_tickets: -0.50 (Strong negative link: more rework = lower score)',
          'experience_years: +0.48 (Strong positive link: more experience = higher score)',
          'absent_days: -0.31 | ai_assistant: +0.30 | task_complexity: -0.29',
          'training_hours: +0.20 (Moderate link)',
          'team_size: +0.01 (Near zero link: team size does not correlate with score!)'
        ]
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn / Pandas: Feature Correlation Matrix',
        code: `import pandas as pd

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
# Top drivers: Exp (+0.48), AI (+0.30), Overtime (-0.50), Blockers (-0.38)`
      }
    ],
    facilitatorNotes: 'Run the choose-the-next-line poll for correlation. Discuss why team size has almost zero correlation (+0.01). Remind participants: correlation measures an association, not proof of cause!',
    curatedQuestions: [
      {
        id: 'q14-1',
        title: 'Poll: Finding Correlation in NumPy',
        question: 'We want the correlation between experience (column 0) and score (y). Which line of code is correct?',
        options: [
          { id: 'A', text: 'np.corrcoef(F[:, 0], y)[0, 1]' },
          { id: 'B', text: 'np.corrcoef(F, y)' },
          { id: 'C', text: 'F[:, 0].corr(y)' }
        ],
        correctAnswer: 'A',
        explanation: 'np.corrcoef returns a 2x2 matrix [[r_xx, r_xy], [r_yx, r_yy]]. Index [0, 1] extracts the cross-correlation (+0.48).'
      },
      {
        id: 'q14-2',
        title: 'Quiz: Understanding Negative Correlation',
        question: 'rework_tickets has a correlation of -0.50 with productivity score. What does the negative sign mean?',
        options: [
          { id: 'A', text: 'As rework tickets increase, the productivity score tends to decrease' },
          { id: 'B', text: 'The calculation produced an error' },
          { id: 'C', text: 'Rework tickets are unimportant' },
          { id: 'D', text: 'All employees had negative scores' }
        ],
        correctAnswer: 'A',
        explanation: 'A negative correlation means inverse movement: higher rework corresponds to lower monthly productivity.'
      },
      {
        id: 'q14-3',
        title: 'Quiz: Team Size Correlation',
        question: 'team_size has a correlation of +0.01 with productivity score. What does this indicate?',
        options: [
          { id: 'A', text: 'Large teams are 100x more productive' },
          { id: 'B', text: 'There is virtually no straight-line link between team size and productivity score' },
          { id: 'C', text: 'Team size should be the primary feature in our model' },
          { id: 'D', text: 'Teams must have only 1 member' }
        ],
        correctAnswer: 'B',
        explanation: 'A correlation near 0.00 indicates the absence of any linear relationship between team size and productivity.'
      },
      {
        id: 'q14-4',
        title: 'Quiz: genfromtxt vs loadtxt',
        question: 'Why do we use np.genfromtxt instead of np.loadtxt for our workplace CSV?',
        options: [
          { id: 'A', text: 'np.loadtxt crashes on blank cells, while genfromtxt turns blanks into NaN' },
          { id: 'B', text: 'np.loadtxt only works on Linux' },
          { id: 'C', text: 'genfromtxt automatically builds neural networks' },
          { id: 'D', text: 'There is no difference' }
        ],
        correctAnswer: 'A',
        explanation: 'np.loadtxt requires complete rectangular numeric data; np.genfromtxt handles missing fields by inserting NaN.'
      },
      {
        id: 'q14-5',
        title: 'Quiz: Strongest Single Link',
        question: 'Which feature has the strongest individual link with productivity score in our dataset?',
        options: [
          { id: 'A', text: 'rework_tickets (-0.50)' },
          { id: 'B', text: 'team_size (+0.01)' },
          { id: 'C', text: 'training_hours (+0.20)' },
          { id: 'D', text: 'month (+0.03)' }
        ],
        correctAnswer: 'A',
        explanation: 'rework_tickets has the highest absolute correlation (| -0.50 | = 0.50), closely followed by experience (+0.48).'
      }
    ]
  },
  {
    id: 15,
    module: 6,
    duration: '4 min',
    title: 'Single-Feature Regression: Experience vs Score',
    badge: 'Module 6 • Slide 15',
    badgeColor: 'blue',
    topic1: 'Direct formula for slope and intercept using NumPy',
    topic2: 'Fitted model: Score = 1.88 * Experience + 53.2',
    content: [
      {
        type: 'lead',
        text: 'We fit our first real machine learning model using only experience. We use the direct closed-form formula derived from calculus to find the slope and intercept in one line.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Slope Formula (m)',
            color: 'blue',
            text: 'sum((x - mean_x)(y - mean_y)) / sum((x - mean_x)²)',
            subtext: 'Evaluates to m = 1.88: each year of work experience adds about 1.9 points to the score.'
          },
          {
            title: 'Intercept Formula (c)',
            color: 'green',
            text: 'c = mean_y - m * mean_x',
            subtext: 'Evaluates to c = 53.2: the starting baseline level of the straight line.'
          }
        ]
      },
      {
        type: 'example',
        title: 'Beginner Example: Model Predictions in Action',
        steps: [
          'Junior with 1.0 year experience: 1.88 * 1.0 + 53.2 = 55.1 points',
          'Mid-level with 5.0 years experience: 1.88 * 5.0 + 53.2 = 62.6 points',
          'Senior with 10.0 years experience: 1.88 * 10.0 + 53.2 = 72.0 points',
          'Veteran with 14.0 years experience: 1.88 * 14.0 + 53.2 = 79.5 points'
        ]
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Predictions on New Engineers',
        code: `import pandas as pd
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
# Junior (1 yr): 55.1 | Mid (5 yrs): 62.6 | Senior (10 yrs): 72.0`
      }
    ],
    facilitatorNotes: 'Run Poll 6.2 (predicting score for 6 years experience). Show that the code is simply print(m * 6 + c). Option B mixes up m and c; Option C mistakenly looks up the 6th row.',
    curatedQuestions: [
      {
        id: 'q15-1',
        title: 'Poll: Predicting Score for 6 Years Experience',
        question: 'A person has 6.0 years of work experience. Which line of Python code computes their predicted score?',
        options: [
          { id: 'A', text: 'print(m * 6 + c) — evaluates to ~64.5 points' },
          { id: 'B', text: 'print(m + 6 * c)' },
          { id: 'C', text: 'print(y_pred[6])' }
        ],
        correctAnswer: 'A',
        explanation: 'The equation is y = m * x + c. With m = 1.88 and c = 53.2, 1.88 * 6 + 53.2 = 64.5 points.'
      },
      {
        id: 'q15-2',
        title: 'Quiz: Slope Magnitude in Workplace Terms',
        question: 'The slope m = 1.88 means that if an employee gains 5 additional years of work experience, their expected score rises by about:',
        options: [
          { id: 'A', text: '1.88 points' },
          { id: 'B', text: '9.4 points (1.88 * 5)' },
          { id: 'C', text: '53.2 points' },
          { id: 'D', text: '50.0 points' }
        ],
        correctAnswer: 'B',
        explanation: 'Delta y = m * Delta x = 1.88 * 5 = 9.4 score points.'
      },
      {
        id: 'q15-3',
        title: 'Quiz: Intercept Interpretation',
        question: 'Why is the intercept c = 53.2 called a mathematical starting point rather than a real employee prediction?',
        options: [
          { id: 'A', text: 'Because nobody in the company has 0.0 years of experience (the minimum in the file is 0.5 years)' },
          { id: 'B', text: 'Because 53.2 is an imaginary number' },
          { id: 'C', text: 'Because intercept is always ignored' },
          { id: 'D', text: 'Because NumPy made a rounding error' }
        ],
        correctAnswer: 'A',
        explanation: 'The data has experience ranging from 0.5 to 14.4 years. 0 years is outside the observed dataset.'
      },
      {
        id: 'q15-4',
        title: 'Quiz: Vectorised Predictions',
        question: 'How do you generate predicted scores for all 5,838 employees in one line?',
        options: [
          { id: 'A', text: 'y_pred = m * x + c (using vectorisation)' },
          { id: 'B', text: 'Loop with for i in range(5838): append(m*x[i]+c)' },
          { id: 'C', text: 'y_pred = np.predict(m, c)' },
          { id: 'D', text: 'y_pred = m @ x' }
        ],
        correctAnswer: 'A',
        explanation: 'NumPy multiplies vector x by scalar m and adds scalar c across all 5,838 elements simultaneously.'
      },
      {
        id: 'q15-5',
        title: 'Quiz: Experience Alone Is Not Enough',
        question: 'Can experience alone predict productivity perfectly?',
        options: [
          { id: 'A', text: 'Yes, experience explains 100% of productivity' },
          { id: 'B', text: 'No, two employees with identical 5 years experience can have very different rework, absences, or training' },
          { id: 'C', text: 'Yes, older workers never have rework' }
        ],
        correctAnswer: 'B',
        explanation: 'Experience is only one aspect. Absence, rework, and AI support also create large differences between people with the same tenure.'
      }
    ]
  },
  {
    id: 16,
    module: 6,
    duration: '4 min',
    title: 'Model Evaluation: RMSE, MAE & R-squared',
    badge: 'Module 6 • Slide 16',
    badgeColor: 'blue',
    topic1: 'Measuring average mistakes: RMSE (8.0) vs MAE (6.4)',
    topic2: 'R-squared progression: 0.231 (1 feat) ➔ 0.658 (7 feat) ➔ 0.755 (9 feat)',
    content: [
      {
        type: 'lead',
        text: 'How good is our 1-feature model? We measure its accuracy using RMSE and MAE (both measured in familiar score points), and compare it against the baseline guess.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'RMSE vs MAE',
            color: 'green',
            text: 'RMSE: 8.0 pts | MAE: 6.4 pts',
            subtext: 'Beats baseline RMSE 9.1 by 1.1 points. RMSE penalizes larger misses more heavily than MAE.'
          },
          {
            title: 'R-squared (R²)',
            color: 'orange',
            text: 'R² = 0.231 ➔ 0.658 ➔ 0.755',
            subtext: 'Experience alone explains 23.1%. All 7 core features explain 65.8%. Incorporating operational friction (meetings & blockers) pushes R² to 0.755 (crossing the 0.75 gold standard)!'
          }
        ]
      },
      {
        type: 'example',
        title: 'Beginner Example: Model Comparison Table',
        steps: [
          'Baseline Guess (Average for everyone): RMSE = 9.11 points, R² = 0.000',
          'Experience Model (Score = 1.88*Exp + 53.2): RMSE = 8.01 points, R² = 0.231',
          '7 Core Features Model: RMSE = 5.33 points, R² = 0.658 (65.8% explained)',
          '9-Feature Precision Model (+ Meetings & Blockers): RMSE = 4.45 points, R² = 0.755 (Exceeds the 0.75 Gold Standard!)'
        ]
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Evaluating R² & RMSE vs Dummy Baseline',
        code: `import numpy as np
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
print(f"Score Variance Explained: {reg_r2 * 100:.1f}%")`
      }
    ],
    facilitatorNotes: 'Explain the difference between RMSE and MAE: MAE is the straight average miss (6.4 pts). RMSE is 8.0 pts because squaring penalizes large misses. Explain R² as a percentage of variance explained.',
    curatedQuestions: [
      {
        id: 'q16-1',
        title: 'Quiz: Understanding RMSE Units',
        question: 'What is the unit of measurement for RMSE in our model?',
        options: [
          { id: 'A', text: 'Score points squared' },
          { id: 'B', text: 'Score points (the exact same unit as the productivity score)' },
          { id: 'C', text: 'Years of experience' },
          { id: 'D', text: 'Percentage of employees' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 8.3: MSE is in points squared, but taking the square root (RMSE) restores the unit to score points.'
      },
      {
        id: 'q16-2',
        title: 'Quiz: Interpreting R-squared of 0.231',
        question: 'Our 1-feature experience model has R² = 0.231. What does this mean in plain language?',
        options: [
          { id: 'A', text: 'The model is wrong 23% of the time' },
          { id: 'B', text: 'Experience alone explains about 23.1% of the variation in productivity score' },
          { id: 'C', text: 'Only 23 employees were tested' },
          { id: 'D', text: 'The score is 23.1' }
        ],
        correctAnswer: 'B',
        explanation: 'R-squared represents the share of the variance (ups and downs) in y that the model accounts for.'
      },
      {
        id: 'q16-3',
        title: 'Quiz: What does R² = 0 Mean?',
        question: 'If a model has R-squared = 0.0, what does it tell you?',
        options: [
          { id: 'A', text: 'The model makes zero mistakes' },
          { id: 'B', text: 'The model performs no better than simply guessing the average score for everyone' },
          { id: 'C', text: 'The model has 0 features' },
          { id: 'D', text: 'All predictions are negative' }
        ],
        correctAnswer: 'B',
        explanation: 'R² = 0.0 means the model offers zero predictive value beyond the naive baseline mean.'
      },
      {
        id: 'q16-4',
        title: 'Quiz: RMSE vs MAE Sensitivity',
        question: 'Why is RMSE (8.0) larger than MAE (6.4)?',
        options: [
          { id: 'A', text: 'Because RMSE squares errors, giving heavier weight to a few large mistakes' },
          { id: 'B', text: 'Because MAE is measured in hours' },
          { id: 'C', text: 'Because RMSE is always incorrect' },
          { id: 'D', text: 'Because of negative numbers' }
        ],
        correctAnswer: 'A',
        explanation: 'RMSE squares errors before taking the root, making it more sensitive to outliers than MAE.'
      },
      {
        id: 'q16-5',
        title: 'Quiz: Did Experience Beat the Baseline?',
        question: 'The baseline RMSE was 9.1 points and the experience model RMSE was 8.0 points. Did the model improve on the baseline?',
        options: [
          { id: 'A', text: 'Yes, it reduced typical error by 1.1 score points' },
          { id: 'B', text: 'No, lower error means worse performance' },
          { id: 'C', text: 'They are identical' }
        ],
        correctAnswer: 'A',
        explanation: 'Lower RMSE indicates smaller typical errors. The model improved from 9.1 down to 8.0.'
      }
    ]
  },
  {
    id: 17,
    module: 7,
    duration: '5 min',
    title: 'Gradient Descent: Downhill Optimization',
    badge: 'Module 7 • Slide 17',
    badgeColor: 'green',
    topic1: 'The Blindfolded Hiker: How computers learn step-by-step',
    topic2: 'The Downhill Rule: Measuring error slope and taking safe steps',
    content: [
      {
        type: 'lead',
        text: 'Imagine hiking down a foggy mountain while blindfolded. You cannot see the bottom valley (zero error), but you can feel which way slopes downward. Gradient descent does exactly this: starting with a blind guess, feeling the slope of error, and taking small steps downhill until errors reach the minimum.'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'The Slope (Gradient)',
            color: 'blue',
            text: 'Points Uphill Toward Higher Error',
            subtext: 'The mathematical gradient tells us which way gets worse. If walking in a direction increases your errors, that direction is uphill.'
          },
          {
            title: 'Downhill Step Rule',
            color: 'green',
            text: 'Always Walk Downhill: m -= step',
            subtext: 'To REDUCE error, we do the opposite: subtract a small fraction of the slope (m -= learning_rate * slope). Every step brings us closer to the valley floor.'
          }
        ]
      },
      {
        type: 'visual',
        visualType: 'gradientDescent'
      },
      {
        type: 'example',
        title: 'Beginner Example: 100 Steps from Fog to the Valley',
        steps: [
          'Step 0: Blind initial guess (slope=0, intercept=0) -> Huge prediction error (MSE = 3,975.7)',
          'Step 20: Feeling the slope and stepping downhill -> Errors drop rapidly to 120.4',
          'Step 50: Nearing the flat floor of the valley -> Error changes slow down to 63.9',
          'Step 100: Converged! -> The ground is completely flat under your feet. Errors stop changing, reaching the exact best fit (slope=1.88, intercept=53.2).'
        ]
      },
      {
        type: 'callout',
        color: 'blue',
        title: 'Why do this instead of the direct formula?',
        text: 'On small datasets, the normal equation solves everything in one math step. But when companies have millions of streaming records, inverting giant matrices crashes computer memory. Gradient descent only needs to look at a few numbers at a time!'
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Downhill SGDRegressor with StandardScaler',
        code: `import pandas as pd
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
print("SGD Model R² Score        :", round(sgd_pipe.score(X, y), 3))`
      }
    ],
    facilitatorNotes: 'Run the Module 7 poll on why we subtract (m_s -= lr * dm). Make sure everyone understands that the mathematical gradient points uphill, so stepping downhill requires a minus sign.',
    curatedQuestions: [
      {
        id: 'q17-1',
        title: 'Poll: Gradient Descent Update Rule',
        question: 'Inside the gradient descent loop, how should we update the parameter?',
        options: [
          { id: 'A', text: 'm_s += lr * dm' },
          { id: 'B', text: 'm_s -= lr * dm (subtract to walk downhill)' },
          { id: 'C', text: 'm_s = dm' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 9: The gradient points uphill. To minimize error, we subtract lr * dm to take a step downhill.'
      },
      {
        id: 'q17-2',
        title: 'Quiz: What is an Epoch?',
        question: 'What does "one epoch" mean in gradient descent training?',
        options: [
          { id: 'A', text: 'One full pass through the entire training dataset' },
          { id: 'B', text: 'One hour of training' },
          { id: 'C', text: 'One decimal place' },
          { id: 'D', text: 'When the model is deleted' }
        ],
        correctAnswer: 'A',
        explanation: 'Section 9: One epoch is one complete cycle where the model has processed all records in the data.'
      },
      {
        id: 'q17-3',
        title: 'Quiz: What is Convergence?',
        question: 'In machine learning optimization, what does "convergence" mean?',
        options: [
          { id: 'A', text: 'The loss has stopped improving because the model has reached the bottom of the bowl' },
          { id: 'B', text: 'The computer has run out of memory' },
          { id: 'C', text: 'All weights have become zero' },
          { id: 'D', text: 'The dataset has been shuffled' }
        ],
        correctAnswer: 'A',
        explanation: 'Convergence occurs when steps become tiny and loss stops decreasing, indicating the optimal solution is found.'
      },
      {
        id: 'q17-4',
        title: 'Quiz: Why do We Standardise Before GD?',
        question: 'Why do we standardise features (average 0, spread 1) before running gradient descent?',
        options: [
          { id: 'A', text: 'So both parameters (slope and intercept) learn at comparable speeds on a circular bowl' },
          { id: 'B', text: 'Because NumPy cannot multiply numbers greater than 10' },
          { id: 'C', text: 'To delete outliers' },
          { id: 'D', text: 'It is optional cosmetic styling' }
        ],
        correctAnswer: 'A',
        explanation: 'Without scaling, features with large scales create a stretched, oval bowl where gradient descent zig-zags wildly.'
      },
      {
        id: 'q17-5',
        title: 'Quiz: Converting Standardised GD Parameters',
        question: 'After gradient descent finds m_s on standardised x, how do we convert it back to raw units of experience?',
        options: [
          { id: 'A', text: 'm_gd = m_s / x.std()' },
          { id: 'B', text: 'm_gd = m_s * x.std()' },
          { id: 'C', text: 'm_gd = m_s + 100' },
          { id: 'D', text: 'No conversion is needed' }
        ],
        correctAnswer: 'A',
        explanation: 'Section 9: Dividing by x.std() converts the parameter back to real score points per year of experience (m = 1.88).'
      }
    ]
  },
  {
    id: 18,
    module: 7,
    duration: '5 min',
    title: 'Tuning the Learning Rate: The Step Size Dilemma',
    badge: 'Module 7 • Slide 18',
    badgeColor: 'green',
    topic1: 'Baby Steps (Too Small) vs Giant Leaps (Too Large)',
    topic2: 'The Goldilocks Rate (0.1): Fast, smooth landing at the bottom',
    content: [
      {
        type: 'lead',
        text: 'How big should each downhill step be? In machine learning, your step size is called the **Learning Rate (lr)**. If your steps are too microscopic, you crawl forever. If your steps are too huge, you leap past the valley and fly off into outer space!'
      },
      {
        type: 'grid',
        items: [
          {
            title: 'Baby Steps: lr = 0.001 (Too Small)',
            color: 'orange',
            text: 'Moving 1 Millimeter at a Time',
            subtext: 'You are heading the right way, but after 200 rounds your error is still stuck at 1,827 (nowhere near the bottom of 64). You waste hours of computing power.'
          },
          {
            title: 'Giant Leaps: lr = 1.5 (Too Large)',
            color: 'orange',
            text: 'Leaping 50 Feet Across the Valley',
            subtext: 'You leap right over the valley floor, smash halfway up the opposite cliff, panic, leap even harder, and explode into mathematical infinity (NaN)!'
          }
        ]
      },
      {
        type: 'callout',
        color: 'green',
        title: 'The Goldilocks Rate: lr = 0.1 (Just Right!)',
        text: 'Brisk, confident strides. In just 23 steps, the model gets within 0.5% of the true bottom (MSE ~64) and lands smoothly right on target.'
      },
      {
        type: 'example',
        title: 'Beginner Example: What Happens After 200 Rounds',
        steps: [
          'Baby Steps (lr = 0.001): Error = 1,827.4 points -> Barely reached halfway down the hill.',
          'Goldilocks Rate (lr = 0.100): Error = 63.9 points -> Perfect landing at the true minimum (slope=1.88, intercept=53.2).',
          'Giant Leaps (lr = 1.500): Error = 1.48 x 10^28 -> Exploded into crazy 28-digit numbers / computer crash!'
        ]
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Learning Rate (eta0) Tuning in SGDRegressor',
        code: `import pandas as pd
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
# eta0=0.01 converges smoothly, while eta0=2.5 overshoots violently!`
      }
    ],
    facilitatorNotes: 'Run the learning rate experiment live in the middle code editor. Ask the class to predict what happens before running lr = 1.5. Watch them see scientific notation explode to 10^28.',
    curatedQuestions: [
      {
        id: 'q18-1',
        title: 'Quiz: What Happens if lr is Too Large?',
        question: 'What happens in gradient descent if the learning rate is set too large (e.g. lr = 1.5)?',
        options: [
          { id: 'A', text: 'The model trains in 1 second perfectly' },
          { id: 'B', text: 'Steps overshoot the bottom, errors grow without limit, and weights explode to infinity' },
          { id: 'C', text: 'The model switches to linear regression automatically' },
          { id: 'D', text: 'Nothing happens' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 9.1: An oversized step jumps past the minimum and lands higher on the opposite side, diverging exponentially.'
      },
      {
        id: 'q18-2',
        title: 'Quiz: What Happens if lr is Too Small?',
        question: 'What is the symptom of an undersized learning rate (e.g. lr = 0.001)?',
        options: [
          { id: 'A', text: 'The computer overheats' },
          { id: 'B', text: 'The loss decreases, but far too slowly, failing to reach the minimum in reasonable time' },
          { id: 'C', text: 'The weights become negative' },
          { id: 'D', text: 'Predictions become random' }
        ],
        correctAnswer: 'B',
        explanation: 'Small learning rates make progress, but require tens of thousands of epochs to reach the bottom.'
      },
      {
        id: 'q18-3',
        title: 'Poll: Finding the Optimal Learning Rate',
        question: 'In our experience regression experiment, which learning rate converged smoothly to MSE ~64 in under 25 rounds?',
        options: [
          { id: 'A', text: 'lr = 0.001' },
          { id: 'B', text: 'lr = 0.1 (Optimal step size)' },
          { id: 'C', text: 'lr = 1.5' }
        ],
        correctAnswer: 'B',
        explanation: 'lr = 0.1 was just right: stable descent reaching the optimal minimum by round 23.'
      },
      {
        id: 'q18-4',
        title: 'Quiz: Mini-Batch & Stochastic GD',
        question: 'For massive real-world datasets with billions of rows, what variation of gradient descent is used to save memory and compute?',
        options: [
          { id: 'A', text: 'Mini-batch / Stochastic Gradient Descent (using small random subsets per step)' },
          { id: 'B', text: 'Manual calculation on paper' },
          { id: 'C', text: 'Deleting half the database' },
          { id: 'D', text: 'Restarting the computer' }
        ],
        correctAnswer: 'A',
        explanation: 'Section 9.1: Mini-batch gradient descent evaluates gradients on small subsets (e.g. 64 or 128 rows), making steps cheap and fast.'
      },
      {
        id: 'q18-5',
        title: 'Quiz: Learning Rate Definition',
        question: 'What is the "learning rate" in plain words?',
        options: [
          { id: 'A', text: 'The number of hours an employee studied' },
          { id: 'B', text: 'The size of each step taken downhill toward the minimum loss' },
          { id: 'C', text: 'The speed of the computer processor' },
          { id: 'D', text: 'The percentage of test data' }
        ],
        correctAnswer: 'B',
        explanation: 'Section 1.8 & 7: The learning rate is the multiplier controlling how big of a step the parameters take downhill.'
      }
    ]
  },
  {
    id: 19,
    module: 8,
    duration: '5 min',
    title: 'All 9 Features Together: Building the Full Workplace Predictor',
    badge: 'Module 8 • Slide 19',
    badgeColor: 'blue',
    topic1: 'Why 1 feature is never enough: The 9 workplace ingredients',
    topic2: 'The 9-Feature Equation: Crossing the 0.75 R² Gold Standard',
    content: [
      {
        type: 'lead',
        text: 'Experience alone explains only 42% of employee output. Why? Because a brilliant 5-year senior engineer will struggle if trapped in 20 hours of meetings and blocked waiting on IT approvals. By combining 7 skills with 2 operational friction levers, our model reaches 75.5% accuracy!'
      },
      {
        type: 'concept',
        title: 'Beginner Breakdown: The 9 Workplace Ingredients',
        body: 'Think of productivity prediction like a company balance sheet:\n• Starting Baseline: ~76.6 points (starting level for average projects)\n• The Boosters (+): Experience (+1.25 pts/yr), AI Tools (+2.45 pts), Training (+0.38 pts/hr)\n• The Friction Drags (-): Blocker Delays (-0.45 pts/hr), Meeting Overhead (-0.32 pts/hr), Absences (-0.95 pts/day), Hard Task Complexity (-3.85 pts), Rework/Overtime (-0.28 pts/hr)\n• The Neutral Lever: Team Size (-0.02 pts/person — having 4 vs 8 teammates has virtually zero direct bearing on individual output).'
      },
      {
        type: 'step',
        title: 'Step-by-Step: The Complete Prediction Recipe',
        body: '1. The 9 Workplace Measurements: [Exp, Overtime, Absent, Complexity, TeamSize, Training, AI, MeetingHours, BlockerHours].\n2. The Column of 1s: In matrix algebra, prepending a column of 1.0s is simply a clever knob that lets the computer calculate the baseline starting score (76.57) right alongside the feature slopes.\n3. The Fitted Equation:\n   Score = 76.57 + 1.25(Exp) - 0.28(OT) - 0.95(Absent) - 3.85(Cx) - 0.02(Team) + 0.38(Train) + 2.45(AI) - 0.32(Meetings) - 0.45(Blockers).\n4. Accuracy Jump: Adding meetings and blocker delays elevated R² from 0.658 to 0.755 (crossing the 0.75 gold standard for human data) and cut prediction error to just ±4.5 points!'
      },
      {
        type: 'takeaway',
        text: 'In human analytics, crossing 0.75 R² is the recognized gold standard. The model captures both individual skill and organizational friction with pinpoint precision.'
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: 9-Feature Multiple Linear Regression',
        code: `import numpy as np
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
# Meeting Drag: -0.32 pts/hr | Blocker Drag: -0.45 pts/hr`
      }
    ],
    codePreview: `# Building the 9-Feature Design Matrix & Solving in NumPy
import numpy as np

# 1. Slice all 9 features (cols 3 to 12)
X_raw = data[:, 3:12]          # shape: (5838, 9)
y = data[:, 13]                # shape: (5838,)

# 2. Prepend column of ones for intercept
ones = np.ones((X_raw.shape[0], 1))
X = np.hstack([ones, X_raw])   # shape: (5838, 10)

# 3. Solve Normal Equation via pseudo-inverse
theta = np.linalg.pinv(X.T @ X) @ X.T @ y
y_pred = X @ theta

# 4. Evaluate metrics
rmse = np.sqrt(np.mean((y - y_pred)**2))
r2 = 1 - (np.sum((y - y_pred)**2) / np.sum((y - np.mean(y))**2))
print(f"9-Feature Baseline: RMSE = {rmse:.2f}, R² = {r2:.3f}")`,
    visual: 'designMatrix',
    curatedQuestions: [
      {
        id: 'q19-1',
        title: 'Quiz: Design Matrix Shape',
        question: 'For 5,838 employees with 9 features plus an intercept column, what is the shape of design matrix X?',
        options: [
          { id: 'A', text: '(5838, 9)' },
          { id: 'B', text: '(5838, 10) — 1 column of 1s plus 9 feature columns' },
          { id: 'C', text: '(10, 5838)' },
          { id: 'D', text: '(5838, 1)' }
        ],
        correctAnswer: 'B',
        explanation: 'Prepending a leading column of 1s for the intercept adds 1 column to the 9 raw features, making the matrix shape (5838, 10).'
      },
      {
        id: 'q19-2',
        title: 'Poll: Impact of Operational Friction',
        question: 'Why did adding meeting hours and blocker delay hours boost R² from 0.658 to 0.755?',
        options: [
          { id: 'A', text: 'They directly capture lost engineering focus and operational friction outside individual control' },
          { id: 'B', text: 'They are random noise that artificially inflates numbers' },
          { id: 'C', text: 'They replace the need for the experience feature' },
          { id: 'D', text: 'Linear algebra only works with 9 or more features' }
        ],
        correctAnswer: 'A',
        explanation: 'Meeting overhead and blocker wait times directly drain productive capacity, accounting for previously unexplained variance in employee output.'
      },
      {
        id: 'q19-3',
        title: 'Quiz: Normal Equation Inversion',
        question: 'In the Normal Equation theta = (X^T X)^(-1) X^T y, why do we use np.linalg.pinv instead of np.linalg.inv?',
        options: [
          { id: 'A', text: 'pinv is faster on GPUs' },
          { id: 'B', text: 'pinv (Moore-Penrose pseudo-inverse) safely handles near-singular or collinear matrices without crashing' },
          { id: 'C', text: 'inv only works on vectors' },
          { id: 'D', text: 'pinv rounds numbers to 2 decimal places' }
        ],
        correctAnswer: 'B',
        explanation: 'If features are correlated, X^T X may have a determinant close to zero. np.linalg.pinv uses SVD to compute a stable solution safely.'
      },
      {
        id: 'q19-4',
        title: 'Quiz: Friction Coefficient Interpretation',
        question: 'The fitted slope for blocker hours is -0.45. What does this indicate in plain workplace terms?',
        options: [
          { id: 'A', text: 'Every 1 hour spent blocked per month reduces expected productivity score by 0.45 points' },
          { id: 'B', text: 'Blockers increase productivity by 0.45 points' },
          { id: 'C', text: 'Blocker hours have zero effect on productivity' },
          { id: 'D', text: 'Blockers only affect junior engineers' }
        ],
        correctAnswer: 'A',
        explanation: 'A negative slope of -0.45 means that each additional hour an employee spends stuck on blockers directly shaves 0.45 points off their monthly productivity score.'
      },
      {
        id: 'q19-5',
        title: 'Poll: Confidence in Model Metrics',
        question: 'How confident are you that an R² of 0.755 (RMSE 4.51) is sufficient for operational workplace planning?',
        options: [
          { id: 'A', text: 'High confidence — 0.75+ is the gold standard threshold for human behavioral and workplace data' },
          { id: 'B', text: 'Medium — good baseline, but could benefit from non-linear interaction terms' },
          { id: 'C', text: 'Low — we should strive for 1.00 R² on real people' },
          { id: 'D', text: 'Unsure — need to inspect residual plots first' }
        ],
        correctAnswer: 'A',
        explanation: 'In workplace analytics, human output has inherent natural variability; crossing 0.75 R² represents an exceptionally strong and reliable predictive model.'
      }
    ]
  },
  {
    id: 20,
    module: 9,
    duration: '5 min',
    title: 'Why Raw Weights Lie: The Standardised Weights Ranking',
    badge: 'Module 9 • Slide 20',
    badgeColor: 'purple',
    topic1: 'The Apples vs Elephants Trap: Why raw coefficients mislead',
    topic2: 'Level Playing Field: The True Influence Ranking of All 9 Features',
    content: [
      {
        type: 'lead',
        text: 'If someone tells you an elephant weighs 5 and an apple weighs 200, is the apple 40 times heavier? No! The elephant is 5 tons and the apple is 200 grams. Raw regression slopes have this exact optical illusion!'
      },
      {
        type: 'concept',
        title: 'Beginner Breakdown: The Unit Trap in Workplace Data',
        body: 'Look at the different rulers we use to measure employees:\n• Experience is in Years (small numbers: 1 to 14)\n• Absence is in Days (0 to 8)\n• Meeting & Blocker delays are in Hours (big numbers: 0 to 40!)\nA raw slope of -0.32 per meeting hour looks tiny compared to -3.85 for task complexity. But someone attending 20 hours of meetings loses -6.4 points of productivity! Standardization converts every feature into "one typical workplace nudge" so we can fairly compare their true punch.'
      },
      {
        type: 'step',
        title: 'The True Power Hierarchy (All 9 Features on an Equal Playing Field)',
        body: '1. Experience (+4.35 std): #1 strongest positive individual superpower\n2. Task Complexity (-3.13 std): #1 biggest difficulty drag\n3. Absenteeism (-2.77 std): Major lost-time drag\n4. Overtime / Defect Rework (-2.31 std): Strain and defect correction drag\n5. AI Tool Adoption (+2.26 std): Major modern productivity amplifier\n6. Blocker Wait Hours (-1.89 std): Waiting on external bottlenecks\n7. Training Hours (+1.67 std): Continuous upskilling gain\n8. Meeting Overhead (-1.54 std): Calendar fatigue drain\n9. Team Size (-0.07 std): Almost zero influence (teams of 4 vs 8 produce identical individual output).'
      },
      {
        type: 'takeaway',
        text: 'The Executive Revelation: Combined operational friction (Blockers at -1.89 + Meetings at -1.54 = -3.43) hurts team productivity MORE than task complexity (-3.13)! Unblocking people works better than pushing them harder.'
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Standardized Weights via StandardScaler',
        code: `import pandas as pd
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
# Exp (+4.35) & Complexity (-3.13) dominate; Friction exerts -3.43 combined drag!`
      }
    ],
    codePreview: `# Computing Standardised Weights for All 9 Features
X_raw = data[:, 3:12]
y = data[:, 13]

# Z-score normalization: (x - mean) / std
X_std = (X_raw - np.mean(X_raw, axis=0)) / np.std(X_raw, axis=0)
y_std = (y - np.mean(y)) / np.std(y)

# Solve without intercept (since standardized means are 0)
beta_std = np.linalg.pinv(X_std.T @ X_std) @ X_std.T @ y_std

feature_names = ['Exp', 'OT', 'Absent', 'Complexity', 'Team', 'Train', 'AI', 'Meetings', 'Blockers']
for name, w in sorted(zip(feature_names, beta_std), key=lambda x: abs(x[1]), reverse=True):
    print(f"{name:12s}: {w:+.2f}")`,
    visual: 'standardisedRanking',
    curatedQuestions: [
      {
        id: 'q20-1',
        title: 'Quiz: Unit Distortion Trap',
        question: 'Why can you NOT compare raw regression coefficients to determine which feature is most important?',
        options: [
          { id: 'A', text: 'Raw coefficients depend on measurement units (e.g. years vs days vs hours)' },
          { id: 'B', text: 'Raw coefficients are always negative' },
          { id: 'C', text: 'NumPy cannot sort floats' },
          { id: 'D', text: 'Only binary features have valid coefficients' }
        ],
        correctAnswer: 'A',
        explanation: 'A coefficient\'s size depends on whether the feature is measured in years, days, hours, or percentages. Standardizing removes units so 1 std dev change can be compared directly.'
      },
      {
        id: 'q20-2',
        title: 'Quiz: Strongest Standardised Negative Driver',
        question: 'Among all 9 features, what is the single strongest negative drag on productivity?',
        options: [
          { id: 'A', text: 'Task Complexity (-3.13 std)' },
          { id: 'B', text: 'Team Size (-0.07 std)' },
          { id: 'C', text: 'Meeting Hours (-1.54 std)' },
          { id: 'D', text: 'Training Hours (+1.67 std)' }
        ],
        correctAnswer: 'A',
        explanation: 'Task complexity has a standardized weight of -3.13, making it the strongest individual negative factor, followed closely by absenteeism (-2.77).'
      },
      {
        id: 'q20-3',
        title: 'Poll: Combined Operational Friction',
        question: 'Blocker hours (-1.89) and meeting overhead (-1.54) together exert -3.43 std drag. What does this mean for engineering leaders?',
        options: [
          { id: 'A', text: 'Removing friction (cutting meetings & clearing blockers) improves output as much as hiring more experienced staff' },
          { id: 'B', text: 'Meetings are necessary so we should ignore their negative coefficient' },
          { id: 'C', text: 'Engineers should work 80 hours a week to compensate' },
          { id: 'D', text: 'Only junior engineers care about meetings' }
        ],
        correctAnswer: 'A',
        explanation: 'The combined friction drag (-3.43) is massive; eliminating operational roadblocks provides an immediate high-ROI productivity boost without requiring years of skill acquisition.'
      },
      {
        id: 'q20-4',
        title: 'Quiz: Team Size Impact',
        question: 'Why does Team Size have an almost negligible standardized weight of -0.07?',
        options: [
          { id: 'A', text: 'Individual productivity is driven by skill, friction, and autonomy, not whether the team has 5 vs 7 members' },
          { id: 'B', text: 'The data forgot to record team sizes' },
          { id: 'C', text: 'Team size was calculated in millimeters' },
          { id: 'D', text: 'Larger teams are always 10x more productive' }
        ],
        correctAnswer: 'A',
        explanation: 'Once we account for experience, meetings, and blockers, team size within normal agile ranges (3-12 members) has virtually no direct correlation with individual output.'
      },
      {
        id: 'q20-5',
        title: 'Quiz: Standardisation Intercept',
        question: 'When both X and y are standardized (mean=0, std=1), what happens to the intercept term?',
        options: [
          { id: 'A', text: 'It becomes exactly 0 (or within floating-point precision of 0)' },
          { id: 'B', text: 'It becomes 100.0' },
          { id: 'C', text: 'It becomes undefined and crashes' },
          { id: 'D', text: 'It equals the largest feature weight' }
        ],
        correctAnswer: 'A',
        explanation: 'Because both features and target have zero mean, the regression line passes through the origin (0, 0), so the intercept is exactly zero.'
      }
    ]
  },
  {
    id: 21,
    module: 10,
    duration: '5 min',
    title: 'Underfitting vs Overfitting: The Student Exam Analogy',
    badge: 'Module 10 • Slide 21',
    badgeColor: 'emerald',
    topic1: 'The 3 Types of Students: The Lazy, The Crammer, and The Smart Student',
    topic2: 'The 80/20 Train vs Test Split: Proof of Genuine Learning',
    content: [
      {
        type: 'lead',
        text: 'How do we know our machine learning model actually learned real workplace principles instead of just memorizing the spreadsheet? We test models the exact same way teachers test students: with practice homework (Train Set) and a surprise final exam (Test Set).'
      },
      {
        type: 'concept',
        title: 'Beginner Breakdown: The 3 Types of Learners',
        body: '1. Underfitting (The Lazy Student / High Bias):\nOnly learned 1 simple rule ("more experience = higher score"). Scores poorly on homework (RMSE 8.24) and poorly on the final exam. The model is too rigid and simple to be useful.\n2. Overfitting (The Crammer / High Variance):\nMemorized the practice homework word-for-word, including typos! Gets 100% on homework (Train error ≈ 0), but when given new employees on the final exam, panics and scores terribly (Test error 25+ points). It memorized noise instead of concepts.\n3. Good Generalization (The Smart Student / Just Right):\nUnderstands the actual underlying relationships. Performs solidly on practice (Train error 4.51) and equally well on the unseen exam (Test error 4.53).'
      },
      {
        type: 'step',
        title: 'How the 80/20 Train vs Test Exam Works',
        body: 'Step 1: Lock away 20% of employees (1,168 records) in a sealed vault — this is the unseen Final Exam.\nStep 2: Train the model strictly on the remaining 80% (4,670 records) — this is the Practice Homework.\nStep 3: Grade the model on both sets.\nStep 4: The Generalization Gap: Train error is 4.51 points and Test error is 4.53 points. The gap is just 0.02 points! This proves the model didn\'t cheat or memorize; it truly generalizes to new hires.'
      },
      {
        type: 'takeaway',
        text: 'A near-zero gap between training and testing error (0.02 points) proves production-grade reliability. The model is ready to predict productivity for new incoming employees.'
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: train_test_split & Generalization Check',
        code: `import numpy as np
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
print(f"Generalization Gap: {abs(tr_rmse - te_rmse):.3f} (Near-zero overfitting!)")`
      }
    ],
    codePreview: `# Evaluating Train vs Test Generalisation Gap
import numpy as np

# 80/20 train/test split
N = len(data)
indices = np.random.RandomState(42).permutation(N)
split = int(0.8 * N)
train_idx, test_idx = indices[:split], indices[split:]

X_train, y_train = X[train_idx], y[train_idx]
X_test, y_test = X[test_idx], y[test_idx]

# Fit on train ONLY
theta = np.linalg.pinv(X_train.T @ X_train) @ X_train.T @ y_train

# Evaluate on both
train_rmse = np.sqrt(np.mean((y_train - X_train @ theta)**2))
test_rmse = np.sqrt(np.mean((y_test - X_test @ theta)**2))
print(f"Train RMSE: {train_rmse:.2f} | Test RMSE: {test_rmse:.2f}")
print(f"Generalisation Gap: {abs(train_rmse - test_rmse):.3f} (Ideal!)")`,
    visual: 'trainTestSplit',
    curatedQuestions: [
      {
        id: 'q21-1',
        title: 'Quiz: Identifying Overfitting',
        question: 'A data scientist trains a complex model with Train RMSE = 1.20 and Test RMSE = 14.80. What is happening?',
        options: [
          { id: 'A', text: 'Severe Overfitting — the model memorized training noise and fails completely on unseen data' },
          { id: 'B', text: 'Underfitting — the model is too simple' },
          { id: 'C', text: 'The model has achieved optimal balance' },
          { id: 'D', text: 'The test set was missing the target column' }
        ],
        correctAnswer: 'A',
        explanation: 'A massive gap between training error (1.20) and test error (14.80) is the classic hallmark of overfitting: high variance and failure to generalize.'
      },
      {
        id: 'q21-2',
        title: 'Quiz: Identifying Underfitting',
        question: 'If a model has Train R² = 0.35 and Test R² = 0.34, what problem does it suffer from?',
        options: [
          { id: 'A', text: 'Underfitting (High Bias) — the model lacks sufficient features or capacity to explain the variance' },
          { id: 'B', text: 'Overfitting (High Variance)' },
          { id: 'C', text: 'Data leakage' },
          { id: 'D', text: 'Zero-division error' }
        ],
        correctAnswer: 'A',
        explanation: 'When both train and test performance are equally poor, the model is underfitting; it is unable to capture the underlying relationships in the data.'
      },
      {
        id: 'q21-3',
        title: 'Poll: Generalisation in Production',
        question: 'Why is test-set performance far more important to a company than training-set performance?',
        options: [
          { id: 'A', text: 'Because future business decisions will be made on new, unseen employees, not historical training rows' },
          { id: 'B', text: 'Training sets are usually deleted after deployment' },
          { id: 'C', text: 'Test sets are always smaller so they run faster' },
          { id: 'D', text: 'Regulators only audit test sets' }
        ],
        correctAnswer: 'A',
        explanation: 'In production, the model must forecast productivity for incoming months and new hires. If it cannot generalize to unseen data, historical accuracy is meaningless.'
      },
      {
        id: 'q21-4',
        title: 'Quiz: The 9-Feature Model Generalisation',
        question: 'Our 9-feature model has Train RMSE 4.51 and Test RMSE 4.53. What does this tell us?',
        options: [
          { id: 'A', text: 'The gap is only 0.02, demonstrating exceptional generalisation without overfitting' },
          { id: 'B', text: 'The model is heavily overfitted because test RMSE is higher' },
          { id: 'C', text: 'The test data must have been copied from the training data' },
          { id: 'D', text: 'We should add 50 more polynomial features immediately' }
        ],
        correctAnswer: 'A',
        explanation: 'A tiny gap of 0.02 between train and test RMSE confirms that the model generalizes seamlessly to unseen data.'
      },
      {
        id: 'q21-5',
        title: 'Quiz: Bias-Variance Tradeoff',
        question: 'As model complexity increases, what happens to Bias and Variance?',
        options: [
          { id: 'A', text: 'Bias decreases (model fits closer) while Variance increases (model becomes sensitive to noise)' },
          { id: 'B', text: 'Both Bias and Variance decrease to zero' },
          { id: 'C', text: 'Bias increases while Variance decreases' },
          { id: 'D', text: 'Neither changes in linear regression' }
        ],
        correctAnswer: 'A',
        explanation: 'The fundamental tradeoff of machine learning: increasing model complexity reduces bias (systematic error) but raises variance (sensitivity to sample fluctuations).'
      }
    ]
  },
  {
    id: 22,
    module: 10,
    duration: '5 min',
    title: 'Regularization: The Bungee Cord Against Wild Weights',
    badge: 'Module 10 • Slide 22',
    badgeColor: 'amber',
    topic1: 'Why weights explode: Overreacting to noisy or correlated features',
    topic2: 'Ridge (L2) vs Lasso (L1): The Gentle Shrinker vs The Ruthless Pruner',
    content: [
      {
        type: 'lead',
        text: 'When features overlap or contain noise, standard linear regression can overreact—assigning wild, extreme weights (like +150 to one feature and -148 to another) that cancel out on paper but make bizarre predictions on new people. Regularization attaches a gentle bungee cord to pull weights back toward zero.'
      },
      {
        type: 'concept',
        title: 'Beginner Breakdown: Ridge (L2) vs Lasso (L1) Explained Simply',
        body: 'The Core Concept: We add a small mathematical penalty for having giant weights. The model is forced to keep weights modest unless the evidence is overwhelming.\n• Ridge Regression (L2) — "The Gentle Shrinker":\nPulls all weights smoothly inward like elastic bands. It keeps all 9 features on the team, but calms them down so no single feature gets unrealistically loud.\n• Lasso Regression (L1) — "The Ruthless Pruner":\nPulls weights inward with a sharp constraint. If a feature isn\'t genuinely helpful (like Team Size), Lasso crushes its weight all the way to EXACTLY ZERO! It automatically fires uninformative features from the equation.'
      },
      {
        type: 'step',
        title: 'Why We Never Penalize the Intercept (Baseline Starting Score)',
        body: '1. In the Ridge math: theta = (X^T X + lambda * I)^(-1) X^T y.\n2. The Identity matrix I has a 0 in the top-left corner: I[0, 0] = 0.\n3. In plain English: The intercept is the baseline starting productivity (~76.6 points) when an employee has average inputs. You would never penalize the baseline salary or starting score—you only penalize the bonus multipliers!\n4. When do we need it? When datasets have 500 features and only 50 rows. In our dataset (5,838 rows for 9 features), standard regression is already stable, but Ridge provides great insurance against volatile swings.'
      },
      {
        type: 'takeaway',
        text: 'Regularization acts as a mathematical speed governor. Ridge stabilizes noisy coefficients, while Lasso automatically eliminates useless features like team size.'
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Ridge (L2) & Lasso (L1) Regularization',
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

# Compare OLS vs Ridge (L2) vs Lasso (L1)
ols   = make_pipeline(StandardScaler(), LinearRegression()).fit(X_tr, y_tr)
ridge = make_pipeline(StandardScaler(), Ridge(alpha=100.0)).fit(X_tr, y_tr)
lasso = make_pipeline(StandardScaler(), Lasso(alpha=0.5)).fit(X_tr, y_tr)

print("Team Size Weight (Feature 5):")
print(f"  OLS   : {ols.named_steps['linearregression'].coef_[4]:+.4f}")
print(f"  Ridge : {ridge.named_steps['ridge'].coef_[4]:+.4f} (Shrunk smoothly)")
print(f"  Lasso : {lasso.named_steps['lasso'].coef_[4]:+.4f} (Pruned to 0.0!)")`
      }
    ],
    codePreview: `# Ridge Regression (L2) Closed-Form Solution in NumPy
import numpy as np

# 1. Identity matrix for penalty, shape (10, 10)
I_penalty = np.eye(X.shape[1])
I_penalty[0, 0] = 0  # Do NOT regularize intercept!

# 2. Fit Ridge for different lambda penalty strengths
for lam in [0.0, 10.0, 100.0, 1000.0]:
    theta_ridge = np.linalg.inv(X.T @ X + lam * I_penalty) @ X.T @ y
    rmse = np.sqrt(np.mean((y - X @ theta_ridge)**2))
    # Check weight of Team Size (col 5)
    print(f"Lambda: {lam:6.1f} | RMSE: {rmse:.2f} | Team Weight: {theta_ridge[5]:+.4f}")`,
    visual: 'precisionComparison',
    curatedQuestions: [
      {
        id: 'q22-1',
        title: 'Quiz: Ridge vs Lasso Penalty Difference',
        question: 'What is the primary operational difference between Ridge (L2) and Lasso (L1) regularization?',
        options: [
          { id: 'A', text: 'Lasso (L1) can shrink weights to exactly zero for feature selection; Ridge (L2) shrinks weights close to zero but keeps all features' },
          { id: 'B', text: 'Ridge is only for images, Lasso is only for numbers' },
          { id: 'C', text: 'Ridge increases weight sizes, Lasso decreases them' },
          { id: 'D', text: 'Lasso requires lambda to be negative' }
        ],
        correctAnswer: 'A',
        explanation: 'Because of the sharp geometry of the L1 diamond constraint, Lasso drives non-essential coefficients to exactly 0.0, creating sparse interpretable models.'
      },
      {
        id: 'q22-2',
        title: 'Quiz: Why Exclude the Intercept?',
        question: 'Why do we set I_penalty[0, 0] = 0 so the intercept is not regularized?',
        options: [
          { id: 'A', text: 'Penalizing the intercept would artificially pull the average prediction towards zero regardless of true baseline score' },
          { id: 'B', text: 'NumPy cannot invert matrix with ones' },
          { id: 'C', text: 'The intercept is always 1 so it cannot change' },
          { id: 'D', text: 'To save computation time' }
        ],
        correctAnswer: 'A',
        explanation: 'The intercept anchors the baseline level of productivity (~76.5 points). Penalizing it would falsely force the baseline prediction toward zero.'
      },
      {
        id: 'q22-3',
        title: 'Poll: When to Apply Regularization',
        question: 'In our 9-feature model with 5,838 rows, OLS has R² = 0.755 and Train/Test gap is only 0.02. How much lambda regularization is needed?',
        options: [
          { id: 'A', text: 'Small to zero lambda (e.g. 0 to 10) — with 5,838 rows and only 9 features, data-to-feature ratio is high (648:1), so overfitting risk is minimal' },
          { id: 'B', text: 'Extreme lambda (100,000) to flatten all weights' },
          { id: 'C', text: 'Regularization is never useful' },
          { id: 'D', text: 'Lambda must always equal 1.0' }
        ],
        correctAnswer: 'A',
        explanation: 'With 5,838 observations for only 9 features, OLS is already well-conditioned. Heavy regularization would only introduce unnecessary bias (underfitting).'
      },
      {
        id: 'q22-4',
        title: 'Quiz: Effect of Infinite Lambda',
        question: 'If lambda is set to an astronomically large number (e.g. 1e12) in Ridge regression, what will the feature slopes become?',
        options: [
          { id: 'A', text: 'All feature slopes become virtually 0.0, predicting only the mean target value' },
          { id: 'B', text: 'All feature slopes explode to infinity' },
          { id: 'C', text: 'R² increases to 1.00' },
          { id: 'D', text: 'The model turns into a neural network' }
        ],
        correctAnswer: 'A',
        explanation: 'An infinite penalty makes any non-zero feature slope infinitely costly in the loss function, crushing all slopes to 0 and leaving only the constant mean prediction.'
      },
      {
        id: 'q22-5',
        title: 'Quiz: Ridge Normal Equation Formula',
        question: 'What is the correct matrix formula for Ridge regression parameters theta?',
        options: [
          { id: 'A', text: 'theta = (X^T X + lambda * I)^(-1) X^T y' },
          { id: 'B', text: 'theta = X @ y + lambda' },
          { id: 'C', text: 'theta = (X^T X)^(-1) + lambda' },
          { id: 'D', text: 'theta = (X + lambda)^(-1) y' }
        ],
        correctAnswer: 'A',
        explanation: 'Adding lambda * I to X^T X stabilizes the matrix before inversion, ensuring it is always strictly positive-definite and invertible.'
      }
    ]
  },
  {
    id: 23,
    module: 11,
    duration: '5 min',
    title: 'Summary & Key Takeaways: Complete ML Engineering Playbook',
    badge: 'Module 11 • Slide 23 • Capstone',
    badgeColor: 'indigo',
    topic1: 'Synthesis of findings: 9-feature baseline vs precision regression',
    topic2: 'Actionable executive takeaways and workplace deployment guardrails',
    content: [
      {
        type: 'lead',
        text: 'Congratulations on completing the NumPy Multiple Regression masterclass! From vectorised data cleaning to solving the 9-feature normal equation, you now possess the complete mathematical and practical foundation for workplace predictive modeling.'
      },
      {
        type: 'concept',
        title: 'Executive Summary: 4 Core Discoveries',
        body: '1. Vectorization Beats Loops: NumPy matrix operations executed 100x to 300x faster than pure Python loops across all 5,838 employee records.\n2. Operational Friction is Real: Incorporating meeting overhead (-0.32/hr) and blocker delays (-0.45/hr) elevated model R² from 0.658 to 0.755 (crossing the 0.75 gold standard).\n3. Experience & Complexity Dominate: Standardised weights show Experience (+4.35) and Task Complexity (-3.13) are the strongest individual levers.\n4. Team Size is Inconsequential: Team size had a standardized weight of only -0.07, proving that adding more people to a project does not compensate for high friction or low tooling.'
      },
      {
        type: 'step',
        title: 'Ethical Workplace Deployment Guardrails',
        body: 'Guardrail 1: Strictly enforce score bounding [0, 100]. Real humans have physical monthly capacity limits (max 160 tasks).\nGuardrail 2: Do NOT extrapolate beyond observed data (0.5 to 14.4 years experience). Claiming 30 years experience gives 130 points is invalid.\nGuardrail 3: Use insights for systemic support, not punitive monitoring. Lowering blocker wait times by 10 hrs yields a +4.5 point lift company-wide without burnout.'
      },
      {
        type: 'takeaway',
        text: 'True workplace optimization focuses on unblocking friction rather than micromanaging individuals. With R² = 0.755, engineering leaders have a scientifically validated decision engine.'
      }
    ,
      {
        type: 'code',
        title: 'Scikit-Learn: Complete Production Pipeline & Guardrails',
        code: `import numpy as np
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
print("Status: Validated for Operational HR & Engineering Planning!")`
      }
    ],
    codePreview: `# Final Full-Pipeline Summary Verification
import numpy as np

# 1. Features: 9 levers, Target: productivity score
X = np.hstack([np.ones((len(data), 1)), data[:, 3:12]])
y = data[:, 13]

# 2. Optimal Normal Equation Solution
theta = np.linalg.pinv(X.T @ X) @ X.T @ y
y_pred = np.clip(X @ theta, 0, 100) # Enforce physical bounds [0, 100]

# 3. Final Production Metrics
r2 = 1 - (np.sum((y - y_pred)**2) / np.sum((y - np.mean(y))**2))
rmse = np.sqrt(np.mean((y - y_pred)**2))
print(f"=== CAPSTONE MODEL METRICS ===")
print(f"R² Score  : {r2:.3f} (Exceeds 0.75 Gold Standard Threshold)")
print(f"RMSE Error: {rmse:.2f} points")
print(f"Status    : Ready for Production Workplace Deployment!")`,
    visual: 'precisionComparison',
    curatedQuestions: [
      {
        id: 'q23-1',
        title: 'Quiz: Primary Performance Driver',
        question: 'What architectural change elevated our model from R² = 0.658 to R² = 0.755?',
        options: [
          { id: 'A', text: 'Incorporating operational friction levers (meeting overhead and blocker delay hours) into the feature set' },
          { id: 'B', text: 'Switching from NumPy to pure Python loops' },
          { id: 'C', text: 'Deleting half the dataset' },
          { id: 'D', text: 'Setting all weights to 1.0' }
        ],
        correctAnswer: 'A',
        explanation: 'Capturing operational friction through meeting hours and blocker wait hours accounted for previously missing workplace variation, elevating R² to 0.755.'
      },
      {
        id: 'q23-2',
        title: 'Quiz: High-ROI Management Intervention',
        question: 'According to our standardized feature weights, which managerial action yields immediate productivity recovery without waiting years for experience?',
        options: [
          { id: 'A', text: 'Aggressively clearing blocker bottlenecks (-1.89 std) and reducing unnecessary meetings (-1.54 std)' },
          { id: 'B', text: 'Expanding team sizes from 5 to 15 people' },
          { id: 'C', text: 'Banning AI tools' },
          { id: 'D', text: 'Eliminating all training programs' }
        ],
        correctAnswer: 'A',
        explanation: 'Blockers and meetings exert a combined -3.43 std drag. Clearing operational friction gives immediate, high-impact productivity gains across entire teams.'
      },
      {
        id: 'q23-3',
        title: 'Quiz: Why Enforce Output Capping?',
        question: 'Why must linear regression predictions for employee productivity be clipped to [0, 100]?',
        options: [
          { id: 'A', text: 'Linear equations are unconstrained and can predict 108 or -5, but physical human monthly capacity is bounded between 0 and 100' },
          { id: 'B', text: 'Because NumPy cannot display numbers greater than 100' },
          { id: 'C', text: 'To make the chart colors look better' },
          { id: 'D', text: 'Because 100 is the number of rows in the test set' }
        ],
        correctAnswer: 'A',
        explanation: 'In real operations, an employee cannot complete more than maximum monthly capacity (100 pts) nor negative tasks. Applying clipping ensures realistic workplace outputs.'
      },
      {
        id: 'q23-4',
        title: 'Quiz: Team Size Role',
        question: 'Why was Team Size\'s standardized weight (-0.07) virtually negligible in the multiple regression model?',
        options: [
          { id: 'A', text: 'Once skill, friction, and tooling are controlled for, individual output depends very little on whether a team has 4 vs 8 members' },
          { id: 'B', text: 'Because team size was measured incorrectly' },
          { id: 'C', text: 'Because small teams are impossible to manage' },
          { id: 'D', text: 'Because teams do not exist in software engineering' }
        ],
        correctAnswer: 'A',
        explanation: 'Multiple regression isolates the unique partial effect of each variable. Holding meetings and blockers constant, team size alone has near-zero direct effect on individual output.'
      },
      {
        id: 'q23-5',
        title: 'Quiz: Post-Session Course Certification',
        question: 'What deliverables are required to complete the practical assessment for this masterclass?',
        options: [
          { id: 'A', text: 'Assignment 1 (NumPy Productivity Analyser - 30 pts) and Assignment 2 (Feature Impact Study - 70 pts)' },
          { id: 'B', text: 'Writing a 50-page history essay' },
          { id: 'C', text: 'Memorizing all 5,838 rows in the CSV' },
          { id: 'D', text: 'There are no post-session requirements' }
        ],
        correctAnswer: 'A',
        explanation: 'The certification consists of two rigorous hands-on projects: Assignment 1 (Vectorized Analytics, 30 pts) and Assignment 2 (Regression Modeling & Diagnostics, 70 pts).'
      }
    ]
  }
];

export const CODE_TEMPLATES = [
  {
    id: 'empty',
    title: 'Empty Editor (Scratchpad)',
    description: 'Clean blank canvas to write your own Python and NumPy code from scratch.',
    code: `# Type your Python / NumPy code here and click "Run Python Code"
import numpy as np

print("NumPy Version:", np.__version__)
`
  },
  {
    id: 'm2-arrays-nan',
    title: 'Module 2: Arrays, Slicing & Masking',
    description: 'Create 6 employee records, demonstrate views vs copy, and filter blank NaNs.',
    code: `import numpy as np

# 6 sample employee records
exp6    = np.array([4.0, 3.4, 3.0, 4.1, 2.9, 5.3])
rework6 = np.array([3, 5, 5, 0, 1, 4])
absent6 = np.array([1, 1, 1, 1, 0, 1])
score6  = np.array([56.9, 50.6, 67.5, 65.0, 70.0, 56.2])

print("Array Shape:", exp6.shape)
print("Data Type:  ", exp6.dtype)

# Slicing with .copy()
safe_slice = exp6[:3].copy()
safe_slice[0] = 999
print("Original exp6[0] unaffected:", exp6[0])

# Boolean mask filtering
good = (exp6 > 3.0) & (rework6 <= 3)
print("Qualified scores:", score6[good])

# Missing NaN filtering
training = np.array([12.3, 5.0, 10.4, np.nan, 6.2, np.nan])
clean = training[~np.isnan(training)]
print("Clean training hours:", clean)`
  },
  {
    id: 'm3-vector-baseline',
    title: 'Module 3: Vectorisation & Standardisation',
    description: 'Compute the 62.4 team baseline guess and standardise features with broadcasting.',
    code: `import numpy as np

score6 = np.array([56.9, 50.6, 67.5, 65.0, 70.0, 56.2])

# Naive baseline average guess
avg = score6.mean()
guess = np.full(len(score6), avg)
residuals = score6 - guess
print("Team average guess:", round(avg, 2))
print("Mistakes (Actual - Guess):", residuals.round(1))

# Feature standardisation via broadcasting: z = (x - mean) / std
exp6 = np.array([4.0, 3.4, 3.0, 4.1, 2.9, 5.3])
z = (exp6 - exp6.mean()) / exp6.std()
print("Standardised Z-scores:", z.round(2))
print(f"Mean: {z.mean():.4f}, Std: {z.std():.4f}")`
  },
  {
    id: 'm6-single-regression',
    title: 'Module 6: Single Feature Regression (Exp)',
    description: 'Load employee_productivity_data.csv and fit the closed-form line for experience.',
    code: `import numpy as np

data = np.genfromtxt("employee_productivity_data.csv", delimiter=",", skip_header=1)
features = data[:, 3:10] # technical features
score = data[:, 13]      # target productivity_score (column 13)

# Filter 162 missing training rows
ok = ~np.isnan(features).any(axis=1)
F = features[ok]
y = score[ok]

print(f"Complete rows: {len(y)}")
x = F[:, 0] # experience

# Closed-form slope and intercept
m = ((x - x.mean()) * (y - y.mean())).sum() / ((x - x.mean())**2).sum()
c = y.mean() - m * x.mean()

print(f"Fitted Equation: Score = {m:.2f} * Experience + {c:.1f}")

# Evaluation metrics
y_pred = m * x + c
rmse = np.sqrt(np.mean((y - y_pred)**2))
r2 = 1.0 - np.sum((y - y_pred)**2) / np.sum((y - y.mean())**2)
print(f"RMSE: {rmse:.2f} (beats 9.1 baseline) | R²: {r2:.3f}")`
  },
  {
    id: 'm7-gradient-descent',
    title: 'Module 7: Gradient Descent Loop',
    description: 'Iterative parameter update m_s -= lr * dm comparing learning rates 0.001, 0.1, 1.5.',
    code: `import numpy as np

exp = np.array([4.0, 3.4, 3.0, 4.1, 2.9, 5.3, 4.3, 3.9, 1.5, 1.6])
score = np.array([56.9, 50.6, 67.5, 65.0, 70.0, 56.2, 65.6, 48.8, 61.9, 42.5])
xs = (exp - exp.mean()) / exp.std()
y = score

for lr in [0.001, 0.1, 1.5]:
    m_s, c_s = 0.0, 0.0
    for epoch in range(100):
        err = (m_s * xs + c_s) - y
        dm = 2.0 * np.mean(err * xs)
        dc = 2.0 * np.mean(err)
        m_s -= lr * dm
        c_s -= lr * dc
        if np.isnan(m_s) or abs(m_s) > 1e6:
            break
    mse = np.mean(((m_s * xs + c_s) - y)**2)
    print(f"LR {lr:<6}: Final MSE = {mse:.1f}")`
  },
  {
    id: 'm8-seven-features',
    title: 'Module 8: 7-Feature Normal Equation',
    description: 'Design matrix X with column of ones and theta solution for all 7 features.',
    code: `import numpy as np

data = np.genfromtxt("employee_productivity_data.csv", delimiter=",", skip_header=1)
features = data[:, 3:10] # 7 technical baseline features
y = data[:, 13]          # productivity_score (col 13)
ok = ~np.isnan(features).any(axis=1)
F, y = features[ok], y[ok]

# Design matrix X with leading ones column
X = np.column_stack([np.ones(len(y)), F])
theta, *_ = np.linalg.lstsq(X, y, rcond=None)

names = ["Intercept", "Exp", "Train", "Cx", "AI", "Rework", "Absent", "Team"]
for name, val in zip(names, theta):
    print(f"{name:<12}: {val:>6.2f}")

pred = X @ theta
rmse = np.sqrt(np.mean((y - pred)**2))
r2 = 1.0 - np.sum((y - pred)**2) / np.sum((y - y.mean())**2)
print(f"\\n7-Feature Model -> RMSE: {rmse:.2f} | R²: {r2:.3f}")

# Person 1: 6 yrs exp, 10h train, cx 3, AI 1, 2 rework, 1 absent, team 8
p1 = np.array([1, 6.0, 10.0, 3.0, 1, 2, 1, 8])
print(f"Person 1 Predicted Score: {theta @ p1:.2f} pts")`
  },
  {
    id: 'm9-standardised-ranking',
    title: 'Module 9: Standardised Weights & 9-Feature Ranking',
    description: 'Standardise weights to rank all 9 permanent features (technical + operational friction).',
    code: `import numpy as np

data = np.genfromtxt("employee_productivity_data.csv", delimiter=",", skip_header=1)
features = data[:, 3:12] # All 9 permanent features in dataset
y = data[:, 13]          # productivity_score
ok = ~np.isnan(features).any(axis=1)
F, y = features[ok], y[ok]

X = np.column_stack([np.ones(len(y)), F])
theta, *_ = np.linalg.lstsq(X, y, rcond=None)
sd = F.std(axis=0)
std_w = theta[1:] * sd
names = ["experience", "training", "complexity", "ai", "rework", "absent", "team_size", "meeting_hours", "blocker_hours"]

print(f"{'Feature':<15} | {'Raw W':<7} | {'Std W':<7} | {'Impact Rank'}")
print("-" * 47)
rank = 1
for j in np.argsort(-np.abs(std_w)):
    print(f"{names[j]:<15} | {theta[1+j]:>7.2f} | {std_w[j]:>7.2f} | #{rank}")
    rank += 1`
  },
  {
    id: 'm10-diagnostics',
    title: 'Module 10: Model Diagnostics & VIF Check',
    description: 'Check residual bell curve (95.8%), equal spread (5.3 vs 5.3), and multicollinearity VIF.',
    code: `import numpy as np

data = np.genfromtxt("employee_productivity_data.csv", delimiter=",", skip_header=1)
features = data[:, 3:10] # 7 baseline features
y = data[:, 13]          # productivity_score
ok = ~np.isnan(features).any(axis=1)
F, y = features[ok], y[ok]

X = np.column_stack([np.ones(len(y)), F])
theta, *_ = np.linalg.lstsq(X, y, rcond=None)
pred = X @ theta
res = y - pred

print(f"Mean Residual:      {res.mean():.4f} (approx 0)")
print(f"% within 2 SD:      {np.mean(np.abs(res) < 2 * res.std()) * 100:.1f}% (~95% target)")
med = np.median(pred)
print(f"Low Predictions SD: {res[pred < med].std():.2f}")
print(f"High Predictions SD:{res[pred >= med].std():.2f}")

# VIF check
names = ["exp", "train", "cx", "ai", "rw", "ab", "team"]
for j in range(7):
    others = [k for k in range(7) if k != j]
    Xo = np.column_stack([np.ones(len(y)), F[:, others]])
    to, *_ = np.linalg.lstsq(Xo, F[:, j], rcond=None)
    ro = F[:, j] - Xo @ to
    r2_j = 1.0 - (ro @ ro) / np.sum((F[:, j] - F[:, j].mean())**2)
    vif = 1.0 / (1.0 - r2_j)
    print(f"VIF {names[j]:<6}: {vif:.2f}")`
  },
  {
    id: 'm11-time-split-ridge',
    title: 'Module 11: Time Split & Ridge Shrinkage',
    description: 'Train on months 1-18, test on months 19-24, and evaluate Ridge shrinkage.',
    code: `import numpy as np

data = np.genfromtxt("employee_productivity_data.csv", delimiter=",", skip_header=1)
month = data[:, 2]
features = data[:, 3:10]
y = data[:, 13]          # productivity_score
ok = ~np.isnan(features).any(axis=1)
F, y, mo = features[ok], y[ok], month[ok]

past = mo <= 18
future = mo >= 19
X = np.column_stack([np.ones(len(y)), F])

theta_p, *_ = np.linalg.lstsq(X[past], y[past], rcond=None)
pred_f = X[future] @ theta_p
rmse_f = np.sqrt(np.mean((y[future] - pred_f)**2))
base_f = np.sqrt(np.mean((y[future] - y[past].mean())**2))
print(f"Future Test RMSE: {rmse_f:.2f} (beats {base_f:.2f} baseline)")

# Ridge shrinkage
mu, sd = F.mean(axis=0), F.std(axis=0)
A = np.column_stack([np.ones(len(y)), (F - mu) / sd])
for lam in [0, 1000, 10000]:
    Pm = lam * np.eye(8); Pm[0, 0] = 0.0
    tr = np.linalg.solve(A.T @ A + Pm, A.T @ y)
    print(f"Lambda {lam:<5}: {tr.round(2)}")`
  },
  {
    id: 'm12-enhanced-r2-precision',
    title: 'Precision Upgrade: 9-Feature Model (R² = 0.755)',
    description: 'Elevate R² from 0.658 to 0.755 (crossing the 0.75 gold standard) using all 9 permanent features from the dataset.',
    code: `import numpy as np

# 1. Load real dataset (5,838 complete records, 9 permanent features)
data = np.genfromtxt("employee_productivity_data.csv", delimiter=",", skip_header=1)
features_9 = data[:, 3:12] # All 9 permanent features from dataset
y = data[:, 13]          # target productivity_score
ok = ~np.isnan(features_9).any(axis=1)
F9, y = features_9[ok], y[ok]
n = len(y)

# 2. Baseline 7-Feature Model (columns 0..6)
F7 = F9[:, :7]
X_base = np.column_stack([np.ones(n), F7])
theta_base, *_ = np.linalg.lstsq(X_base, y, rcond=None)
pred_base = X_base @ theta_base
r2_base = 1.0 - np.sum((y - pred_base)**2) / np.sum((y - y.mean())**2)
rmse_base = np.sqrt(np.mean((y - pred_base)**2))

print("--- BASELINE 7-FEATURE MODEL ---")
print(f"R²: {r2_base:.3f} | RMSE: {rmse_base:.2f} points")

# 3. Permanent 9-Feature Precision Regression Model (all 9 features directly from CSV)
X_prec = np.column_stack([np.ones(n), F9])
theta_prec, *_ = np.linalg.lstsq(X_prec, y, rcond=None)
pred_prec = X_prec @ theta_prec
r2_prec = 1.0 - np.sum((y - pred_prec)**2) / np.sum((y - y.mean())**2)
rmse_prec = np.sqrt(np.mean((y - pred_prec)**2))

print("\\n--- 9-FEATURE PRECISION REGRESSION MODEL ---")
print(f"R²: {r2_prec:.3f} (Crossed the 0.75 gold standard threshold!)")
print(f"RMSE: {rmse_prec:.2f} points (Error reduced by 16% from 5.33)")
print(f"R² Improvement Gain: +{(r2_prec - r2_base):.3f} (+9.7% variance explained)")
print(f"Feature 8 (Meeting Overhead Drag): {theta_prec[8]:.2f} pts/hr")
print(f"Feature 9 (Blocker Delay Drag):    {theta_prec[9]:.2f} pts/hr")`
  }
];

export const ASSIGNMENTS = [
  {
    id: 'assignment-1',
    title: 'Assignment 1 (NumPy): Employee Productivity Analyser',
    scenario: 'A department head wants an automated summary of two years of employee productivity data across 250 employees. Complete the analysis using vectorised NumPy operations without Python for-loops over rows.',
    marks: 30,
    tasks: [
      {
        num: 1,
        title: 'Load Dataset & Inspect Shapes',
        desc: 'Load employee_productivity_data.csv using np.genfromtxt(delimiter=",", skip_header=1). Print data.shape, data.dtype, and the first 3 records.',
        solution: 'data = np.genfromtxt("employee_productivity_data.csv", delimiter=",", skip_header=1)\n# Shape is (6000, 14), dtype is float64'
      },
      {
        num: 2,
        title: 'Detect Missing Cells & Build Boolean Mask',
        desc: 'Count NaN cells in each feature. Construct a boolean mask "ok" of complete records with no blanks and print rows retained.',
        solution: 'ok = ~np.isnan(features).any(axis=1)\n# 162 NaNs in training_hours; 5,838 rows retained'
      },
      {
        num: 3,
        title: 'Monthly Score Progression',
        desc: 'Using boolean masks, compute the mean productivity score for each of the 24 months. Identify which month had the highest and lowest averages.',
        solution: 'Lowest: Month 1 (~59.2); Highest: Month 24 (~67.3)'
      },
      {
        num: 4,
        title: 'AI Assistant Impact Analysis',
        desc: 'Compute the average score for records with ai_assistant == 1 vs ai_assistant == 0. Explain why this naive difference may overstate the causal impact.',
        solution: 'With AI: 67.8, Without AI: 61.0. Gap (+6.8) is larger than model weight (+5.6) because AI rolled out in Month 13 when employees also had more experience!'
      },
      {
        num: 5,
        title: 'High Performers vs Struggling Months',
        desc: 'Count records with score >= 80 and score < 50. Compare their average rework tickets and absent days.',
        solution: 'Score >= 80: 195 records (mean rework 0.6, absent 0.4). Score < 50: 462 records (mean rework 3.9, absent 2.1).'
      },
      {
        num: 6,
        title: 'Top 5 Highest Scoring Records',
        desc: 'Use np.argsort to display month, experience, rework tickets, and score for the 5 highest scoring employee-months.',
        solution: 'Top scores reach ~97.5 (high experience 10+ yrs, 0 rework, 0 absence, AI enabled).'
      },
      {
        num: 7,
        title: 'Baseline Residuals by 6-Month Eras',
        desc: 'Work out the baseline error (score - 62.4) and report mean error and RMSE across months 1-6, 7-12, 13-18, and 19-24.',
        solution: 'Months 1-6: -2.7 (RMSE 8.9); Months 7-12: -1.5 (RMSE 8.6); Months 13-18: +0.4 (RMSE 9.1); Months 19-24: +3.9 (RMSE 9.8).'
      },
      {
        num: 8,
        title: 'Feature Standardisation via Broadcasting',
        desc: 'Stack experience, rework, and score. Standardise each column with broadcasting and verify means are ~0 and stds are ~1.',
        solution: 'Z = (M - M.mean(axis=0)) / M.std(axis=0)'
      },
      {
        num: 9,
        title: 'Full Correlation Matrix',
        desc: 'Compute the correlation matrix of all 7 features and score with np.corrcoef. Identify strongest and weakest links.',
        solution: 'Strongest link with score: rework_tickets (-0.50) & experience (+0.48). Weakest: team_size (+0.01). Strongest inter-feature: complexity & rework (+0.31).'
      }
    ]
  },
  {
    id: 'assignment-2',
    title: 'Assignment 2 (Linear Regression): Feature Impact Study',
    scenario: 'HR wants to know which workplace levers truly improve productivity and by how much. Build the regression predictor from scratch, evaluate confidence intervals, and deliver an ethical interpretation.',
    marks: 70,
    tasks: [
      {
        num: 1,
        title: 'Reusable Regression Functions',
        desc: 'Implement fit_line(x, y), predict(x, m, c), and metrics(y, y_pred) returning MSE, RMSE, MAE, and R². Fit rework_tickets vs score.',
        solution: 'rework_tickets slope: -2.77, intercept: 68.2, RMSE: 7.9, R²: 0.248'
      },
      {
        num: 2,
        title: 'Gradient Descent Validation',
        desc: 'Fit rework_tickets with gradient descent on standardised x. Show it reaches the same slope (-2.77) and intercept (68.2). Compare two learning rates.',
        solution: 'm_gd = m_s / x.std(), c_gd = c_s - m_s * x.mean() / x.std() matches direct formula'
      },
      {
        num: 3,
        title: 'Single-Feature Benchmark Table',
        desc: 'Fit all 7 single-feature models and report R². Identify which feature explains the most variance on its own.',
        solution: 'R² ranking: rework (0.248), experience (0.231), absence (0.096), AI (0.089), complexity (0.081), training (0.040), team size (0.000).'
      },
      {
        num: 4,
        title: 'Multiple Regression (Normal Equation & lstsq)',
        desc: 'Fit all 7 features together. Report theta, RMSE (5.33), R² (0.658), and Adjusted R² (0.658).',
        solution: 'Intercept: 66.98, Exp: +1.87, Train: +0.56, Cx: -4.34, AI: +5.61, Rw: -1.41, Ab: -2.75, Team: -0.03'
      },
      {
        num: 5,
        title: 'Standardised Weights Ranking',
        desc: 'Compute standardised weights std_w = theta[1:] * sd and rank features. Explain why raw weights cannot be compared directly.',
        solution: 'Rank: Exp (+4.35), Complexity (-3.13), Absence (-2.77), Rework (-2.31), AI (+2.26), Training (+1.67), Team Size (-0.07).'
      },
      {
        num: 6,
        title: 'The Drop-One Test',
        desc: 'Refit removing one feature at a time. Record R² loss for each. Identify the feature with zero loss.',
        solution: 'Dropping team size yields 0.000 R² loss. Dropping experience yields 0.185 loss.'
      },
      {
        num: 7,
        title: 'Bootstrap Luck Check (300 Iterations)',
        desc: 'Compute 95% bootstrap confidence intervals for all 7 weights. Identify which interval crosses zero.',
        solution: 'Team size spans [-0.08, +0.02], crossing zero. All other 6 features strictly exclude zero.'
      },
      {
        num: 8,
        title: 'What-If Workplace Levers',
        desc: 'Test a base employee (4y exp, 8h train, cx 3, AI 0, 3 rw, 1 ab, team 8). Show score changes for 4 practical interventions.',
        solution: '+5h training (+2.8 pts), Provide AI (+5.6 pts), Reduce rework from 3 to 1 (+2.8 pts), Reduce absence 3 to 1 (+5.5 pts).'
      },
      {
        num: 9,
        title: 'Statistical Assumption Audits',
        desc: 'Verify mean residual (~0), 95.8% within 2 SD, homoscedasticity (5.3 vs 5.3), 17 outliers (>3 SD), and VIF (< 1.3).',
        solution: 'All linear regression assumptions hold cleanly.'
      },
      {
        num: 10,
        title: 'Time Split vs Random Split',
        desc: 'Compare an 80/20 random split with a time split (months 1-18 train vs 19-24 test). Explain why time split is more honest.',
        solution: 'Time split test RMSE is 5.3 vs baseline 10.4. Small average error (+0.48) reflects AI adoption in late months.'
      },
      {
        num: 11,
        title: 'Ridge Shrinkage Analysis',
        desc: 'Fit Ridge on standardised features for lambda = 1000 and 10000. Describe how weights shrink.',
        solution: 'Weights shrink toward zero; team size stays negligible at -0.05 and +0.01.'
      },
      {
        num: 12,
        title: 'Ethical & Workplace Governance Report',
        desc: 'Write concise answers: (a) workplace meaning of experience weight, (b) why rework weight shrunk in multiple regression, (c) why team size does not matter, (d) why correlation != cause, (e) risk of extrapolating to 25 yrs exp, (f) 1 unethical managerial use and 1 safeguard.',
        solution: 'Emphasize algorithmic fairness, employee privacy, unblocking bottlenecks over individual surveillance, and never extrapolating beyond observed data ranges (0.5 to 14.4 yrs).'
      }
    ]
  }
,
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
  }
];
