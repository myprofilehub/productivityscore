with open('app/src/data/courseData.js', 'r', encoding='utf-8') as f:
    text = f.read()

prefix, rest = text.split('export const SLIDES = [', 1)
slides_code, suffix = rest.split('export const CODE_TEMPLATES = [', 1)

marker = '1. The Pitch: Why Score Projection Needs Machine Learning'
pos = slides_code.find(marker)
if pos != -1:
    open_brace = slides_code.rfind('{', 0, pos)
    # find closing of this slide: next slide starts with id: 4,
    next_slide_pos = slides_code.find('id: 4,', pos)
    comma_before_next = slides_code.rfind('{', pos, next_slide_pos)
    slides_code = slides_code[:open_brace] + slides_code[comma_before_next:]
    print("Removed slide 3")
else:
    print("Marker not found")

import re
counter = [0]
def repl(m):
    counter[0] += 1
    return f'id: {counter[0]},'

slides_code_renumbered = re.sub(r'\bid:\s*\d+,', repl, slides_code)
print(f"Total remaining slides: {counter[0]}")

new_text = prefix + 'export const SLIDES = [' + slides_code_renumbered + 'export const CODE_TEMPLATES = [' + suffix
with open('app/src/data/courseData.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Updated courseData.js successfully")
