
content = r"""
\chapter{Implementation and Testing}

\section{Introduction to Languages, IDEs, Tools and Technologies}

\subsection{JavaScript / ES2022+}
JavaScript is the primary programming language used for both the frontend and backend of ASTNS. Modern ES2022+ features used in the project include: arrow functions, async/await, destructuring assignment, optional chaining (\texttt{?.}), nullish coalescing (\texttt{??}), template literals, and ES modules (\texttt{import}/\texttt{export}).

\subsection{React 19}
React is an open-source JavaScript library for building user interfaces. ASTNS uses React 19, which introduces improved concurrent rendering and server-side rendering support. Key React concepts used in the project:
\begin{itemize}
  \item \textbf{Functional Components:} All UI components are written as functions using hooks.
  \item \textbf{useState / useEffect:} For local state management and side-effect handling.
  \item \textbf{useContext:} For global authentication state via \texttt{AuthContext}.
  \item \textbf{React Router DOM v7:} For client-side routing between Admin pages and Guardian Portal.
  \item \textbf{React Hook Form v7:} For form state management and validation.
\end{itemize}

\subsection{Vite 7}
Vite is a fast build tool for frontend development. It provides hot module replacement (HMR) during development and optimised production builds. ASTNS uses Vite for its near-instant dev server startup and efficient bundling.

\subsection{Tailwind CSS 4}
Tailwind CSS is a utility-first CSS framework. Instead of pre-built components, Tailwind provides low-level utility classes that allow developers to build custom designs directly in HTML/JSX markup. ASTNS uses Tailwind for all layout, typography, colour, and responsive design.

\subsection{Node.js v20 LTS}
Node.js is the JavaScript runtime environment used to run the backend server. ASTNS uses Node.js v20 (Long-Term Support), which provides improved performance through the V8 engine v11.3.

\subsection{Express.js 5}
Express.js is a minimal, un-opinionated web framework for Node.js. ASTNS uses Express.js v5, which introduces improved error handling (async errors are now automatically forwarded to error middleware without explicit \texttt{next(err)} calls).

Key Express.js features used:
\begin{itemize}
  \item Middleware pipeline (body parser, cookie parser, CORS, session validation).
  \item Router-based route modularisation.
  \item Error handling middleware for consistent API error responses.
\end{itemize}

\subsection{MongoDB Atlas + Mongoose 9}
MongoDB Atlas is the cloud-hosted deployment of MongoDB, a document-oriented NoSQL database. ASTNS uses the M0 free tier cluster. Mongoose provides schema-based modelling for MongoDB documents, with built-in validation, middleware hooks, and population (joins via references).

Key Mongoose features used in ASTNS:
\begin{itemize}
  \item \texttt{pre('validate')} hook: Used in \texttt{SubjectPerformance} schema to auto-calculate \texttt{totalMarks} and set \texttt{status} (Pass/Detained) before validation.
  \item \texttt{pre('save')} hook: Used in \texttt{Student} schema to auto-calculate \texttt{cgpa} from all semester SGPAs.
  \item \texttt{populate()}: Used in student and token controllers to resolve ObjectId references into full documents.
  \item \texttt{aggregate()}: Used in the dashboard stats controller for branch distribution and average CGPA calculations.
\end{itemize}

\subsection{Nodemailer 8}
Nodemailer is a Node.js module for sending emails. ASTNS uses Nodemailer with Gmail SMTP (port 465, SSL) to dispatch HTML-formatted notification emails. The email template includes the student's name, the guardian's name, and a styled ``View Report'' button containing the token URL.

\subsection{Vercel}
Vercel is a cloud platform for frontend frameworks and serverless functions. ASTNS deploys:
\begin{itemize}
  \item The React SPA as a static site served from Vercel's global CDN.
  \item The Express.js backend as Vercel serverless functions (via \texttt{vercel.json} routing configuration).
\end{itemize}

\subsection{Git and GitHub}
Git was used for version control throughout the project. The repository is hosted on GitHub with three contributors (one per team member). Feature branches were used for each major module, with pull requests and code review before merging into the main branch.

\subsection{Visual Studio Code}
VS Code was the primary IDE used by the team. Extensions used include: ESLint, Prettier, Tailwind CSS IntelliSense, MongoDB for VS Code, REST Client, GitLens.

\subsection{Postman}
Postman was used for API testing during backend development. Collections were created for each resource group (Auth, Students, Tokens, Notifications, Report).

\section{Algorithm / Pseudocode}

\subsection{Token Generation and Email Dispatch Algorithm}

\begin{verbatim}
ALGORITHM SendNotifications(recipients, semester, expiry):
  INPUT: recipients = [{studentId, email}], semester, expiry duration
  OUTPUT: {success_count, failure_count, details}

  hours = EXPIRY_MAP[expiry]  // 24, 48, 72, or 168
  expiresAt = CURRENT_TIME + hours * 3600 * 1000

  FOR EACH recipient IN recipients DO PARALLEL:
    student = FIND_STUDENT_BY_ID(recipient.studentId)
    IF student NOT FOUND:
      RECORD failure for recipient
      CONTINUE

    token_string = CRYPTO.RANDOM_BYTES(16).TO_HEX()
    token_doc = CREATE_TOKEN({
      student: student._id,
      token: token_string,
      semester: semester,
      expiresAt: expiresAt,
      status: "Active"
    })

    guardian_url = FRONTEND_URL + "/guardian?token=" + token_string
    email_sent = SEND_EMAIL(recipient.email, student.fullName, guardian_url)

    IF email_sent:
      RECORD success for student
    ELSE:
      RECORD failure for student

  RETURN {success_count, failure_count, details}
END ALGORITHM
\end{verbatim}

\subsection{Token Validation Algorithm}

\begin{verbatim}
ALGORITHM ValidateToken(token_string):
  INPUT: token_string (32-char hex from URL query parameter)
  OUTPUT: student academic data OR error response

  // Step 1: Auto-expire stale tokens
  UPDATE ALL TOKENS WHERE status="Active" AND expiresAt < NOW()
    SET status = "Expired"

  // Step 2: Find token
  token_doc = FIND_TOKEN({token: token_string})
    WITH POPULATE student -> semesters -> subjects -> subject_details

  IF token_doc NOT FOUND:
    RETURN HTTP 404 "Invalid or unknown token"

  IF token_doc.status == "Expired":
    RETURN HTTP 410 "This token has expired"

  // Step 3: Mark as used on first access
  IF token_doc.status == "Active":
    UPDATE token_doc SET status="Used", usedAt=NOW()

  RETURN HTTP 200 WITH student_data
END ALGORITHM
\end{verbatim}

\subsection{CGPA Auto-Calculation}

\begin{verbatim}
HOOK Student.pre("save"):
  IF semesters IS EMPTY:
    SET cgpa = 0
    RETURN

  total_sgpa = SUM(semester.sgpa FOR ALL semester IN semesters)
  cgpa = ROUND(total_sgpa / COUNT(semesters), 2)
  SET this.cgpa = cgpa
END HOOK
\end{verbatim}

\section{Testing Techniques}
ASTNS was tested using a combination of the following techniques:

\begin{itemize}
  \item \textbf{Unit Testing:} Individual Mongoose schema validators were tested by attempting to save documents with invalid data (e.g., marks exceeding maximum, invalid course-branch combinations, invalid email formats) and verifying that validation errors were thrown correctly.
  \item \textbf{API Integration Testing:} All REST API endpoints were tested using Postman. Each endpoint was tested for: correct response status codes, correct response body structure, error handling for missing/invalid inputs, and authentication enforcement on protected routes.
  \item \textbf{Functional Testing:} The complete user workflows (Admin login, CSV upload, notification dispatch, Guardian Portal access) were tested manually end-to-end.
  \item \textbf{Boundary Testing:} Edge cases such as empty CSV files, CSVs with missing columns, tokens accessed after expiry, and concurrent notification dispatch to large student batches were tested.
  \item \textbf{Cross-Browser Testing:} The Admin Dashboard and Guardian Portal were tested on Google Chrome (v124), Mozilla Firefox (v125), and Microsoft Edge (v124) on Windows; and on Safari on iOS.
  \item \textbf{Responsive Design Testing:} The Guardian Portal was tested on viewport widths of 375px (mobile), 768px (tablet), and 1440px (desktop) using Chrome DevTools.
\end{itemize}

\section{Test Cases}

\begin{table}[H]
\centering
\caption{Test Cases -- Authentication Module}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|p{0.8cm}|p{3cm}|p{4cm}|p{4.5cm}|}
\hline
\textbf{TC\#} & \textbf{Test Case} & \textbf{Input / Steps} & \textbf{Expected Result}\\
\hline
TC1 & Admin Login -- Valid & Email: admin@gmail.com, Password: correct & HTTP 200, session cookie set, redirect to Dashboard\\
\hline
TC2 & Admin Login -- Wrong Password & Email: admin@gmail.com, Password: wrong & HTTP 401 ``Invalid credentials''\\
\hline
TC3 & Admin Login -- Unknown Email & Email: unknown@gmail.com & HTTP 404 ``Admin not found''\\
\hline
TC4 & Admin Logout & Click Logout button & Session deleted, cookie cleared, redirect to Login\\
\hline
TC5 & Access Protected Route Without Session & Navigate to /admin/dashboard without login & HTTP 401, redirect to Login page\\
\hline
\end{tabular}
\end{table}

\begin{table}[H]
\centering
\caption{Test Cases -- Data Upload Module}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|p{0.8cm}|p{3cm}|p{4cm}|p{4.5cm}|}
\hline
\textbf{TC\#} & \textbf{Test Case} & \textbf{Input / Steps} & \textbf{Expected Result}\\
\hline
TC6 & Upload Valid CSV & Upload correctly formatted CSV & Records parsed, preview table displayed correctly\\
\hline
TC7 & Upload CSV with Missing Columns & CSV missing ``guardianEmail'' column & Validation error shown, no records saved\\
\hline
TC8 & Upload CSV with Invalid Marks & Student marks > maxTotalMarks & Mongoose validation error returned, record rejected\\
\hline
TC9 & Upload CSV with Invalid Course & Course not in courseBranchMap & Validation error: ``not a valid course''\\
\hline
TC10 & Upload Non-CSV File & Upload .txt file & Frontend rejects file, error message shown\\
\hline
\end{tabular}
\end{table}

\begin{table}[H]
\centering
\caption{Test Cases -- Notification Module}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|p{0.8cm}|p{3cm}|p{4cm}|p{4.5cm}|}
\hline
\textbf{TC\#} & \textbf{Test Case} & \textbf{Input / Steps} & \textbf{Expected Result}\\
\hline
TC11 & Send Notification -- Single Student & Select 1 student, click Send & 1 token created, 1 email dispatched, success shown\\
\hline
TC12 & Send Notification -- Batch & Select 20 students, click Send & 20 tokens created, 20 emails dispatched in parallel\\
\hline
TC13 & Send Notification -- No Students Selected & Click Send with no selection & Frontend validation: ``Select at least one student''\\
\hline
TC14 & Email Content Verification & Inspect received email & Email contains student name, ``View Report'' button, correct token URL\\
\hline
\end{tabular}
\end{table}

\begin{table}[H]
\centering
\caption{Test Cases -- Guardian Portal}
\renewcommand{\arraystretch}{1.3}
\begin{tabular}{|p{0.8cm}|p{3cm}|p{4cm}|p{4.5cm}|}
\hline
\textbf{TC\#} & \textbf{Test Case} & \textbf{Input / Steps} & \textbf{Expected Result}\\
\hline
TC15 & Valid Token Access & Open URL with valid token & Guardian Portal renders student academic data\\
\hline
TC16 & Expired Token Access & Open URL with expired token & Access Denied page with expiry message\\
\hline
TC17 & Revoked Token Access & Admin revokes token; Guardian opens URL & Access Denied page with revocation message\\
\hline
TC18 & Invalid Token & Manually enter random token in URL & HTTP 404 ``Invalid or unknown token''\\
\hline
TC19 & SGPA Chart Rendering & Student has 4 semester records & Line chart displays 4 data points correctly\\
\hline
TC20 & Detention Flag Display & Student has a detained subject & Detention badge displayed on that subject row\\
\hline
\end{tabular}
\end{table}
"""

with open("minor_final_report.tex", "a", encoding="utf-8") as f:
    f.write(content)
print("Part 5 (Chapter 4) appended.")
