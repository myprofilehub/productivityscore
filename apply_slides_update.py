import json
import re

# Load the slides
with open("scratch_slides.json", "r", encoding="utf-8") as f:
    slides = json.load(f)

# Convert Python/JSON list of slide dicts to JS code string
def format_slide_to_js(slide):
    lines = []
    lines.append("  {")
    lines.append(f"    id: {slide['id']},")
    lines.append(f"    module: {slide['module']},")
    lines.append(f"    duration: '{slide['duration']}',")
    title_escaped = slide['title'].replace("'", "\\'")
    lines.append(f"    title: '{title_escaped}',")
    badge_escaped = slide['badge'].replace("'", "\\'")
    lines.append(f"    badge: '{badge_escaped}',")
    lines.append(f"    badgeColor: '{slide['badgeColor']}',")
    t1_escaped = slide['topic1'].replace("'", "\\'")
    lines.append(f"    topic1: '{t1_escaped}',")
    t2_escaped = slide['topic2'].replace("'", "\\'")
    lines.append(f"    topic2: '{t2_escaped}',")
    lines.append("    content: [")
    for i, c in enumerate(slide['content']):
        c_lines = []
        c_lines.append("      {")
        c_lines.append(f"        type: '{c['type']}',")
        if 'title' in c:
            ctitle_escaped = c['title'].replace("'", "\\'")
            c_lines.append(f"        title: '{ctitle_escaped}',")
        if 'text' in c:
            ctext_escaped = c['text'].replace("'", "\\'").replace("\n", "\\n")
            c_lines.append(f"        text: '{ctext_escaped}'")
        if 'body' in c:
            cbody_escaped = c['body'].replace("'", "\\'").replace("\n", "\\n")
            c_lines.append(f"        body: '{cbody_escaped}'")
        c_lines.append("      }" + ("," if i < len(slide['content']) - 1 else ""))
        lines.extend(c_lines)
    lines.append("    ],")
    
    # codePreview
    cp_escaped = slide['codePreview'].replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    lines.append(f"    codePreview: `{cp_escaped}`,")
    lines.append(f"    visual: '{slide['visual']}',")
    
    # curatedQuestions
    lines.append("    curatedQuestions: [")
    for i, q in enumerate(slide['quiz']):
        q_lines = []
        q_lines.append("      {")
        q_lines.append(f"        id: '{q['id']}',")
        qtitle_escaped = q['title'].replace("'", "\\'")
        q_lines.append(f"        title: '{qtitle_escaped}',")
        qq_escaped = q['question'].replace("'", "\\'")
        q_lines.append(f"        question: '{qq_escaped}',")
        q_lines.append("        options: [")
        for j, opt in enumerate(q['options']):
            otext_escaped = opt['text'].replace("'", "\\'")
            q_lines.append(f"          {{ id: '{opt['id']}', text: '{otext_escaped}' }}" + ("," if j < len(q['options']) - 1 else ""))
        q_lines.append("        ],")
        q_lines.append(f"        correctAnswer: '{q['correctAnswer']}',")
        qexp_escaped = q['explanation'].replace("'", "\\'")
        q_lines.append(f"        explanation: '{qexp_escaped}'")
        q_lines.append("      }" + ("," if i < len(slide['quiz']) - 1 else ""))
        lines.extend(q_lines)
    lines.append("    ]")
    lines.append("  }")
    return "\n".join(lines)

new_slides_js = ",\n".join(format_slide_to_js(s) for s in slides)

# Now read courseData.js
course_path = "app/src/data/courseData.js"
with open(course_path, "r", encoding="utf-8") as f:
    course_content = f.read()

# Locate from '  {\n    id: 19,' to '];\n\nexport const CODE_TEMPLATES'
target_pattern = r"(  \{\s*\n\s*id: 19,[\s\S]*?\n  \}\s*\n)(\];\s*\n\s*export const CODE_TEMPLATES)"
match = re.search(target_pattern, course_content)
if not match:
    print("ERROR: Could not locate slide 19 through slide 27 block in courseData.js!")
    exit(1)

print(f"Matched block length: {len(match.group(1))} characters")

updated_content = course_content[:match.start(1)] + new_slides_js + "\n" + course_content[match.start(2):]

with open(course_path, "w", encoding="utf-8") as f:
    f.write(updated_content)

print("Successfully replaced slides 19-27 with new slides 19-23 in courseData.js!")
