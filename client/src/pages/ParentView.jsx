import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, Clock, Activity, AlertTriangle, ChevronLeft } from 'lucide-react';
import { getStudentByUrn } from '../data/mockDB';

const ParentView = () => {
  const { urn } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // Simulate fetching data via tokenized URN link
    const data = getStudentByUrn(urn);
    setStudent(data);
  }, [urn]);

  if (!student) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Record Not Found</h2>
        <p className="text-slate-500 mt-2 text-center max-w-sm">
          The requested semester report is invalid or has expired. Please contact the institution.
        </p>
        <Link to="/" className="mt-6 flex items-center text-brand-blue hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Institution Portal
        </Link>
      </div>
    );
  }

  const isDetained = student.status === 'Detained';
  const isProvDetained = student.status === 'Provisionally Detained';

  return (
    <div className="min-h-screen bg-white md:bg-slate-50 font-sans">
      {/* Safe Branding Header */}
      <header className="bg-brand-blue text-white shadow-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
          <h1 className="font-semibold text-lg leading-tight tracking-wide">
            Verified Academic Report
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto md:py-8 px-4 py-6 md:px-0">
        <div className="bg-white md:shadow-lg md:rounded-2xl overflow-hidden md:border border-slate-200">
          
          {/* Status Banner */}
          <div className={`p-4 text-center font-medium shadow-inner ${
            isDetained 
              ? 'bg-red-50 text-red-700 border-b border-red-200' 
              : isProvDetained 
                ? 'bg-yellow-50 text-yellow-700 border-b border-yellow-200' 
                : 'bg-emerald-50 text-emerald-700 border-b border-emerald-200'
          }`}>
            Status Notification: {student.status.toUpperCase()}
            {isDetained && <p className="text-xs mt-1 text-red-600 block">Critical action required from Guardian/Parent.</p>}
          </div>

          {/* Student Info Card */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{student.name}</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-slate-600 border-b border-slate-100 pb-6 mb-6">
              <span className="flex items-center gap-1">
                <span className="font-semibold text-slate-800 text-sm">URN:</span> {student.urn}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-slate-800 text-sm">Semester:</span> {student.semester}
              </span>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-center items-center text-center">
                <Clock className="w-6 h-6 text-brand-blue mb-2" />
                <span className="text-sm font-medium text-slate-500 mb-1">Attendance Target: 75%</span>
                <span className={`text-3xl font-bold ${student.attendancePercentage >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {student.attendancePercentage}%
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-center items-center text-center">
                <Activity className="w-6 h-6 text-brand-blue mb-2" />
                <span className="text-sm font-medium text-slate-500 mb-1">Academic Performance</span>
                <span className="text-3xl font-bold text-brand-blue">
                  {student.sgpa.toFixed(2)}
                  <span className="text-base text-slate-400 font-medium"> SGPA</span>
                </span>
              </div>
            </div>

            {/* Subject-Wise Overview */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-slate-700" />
                <h3 className="text-lg font-bold text-slate-800">Subject-Wise Evaluation</h3>
              </div>
              
              <div className="bg-white border text-sm md:text-base border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Subject Name</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider text-right">Marks Secured</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.subjectMarks.map((subject, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-800">{subject.subject}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-semibold ${subject.marks < 40 ? 'text-red-600' : 'text-slate-700'}`}>
                            {subject.marks}
                          </span>
                          <span className="text-slate-400">/{subject.maxMarks}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 text-center text-xs text-slate-400 pt-6 border-t border-slate-100">
              <p>This report is auto-generated by your Higher Education Institution.</p>
              <p>For discrepancies, please contact the institution authorities mapping to URN: {student.urn}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentView;
