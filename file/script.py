import re

with open('midTermReport.tex', 'r', encoding='utf-8') as f:
    content = f.read()

# Add \usepackage{float}
if '\\usepackage{float}' not in content:
    content = content.replace('\\usepackage{caption}', '\\usepackage{float}\n\\usepackage{caption}')

# Convert center -> figure[H]
pattern = r'\\begin\{center\}\s*(\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\})\s*\\captionof\{figure\}\{(.*?)\}\s*\\end\{center\}'
replacement = r'\\begin{figure}[H]\n\\centering\n\g<1>\n\\caption{\g<2>}\n\\end{figure}'

content = re.sub(pattern, replacement, content)

# Fix the SubjectPerformance node attribute from below to above
content = content.replace('\\node[attr, below=0.5cm of performance, align=center]', '\\node[attr, above=0.5cm of performance, align=center]')

with open('midTermReport.tex', 'w', encoding='utf-8') as f:
    f.write(content)
