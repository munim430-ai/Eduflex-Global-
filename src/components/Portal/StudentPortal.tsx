import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogIn, 
  UserPlus, 
  LogOut, 
  LayoutDashboard, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  FileText,
  MapPin,
  X
} from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  onSnapshot,
  Timestamp,
  addDoc,
  updateDoc,
  arrayUnion,
  orderBy
} from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const googleProvider = new GoogleAuthProvider();
const ADMIN_EMAIL = 'munimm247@gmail.com';

export default function StudentPortal({ onClose }: { onClose?: () => void }) {
  const { user, profile, loading } = useAuth();
  const [view, setView] = useState<'login' | 'register' | 'dashboard'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [applications, setApplications] = useState<any[]>([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    university: '',
    course: '',
    destination: 'South Korea'
  });
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');

  const statusWorkflow = [
    'Pending', 
    'Applied', 
    'Conditional Offer', 
    'Unconditional Offer', 
    'Payment Done', 
    'Visa Filed', 
    'Visa Approved', 
    'Declined'
  ];

  const getStepProgress = (status: string) => {
    const steps = ['Applied', 'Review', 'Offer', 'Visa', 'Ready'];
    let progress = 0;
    if (['Applied', 'Pending'].includes(status)) progress = 1;
    if (['Conditional Offer', 'Unconditional Offer'].includes(status)) progress = 3;
    if (['Payment Done', 'Visa Filed'].includes(status)) progress = 4;
    if (status === 'Visa Approved') progress = 5;
    return progress;
  };

  useEffect(() => {
    if (user && profile) {
      setView('dashboard');
      // Set up real-time listener
      const q = profile.role === 'admin' 
        ? query(collection(db, 'applications'), orderBy('createdAt', 'desc'))
        : query(collection(db, 'applications'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(apps);
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'applications');
      });
      return unsubscribe;
    } else if (!loading) {
      setView('login');
    }
  }, [user, profile, loading]);

  const createOrUpdateProfile = async (u: any, name?: string) => {
    const docRef = doc(db, 'users', u.uid);
    const docSnap = await getDoc(docRef);
    
    const isAdmin = u.email === ADMIN_EMAIL;
    
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid: u.uid,
        fullName: name || u.displayName || 'New Scholar',
        email: u.email,
        role: isAdmin ? 'admin' : 'student',
        createdAt: Timestamp.now()
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createOrUpdateProfile(result.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !fullName) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await createOrUpdateProfile(result.user, fullName);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const submitApplication = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!user) return;
     setError('');
     try {
       await addDoc(collection(db, 'applications'), {
         userId: user.uid,
         userEmail: user.email,
         userFullName: profile?.fullName,
         destination: formData.destination,
         university: formData.university,
         course: formData.course,
         status: "Pending",
         createdAt: Timestamp.now(),
         updatedAt: Timestamp.now(),
         updates: [
           { status: "Pending", note: "Application initiated successfully", timestamp: Timestamp.now() }
         ]
       });
       setShowApplyForm(false);
       setSuccess('Application submitted successfully!');
       setTimeout(() => setSuccess(''), 3000);
     } catch (err) {
       handleFirestoreError(err, OperationType.CREATE, 'applications');
     }
  };

  const updateStatus = async (appId: string) => {
    if (profile?.role !== 'admin') return;
    try {
      const appRef = doc(db, 'applications', appId);
      await updateDoc(appRef, {
        status: newStatus,
        updatedAt: Timestamp.now(),
        updates: arrayUnion({
          status: newStatus,
          note: adminNote,
          timestamp: Timestamp.now()
        })
      });
      setUpdatingAppId(null);
      setAdminNote('');
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'applications');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-20">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white border border-zinc-200 shadow-2xl overflow-hidden rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900">Student Portal</h2>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors p-2">
            <X size={20} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {view === 'login' || view === 'register' ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="p-8 md:p-12"
          >
            <div className="max-w-sm mx-auto">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-2">
                {view === 'login' ? 'Welcome Back' : 'Join EduFlex'}
              </h3>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-8">
                {view === 'login' ? 'Continue your journey' : 'Start your educational future'}
              </p>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 border border-red-100 italic">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 border border-green-100 italic">
                  <CheckCircle2 size={14} /> {success}
                </div>
              )}

              <form onSubmit={view === 'login' ? handleEmailLogin : handleRegister} className="space-y-4 mb-8">
                {view === 'register' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm outline-none focus:border-blue-600 rounded" 
                      required 
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm outline-none focus:border-blue-600 rounded" 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Password</label>
                    {view === 'login' && <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:underline">Forgot?</button>}
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 p-4 text-sm outline-none focus:border-blue-600 rounded" 
                    required 
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-zinc-900 text-white p-5 text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all rounded shadow-xl flex items-center justify-center gap-3"
                >
                  {view === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
                </button>
              </form>

              <div className="relative mb-8 text-center pt-4">
                <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-100 -z-10" />
                <span className="bg-white px-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Or Continue With</span>
              </div>

              <button 
                onClick={handleGoogleLogin}
                className="w-full border border-zinc-200 p-4 rounded text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-50 transition-colors"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                Google Account
              </button>

              <p className="mt-8 text-center text-xs text-zinc-500 font-bold uppercase tracking-widest">
                {view === 'login' ? "Don't have an account?" : "Already a member?"} {' '}
                <button 
                  onClick={() => setView(view === 'login' ? 'register' : 'login')}
                  className="text-blue-600 hover:underline"
                >
                  {view === 'login' ? 'Register Now' : 'Sign In Now'}
                </button>
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-zinc-100 pb-8">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-1 italic">
                   Hello, <span className="text-blue-600 italic not-italic">{profile?.fullName.split(' ')[0]}</span>
                   {profile?.role === 'admin' && (
                     <span className="ml-4 px-3 py-1 bg-zinc-900 text-white text-[9px] not-italic font-black tracking-widest rounded-full vertical-middle">
                       SYSTEM ADMINISTRATOR
                     </span>
                   )}
                </h3>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} className="text-blue-600" /> Track your education trajectory
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
               {/* Applications Column */}
               <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                      {profile?.role === 'admin' ? 'Recent Global Applications' : 'Your Applications'}
                    </h4>
                    {profile?.role === 'student' && applications.length > 0 && (
                      <button 
                        onClick={() => setShowApplyForm(true)}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:underline"
                      >
                        New Enrollment <ArrowRight size={14} />
                      </button>
                    )}
                  </div>

                  {showApplyForm ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-blue-100 bg-blue-50/20 p-8 rounded-xl"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h5 className="text-sm font-black uppercase tracking-wider text-zinc-900">Education Enrollment</h5>
                        <button onClick={() => setShowApplyForm(false)} className="text-zinc-400 hover:text-zinc-900"><X size={18} /></button>
                      </div>
                      <form onSubmit={submitApplication} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Target Destination</label>
                          <select 
                            value={formData.destination}
                            onChange={(e) => setFormData({...formData, destination: e.target.value})}
                            className="w-full bg-white border border-zinc-200 p-4 text-xs outline-none focus:border-blue-600 rounded appearance-none font-bold"
                          >
                            <option>South Korea</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Australia</option>
                            <option>Germany</option>
                            <option>USA</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Target University</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Yonsei University"
                            value={formData.university}
                            onChange={(e) => setFormData({...formData, university: e.target.value})}
                            className="w-full bg-white border border-zinc-200 p-4 text-xs outline-none focus:border-blue-600 rounded font-bold"
                          />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Desired Program / Course</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Bachelor of Computer Science"
                            value={formData.course}
                            onChange={(e) => setFormData({...formData, course: e.target.value})}
                            className="w-full bg-white border border-zinc-200 p-4 text-xs outline-none focus:border-blue-600 rounded font-bold"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="md:col-span-2 bg-blue-600 text-white p-5 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-900 transition-all rounded shadow-lg flex items-center justify-center gap-3"
                        >
                          Submit Enrollment Document <ArrowRight size={16} />
                        </button>
                      </form>
                    </motion.div>
                  ) : applications.length === 0 ? (
                    <div className="border border-dashed border-zinc-200 p-12 text-center rounded-xl bg-zinc-50">
                      <FileText size={40} className="mx-auto text-zinc-200 mb-4" strokeWidth={1} />
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">No active applications found.</p>
                      {profile?.role === 'student' && (
                        <button 
                          onClick={() => setShowApplyForm(true)}
                          className="mx-auto bg-zinc-900 text-white py-4 px-8 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all rounded shadow-lg flex items-center justify-center gap-3"
                        >
                           Submit First Application
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app) => (
                        <div key={app.id} className="border border-zinc-100 shadow-sm p-6 rounded-xl hover:border-blue-200 transition-all group bg-zinc-50/50">
                          <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex gap-4">
                              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-zinc-100 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                                <MapPin size={24} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-black uppercase text-sm text-zinc-900 group-hover:text-blue-600 transition-colors">
                                    {app.university}
                                  </h5>
                                  <span className="text-[8px] font-black px-2 py-0.5 bg-blue-100 text-blue-600 rounded uppercase">{app.destination}</span>
                                </div>
                                <p className="text-xs font-bold uppercase text-zinc-400 tracking-widest">{app.course}</p>
                                {profile?.role === 'admin' && (
                                  <p className="text-[9px] font-mono text-blue-600 mt-2">ID: {app.userEmail}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 shrink-0">
                               <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                 app.status === 'Visa Approved' ? 'bg-green-100 text-green-700' : 
                                 app.status === 'Declined' ? 'bg-red-100 text-red-700' : 
                                 'bg-blue-100 text-blue-700'
                               }`}>
                                 {app.status === 'Visa Approved' ? <CheckCircle2 size={12} /> : 
                                  app.status === 'Declined' ? <AlertCircle size={12} /> : 
                                  <Clock size={12} className={app.status === 'Pending' ? 'animate-pulse' : ''} />}
                                 {app.status}
                               </div>
                               <span className="text-[9px] font-mono text-zinc-400 uppercase">Updated: {app.updatedAt ? new Intl.DateTimeFormat('en-US').format(app.updatedAt.toDate()) : 'N/A'}</span>
                            </div>
                          </div>
                          
                          {/* Admin Controls */}
                          {profile?.role === 'admin' && (
                            <div className="mt-6 pt-6 border-t border-zinc-200">
                               {updatingAppId === app.id ? (
                                 <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                      <select 
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="w-full bg-white border border-zinc-200 p-3 text-[10px] uppercase font-black tracking-widest outline-none focus:border-blue-600 rounded"
                                      >
                                        <option value="">Select Status Update</option>
                                        {statusWorkflow.map(s => <option key={s} value={s}>{s}</option>)}
                                      </select>
                                      <input 
                                        type="text" 
                                        placeholder="Admin Log Note..."
                                        value={adminNote}
                                        onChange={(e) => setAdminNote(e.target.value)}
                                        className="w-full bg-white border border-zinc-200 p-3 text-[10px] uppercase font-bold outline-none focus:border-blue-600 rounded"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <button 
                                        onClick={() => updateStatus(app.id)}
                                        disabled={!newStatus}
                                        className="bg-blue-600 text-white px-6 py-3 text-[9px] font-black uppercase tracking-widest rounded disabled:opacity-50"
                                      >
                                        Push Update
                                      </button>
                                      <button 
                                        onClick={() => setUpdatingAppId(null)}
                                        className="bg-zinc-200 text-zinc-600 px-6 py-3 text-[9px] font-black uppercase tracking-widest rounded"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                 </div>
                               ) : (
                                 <button 
                                   onClick={() => {
                                     setUpdatingAppId(app.id);
                                     setNewStatus(app.status);
                                   }}
                                   className="text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded transition-colors"
                                 >
                                   Manage Application Status <ArrowRight size={12} />
                                 </button>
                               )}
                            </div>
                          )}

                          {/* Dynamic Tracker UI */}
                          <div className="mt-8 pt-8 border-t border-zinc-200 flex items-center justify-between px-2 relative">
                             {['Applied', 'Review', 'Offer', 'Visa', 'Ready'].map((step, idx) => {
                               const progress = getStepProgress(app.status);
                               const isActive = idx < progress;
                               const isCurrent = idx === progress - 1 && app.status !== 'Declined';
                               const isDeclined = app.status === 'Declined';
                               
                               return (
                                 <div key={step} className="flex flex-col items-center gap-2 relative z-10 transition-all duration-500">
                                   <div className={`w-3 h-3 rounded-full transition-all duration-700 ${
                                     isDeclined ? 'bg-red-200' : 
                                     isActive ? 'bg-green-500 scale-125 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 
                                     'bg-zinc-200'
                                   } ${isCurrent ? 'animate-pulse ring-4 ring-green-100' : ''}`} />
                                   <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`}>{step}</span>
                                 </div>
                               );
                             })}
                             <div className="absolute left-6 right-6 h-0.5 bg-zinc-100 top-[calc(50%+4px)] -z-0" />
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${(Math.max(0, getStepProgress(app.status) - 1) / 4) * 100}%` }}
                               className="absolute left-6 h-0.5 bg-green-500 top-[calc(50%+4px)] -z-0 transition-all duration-1000" 
                             />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               {/* Profile Info Column */}
               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-zinc-900 text-white p-8 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <LayoutDashboard size={80} />
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6">Your Profile</h4>
                    <div className="space-y-4 relative z-10">
                      <div>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase">Full Name</p>
                        <p className="font-bold text-sm">{profile?.fullName}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase">Email ID</p>
                        <p className="font-bold text-sm">{profile?.email}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase">Support PIN</p>
                        <p className="font-bold text-xl tracking-widest text-blue-400">#EF-{user?.uid.slice(-4).toUpperCase()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border border-zinc-100 rounded-xl bg-blue-50/30">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 mb-4">Direct Support</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-6">Need help with your documents or have questions about your visa status?</p>
                    <button className="w-full py-4 bg-white border border-blue-200 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all rounded shadow-sm">
                       Chat With Advisor
                    </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
