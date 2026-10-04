import zipfile
import io
import csv
import json
import math

z = zipfile.ZipFile('t20s_male_csv2.zip')

match_files = [f for f in z.namelist() if f.endswith('.csv') and not f.endswith('_info.csv') and f != 'README.txt']
print(f"Total match files found: {len(match_files)}")

records = []
venues = {}
venue_counter = 0

for idx, mf in enumerate(match_files):
    mid = mf.replace('.csv', '')
    info_file = f"{mid}_info.csv"
    if info_file not in z.namelist():
        continue
    
    info_raw = z.read(info_file).decode('utf-8')
    scheduled_overs = 20
    match_date = None
    venue = ""
    team1 = ""
    team2 = ""
    teams = []
    has_outcome = False
    is_rain_rule = False
    
    for row in csv.reader(io.StringIO(info_raw)):
        if len(row) >= 3 and row[0] == 'info':
            if row[1] == 'overs':
                try: scheduled_overs = int(row[2])
                except: pass
            elif row[1] == 'date' and not match_date:
                match_date = row[2]
            elif row[1] == 'venue':
                venue = row[2]
            elif row[1] == 'team':
                teams.append(row[2])
            elif row[1] == 'method' and 'D/L' in row[2]:
                is_rain_rule = True

    if scheduled_overs != 20:
        continue
    if not match_date:
        continue

    try:
        year = int(match_date.split('/')[0].split('-')[0])
    except:
        continue

    if venue not in venues:
        venues[venue] = venue_counter
        venue_counter += 1
    venue_id = venues[venue]

    # Read innings 1 deliveries
    raw_csv = z.read(mf).decode('utf-8')
    reader = csv.DictReader(io.StringIO(raw_csv))
    
    legal_balls = 0
    total_runs = 0
    total_wickets = 0
    
    # Store checkpoints for every over 1..20
    # Over k checkpoint is after 6*k legal balls
    over_checkpoints = {}
    
    # Track batting and bowling teams
    bat_team = ""
    bowl_team = ""

    innings_ended = False
    for row in reader:
        if row.get('innings') != '1':
            continue
        
        if not bat_team:
            bat_team = row.get('batting_team', '')
            bowl_team = row.get('bowling_team', '')

        # Runs
        bat_runs = int(row.get('runs_off_bat', 0) or 0)
        extras = int(row.get('extras', 0) or 0)
        wides = int(row.get('wides', 0) or 0)
        noballs = int(row.get('noballs', 0) or 0)
        delivery_runs = bat_runs + extras
        total_runs += delivery_runs

        # Wickets
        wicket_type = row.get('wicket_type', '')
        if wicket_type and wicket_type.strip() and wicket_type != 'retired hurt':
            total_wickets += 1

        # Legal ball?
        if wides == 0 and noballs == 0:
            legal_balls += 1
            if legal_balls % 6 == 0:
                k = legal_balls // 6
                if k <= 20:
                    over_checkpoints[k] = (total_runs, total_wickets)

        if total_wickets >= 10:
            innings_ended = True
            break

    # Did innings finish cleanly?
    # Either ran full 20 overs (120 legal balls) or all out (10 wickets)
    is_full_20 = (legal_balls >= 120)
    is_all_out = (total_wickets >= 10)
    
    if not (is_full_20 or is_all_out):
        # rain-shortened or incomplete
        continue

    # Did it reach at least 15 overs (90 legal balls or all-out after 15 overs)?
    # As per doc: "66 that ended all out before 15 overs dropped"
    if legal_balls < 90 and not (is_all_out and legal_balls >= 90):
        continue

    # Fill checkpoints
    # If all out before over k (e.g. over 18), checkpoint is simply the final state at all out
    for k in range(5, 20):
        if k not in over_checkpoints:
            if is_all_out and legal_balls < k * 6:
                over_checkpoints[k] = (total_runs, total_wickets)
            elif k * 6 <= legal_balls:
                pass # should have been recorded

    # Verify we have checkpoints for all requested overs 5..19
    has_all = all(k in over_checkpoints for k in range(5, 20))
    if not has_all:
        continue

    rec = {
        'match_id': int(mid),
        'year': year,
        'venue_id': venue_id,
        'venue': venue,
        'bat_team': bat_team,
        'bowl_team': bowl_team,
        'final': total_runs,
        'final_wkts': total_wickets,
        'legal_balls': legal_balls,
        'checkpoints': over_checkpoints
    }
    records.append(rec)

print(f"Total valid 1st innings records: {len(records)}")
train_cnt = sum(1 for r in records if r['year'] < 2024)
test_cnt = sum(1 for r in records if r['year'] >= 2024)
print(f"Train (<2024): {train_cnt}, Test (>=2024): {test_cnt}")
finals = [r['final'] for r in records]
runs10 = [r['checkpoints'][10][0] for r in records]
mean_final = sum(finals) / len(finals)
mean_runs10 = sum(runs10) / len(runs10)
cov = sum((r - mean_runs10) * (f - mean_final) for r, f in zip(runs10, finals))
var_r = sum((r - mean_runs10) ** 2 for r in runs10)
var_f = sum((f - mean_final) ** 2 for f in finals)
corr = cov / math.sqrt(var_r * var_f)
print(f"Mean final: {mean_final:.2f}, Mean runs10: {mean_runs10:.2f}")
print(f"Corr(runs10, final): {corr:.3f}")

# Write CSV with over 5 to 19 checkpoints
header = ['match_id', 'year', 'venue_id']
for k in range(5, 20):
    header.extend([f'runs{k}', f'wkts{k}'])
header.append('final')

with open('t20i_first_innings_5_to_19.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for r in records:
        row = [r['match_id'], r['year'], r['venue_id']]
        for k in range(5, 20):
            row.extend([r['checkpoints'][k][0], r['checkpoints'][k][1]])
        row.append(r['final'])
        writer.writerow(row)

# Also write standard document version t20i_first_innings.csv (with 6, 10, 12, 15, 18)
std_header = ['match_id', 'year', 'venue_id', 'runs6', 'wkts6', 'runs10', 'wkts10', 'runs12', 'wkts12', 'runs15', 'wkts15', 'runs18', 'wkts18', 'final']
with open('t20i_first_innings.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(std_header)
    for r in records:
        row = [
            r['match_id'], r['year'], r['venue_id'],
            r['checkpoints'][6][0], r['checkpoints'][6][1],
            r['checkpoints'][10][0], r['checkpoints'][10][1],
            r['checkpoints'][12][0], r['checkpoints'][12][1],
            r['checkpoints'][15][0], r['checkpoints'][15][1],
            r['checkpoints'][18][0], r['checkpoints'][18][1],
            r['final']
        ]
        writer.writerow(row)

print("Saved t20i_first_innings_5_to_19.csv and t20i_first_innings.csv")
