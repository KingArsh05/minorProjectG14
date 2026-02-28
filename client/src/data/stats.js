export const dashboardStats = {
  totalStudents: 248,
  notificationsSent: 192,
  detainedStudents: 18,
  activeTokens: 34,
  coursesOffered: 9,
  avgCGPA: "7.84",
  notificationsSentToday: 14,
};

// Chart: monthly notification activity
export const notificationActivity = [
  { month: "Sep", sent: 0, opened: 0 },
  { month: "Oct", sent: 45, opened: 38 },
  { month: "Nov", sent: 12, opened: 10 },
  { month: "Dec", sent: 0, opened: 0 },
  { month: "Jan", sent: 80, opened: 65 },
  { month: "Feb", sent: 192, opened: 142 },
];

// Chart: branch distribution (key must match dataKey in BarChart)
export const branchDistribution = [
  { branch: "CSE", students: 68 },
  { branch: "IT", students: 54 },
  { branch: "EE", students: 42 },
  { branch: "ME", students: 38 },
  { branch: "CE", students: 22 },
  { branch: "ECE", students: 18 },
  { branch: "Other", students: 6 },
];

// Table: recent uploads
export const recentUploads = [
  {
    fileName: "cse_sem4_2025.csv",
    course: "B.Tech",
    branch: "Computer Science & Engineering",
    semester: 4,
    records: 62,
    uploadedAt: "Feb 28, 2025",
  },
  {
    fileName: "it_sem4_2025.csv",
    course: "B.Tech",
    branch: "Information Technology",
    semester: 4,
    records: 48,
    uploadedAt: "Feb 25, 2025",
  },
  {
    fileName: "ee_sem4_2025.csv",
    course: "B.Tech",
    branch: "Electrical Engineering",
    semester: 4,
    records: 55,
    uploadedAt: "Feb 22, 2025",
  },
  {
    fileName: "me_sem4_2025.csv",
    course: "B.Tech",
    branch: "Mechanical Engineering",
    semester: 2,
    records: 60,
    uploadedAt: "Feb 20, 2025",
  },
  {
    fileName: "mca_sem1_2025.xlsx",
    course: "MCA",
    branch: "Computer Applications",
    semester: 1,
    records: 23,
    uploadedAt: "Feb 18, 2025",
  },
];
