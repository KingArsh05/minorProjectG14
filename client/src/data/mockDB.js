export const mockStudents = [
  {
    urn: '2302621',
    name: 'Aisha Sharma',
    semester: 4,
    email: 'aisha.sharma@example.edu',
    attendancePercentage: 85.5,
    sgpa: 8.2,
    status: 'Eligible',
    subjectMarks: [
      { subject: 'Data Structures', marks: 88, maxMarks: 100 },
      { subject: 'Operating Systems', marks: 76, maxMarks: 100 },
      { subject: 'Computer Networks', marks: 82, maxMarks: 100 },
      { subject: 'Database Systems', marks: 91, maxMarks: 100 }
    ]
  },
  {
    urn: '2302622',
    name: 'Rahul Gupta',
    semester: 4,
    email: 'rahul.gupta@example.edu',
    attendancePercentage: 72.0,
    sgpa: 6.8,
    status: 'Provisionally Detained',
    subjectMarks: [
      { subject: 'Data Structures', marks: 65, maxMarks: 100 },
      { subject: 'Operating Systems', marks: 58, maxMarks: 100 },
      { subject: 'Computer Networks', marks: 60, maxMarks: 100 },
      { subject: 'Database Systems', marks: 71, maxMarks: 100 }
    ]
  },
  {
    urn: '2302623',
    name: 'Sneha Patel',
    semester: 4,
    email: 'sneha.patel@example.edu',
    attendancePercentage: 92.0,
    sgpa: 9.4,
    status: 'Eligible',
    subjectMarks: [
      { subject: 'Data Structures', marks: 95, maxMarks: 100 },
      { subject: 'Operating Systems', marks: 92, maxMarks: 100 },
      { subject: 'Computer Networks', marks: 89, maxMarks: 100 },
      { subject: 'Database Systems', marks: 98, maxMarks: 100 }
    ]
  },
  {
    urn: '2302624',
    name: 'Vikram Singh',
    semester: 4,
    email: 'vikram.singh@example.edu',
    attendancePercentage: 55.0,
    sgpa: 5.1,
    status: 'Detained',
    subjectMarks: [
      { subject: 'Data Structures', marks: 45, maxMarks: 100 },
      { subject: 'Operating Systems', marks: 40, maxMarks: 100 },
      { subject: 'Computer Networks', marks: 38, maxMarks: 100 },
      { subject: 'Database Systems', marks: 52, maxMarks: 100 }
    ]
  },
  {
    urn: '2302492',
    name: 'Balkrishan Singh',
    semester: 4,
    email: 'Balkrishan62005@gmail.com',
    attendancePercentage: 80.5,
    sgpa: 8.5,
    status: 'Eligible',
    subjectMarks: [
      { subject: 'Data Structures', marks: 80, maxMarks: 100 },
      { subject: 'Operating Systems', marks: 74, maxMarks: 100 },
      { subject: 'Computer Networks', marks: 79, maxMarks: 100 },
      { subject: 'Database Systems', marks: 85, maxMarks: 100 }
    ]
  }
];

// Helper functions to simulate DB queries
export const getStudentByUrn = (urn) => mockStudents.find(s => s.urn === String(urn));
export const getAllStudents = () => mockStudents;