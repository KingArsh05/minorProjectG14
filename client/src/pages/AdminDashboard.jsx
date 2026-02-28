import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { LogOut, Send, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { getAllStudents } from '../data/mockDB';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [students] = useState(getAllStudents());

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    toast.info('Logged out successfully');
    navigate('/');
  };

  const sendReport = async (email, name, urn) => {
    try {
      const response = await fetch('http://localhost:3000/api/notify-parent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'verification-key': 'BKS' // Ensure this matches process.env.INTERNAL_SERVER_KEY in your backend .env
        },
        body: JSON.stringify({
          studentName: name,
          parentEmail: email,
          urn: urn
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Secure Semester Report sent via Email to ${email}`);
      } else {
        toast.error(`Failed to send report: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending report:', error);
      toast.error('Network error occurred while connecting to the server.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Eligible':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Eligible</span>;
      case 'Provisionally Detained':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><AlertCircle className="w-3 h-3 mr-1" /> Prov. Detained</span>;
      case 'Detained':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><AlertCircle className="w-3 h-3 mr-1" /> Detained</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-brand-blue text-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-brand-light" />
            <h1 className="text-xl font-bold">Academic Status Transparency System</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-brand-light hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Student Academic Metrics</h2>
          <div className="text-sm text-slate-500">
            Total Students: <span className="font-semibold text-slate-700">{students.length}</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">URN</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Name</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance</th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">SGPA</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {students.map((student) => (
                  <tr key={student.urn} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-blue">{student.urn}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{student.name}</div>
                      <div className="text-xs text-slate-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-700 font-medium">
                      {student.attendancePercentage}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-700 font-medium">
                      {student.sgpa.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => sendReport(student.email, student.name, student.urn)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-light text-brand-blue font-medium rounded-md hover:bg-blue-100 transition-colors border border-blue-200"
                        title="Generate & Send Report">
                        <Send className="w-4 h-4" />
                        <span>Send Report</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
