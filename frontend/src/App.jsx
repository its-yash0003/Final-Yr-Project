import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { About, Contact, Hero, Navbar, Tools } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firebaseApp } from "./context/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import MoodDashboard from "./components/MoodDashboard";
import MoodInput from "./components/Moodinput";
import axios from "axios";
import ProfessionalLogin from "./pages/ProfessionalLogin";
import ChatbotComponent from "./components/ChatBot/ChatbotComponent";
import Moody from "./components/Moody";
import DoctorsDashboard from "./components/DoctorsDashboard";
import Wellness from "./components/Wellness";
import MentalHealthArticles from "./components/MentalHealthArticles";
import Motivation from "./components/Motivation";
import Meditation from "./components/Meditation";
import YogaAndFitness from "./components/YogaAndFitness";


const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const auth = getAuth(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState(null); // State for health data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const getAccessToken = async (authCode) => {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code: authCode,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });
    const { access_token } = response.data;
    fetchGoogleFitData(access_token);
  };

  const fetchGoogleFitData = async (accessToken) => {
    const response = await axios.get('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        aggregateBy: [{
          dataTypeName: 'com.google.heart_rate.bpm',
          dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
        }],
        bucketByTime: { durationMillis: 60000 },
        startTimeMillis: Date.now() - (1000 * 60 * 60 * 24), // Last 24 hours
        endTimeMillis: Date.now(),
      },
    });

    setHealthData(response.data);
  };

  const yourHealthData = {
    bucket: [
      {
        dataset: [
          {
            point: [
              { value: [{ fpVal: 72 }] }, // Simulated heart rate values
              { value: [{ fpVal: 75 }] },
              { value: [{ fpVal: 70 }] },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="relative z-0 bg-black">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          <>
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <Hero />
            </div>

            <Tools />
            <About />
            <div className="h-screen">
              <ChatbotComponent />
            </div>
            <Moody />
            <div className="relative z-0">
              {user ? (
                <div>
                  <h1>Welcome, {user.email}!</h1>
                  {/* Add a button to initiate Google Fitness OAuth */}
                  <button className="btn bg-warning" onClick={() => window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/fitness.read`} >
                    Connect to Google Fitness
                  </button>
                  {/* Display health data if available */}
                  {healthData && <pre>{JSON.stringify(healthData, null, 2)}</pre>}
                </div>
              ) : (
                <div className="text-center text-white">
                  <p>Please <a href="/login" className="text-green-500">login</a> to continue</p>
                  <p>Don't have an account? <a href="/register" className="text-blue-500">Register here</a></p>
                </div>
              )}
            </div>
          </>
        } />
        <Route path="/mood-input" element={<MoodInput />} />
        <Route path="/mood-dashboard" element={<MoodDashboard healthData={yourHealthData} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/professional-login" element={<ProfessionalLogin />} />
        <Route path="/doctor-dashboard" element={<DoctorsDashboard />} />
        <Route path="/assistant" element={<ChatbotComponent />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/sentiment" element={<Moody />} />
        <Route path="/articles" element={<MentalHealthArticles/>} />
        <Route path="/motivation" element={<Motivation/>}/>
        <Route path="/meditation" element={<Meditation/>}/>
        <Route path="/yoga" element={<YogaAndFitness/>}/>

      </Routes>
    </div>
  );
}

export default App;
