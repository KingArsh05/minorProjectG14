
sections = []

# --- PREAMBLE ---
sections.append(r"""\documentclass[12pt,a4paper]{report}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage[a4paper,left=3.5cm,right=1.25cm,top=2.5cm,bottom=1.25cm]{geometry}
\usepackage{setspace}
\usepackage{times}
\usepackage{titlesec}
\usepackage{float}
\usepackage{caption}
\usepackage{hyperref}
\usepackage{booktabs}
\usepackage{array}
\usepackage{longtable}
\usepackage{fancyhdr}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{tikz}
\usetikzlibrary{shapes.geometric,arrows.meta,positioning,calc,fit,backgrounds}
\definecolor{primaryblue}{HTML}{6366F1}
\definecolor{accentcyan}{HTML}{06B6D4}
\definecolor{successgreen}{HTML}{22C55E}
\definecolor{warningamber}{HTML}{F59E0B}
\definecolor{bordercolor}{HTML}{252840}
\doublespacing
\pagestyle{fancy}
\fancyhf{}
\fancyfoot[C]{\thepage}
\renewcommand{\headrulewidth}{0pt}
\setlength{\footskip}{1.5cm}
\fancypagestyle{plain}{\fancyhf{}\fancyfoot[C]{\thepage}\renewcommand{\headrulewidth}{0pt}}
\begin{document}
""")

# --- TITLE PAGE ---
sections.append(r"""
\begin{titlepage}
\centering
\thispagestyle{empty}
{\fontsize{24pt}{28pt}\selectfont\bfseries Academic Status Transparency\\Notification System\par}
\vspace{0.5cm}
{\fontsize{14pt}{18pt}\selectfont\bfseries MINOR PROJECT REPORT\par}
\vspace{0.8cm}
{\fontsize{12pt}{14pt}\selectfont SUBMITTED IN PARTIAL FULFILMENT OF THE REQUIREMENTS FOR THE AWARD OF THE DEGREE OF\par}
\vspace{0.5cm}
{\fontsize{14pt}{18pt}\selectfont\textbf{BACHELOR OF TECHNOLOGY}\\Computer Science and Engineering\par}
\vspace{1.2cm}
\includegraphics[width=0.32\textwidth]{assets/image.png}\par
\vspace{1cm}
{\fontsize{13pt}{16pt}\selectfont
\begin{minipage}[t]{0.60\textwidth}
\raggedright
\textbf{Submitted By:}\\
ARSHDEEP ANAND \hspace{0.1cm}(2302481)\\
NISHTHA JAIN \hspace{0.1cm}(2302627)\\
BALKRISHAN SINGH \hspace{0.1cm}(2302492)\\
\end{minipage}%
\hfill
\begin{minipage}[t]{0.35\textwidth}
\textbf{Submitted To:}\\
Dr. Kapil Sharma\\
Assistant Professor\\
Dept. of CSE
\end{minipage}}
\vspace{1.2cm}
{\fontsize{14pt}{18pt}\selectfont\bfseries DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\\GURU NANAK DEV ENGINEERING COLLEGE\\LUDHIANA -- 141006\par}
\vspace{0.3cm}
{\fontsize{12pt}{14pt}\selectfont MAY, 2026\par}
\end{titlepage}
""")

# --- CERTIFICATE ---
sections.append(r"""
\pagenumbering{roman}
\newpage
\begin{center}{\fontsize{16pt}{18pt}\selectfont\textbf{CERTIFICATE}}\end{center}
\vspace{1cm}
\noindent This is to certify that the minor project report entitled \textbf{``Academic Status Transparency Notification System''} is a bona fide record of the project work carried out by \textbf{Arshdeep Anand (URN: 2302481), Nishtha Jain (URN: 2302627), and Balkrishan Singh (URN: 2302492)} under my supervision and guidance, in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in Computer Science and Engineering from Guru Nanak Dev Engineering College, Ludhiana, affiliated to I.K. Gujral Punjab Technical University, Kapurthala. The work embodied in this report has not been submitted elsewhere for the award of any other degree or diploma to the best of my knowledge and belief.

\vspace{3cm}
\noindent\textbf{Dr. Kapil Sharma}\\
Assistant Professor\\
Department of Computer Science and Engineering\\
Guru Nanak Dev Engineering College, Ludhiana

\vspace{2cm}
\noindent\textbf{Dr. Kiran Jyoti}\\
Head of Department\\
Department of Computer Science and Engineering\\
Guru Nanak Dev Engineering College, Ludhiana
""")

