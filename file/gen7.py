
content = r"""
\chapter{Conclusion and Future Scope}

\section{Conclusion}
The Academic Status Transparency Notification System (ASTNS) successfully addresses the critical communication gap between engineering colleges and the parents or guardians of enrolled students. The system demonstrates that a well-designed full-stack web application, built on freely available open-source technologies, can deliver significant institutional value at near-zero operational cost.

The project achieved all six of its stated objectives:
\begin{enumerate}
  \item A secure, session-authenticated Admin Dashboard was designed and developed, allowing institutional administrators to manage student academic data efficiently.
  \item A bulk data upload module was implemented that accepts CSV and Excel files, validates records against strict schema constraints, and persists them to a cloud database.
  \item An automated email notification pipeline was developed that generates cryptographically secure, time-limited access tokens and dispatches personalised HTML emails to guardians.
  \item A token-authenticated Guardian Portal was created that renders a student's complete academic profile without requiring guardians to create an account.
  \item A Token Management module was implemented that allows administrators to monitor and revoke access tokens.
  \item The complete application was deployed on Vercel as a serverless application, ensuring high availability and automatic scaling.
\end{enumerate}

The system was successfully tested across all major user workflows and use cases. All functional requirements were met. The application demonstrated strong cross-browser compatibility, responsive design for mobile devices, and acceptable performance under batch notification scenarios.

The use of MongoDB's document model proved particularly advantageous for the nested, hierarchical structure of student academic data (student $\rightarrow$ semesters $\rightarrow$ subjects). The serverless deployment model eliminated infrastructure management concerns, making the system suitable for adoption by resource-constrained educational institutions.

Most importantly, ASTNS proves the concept that password-less, token-based access mechanisms borrowed from banking and e-commerce domains can be effectively applied to educational notification systems. This approach maximises guardian engagement by removing all technical barriers to accessing academic reports.

\section{Future Scope}
While the current implementation of ASTNS meets all project objectives, several enhancements can significantly extend its utility and impact:

\begin{itemize}
  \item \textbf{SMS and WhatsApp Notification:} Integrating Twilio SMS API and WhatsApp Business API would enable notification delivery via mobile messaging platforms, reaching guardians who do not actively use email. This is particularly relevant for semi-urban and rural demographics.

  \item \textbf{PDF Report Generation:} Implementing server-side PDF generation (using libraries such as Puppeteer or PDFKit) would allow guardians to download official-looking academic reports with the institution's letterhead, which could serve as documentation for official purposes.

  \item \textbf{AI-Powered Academic Risk Prediction:} Integrating a machine learning model trained on historical SGPA trends and attendance patterns could generate early warning flags for students at risk of academic failure or detention, enabling proactive intervention by both guardians and administrators.

  \item \textbf{Multi-Institution Support:} Extending the system to a multi-tenant architecture would allow multiple colleges within the IKGPTU affiliation to use a single deployment with isolated data namespaces.

  \item \textbf{Two-Way Communication:} Adding a messaging feature allowing guardians to raise academic queries or request parent-teacher meetings directly through the Guardian Portal would transform ASTNS from a one-way notification system into a comprehensive academic communication platform.

  \item \textbf{Automated Scheduled Notifications:} Implementing a CRON job-based notification scheduler (using node-cron) would allow the system to automatically dispatch notifications at configurable intervals (e.g., monthly) without requiring manual administrator action.

  \item \textbf{Localisation / Multi-language Support:} Adding support for regional languages (Hindi, Punjabi) in the Guardian Portal would make academic reports accessible to a wider demographic of parents who are more comfortable in their native languages.

  \item \textbf{Analytics Dashboard:} A comprehensive analytics module showing trends in student performance across batches, branches, and semesters would provide institutional leadership with data-driven insights for academic policy decisions.
\end{itemize}

\chapter*{References / Bibliography}
\addcontentsline{toc}{chapter}{References / Bibliography}
\begin{enumerate}
  \item C. I. P. Benablo, E. T. Sart, J. M. M. Bringula, and R. Bringula, ``An Application for Monitoring and Inquiring of Students' Academic Record with Automatic Notification for the Parents,'' \textit{International Journal of Cloud Computing and Services Science}, vol. 2, no. 1, pp. 59--66, 2014.

  \item Meta Platforms, Inc., ``React -- A JavaScript library for building user interfaces,'' 2024. [Online]. Available: \url{https://react.dev}

  \item OpenJS Foundation, ``Express.js v5 Documentation,'' 2024. [Online]. Available: \url{https://expressjs.com}

  \item MongoDB Inc., ``MongoDB Atlas Documentation,'' 2024. [Online]. Available: \url{https://www.mongodb.com/docs/atlas}

  \item Mongoose Contributors, ``Mongoose ODM v9 Documentation,'' 2024. [Online]. Available: \url{https://mongoosejs.com/docs}

  \item Nodemailer Contributors, ``Nodemailer Documentation,'' 2024. [Online]. Available: \url{https://nodemailer.com}

  \item Tailwind Labs, ``Tailwind CSS v4 Documentation,'' 2024. [Online]. Available: \url{https://tailwindcss.com/docs}

  \item Recharts Group, ``Recharts -- Redefined chart library built with React and D3,'' 2024. [Online]. Available: \url{https://recharts.org}

  \item Vercel Inc., ``Vercel Documentation -- Serverless Functions,'' 2024. [Online]. Available: \url{https://vercel.com/docs}

  \item React Hook Form Contributors, ``React Hook Form Documentation,'' 2024. [Online]. Available: \url{https://react-hook-form.com}

  \item Node.js Foundation, ``Node.js v20 LTS Documentation,'' 2024. [Online]. Available: \url{https://nodejs.org/en/docs}

  \item Vite Contributors, ``Vite Documentation,'' 2024. [Online]. Available: \url{https://vitejs.dev}

  \item I.K. Gujral Punjab Technical University, ``University Official Portal,'' 2024. [Online]. Available: \url{https://www.ptu.ac.in}

  \item GNDEC Minor Project Synopsis -- Group G14, Department of CSE, Guru Nanak Dev Engineering College, Ludhiana, 2025.
\end{enumerate}

\appendix
\chapter{Project Setup Guide}

\section{Prerequisites}
\begin{itemize}
  \item Node.js v20 LTS or higher installed.
  \item A MongoDB Atlas account with an M0 cluster created.
  \item A Gmail account with App Password generated (2FA must be enabled).
  \item Git installed.
  \item Vercel CLI installed globally (\texttt{npm install -g vercel}).
\end{itemize}

\section{Backend Setup}
\begin{verbatim}
# Clone repository
git clone https://github.com/KingArsh05/minorProjectG14.git
cd minorProjectG14/server

# Install dependencies
npm install

# Create .env file with:
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/astns
COOKIE_SECRET=your_cookie_secret_key
FRONTEND_URL=http://localhost:5173
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=development

# Start development server
npm run dev
\end{verbatim}

\section{Frontend Setup}
\begin{verbatim}
cd minorProjectG14/client

# Install dependencies
npm install

# Create .env file with:
VITE_API_URL=http://localhost:3000

# Start development server
npm run dev
\end{verbatim}

\section{Deployment to Vercel}
\begin{verbatim}
# Login to Vercel
vercel login

# Deploy from project root
vercel

# Set environment variables in Vercel dashboard:
# MONGODB_URI, COOKIE_SECRET, FRONTEND_URL, SMTP_USER, SMTP_PASS
\end{verbatim}

\end{document}
"""

with open("minor_final_report.tex", "a", encoding="utf-8") as f:
    f.write(content)
print("Part 7 (Chapters 6 + References + Appendix + end) appended. File complete.")
