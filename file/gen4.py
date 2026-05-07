
content = r"""
\chapter{System Design}

\section{Design Approach}
ASTNS follows an \textbf{Object-Oriented Design} approach combined with \textbf{Component-Driven Architecture} on the frontend and \textbf{Layered RESTful Architecture} on the backend. The system is divided into clearly separated layers:

\begin{itemize}
  \item \textbf{Presentation Layer:} React components organised by feature (Admin pages, Guardian pages, shared components, layouts).
  \item \textbf{API Layer:} Express.js routes and controllers implementing RESTful endpoints.
  \item \textbf{Business Logic Layer:} Controller functions, Mongoose schema hooks (pre-validate, pre-save), and utility modules (token generation, email template, data parsing).
  \item \textbf{Data Layer:} MongoDB Atlas collections (Admin, Student, Subject, Token, Session).
\end{itemize}

The system is designed around two primary user roles:
\begin{enumerate}
  \item \textbf{Administrator:} Authenticated via session cookie. Has full access to the Admin Dashboard, including data upload, student management, notification dispatch, and token management.
  \item \textbf{Guardian:} Authenticated via URL token. Has read-only access to the Guardian Portal for their ward's academic data.
\end{enumerate}

\section{Detail Design}

\subsection{System Architecture}

The system architecture connects three main tiers: the client (browser), the server (Vercel serverless functions running Express.js), and the database/external services (MongoDB Atlas + Gmail SMTP).

\begin{figure}[H]
\centering
\begin{tikzpicture}[
  block/.style={rectangle,draw=primaryblue,fill=primaryblue!8,rounded corners=5pt,minimum width=3.2cm,minimum height=0.9cm,align=center,font=\small},
  bigblock/.style={rectangle,draw=accentcyan,fill=accentcyan!8,rounded corners=7pt,minimum width=3.8cm,minimum height=1.1cm,align=center,font=\small\bfseries},
  extblock/.style={rectangle,draw=successgreen,fill=successgreen!8,rounded corners=5pt,minimum width=3cm,minimum height=0.9cm,align=center,font=\small},
  dbblock/.style={cylinder,draw=warningamber,fill=warningamber!10,shape border rotate=90,minimum width=2.5cm,minimum height=1.3cm,aspect=0.3,align=center,font=\small},
  arr/.style={-{Stealth[length=3mm]},thick,draw=primaryblue!60},
  darr/.style={{Stealth[length=3mm]}-{Stealth[length=3mm]},thick,draw=primaryblue!60}
]
\node[bigblock] (fe) {React Frontend\\(Vite + Tailwind)};
\node[bigblock,below=2.2cm of fe] (be) {Express.js Backend\\(REST API)};
\node[dbblock,below=2.2cm of be] (db) {MongoDB Atlas};
\node[extblock,right=2.8cm of be] (smtp) {Gmail SMTP\\(Nodemailer)};
\node[extblock,left=2.8cm of be] (vercel) {Vercel\\(Hosting)};
\node[block,above left=0.7cm and 0.4cm of fe] (adm) {Admin Panel};
\node[block,above right=0.7cm and 0.4cm of fe] (grd) {Guardian Portal};
\node[block,above=0.7cm of fe] (login) {Login Page};
\draw[arr] (adm)--(fe); \draw[arr] (grd)--(fe); \draw[arr] (login)--(fe);
\draw[darr] (fe)--node[right,font=\scriptsize]{HTTP/JSON}(be);
\draw[darr] (be)--node[right,font=\scriptsize]{Mongoose ODM}(db);
\draw[arr] (be)--node[above,font=\scriptsize]{SMTP}(smtp);
\draw[arr] (vercel)--node[above,font=\scriptsize]{Hosts}(be);
\end{tikzpicture}
\caption{System Architecture Block Diagram}
\end{figure}

\subsection{Level 0 DFD -- Context Diagram}

The Level 0 DFD shows the system as a single process interacting with external entities.

\begin{figure}[H]
\centering
\begin{tikzpicture}[
  entity/.style={rectangle,draw=primaryblue,fill=primaryblue!10,rounded corners=4pt,minimum width=2.5cm,minimum height=0.8cm,align=center,font=\small},
  proc/.style={circle,draw=accentcyan,fill=accentcyan!10,minimum size=2.6cm,align=center,font=\small\bfseries},
  arr/.style={-{Stealth[length=3mm]},thick,draw=primaryblue!60}
]
\node[proc] (sys) {ASTNS\\System};
\node[entity,left=3.2cm of sys] (adm) {Admin};
\node[entity,right=3.2cm of sys] (grd) {Guardian};
\node[entity,below=2.2cm of sys] (db) {Database};
\node[entity,above=2.2cm of sys] (email) {Email Service};
\draw[arr] (adm)--node[above,font=\scriptsize]{Upload Data, Login}(sys);
\draw[arr] (sys)--node[above,font=\scriptsize]{Report Link}(grd);
\draw[arr] (grd)--node[below,sloped,font=\scriptsize]{Token Access}(sys);
\draw[arr] (sys)--node[right,font=\scriptsize]{Store/Retrieve}(db);
\draw[arr] (sys)--node[right,font=\scriptsize]{Send Email}(email);
\end{tikzpicture}
\caption{Level 0 DFD -- Context Diagram}
\end{figure}

\subsection{Level 1 DFD}

The Level 1 DFD decomposes the system into its major sub-processes.

\begin{figure}[H]
\centering
\begin{tikzpicture}[
  proc/.style={rectangle,draw=accentcyan,fill=accentcyan!8,rounded corners=5pt,minimum width=2.8cm,minimum height=0.8cm,align=center,font=\scriptsize\bfseries},
  store/.style={rectangle,draw=warningamber,fill=warningamber!10,minimum width=2.5cm,minimum height=0.7cm,align=center,font=\scriptsize},
  arr/.style={-{Stealth[length=2.5mm]},thick,draw=primaryblue!60},
  node distance=1.4cm
]
\node[proc] (auth) {P1: Authentication};
\node[proc,right=2cm of auth] (upload) {P2: Data Upload};
\node[proc,right=2cm of upload] (notif) {P3: Notify};
\node[proc,below=1.6cm of auth] (studmgmt) {P4: Student Mgmt};
\node[proc,below=1.6cm of upload] (tokenmgmt) {P5: Token Mgmt};
\node[proc,below=1.6cm of notif] (guardian) {P6: Guardian Portal};
\node[store,below=2.8cm of upload] (db) {D1: MongoDB Atlas};
\draw[arr] (auth)--(upload); \draw[arr] (upload)--(notif);
\draw[arr] (auth)--(studmgmt); \draw[arr] (notif)--(tokenmgmt);
\draw[arr] (tokenmgmt)--(guardian);
\draw[arr] (upload)--(db); \draw[arr] (studmgmt)--(db);
\draw[arr] (tokenmgmt)--(db); \draw[arr] (guardian)--(db);
\end{tikzpicture}
\caption{Level 1 DFD}
\end{figure}

\subsection{Use Case Diagram}

\begin{figure}[H]
\centering
\begin{tikzpicture}[
  usecase/.style={ellipse,draw=primaryblue,fill=primaryblue!8,minimum width=3cm,minimum height=0.85cm,align=center,font=\scriptsize},
  arr/.style={-{Stealth[length=2.5mm]},draw=primaryblue!60},
  sysbox/.style={rectangle,draw=bordercolor,rounded corners=7pt,minimum width=7cm,minimum height=10.5cm}
]
\node[sysbox,label={[font=\small\bfseries]above:ASTNS System}] (sys) at (0,0){};
\node[usecase] at (0,4.2)  {Login};
\node[usecase] at (0,3.0)  {Upload Academic Data};
\node[usecase] at (0,1.8)  {View Student List};
\node[usecase] at (0,0.6)  {View Student Detail};
\node[usecase] at (0,-0.6) {Send Notification};
\node[usecase] at (0,-1.8) {Manage Tokens};
\node[usecase] at (0,-3.0) {View Academic Report};
\node[font=\small\bfseries] at (-5.0,1.5) {Admin};
\node[font=\small\bfseries] at (5.0,-3.0) {Guardian};
\foreach \uc in {4.2,3.0,1.8,0.6,-0.6,-1.8}
  \draw[arr] (-3.8,1.5)--(-1.5,\uc);
\draw[arr] (3.8,-3.0)--(1.5,-3.0);
\end{tikzpicture}
\caption{Use Case Diagram}
\end{figure}

\subsection{Sequence Diagram -- Notification Flow}

\begin{figure}[H]
\centering
\begin{tikzpicture}[
  actor/.style={rectangle,draw=primaryblue,fill=primaryblue!8,rounded corners=4pt,minimum width=2.2cm,minimum height=0.7cm,align=center,font=\scriptsize\bfseries,inner sep=5pt},
  arr/.style={-{Stealth[length=2.5mm]},thick,draw=primaryblue!70},
  darr/.style={-{Stealth[length=2.5mm]},thick,dashed,draw=primaryblue!50}
]
\node[actor] (adm) at (0,0) {Admin};
\node[actor] (ui) at (4,0) {Frontend};
\node[actor] (api) at (8,0) {Express API};
\node[actor] (db) at (12,0) {MongoDB};

\draw[arr] (adm)--node[above,font=\tiny]{Select Students}(ui);
\draw[arr] (ui)--node[above,font=\tiny]{POST /mailsender/send}(api) [yshift=-0.8cm];
\draw[arr] (api)--node[above,font=\tiny]{Find Students}(db) [yshift=-1.6cm];
\draw[darr] (db)--node[above,font=\tiny]{Student Docs}(api) [yshift=-2.4cm];
\draw[arr] (api)--node[above,font=\tiny]{Create Token}(db) [yshift=-3.2cm];
\draw[darr] (db)--node[above,font=\tiny]{Token Saved}(api) [yshift=-4.0cm];
\draw[arr] (api)--node[above,font=\tiny]{Send Email}(ui) [yshift=-4.8cm];
\draw[darr] (ui)--node[above,font=\tiny]{Success Response}(adm) [yshift=-5.6cm];

\foreach \x in {0,4,8,12}
  \draw[dashed,draw=gray] (\x,-0.4)--(\x,-6.2);
\end{tikzpicture}
\caption{Sequence Diagram -- Notification Flow}
\end{figure}

\subsection{Activity Diagram -- Admin Workflow}

\begin{figure}[H]
\centering
\begin{tikzpicture}[
  start/.style={circle,fill=primaryblue,minimum size=0.5cm},
  end/.style={circle,fill=primaryblue,minimum size=0.5cm,double,double distance=2pt},
  act/.style={rectangle,draw=accentcyan,fill=accentcyan!10,rounded corners=4pt,minimum width=4cm,minimum height=0.7cm,align=center,font=\scriptsize},
  dec/.style={diamond,draw=warningamber,fill=warningamber!10,aspect=2.5,font=\scriptsize},
  arr/.style={-{Stealth[length=2.5mm]},thick,draw=primaryblue!70},
  node distance=0.8cm
]
\node[start] (s) {};
\node[act,below=0.5cm of s] (login) {Admin Login};
\node[act,below of=login] (upload) {Upload CSV/Excel};
\node[dec,below of=upload,yshift=-0.2cm] (valid) {Data Valid?};
\node[act,right=1.5cm of valid] (fix) {Show Errors};
\node[act,below=0.6cm of valid] (save) {Save to Database};
\node[act,below of=save] (select) {Select Students};
\node[act,below of=select] (send) {Dispatch Notifications};
\node[act,below of=send] (monitor) {Monitor Tokens};
\node[end,below of=monitor] (e) {};
\draw[arr] (s)--(login); \draw[arr] (login)--(upload); \draw[arr] (upload)--(valid);
\draw[arr] (valid)--node[right,font=\tiny]{No}(fix); \draw[arr] (fix)|-(upload);
\draw[arr] (valid)--node[right,font=\tiny]{Yes}(save); \draw[arr] (save)--(select);
\draw[arr] (select)--(send); \draw[arr] (send)--(monitor); \draw[arr] (monitor)--(e);
\end{tikzpicture}
\caption{Activity Diagram -- Admin Workflow}
\end{figure}

\subsection{Entity-Relationship (ER) Diagram}

\begin{figure}[H]
\centering
\begin{tikzpicture}[
  ent/.style={rectangle,draw=primaryblue,fill=primaryblue!10,minimum width=2.8cm,minimum height=0.8cm,align=center,font=\small\bfseries},
  rel/.style={diamond,draw=accentcyan,fill=accentcyan!10,aspect=2.5,font=\scriptsize},
  attr/.style={ellipse,draw=gray,fill=gray!10,minimum width=1.8cm,minimum height=0.6cm,align=center,font=\scriptsize},
  arr/.style={draw=primaryblue!70}
]
\node[ent] (student) at (0,0) {Student};
\node[ent] (semester) at (5,0) {Semester};
\node[ent] (subject) at (10,0) {Subject};
\node[ent] (token) at (0,-4) {Token};
\node[ent] (admin) at (5,-4) {Admin};

\node[rel] at (2.5,0) {has};
\node[rel] at (7.5,0) {contains};
\node[rel] at (2.5,-4) {references};

\draw[arr] (student)--(2.5,0)--(semester);
\draw[arr] (semester)--(7.5,0)--(subject);
\draw[arr] (token)--(2.5,-4)--(student);

\node[attr] at (-2,1.2) {fullName}; \draw[arr] (-2,1.2)--(student);
\node[attr] at (-2,-1.2) {urn}; \draw[arr] (-2,-1.2)--(student);
\node[attr] at (0,1.5) {guardianEmail}; \draw[arr] (0,1.5)--(student);

\node[attr] at (5,1.5) {semesterNo}; \draw[arr] (5,1.5)--(semester);
\node[attr] at (6.5,1.2) {sgpa}; \draw[arr] (6.5,1.2)--(semester);

\node[attr] at (10,1.5) {subjectCode}; \draw[arr] (10,1.5)--(subject);
\node[attr] at (11.5,0) {credits}; \draw[arr] (11.5,0)--(subject);

\node[attr] at (-1.5,-5.2) {token (hex)}; \draw[arr] (-1.5,-5.2)--(token);
\node[attr] at (0.5,-5.5) {expiresAt}; \draw[arr] (0.5,-5.5)--(token);
\node[attr] at (2,-5.2) {status}; \draw[arr] (2,-5.2)--(token);
\end{tikzpicture}
\caption{Entity-Relationship (ER) Diagram}
\end{figure}

\section{Database Design}

\subsection{Student Collection}
\begin{table}[H]
\centering
\caption{Student Collection Schema}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|l|l|p{7cm}|}
\hline
\textbf{Field} & \textbf{Type} & \textbf{Description / Constraints}\\
\hline
fullName & String & Required, trimmed\\
\hline
urn & Number & University Roll Number, unique, required\\
\hline
crn & Number & College Roll Number, required\\
\hline
course & String & Validated against courseBranchMap\\
\hline
branch & String & Validated against course-specific branches\\
\hline
admissionYear & Number & Required, minimum 2000\\
\hline
graduationYear & Number & Required, must exceed admissionYear\\
\hline
guardianEmail & String & Required, only @gmail.com addresses\\
\hline
semesters & Array & Array of Semester sub-documents\\
\hline
cgpa & Number & Auto-calculated on save, 0-10\\
\hline
\end{tabular}
\end{table}

\subsection{Subject Collection}
\begin{table}[H]
\centering
\caption{Subject Collection Schema}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|l|l|p{7cm}|}
\hline
\textbf{Field} & \textbf{Type} & \textbf{Description / Constraints}\\
\hline
subjectTitle & String & Required, trimmed\\
\hline
subjectCode & String & Required, unique, stored uppercase\\
\hline
type & String & `T' (Theory) or `P' (Practical)\\
\hline
credits & Number & Non-negative\\
\hline
maxInternalMarks & Number & Required\\
\hline
maxExternalMarks & Number & Required\\
\hline
maxTotalMarks & Number & Required; validated $\geq$ internal+external\\
\hline
minInternalPassMarks & Number & Required\\
\hline
minExternalPassMarks & Number & Required\\
\hline
minTotalPassMarks & Number & Required; validated $\leq$ maxTotalMarks\\
\hline
\end{tabular}
\end{table}

\subsection{Token Collection}
\begin{table}[H]
\centering
\caption{Token Collection Schema}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|l|l|p{7cm}|}
\hline
\textbf{Field} & \textbf{Type} & \textbf{Description / Constraints}\\
\hline
token & String & 32-char hex string, unique, auto-generated\\
\hline
student & ObjectId & Reference to Student document\\
\hline
semester & Number & Semester number for which token was generated\\
\hline
sentVia & String & Email / SMS / Both\\
\hline
status & String & Active / Used / Expired\\
\hline
expiresAt & Date & Configured expiry timestamp\\
\hline
usedAt & Date & Timestamp of first access by guardian\\
\hline
\end{tabular}
\end{table}

\subsection{Admin Collection}
\begin{table}[H]
\centering
\caption{Admin Collection Schema}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|l|l|p{7cm}|}
\hline
\textbf{Field} & \textbf{Type} & \textbf{Description / Constraints}\\
\hline
userName & String & 3-20 chars, unique, required\\
\hline
email & String & Unique, @gmail.com only, lowercase\\
\hline
password & String & bcrypt hashed (salt rounds: 12), min 8 chars\\
\hline
role & String & Enum: `admin'\\
\hline
\end{tabular}
\end{table}

\section{User Interface Design}
The Admin interface follows a dark-theme dashboard design with a fixed left sidebar for navigation. Key design decisions include:
\begin{itemize}
  \item \textbf{Sidebar Navigation:} Persistent sidebar with icons and labels for Dashboard, Upload Data, Students, Notifications, and Token Management.
  \item \textbf{Stat Cards:} The Dashboard displays summary statistics (total students, detained count, notifications sent, active tokens) as prominent card components.
  \item \textbf{Responsive Tables:} Student list and token list are displayed in responsive tables with search, filter, and pagination support.
  \item \textbf{Drag-and-Drop Upload:} The Upload Data page uses a drag-and-drop zone for file selection with real-time file type validation.
  \item \textbf{Data Preview:} A scrollable preview table shows parsed records before final submission.
  \item \textbf{Notification Form:} A two-panel layout with student selection (with search and filters) on the left and notification configuration (expiry, semester selection) on the right.
\end{itemize}

The Guardian Portal uses a clean, light-themed layout with the following sections:
\begin{itemize}
  \item Student profile card (name, URN, course, branch).
  \item SGPA trend line chart (Recharts \texttt{LineChart}).
  \item Semester accordion panels: each panel expands to show a table of subject marks.
  \item Attendance ring indicator (circle progress component).
  \item Detention alert banner (conditionally rendered).
\end{itemize}

\section{Methodology}
The development methodology was component-driven on the frontend and route-controller-model on the backend:

\textbf{Frontend Methodology:}
\begin{itemize}
  \item All UI is built as reusable React components.
  \item State management uses React Context API for global authentication state.
  \item API calls are centralised in an Axios instance configured with base URL and credentials.
  \item Protected routes use a \texttt{ProtectedRoute} wrapper component that checks authentication state before rendering admin pages.
\end{itemize}

\textbf{Backend Methodology:}
\begin{itemize}
  \item Routes are separated by resource (auth, student, mailsender, token, report).
  \item Controllers handle business logic, decoupled from route definitions.
  \item All asynchronous controller functions are wrapped in an \texttt{asyncHandler} utility to avoid repetitive try-catch blocks.
  \item Consistent JSON responses are returned via \texttt{ApiResponse} and \texttt{ApiError} utility classes.
  \item Session middleware validates admin sessions on all protected routes via an \texttt{isAuthenticated} middleware.
\end{itemize}
"""

with open("minor_final_report.tex", "a", encoding="utf-8") as f:
    f.write(content)
print("Part 4 appended (Chapter 3).")
