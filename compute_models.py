import csv
import math
import json

with open('t20i_first_innings_5_to_19.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

train_rows = [r for r in rows if int(r['year']) < 2024]
test_rows = [r for r in rows if int(r['year']) >= 2024]

y_train = [float(r['final']) for r in train_rows]
y_test = [float(r['final']) for r in test_rows]

def solve_ols_2d(X, y):
    # X has rows of [1, x1, x2]
    # compute X^T X (3x3) and X^T y (3x1)
    XTX = [[0.0]*3 for _ in range(3)]
    XTy = [0.0]*3
    for row, target in zip(X, y):
        for i in range(3):
            XTy[i] += row[i] * target
            for j in range(3):
                XTX[i][j] += row[i] * row[j]
    
    # 3x3 matrix inverse
    def inv3(M):
        a, b, c = M[0]
        d, e, f = M[1]
        g, h, i = M[2]
        det = a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g)
        if abs(det) < 1e-12:
            return None
        invdet = 1.0 / det
        return [
            [(e*i - f*h)*invdet, (c*h - b*i)*invdet, (b*f - c*e)*invdet],
            [(f*g - d*i)*invdet, (a*i - c*g)*invdet, (c*d - a*f)*invdet],
            [(d*h - e*g)*invdet, (g*b - a*h)*invdet, (a*e - b*d)*invdet]
        ]
    
    inv_XTX = inv3(XTX)
    theta = [sum(inv_XTX[i][j] * XTy[j] for j in range(3)) for i in range(3)]
    return theta # [intercept, w_runs, w_wkts]

models = {}

for k in range(5, 20):
    runs_tr = [float(r[f'runs{k}']) for r in train_rows]
    wkts_tr = [float(r[f'wkts{k}']) for r in train_rows]
    runs_te = [float(r[f'runs{k}']) for r in test_rows]
    wkts_te = [float(r[f'wkts{k}']) for r in test_rows]
    
    # 1. Naive run-rate
    # proj = runs / k * 20
    naive_te = [r / k * 20.0 for r in runs_te]
    naive_rmse = math.sqrt(sum((a - b)**2 for a, b in zip(y_test, naive_te)) / len(y_test))
    naive_mae = sum(abs(a - b) for a, b in zip(y_test, naive_te)) / len(y_test)
    naive_bias = sum(a - b for a, b in zip(y_test, naive_te)) / len(y_test)
    naive_underest_pct = sum(1 for a, b in zip(y_test, naive_te) if a > b) / len(y_test) * 100.0

    # 2. Simple regression on runs only: y = m*runs + c
    mean_x = sum(runs_tr) / len(runs_tr)
    mean_y = sum(y_train) / len(y_train)
    cov_xy = sum((x - mean_x)*(y - mean_y) for x, y in zip(runs_tr, y_train))
    var_x = sum((x - mean_x)**2 for x in runs_tr)
    m = cov_xy / var_x
    c = mean_y - m * mean_x

    pred_simple_tr = [m * x + c for x in runs_tr]
    pred_simple_te = [m * x + c for x in runs_te]
    rmse_simple_tr = math.sqrt(sum((a - b)**2 for a, b in zip(y_train, pred_simple_tr)) / len(y_train))
    rmse_simple_te = math.sqrt(sum((a - b)**2 for a, b in zip(y_test, pred_simple_te)) / len(y_test))
    mae_simple_te = sum(abs(a - b) for a, b in zip(y_test, pred_simple_te)) / len(y_test)
    
    mean_yte = sum(y_test) / len(y_test)
    sst_te = sum((y - mean_yte)**2 for y in y_test)
    sse_simple_te = sum((y - p)**2 for y, p in zip(y_test, pred_simple_te))
    r2_simple_te = 1.0 - (sse_simple_te / sst_te)

    # 3. Multiple regression: y = b + w_r*runs + w_w*wkts
    X_tr = [[1.0, r, w] for r, w in zip(runs_tr, wkts_tr)]
    theta = solve_ols_2d(X_tr, y_train)
    b_mult, wr_mult, ww_mult = theta
    
    pred_mult_tr = [b_mult + wr_mult*r + ww_mult*w for r, w in zip(runs_tr, wkts_tr)]
    pred_mult_te = [b_mult + wr_mult*r + ww_mult*w for r, w in zip(runs_te, wkts_te)]
    
    rmse_mult_tr = math.sqrt(sum((a - p)**2 for a, p in zip(y_train, pred_mult_tr)) / len(y_train))
    rmse_mult_te = math.sqrt(sum((a - p)**2 for a, p in zip(y_test, pred_mult_te)) / len(y_test))
    mae_mult_te = sum(abs(a - p) for a, p in zip(y_test, pred_mult_te)) / len(y_test)
    sse_mult_te = sum((y - p)**2 for y, p in zip(y_test, pred_mult_te))
    r2_mult_te = 1.0 - (sse_mult_te / sst_te)
    
    # Adjusted R2 on train
    mean_ytr = sum(y_train) / len(y_train)
    sst_tr = sum((y - mean_ytr)**2 for y in y_train)
    sse_mult_tr = sum((y - p)**2 for y, p in zip(y_train, pred_mult_tr))
    r2_mult_tr = 1.0 - (sse_mult_tr / sst_tr)
    n_tr = len(y_train)
    adj_r2_tr = 1.0 - (1.0 - r2_mult_tr) * (n_tr - 1) / (n_tr - 2 - 1)

    models[k] = {
        'over': k,
        'mean_runs': round(mean_x, 1),
        'mean_wkts': round(sum(wkts_tr)/len(wkts_tr), 2),
        'naive': {
            'rmse': round(naive_rmse, 1),
            'mae': round(naive_mae, 1),
            'bias': round(naive_bias, 1),
            'underest_pct': round(naive_underest_pct, 1)
        },
        'simple': {
            'slope': round(m, 3),
            'intercept': round(c, 2),
            'train_rmse': round(rmse_simple_tr, 1),
            'test_rmse': round(rmse_simple_te, 1),
            'test_mae': round(mae_simple_te, 1),
            'test_r2': round(r2_simple_te, 3)
        },
        'multiple': {
            'intercept': round(b_mult, 2),
            'weight_runs': round(wr_mult, 3),
            'weight_wkts': round(ww_mult, 2),
            'train_rmse': round(rmse_mult_tr, 1),
            'test_rmse': round(rmse_mult_te, 1),
            'test_mae': round(mae_mult_te, 1),
            'test_r2': round(r2_mult_te, 3),
            'train_adj_r2': round(adj_r2_tr, 3)
        }
    }
    print(f"Over {k:2d}: Mult [b={b_mult:6.2f}, wr={wr_mult:5.2f}, ww={ww_mult:5.2f}] | Test RMSE: Simple={rmse_simple_te:4.1f}, Mult={rmse_mult_te:4.1f}, Naive={naive_rmse:4.1f} | R2={r2_mult_te:.3f}")

