
content = r"""
\chapter{Introduction}

\section{Introduction to Project}
The \textbf{Academic Status Transparency Notification System} (ASTNS) is a full-stack web application designed and developed to address a persistent problem in higher education institutions: the lack of timely, structured communication between colleges and the parents or guardians of enrolled students. The system targets engineering colleges affiliated with I.K. Gujral Punjab Technical University (IKGPTU), which serve thousands of students spread across numerous courses and branches.

In most institutions, academic results are published on the university's official portal. However, this portal requires students to actively check their marks, and there is no mechanism that directly informs parents or guardians about their ward's performance. Parents who are less tech-savvy, reside in rural areas, or are unfamiliar with university portals are effectively excluded from accessing this information. The consequences are severe: students with declining grades, attendance shortages, or detention status can conceal this information from their guardians until irreversible damage to their academic career has already occurred.

ASTNS resolves this by automating the complete pipeline from data entry to guardian notification. An institutional administrator logs into a secure, session-authenticated web dashboard. From there, the administrator can upload bulk student academic records from CSV or Excel files, review the parsed data in a preview table, and dispatch personalised email notifications with a single click. Each email contains a unique, cryptographically generated 32-character hex token embedded in a hyperlink. When the guardian clicks the link, the system validates the token and renders a dedicated Guardian Portal showing the student's full academic history.

The Guardian Portal displays: the student's name, university roll number, course, branch, semester-wise SGPA as an interactive line chart, detailed subject-wise marks tables for each semester (showing internal marks, external marks, total, and detention status per subject), an attendance ring indicator, and a button to download the report as a PDF. Crucially, guardians access all this without creating an account or remembering a password -- the token itself serves as the authentication credential.

The system is built using the MERN technology stack: React 19 with Vite as the build tool and Tailwind CSS 4 for styling on the frontend; Express.js 5 for the backend REST API; MongoDB Atlas as the cloud-hosted NoSQL database; and Nodemailer for SMTP-based email delivery. The application is deployed on Vercel as a serverless application.

The project was developed by a team of three students from the Department of Computer Science and Engineering, GNDEC Ludhiana, as part of the Minor Project requirement for the sixth semester of the B.Tech (CSE) programme.

\section{Project Category}
ASTNS is an \textbf{Application-Based} project. It is a production-ready, full-stack web application that solves a real-world institutional problem using modern web development technologies. The project does not involve theoretical research or hardware components; instead, it focuses on software engineering, system design, database management, RESTful API development, and user interface design.

The project can further be classified under the category of \textbf{Educational Technology (EdTech)} and \textbf{Institutional Communication Systems}.

\section{Problem Formulation}
The core problem addressed by ASTNS can be stated as follows:

\textit{There is no automated, secure, and accessible mechanism in most IKGPTU-affiliated engineering colleges for proactively communicating a student's academic status -- including detention flags, SGPA trends, and subject-wise performance -- to their parents or guardians.}

This problem has several dimensions:

\begin{itemize}
  \item \textbf{Information Asymmetry:} Students have access to their academic data, but parents do not unless the student chooses to share it.
  \item \textbf{Portal Complexity:} The university portal requires valid login credentials and technical familiarity, making it inaccessible to many parents.
  \item \textbf{Delayed Intervention:} By the time parents learn about their ward's academic difficulties, the student may have already been officially detained or failed multiple subjects.
  \item \textbf{No Aggregated View:} Even if a parent accesses the university portal, results are displayed per subject and per semester without any aggregated summary, trend analysis, or visual representation.
  \item \textbf{Administrative Burden:} Generating and sending individual academic reports manually is highly time-consuming for faculty and administrative staff.
\end{itemize}

These problems collectively result in reduced parental engagement, lower student accountability, and avoidable academic failures.

\section{Identification / Recognition of Need}
The need for a system like ASTNS was identified through the following observations:

\begin{enumerate}
  \item Engineering colleges under IKGPTU publish provisional results and attendance statements on the university portal, but these are not pushed to parents automatically.
  \item Detention is a critical academic consequence: a student detained in internal exams cannot appear in the university (external) examination, severely affecting their academic year. Parents are often unaware of this until after the examination period.
  \item Research in educational communication systems (Benablo et al., 2014) demonstrates that push-based notification systems -- systems that proactively send information to parents rather than requiring parents to pull the information -- significantly improve parental awareness and student accountability.
  \item HCI research indicates that complex login mechanisms reduce user engagement. A password-less access mechanism using secure deep-link tokens removes friction and increases the likelihood that guardians will actually view the shared reports.
  \item The increasing penetration of smartphones and email access in semi-urban and rural India makes an email-based notification system feasible even for parents outside major cities.
\end{enumerate}

\section{Existing System}
The existing mechanisms for academic communication in IKGPTU-affiliated colleges are as follows:

\begin{itemize}
  \item \textbf{University Portal:} Students and registered users can view results and attendance on the IKGPTU portal. However, parents must independently register and navigate the portal, which has low usability for non-technical users.
  \item \textbf{Physical Parent-Teacher Meetings (PTMs):} Colleges organise PTMs periodically, but these are infrequent, time-consuming, and often poorly attended.
  \item \textbf{Physical Letters or SMS:} Some colleges send bulk SMS alerts for attendance shortage or detention, but these are brief, lack detail, and provide no academic context.
  \item \textbf{Manual Report Cards:} Some institutions print result cards and send them home with students, but this is easily intercepted and is not reliable.
  \item \textbf{Generic ERP Portals:} A few institutions have subscribed to third-party ERP systems that include parent portals, but these require parents to create and maintain accounts, which reduces adoption.
\end{itemize}

\textbf{Limitations of the Existing System:}
\begin{itemize}
  \item No direct, automated push of academic data to parents.
  \item High friction for parents to access information (requires account creation and login).
  \item No aggregated academic summaries or trend visualisation.
  \item Delayed communication leading to late parental intervention.
  \item Vulnerable to student-side interception (physical letters, manual sharing).
\end{itemize}

\section{Objectives}
The primary objectives of the ASTNS project are:

\begin{enumerate}
  \item To design and develop a secure, session-based Admin Dashboard that allows institutional administrators to manage student academic data efficiently.
  \item To implement a bulk data upload module that accepts CSV and Excel files, parses student academic records, validates the data, and stores it in a cloud database.
  \item To develop an automated email notification pipeline that generates unique, cryptographically secure, time-limited access tokens for each guardian and dispatches personalised HTML emails containing secure report links.
  \item To create a token-authenticated Guardian Portal that renders a student's complete academic profile -- including semester-wise SGPA charts, subject-wise marks, and detention status -- without requiring guardians to create an account.
  \item To implement a Token Management module that allows administrators to view, revoke, and monitor the lifecycle of all generated access tokens.
  \item To deploy the complete application on a serverless cloud platform (Vercel) ensuring high availability and scalability without infrastructure management overhead.
\end{enumerate}

\section{Proposed System}
The proposed Academic Status Transparency Notification System (ASTNS) is a full-stack web application that digitises and automates the entire academic communication pipeline. The system operates as follows:

\textbf{Administrator Side:}
\begin{enumerate}
  \item The administrator logs into the secure Admin Dashboard using email and password credentials. Sessions are managed using server-side session storage and signed cookies.
  \item From the Upload Data module, the administrator selects the relevant course, branch, and semester, then uploads a CSV or Excel file containing student academic records.
  \item The system parses the file, validates each record against the database schema constraints (e.g., valid marks ranges, recognised course-branch combinations), and displays a preview of the parsed data for review.
  \item Upon confirmation, the records are saved to the MongoDB Atlas cloud database.
  \item From the Send Notification module, the administrator selects the students for whom notifications should be dispatched and configures the token expiry duration (24 hours, 48 hours, 72 hours, or 7 days).
  \item The system generates a unique 32-character hexadecimal token for each selected student using Node.js's \texttt{crypto} module, stores the token in the database with an expiry timestamp, constructs a personalised guardian portal URL, and dispatches an HTML email to the guardian's registered email address via Gmail SMTP.
  \item The administrator can monitor all generated tokens from the Token Management module, view their status (Active, Used, Expired), and manually revoke tokens if required.
\end{enumerate}

\textbf{Guardian Side:}
\begin{enumerate}
  \item The guardian receives an HTML email containing a ``View Report'' button linked to the Guardian Portal URL with the embedded token.
  \item Clicking the link opens the Guardian Portal in a browser. The system validates the token: if it is valid and active, the student's academic data is rendered; if it is expired or revoked, an Access Denied page is displayed.
  \item The guardian views the student's academic profile, SGPA trend chart, semester-wise mark breakdown, and detention indicators.
  \item The guardian can download the report as a PDF for record-keeping.
\end{enumerate}

\section{Unique Features of the Proposed System}
\begin{itemize}
  \item \textbf{Password-less Guardian Access:} Eliminates the need for guardians to create accounts or remember passwords. The token embedded in the email link is the sole authentication credential, dramatically reducing access friction.
  \item \textbf{Cryptographic Token Security:} Each access token is generated using \texttt{crypto.randomBytes(16)} in Node.js, producing a 32-character hexadecimal string that is computationally infeasible to guess or brute-force.
  \item \textbf{Configurable Token Expiry:} Administrators can set token validity to 24 hours, 48 hours, 72 hours, or 7 days, balancing security and convenience.
  \item \textbf{Bulk Data Upload with Preview:} Supports drag-and-drop CSV and Excel uploading with real-time parsing and a data preview table, allowing administrators to verify records before committing to the database.
  \item \textbf{Interactive SGPA Trend Chart:} Uses Recharts to render a responsive line chart of the student's SGPA across all semesters, providing a quick visual summary of academic trajectory.
  \item \textbf{Serverless Deployment:} The entire application (frontend SPA and backend API) is deployed on Vercel as serverless functions, ensuring zero infrastructure management and automatic scaling.
  \item \textbf{Multi-Course, Multi-Branch Support:} The system supports all IKGPTU courses (B.Tech, M.Tech, MBA, MCA, BCA, B.Arch, B.Voc, B.Com, BBA) and their respective branches through a centralised \texttt{courseBranchMap} validation utility.
\end{itemize}

\chapter{Requirement Analysis and System Specification}

\section{Feasibility Study}
A feasibility study evaluates whether the proposed system is practical, beneficial, and viable to develop. The ASTNS was evaluated across three dimensions of feasibility.

\subsection{Technical Feasibility}
The ASTNS is built entirely on the MERN stack -- MongoDB, Express.js, React, and Node.js -- which is one of the most widely adopted technology stacks for full-stack web applications. All components are open-source, well-documented, and have large, active developer communities.

\begin{itemize}
  \item \textbf{Frontend:} React 19 (with Vite 7 and Tailwind CSS 4) provides a component-driven, declarative UI framework. Recharts 3 is used for data visualisation. React Hook Form 7 handles form management and validation.
  \item \textbf{Backend:} Express.js 5 provides a minimal, flexible Node.js web framework for building the REST API. Mongoose 9 is used as the Object Document Mapper (ODM) for MongoDB.
  \item \textbf{Database:} MongoDB Atlas (M0 Free Tier) provides a fully managed, cloud-hosted NoSQL database with automatic scaling, backups, and a web-based management UI.
  \item \textbf{Email:} Nodemailer 8 integrates with Gmail SMTP to dispatch HTML emails. The \texttt{crypto} module (built into Node.js) is used for token generation.
  \item \textbf{Deployment:} Vercel provides serverless hosting for both the React SPA and the Express.js API. No server management is required.
\end{itemize}

The development team has proficiency in all the above technologies acquired during the B.Tech coursework. The required tools (VS Code, Node.js, Git, MongoDB Compass, Postman) are freely available. The project is therefore technically feasible.

\subsection{Operational Feasibility}
The ASTNS is operationally feasible for the following reasons:

\begin{itemize}
  \item Institutional administrators already maintain student academic records in Excel or CSV formats. The system's bulk upload module is directly compatible with these existing workflows.
  \item The Admin Dashboard is designed for minimal training. An administrator unfamiliar with the system can learn to upload data and dispatch notifications within one session.
  \item Parents and guardians interact only with the Guardian Portal, which requires no technical knowledge -- simply clicking a link in an email and viewing the report.
  \item The email-based notification system leverages a communication channel (email) that is already widely used for institutional communication.
  \item The serverless deployment model ensures the system is always available without requiring dedicated IT staff to manage servers.
\end{itemize}

\subsection{Economic Feasibility}
The ASTNS is economically feasible because all components are either free or available on free-tier plans:

\begin{itemize}
  \item \textbf{MongoDB Atlas M0:} Free tier with 512 MB of storage, sufficient for a college with up to 5,000 students.
  \item \textbf{Vercel Hobby Plan:} Free for personal and academic projects, with support for serverless functions.
  \item \textbf{Gmail SMTP:} Free to use with a Gmail account (subject to daily sending limits of 500 emails per day, extendable with Google Workspace).
  \item \textbf{All frameworks and libraries:} Open-source and free.
\end{itemize}

Total development cost is essentially zero beyond the cost of development machines (already owned by the team) and internet connectivity.

\section{Software Requirement Specification Document}

\subsection{Software Requirements}

\begin{table}[H]
\centering
\caption{Software Requirements}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|p{3.5cm}|p{4cm}|p{5cm}|}
\hline
\textbf{Category} & \textbf{Technology} & \textbf{Version / Details}\\
\hline
Runtime Environment & Node.js & v20.x LTS\\
\hline
Frontend Framework & React & 19.2.0\\
\hline
Build Tool & Vite & 7.3.1\\
\hline
CSS Framework & Tailwind CSS & 4.2.1\\
\hline
Data Visualisation & Recharts & 3.7.0\\
\hline
Form Management & React Hook Form & 7.71.2\\
\hline
HTTP Client & Axios & 1.13.6\\
\hline
Routing & React Router DOM & 7.13.1\\
\hline
Icon Library & Lucide React & 0.575.0\\
\hline
Backend Framework & Express.js & 5.2.1\\
\hline
Database & MongoDB Atlas & M0 Free Tier\\
\hline
ODM & Mongoose & 9.2.3\\
\hline
Email Service & Nodemailer & 8.0.1\\
\hline
Deployment Platform & Vercel & Serverless Functions\\
\hline
Version Control & Git + GitHub & Latest\\
\hline
IDE & VS Code & Latest\\
\hline
API Testing & Postman & Latest\\
\hline
Browser & Chrome, Firefox, Safari & Latest\\
\hline
OS & Windows / macOS & Development\\
\hline
\end{tabular}
\end{table}

\subsection{Hardware Requirements}

\begin{table}[H]
\centering
\caption{Hardware Requirements}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|p{3.5cm}|p{9cm}|}
\hline
\textbf{Component} & \textbf{Minimum Specification}\\
\hline
Processor & Intel Core i5 (8th Gen or higher) / Apple M1 or equivalent\\
\hline
RAM & 8 GB (16 GB recommended for development)\\
\hline
Storage & 256 GB SSD\\
\hline
Network & Broadband Internet (required for MongoDB Atlas, SMTP, Vercel)\\
\hline
Display & 1366 $\times$ 768 resolution or higher\\
\hline
\end{tabular}
\end{table}

\subsection{Functional Requirements}

\begin{table}[H]
\centering
\caption{Functional Requirements}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|p{1cm}|p{3cm}|p{9cm}|}
\hline
\textbf{FR\#} & \textbf{Module} & \textbf{Requirement}\\
\hline
FR1 & Authentication & The system shall allow administrators to log in using email and password. Sessions shall be maintained using signed HTTP cookies.\\
\hline
FR2 & Authentication & The system shall allow administrators to log out, invalidating the current session.\\
\hline
FR3 & Data Upload & The system shall accept CSV and Excel files for bulk upload of student academic records.\\
\hline
FR4 & Data Upload & The system shall validate uploaded records against schema constraints (valid marks, course-branch mapping) before persisting to the database.\\
\hline
FR5 & Data Upload & The system shall display a preview of parsed records for administrator review before final submission.\\
\hline
FR6 & Student Mgmt & The system shall display a searchable, filterable list of all students in the database.\\
\hline
FR7 & Student Mgmt & The system shall display a detailed academic profile for each student, including all semesters and subject marks.\\
\hline
FR8 & Notification & The system shall generate a unique cryptographic token for each selected student and persist it with an expiry timestamp.\\
\hline
FR9 & Notification & The system shall dispatch an HTML email to each guardian containing a personalised report link with the embedded token.\\
\hline
FR10 & Token Mgmt & The system shall display all generated tokens with their current status (Active, Used, Expired).\\
\hline
FR11 & Token Mgmt & The system shall allow administrators to manually revoke any active token.\\
\hline
FR12 & Guardian Portal & The system shall validate a provided token and render the student's academic report if the token is valid and active.\\
\hline
FR13 & Guardian Portal & The system shall display an Access Denied page if the token is expired, revoked, or invalid.\\
\hline
\end{tabular}
\end{table}

\subsection{Non-Functional Requirements}

\begin{table}[H]
\centering
\caption{Non-Functional Requirements}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|p{2.5cm}|p{10cm}|}
\hline
\textbf{Category} & \textbf{Requirement}\\
\hline
Security & All API routes (except token validation and guardian report) shall require an authenticated admin session. Tokens shall be generated using cryptographically secure random bytes.\\
\hline
Performance & The Guardian Portal shall load student data within 2 seconds under normal network conditions.\\
\hline
Scalability & The serverless deployment on Vercel shall automatically scale to handle concurrent guardian accesses during peak result announcement periods.\\
\hline
Reliability & The email dispatch module shall use \texttt{Promise.allSettled} to ensure that a failure for one student does not abort the entire batch notification.\\
\hline
Usability & The Guardian Portal shall require zero technical knowledge from the guardian -- clicking a hyperlink shall be the only required action.\\
\hline
Maintainability & All backend API routes shall follow a consistent RESTful naming convention. All frontend components shall be modular and reusable.\\
\hline
Compatibility & The Guardian Portal shall render correctly on Chrome, Firefox, Safari, and Edge on both desktop and mobile devices.\\
\hline
\end{tabular}
\end{table}

\section{SDLC Model to be Used}
The project adopted the \textbf{Agile Software Development Life Cycle} model with iterative sprints. Each sprint lasted one week and focused on a specific deliverable. The rationale for choosing Agile over Waterfall or Spiral models is:

\begin{itemize}
  \item \textbf{Flexibility:} Requirements for the Guardian Portal evolved during development (e.g., adding the attendance ring indicator and PDF download features). Agile accommodated these changes without requiring a full redesign.
  \item \textbf{Incremental Delivery:} Each sprint produced a testable, working module (Authentication, Upload, Notification, Guardian Portal, Token Management, Dashboard), allowing continuous verification of functionality.
  \item \textbf{Early Bug Detection:} Testing at the end of each sprint ensured bugs were caught and fixed before they propagated to subsequent modules.
  \item \textbf{Team Coordination:} The three-member team divided work by frontend, backend, and integration responsibilities, with daily sync-up meetings to track progress.
\end{itemize}

\textbf{Sprint Breakdown:}
\begin{enumerate}
  \item Sprint 1 (Week 1): Requirement analysis, system design, database schema design.
  \item Sprint 2 (Week 2): Backend -- Admin model, authentication API, session management.
  \item Sprint 3 (Week 3): Backend -- Student and Subject models, data upload API.
  \item Sprint 4 (Week 4): Backend -- Notification API, token generation, email dispatch.
  \item Sprint 5 (Week 5): Backend -- Token management API, report/guardian API.
  \item Sprint 6 (Week 6): Frontend -- Login page, Admin Layout, Sidebar, Dashboard.
  \item Sprint 7 (Week 7): Frontend -- Upload Data, Student List, Student Detail pages.
  \item Sprint 8 (Week 8): Frontend -- Send Notification, Token Management pages.
  \item Sprint 9 (Week 9): Frontend -- Guardian Dashboard, Access Denied pages.
  \item Sprint 10 (Week 10): Integration testing, bug fixes, deployment to Vercel.
\end{enumerate}
"""

with open("minor_final_report.tex", "a", encoding="utf-8") as f:
    f.write(content)
print("Part 3 appended (Chapters 1-2).")
