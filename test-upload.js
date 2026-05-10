const fs = require('fs');

async function test() {
  const form = new FormData();
  form.append('course', 'B.Tech');
  form.append('branch', 'Computer Science & Engineering');
  form.append('semester', '4');
  form.append('batch', '2022-2026');
  
  const blob = new Blob([fs.readFileSync('./client/public/student_upload_template.csv')]);
  form.append('file', blob, 'student_upload_template.csv');

  try {
    const res = await fetch('http://localhost:8000/api/v1/students/upload', {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.log("Error:", err);
  }
}

test();