# Also select 10 diverse sample matches for replay (high scoring, low scoring, average, comebacks)
# e.g., final scores: max, min, 150, 180, 200, 120
sorted_by_final = sorted(test_rows, key=lambda x: float(x['final']))
sample_indices = [
    0, # lowest total
    int(len(sorted_by_final)*0.15),
    int(len(sorted_by_final)*0.30),
    int(len(sorted_by_final)*0.50), # median
    int(len(sorted_by_final)*0.70),
    int(len(sorted_by_final)*0.85),
    len(sorted_by_final)-1 # highest total
]
replay_matches = []
for idx in sample_indices:
    r = sorted_by_final[idx]
    overs_data = []
    for k in range(5, 20):
        overs_data.append({
            'over': k,
            'runs': int(r[f'runs{k}']),
            'wkts': int(r[f'wkts{k}'])
        })
    replay_matches.append({
        'match_id': int(r['match_id']),
        'year': int(r['year']),
        'final': int(r['final']),
        'overs': overs_data
    })

data_payload = {
    'summary': {
        'total_innings': len(rows),
        'train_innings': len(train_rows),
        'test_innings': len(test_rows),
        'mean_final': round(sum(float(r['final']) for r in rows)/len(rows), 1),
        'min_final': min(int(r['final']) for r in rows),
        'max_final': max(int(r['final']) for r in rows)
    },
    'models': models,
    'replay_matches': replay_matches
}

with open('models_overs_5_to_19.json', 'w', encoding='utf-8') as f:
    json.dump(data_payload, f, indent=2)

print("\nSaved models_overs_5_to_19.json with over 5-19 regression models!")
