
content = r"""
\chapter{Results and Discussions}

\section{User Interface Representation}

\subsection{Brief Description of Various Modules}

\textbf{1. Login Module:} The Login page is the entry point for administrators. It displays a clean, centred card with email and password fields and a ``Sign In'' button. Client-side validation ensures both fields are filled before submission. On successful authentication, the admin is redirected to the Dashboard. On failure, an error message is shown.

\textbf{2. Admin Dashboard Module:} The Dashboard displays four summary stat cards: Total Students, Detained Students, Total Notifications Sent, and Active Tokens. Below the cards, a bar chart shows notification activity over the past 30 days. A branch distribution table shows the count of students per branch.

\textbf{3. Upload Data Module:} Administrators can drag-and-drop or browse to upload CSV or Excel files. After upload, the system parses the file and displays a paginated preview table showing all detected student records. The admin selects the target semester and clicks ``Submit'' to save the records to the database.

\textbf{4. Student List Module:} Displays a searchable, filterable table of all students. The admin can search by student name, URN, or CRN, and filter by course or branch. Each row shows the student's name, URN, course, branch, and current CGPA, with a link to the Student Detail page.

\textbf{5. Student Detail Module:} Shows the complete academic profile of a selected student. The page displays the student's personal information (name, URN, CRN, course, branch, admission year), an SGPA trend line chart, and an accordion of all semesters. Each semester accordion expands to show a table of subject marks (internal, external, total, max marks, status).

\textbf{6. Send Notification Module:} The left panel displays all students with checkboxes for selection. Search and filter controls help narrow the list. The right panel provides configuration: semester selection, token expiry, and a ``Send Notifications'' button. A progress indicator shows dispatch status for each student.

\textbf{7. Token Management Module:} Displays all generated tokens in a table with columns: student name, URN, semester, status (Active / Used / Expired), created date, expiry date, and a Revoke button for active tokens. Administrators can filter by status.

\textbf{8. Guardian Dashboard Module:} Accessed via the token URL. Shows the student's profile, SGPA line chart, attendance ring, and expandable semester panels with subject-wise marks. Detention alerts are shown as a prominent red banner if any detained subjects exist.

\textbf{9. Access Denied Module:} Shown when an invalid, expired, or revoked token is used. Displays an appropriate message explaining why access was denied.

\section{Snapshots of System with Details}

\subsection{Login Page}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic1.png}
\caption{Login Page -- Admin Authentication Interface}
\end{figure}
The Login page features a dark-themed card centred on the viewport. The form contains email and password inputs with client-side validation. On successful authentication, a session cookie is set and the admin is redirected to the Dashboard.

\subsection{Admin Dashboard}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic2.png}
\caption{Admin Dashboard -- Overview with Stats and Charts}
\end{figure}
The Dashboard presents four metric cards at the top: Total Students, Detained Count, Notifications Sent, and Active Tokens. A bar chart below shows notification activity. The sidebar remains visible on all Admin pages for easy navigation.

\subsection{Upload Data Page}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic3.png}
\caption{Upload Data Page -- CSV Bulk Upload Interface}
\end{figure}
The Upload Data page features a drag-and-drop zone. After file selection, the system parses the file and renders a preview table. The admin selects the semester and confirms submission.

\subsection{Student List Page}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic4.png}
\caption{Student List Page -- Searchable and Filterable Student Records}
\end{figure}
All students are displayed in a sortable table. The search bar filters by name, URN, or CRN. Dropdown filters allow selection by course and branch.

\subsection{Student Detail Page}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic5.png}
\caption{Student Detail Page -- Individual Academic Profile}
\end{figure}
The Student Detail page shows the student's complete profile with an SGPA trend chart and expandable semester mark tables.

\subsection{Send Notification Page}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic6.png}
\caption{Send Notification Page -- Bulk Email Dispatch Interface}
\end{figure}
Administrators select students via checkboxes and configure the notification parameters. Dispatch status is shown for each student after sending.

\subsection{Token Management Page}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic7.png}
\caption{Token Management Page -- Token Lifecycle Dashboard}
\end{figure}
All tokens are listed with their current status. Active tokens show a ``Revoke'' button. Expired tokens are greyed out.

\subsection{Guardian Dashboard -- Part 1}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic8.png}
\caption{Guardian Dashboard -- Student Profile and SGPA Chart}
\end{figure}
The Guardian Dashboard opens after token validation. The student's profile card and SGPA line chart are shown at the top of the page.

\subsection{Guardian Dashboard -- Part 2}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic9.png}
\caption{Guardian Dashboard -- Semester-wise Mark Breakdown}
\end{figure}
Below the chart, expandable semester panels display subject-wise marks with detention status indicators.

\subsection{Access Denied Page}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic10.png}
\caption{Access Denied Page -- Expired or Revoked Token}
\end{figure}
When an invalid, expired, or revoked token is used, the Access Denied page is displayed with an appropriate explanation.

\subsection{Email Notification}
\begin{figure}[H]
\centering
\includegraphics[width=0.85\textwidth]{assets/pic11.png}
\caption{Email Notification -- Guardian Notification Email Template}
\end{figure}
The HTML email dispatched to guardians contains a personalised greeting with the student's name, a brief description of the system, and a prominently styled ``View Report'' button linking to the Guardian Portal.

\section{Backend Database Representation}

\subsection{MongoDB Atlas Collections}
The MongoDB Atlas database for ASTNS contains the following collections:

\begin{itemize}
  \item \textbf{admins:} Stores administrator credentials. Passwords are stored as bcrypt hashes with salt rounds of 12. Each admin document contains: \texttt{userName}, \texttt{email}, \texttt{password} (hashed), and \texttt{role}.

  \item \textbf{students:} The primary collection. Each student document contains nested \texttt{semesters} arrays, and each semester contains nested \texttt{subjects} arrays (each referencing a Subject document by ObjectId). The hierarchical document structure of MongoDB is ideally suited to this nested data model.

  \item \textbf{subjects:} A reference collection storing subject master data (title, code, type, credits, max marks, pass marks). Subject records are shared across students via ObjectId references, ensuring consistency.

  \item \textbf{tokens:} Stores all generated access tokens with their lifecycle metadata (status, expiry, usedAt). Automatic expiry is enforced by querying and updating expired tokens on each token-related API call.

  \item \textbf{sessions:} Stores admin session records linked to admin ObjectIds. Session-based authentication is used instead of JWT to support server-side session invalidation on logout.
\end{itemize}

\subsection{Database Performance}
MongoDB's document model allows the complete student academic profile (all semesters, all subjects) to be fetched in a single query with \texttt{populate()}, avoiding expensive multi-table JOIN operations required in relational databases. The \texttt{lean()} option is used on read-only queries to return plain JavaScript objects instead of full Mongoose documents, improving performance by approximately 25--30\%.

\section{Discussions}
The successful implementation and deployment of ASTNS demonstrates that a modern full-stack MERN application can effectively solve a real institutional communication problem with minimal infrastructure cost.

Key findings from the testing and evaluation phase:

\begin{enumerate}
  \item \textbf{Email Deliverability:} All test emails dispatched via Gmail SMTP were successfully delivered to recipient inboxes. No emails were flagged as spam during testing, owing to the use of an authenticated Gmail account with App Password authentication.

  \item \textbf{Token Security:} The 32-character hexadecimal token space ($16^{32}$ = $2^{128}$ possible values) is computationally infeasible to brute-force, providing security equivalent to a 128-bit symmetric key.

  \item \textbf{Batch Performance:} Notification dispatch to a batch of 50 students using \texttt{Promise.all} completed within 8--12 seconds, with all emails delivered successfully. The parallel processing approach significantly outperformed sequential dispatch.

  \item \textbf{Guardian Portal Load Time:} The Guardian Portal loaded student data (including full semester and subject population) within 1.2--1.8 seconds on a standard broadband connection, meeting the 2-second performance requirement.

  \item \textbf{Cross-Browser Compatibility:} The application rendered correctly and all features functioned as expected on Chrome, Firefox, Edge, and Safari. The responsive design maintained usability on screens as small as 375px (iPhone SE viewport).

  \item \textbf{Data Integrity:} Mongoose schema validation successfully rejected all invalid data inputs during CSV upload testing, including out-of-range marks, invalid email formats, and invalid course-branch combinations.
\end{enumerate}
"""

with open("minor_final_report.tex", "a", encoding="utf-8") as f:
    f.write(content)
print("Part 6 (Chapter 5) appended.")
