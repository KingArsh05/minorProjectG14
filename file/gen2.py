
content = r"""
\newpage
\begin{center}{\fontsize{16pt}{18pt}\selectfont\textbf{LIST OF FIGURES}}\end{center}
\begin{table}[H]
\renewcommand{\arraystretch}{1.3}
\centering
{\fontsize{12pt}{14pt}\selectfont
\begin{tabular*}{\textwidth}{@{\extracolsep{\fill}} l >{\raggedright\arraybackslash}p{9cm} r}
\toprule
\textbf{Fig. No.} & \textbf{Figure Description} & \textbf{Page No.}\\
\midrule
3.1 & System Architecture Block Diagram & 16\\
3.2 & Level 0 DFD -- Context Diagram & 18\\
3.3 & Level 1 DFD & 19\\
3.4 & Use Case Diagram & 21\\
3.5 & Sequence Diagram -- Notification Flow & 22\\
3.6 & Activity Diagram -- Admin Workflow & 24\\
3.7 & Entity-Relationship (ER) Diagram & 26\\
3.8 & Frontend Component Architecture Diagram & 28\\
3.9 & Deployment Diagram & 29\\
3.10 & State Machine Diagram -- Token Lifecycle & 30\\
5.1 & Login Page & 52\\
5.2 & Admin Dashboard & 53\\
5.3 & Upload Data Page & 54\\
5.4 & Student List Page & 55\\
5.5 & Student Detail Page & 56\\
5.6 & Send Notification Page & 57\\
5.7 & Token Management Page & 58\\
5.8 & Guardian Dashboard -- Part 1 & 59\\
5.9 & Guardian Dashboard -- Part 2 & 60\\
5.10 & Access Denied Page & 61\\
5.11 & Email Notification Template & 62\\
\bottomrule
\end{tabular*}}
\end{table}

\newpage
\begin{center}{\fontsize{16pt}{18pt}\selectfont\textbf{LIST OF TABLES}}\end{center}
\begin{table}[H]
\renewcommand{\arraystretch}{1.3}
\centering
{\fontsize{12pt}{14pt}\selectfont
\begin{tabular*}{\textwidth}{@{\extracolsep{\fill}} l >{\raggedright\arraybackslash}p{9cm} r}
\toprule
\textbf{Table No.} & \textbf{Table Description} & \textbf{Page No.}\\
\midrule
2.1 & Software Requirements & 9\\
2.2 & Hardware Requirements & 10\\
2.3 & Functional Requirements & 11\\
2.4 & Non-Functional Requirements & 12\\
3.1 & Student Collection Schema & 25\\
3.2 & Subject Collection Schema & 26\\
3.3 & Token Collection Schema & 27\\
3.4 & Admin Collection Schema & 27\\
4.1 & REST API Endpoints -- Authentication & 37\\
4.2 & REST API Endpoints -- Students & 38\\
4.3 & REST API Endpoints -- Notifications & 39\\
4.4 & REST API Endpoints -- Tokens & 40\\
4.5 & Test Cases -- Authentication Module & 44\\
4.6 & Test Cases -- Data Upload Module & 45\\
4.7 & Test Cases -- Notification Module & 46\\
4.8 & Test Cases -- Guardian Portal & 47\\
\bottomrule
\end{tabular*}}
\end{table}

\newpage
\begin{center}{\fontsize{16pt}{18pt}\selectfont\textbf{TABLE OF CONTENTS}}\end{center}
\vspace{0.5cm}
\renewcommand{\arraystretch}{1.4}
{\fontsize{12pt}{14pt}\selectfont
\begin{longtable}{@{} l @{\hspace{1cm}} r @{}}
\textbf{Certificate} & \textbf{i}\\
\textbf{Abstract} & \textbf{ii}\\
\textbf{Acknowledgement} & \textbf{iii}\\
\textbf{List of Figures} & \textbf{iv}\\
\textbf{List of Tables} & \textbf{v}\\
\textbf{Table of Contents} & \textbf{vi}\\
\addlinespace[0.3cm]
\textbf{Chapter 1: Introduction} & \textbf{1}\\
\quad 1.1\quad Introduction to Project & 1\\
\quad 1.2\quad Project Category & 3\\
\quad 1.3\quad Problem Formulation & 3\\
\quad 1.4\quad Identification / Recognition of Need & 4\\
\quad 1.5\quad Existing System & 5\\
\quad 1.6\quad Objectives & 6\\
\quad 1.7\quad Proposed System & 7\\
\quad 1.8\quad Unique Features of the Proposed System & 8\\
\addlinespace[0.3cm]
\textbf{Chapter 2: Requirement Analysis and System Specification} & \textbf{9}\\
\quad 2.1\quad Feasibility Study & 9\\
\quad 2.2\quad Software Requirement Specification Document & 11\\
\quad 2.3\quad SDLC Model to be Used & 15\\
\addlinespace[0.3cm]
\textbf{Chapter 3: System Design} & \textbf{16}\\
\quad 3.1\quad Design Approach & 16\\
\quad 3.2\quad Detail Design & 17\\
\quad 3.3\quad User Interface Design & 31\\
\quad 3.4\quad Methodology & 34\\
\addlinespace[0.3cm]
\textbf{Chapter 4: Implementation and Testing} & \textbf{36}\\
\quad 4.1\quad Introduction to Languages, IDEs, Tools and Technologies & 36\\
\quad 4.2\quad Algorithm / Pseudocode & 41\\
\quad 4.3\quad Testing Techniques & 43\\
\quad 4.4\quad Test Cases & 44\\
\addlinespace[0.3cm]
\textbf{Chapter 5: Results and Discussions} & \textbf{51}\\
\quad 5.1\quad User Interface Representation & 51\\
\quad 5.2\quad Snapshots with Details & 52\\
\quad 5.3\quad Backend Database Representation & 63\\
\addlinespace[0.3cm]
\textbf{Chapter 6: Conclusion and Future Scope} & \textbf{65}\\
\addlinespace[0.3cm]
\textbf{References / Bibliography} & \textbf{68}\\
\textbf{Appendix A: Project Setup Guide} & \textbf{69}\\
\end{longtable}}

\newpage
\pagenumbering{arabic}
\setcounter{page}{1}
"""

with open("minor_final_report.tex", "a", encoding="utf-8") as f:
    f.write(content)
print("Part 2 appended (Lists + TOC).")