# --- ABSTRACT ---
sections.append(r"""
\newpage
\begin{center}{\fontsize{16pt}{18pt}\selectfont\textbf{ABSTRACT}}\end{center}
\noindent
The \textbf{Academic Status Transparency Notification System} (ASTNS) is a full-stack web application built to bridge the communication gap between engineering colleges affiliated to I.K. Gujral Punjab Technical University (IKGPTU) and the parents/guardians of enrolled students. In the prevailing academic ecosystem, result data is published on university portals but parents often remain unaware of their ward's detention status, declining semester grade point averages (SGPA), or poor subject-wise performance until it is too late for timely corrective intervention.

ASTNS eliminates this information asymmetry by automating the entire academic notification pipeline. Administrators at the institution log into a secure dashboard, upload bulk academic data via CSV or Excel files, review the parsed student records, and dispatch personalised email notifications. Each email contains a unique, cryptographically generated, time-limited hyperlink. Clicking the link opens the Guardian Portal -- a read-only, token-authenticated dashboard that presents the student's complete academic profile: semester-wise marks, internal and external scores per subject, SGPA trend chart, attendance indicator, and detention flags, all rendered without any login requirement for the guardian.

The system is implemented using the MERN stack: React 19 with Vite and Tailwind CSS on the frontend, Express.js 5 on the backend, and MongoDB Atlas as the cloud database. Email delivery is handled by Nodemailer over Gmail SMTP. The entire application is deployed serverlessly on Vercel.

Key contributions of the project include: (1) a drag-and-drop bulk upload interface with real-time data preview, (2) a cryptographic token lifecycle management module that tracks active, expired, and revoked access tokens, (3) an interactive line chart for visualising SGPA trends across semesters, and (4) a responsive Guardian Dashboard accessible on any device without requiring a guardian account.

System testing covered authentication, CSV parsing, notification dispatch, token validation, token revocation, chart rendering, and cross-browser compatibility. All major test cases passed successfully. The application demonstrates that modern web technologies can significantly improve academic transparency and parental engagement in higher education institutions.
""")

# --- ACKNOWLEDGEMENT ---
sections.append(r"""
\newpage
\begin{center}{\fontsize{16pt}{18pt}\selectfont\textbf{ACKNOWLEDGEMENT}}\end{center}
\noindent
We are highly grateful to Dr. Sehijpal Singh, Principal, Guru Nanak Dev Engineering College (GNDEC), Ludhiana, for providing us this opportunity to carry out the minor project work.

The constant guidance and encouragement received from Dr. Kiran Jyoti, Head of Department, CSE, GNDEC Ludhiana, has been of great help in carrying out the project work and is acknowledged with reverential thanks.

We would like to express a deep sense of gratitude and thanks profusely to our Project Guide, \textbf{Dr. Kapil Sharma}, Assistant Professor, Department of CSE, GNDEC Ludhiana; without his wise counsel and able guidance, it would have been impossible to complete the project in this manner.

We also express gratitude to other faculty members of the Department of Computer Science and Engineering of GNDEC for their intellectual support throughout the course of this work. Finally, we are indebted to all who have contributed to this report.

\vspace{1cm}
\noindent\textbf{Arshdeep Anand} \hfill URN: 2302481\\
\noindent\textbf{Nishtha Jain} \hfill URN: 2302627\\
\noindent\textbf{Balkrishan Singh} \hfill URN: 2302492\\
""")

with open("minor_final_report.tex", "w", encoding="utf-8") as f:
    f.write("\n".join(sections))

print("Part 1 written (preamble to acknowledgement).")
