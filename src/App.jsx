import { useEffect, useState } from 'react';
import { api } from './api';
import Sidebar from './components/Sidebar';

export default function App(){
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [res, setRes] = useState(null);
  const [activity, setActivity] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Always show modal on app load (professor requirement)
  useEffect(() => {
    console.log('=== APP MOUNT DEBUG ===');
    console.log('App mounted, showing modal');
    
    // Check if there's a stored email (for debugging purposes)
    const storedEmail = localStorage.getItem('debugUserEmail');
    if (storedEmail) {
      console.log('Found stored email:', storedEmail);
      setUserEmail(storedEmail);
      setShowEmailModal(false);
    } else {
      setShowEmailModal(true);
    }
  }, []);

  // Debug userEmail changes
  useEffect(() => {
    console.log('=== USEREMAIL STATE CHANGE ===');
    console.log('userEmail changed to:', userEmail);
    console.log('userEmail type:', typeof userEmail);
    console.log('userEmail length:', userEmail ? userEmail.length : 'N/A');
    console.log('userEmail is valid email?', userEmail && userEmail.includes('@'));
  }, [userEmail]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    console.log('=== EMAIL SUBMISSION DEBUG ===');
    console.log('Email entered:', email);
    console.log('Setting userEmail to:', email);
    
    // Set userEmail and save to localStorage for persistence
    setUserEmail(email);
    localStorage.setItem('debugUserEmail', email);
    setShowEmailModal(false);
    
    console.log('userEmail state set to:', email);
    console.log('Email saved to localStorage');
    console.log('Modal closed, userEmail should persist');
  };

  const resetUserEmail = () => {
    setUserEmail('');
    localStorage.removeItem('debugUserEmail');
    setShowEmailModal(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if(!email || !weight || !height) return alert('Please enter email, weight and height');
    if(!email.includes('@')) return alert('Please enter a valid email address');
    
    try {
      // Show loading message
      alert('Generating your health plan and sending email... Please wait.');
      
      const { data } = await api.post('/api/entries', { 
        email: email, 
        weightKg: Number(weight), 
        heightCm: Number(height) 
      });
      setRes(data);
      alert('✅ Health plan generated and email sent successfully! Check your inbox for the complete plan.');
      setTimeout(() => { document.getElementById('results')?.scrollIntoView({behavior:'smooth'}); }, 50);
    } catch (error) {
      if (error.response?.status === 500 && error.response?.data?.includes('email')) {
        alert('Health plan generated but email failed to send. Please check your email address.');
      } else {
        alert('Error generating health plan. Please try again.');
      }
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    api.get('/api/entries/latest').then(r=>{ if(r.data) setRes(r.data); }).catch(()=>{});
    generateActivity();
  },[]);

  const generateActivity = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.boredapi.com/api/activity', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      console.log('Bored API response:', data); // Debug log
      setActivity(data.activity);
    } catch (error) {
      console.error('Error fetching activity:', error);
      // Fallback to a list of healthy activities
      const fallbackActivities = [
        'Take a 5-minute walk outside',
        'Do 10 push-ups',
        'Stretch for 5 minutes',
        'Drink a glass of water',
        'Take 5 deep breaths',
        'Do some light yoga poses',
        'Go up and down the stairs 3 times',
        'Dance to your favorite song',
        'Do 10 jumping jacks',
        'Take a quick meditation break'
      ];
      const randomActivity = fallbackActivities[Math.floor(Math.random() * fallbackActivities.length)];
      setActivity(randomActivity);
    } finally {
      setLoading(false);
    }
  };

  const badgeColor = (cat) => ({
    'Underweight':'#0369a1',
    'Normal weight':'#16a34a',
    'Overweight':'#ea580c',
    'Obesity':'#dc2626'
  }[cat] || '#0f172a');

  return (
    <div className="container">
      {/* Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🍽️ Welcome to Health Planner!</h2>
            <p>Please enter your email to track your daily meals:</p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="email-input"
              />
              <button type="submit" className="email-submit-btn">
                Continue
              </button>
            </form>
          </div>
        </div>
      )}
      
      <Sidebar userEmail={userEmail} />
      
      {/* CRITICAL DEBUG: Check what we're passing to Sidebar */}
      <div style={{background: 'red', color: 'white', padding: '5px', margin: '5px', fontSize: '10px'}}>
        <strong>CRITICAL DEBUG:</strong><br/>
        Passing to Sidebar: {userEmail || 'EMPTY/NULL'}<br/>
        Type: {typeof userEmail}<br/>
        Length: {userEmail ? userEmail.length : 'N/A'}
      </div>
      
      {/* User Email Info */}
      {userEmail && (
        <div className="user-email-info">
          <span>👤 Logged in as: {userEmail}</span>
          <button onClick={resetUserEmail} className="reset-email-btn">
            🔄 Change Email
          </button>
        </div>
      )}
      
      {/* Debug Info */}
      <div style={{background: 'yellow', padding: '10px', margin: '10px', fontSize: '12px'}}>
        <strong>DEBUG INFO:</strong><br/>
        userEmail: {userEmail || 'EMPTY'}<br/>
        showEmailModal: {showEmailModal ? 'true' : 'false'}<br/>
        email field: {email || 'EMPTY'}<br/>
        <button onClick={() => {
          localStorage.removeItem('debugUserEmail');
          setUserEmail('');
          setShowEmailModal(true);
        }} style={{marginTop: '5px', padding: '5px'}}>
          🗑️ Clear Debug Email
        </button>
      </div>
      
      <div className="card">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}}>
          <img src="/applogo.jpg" alt="Health Planner logo" style={{width: '50px', height: '50px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover'}} />
          <div className="h1" style={{margin: 0}}>Health Planner</div>
        </div>
        <p className="section">Transform your health journey with personalized BMI analysis, customized nutrition plans, targeted workout recommendations, and expert wellness guidance—all delivered through our comprehensive health assessment platform.</p>
        <form onSubmit={submit} className="section">
          <div style={{marginBottom: '16px'}}>
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              placeholder="Enter your email address" 
              style={{width: '100%'}}
            />
          </div>
          <div className="row">
            <div>
              <label>Weight (kg)</label>
              <input type="number" min="1" step="0.1" value={weight} onChange={(e)=>setWeight(e.target.value)} placeholder="e.g., 70" />
            </div>
            <div>
              <label>Height (cm)</label>
              <input type="number" min="1" step="0.1" value={height} onChange={(e)=>setHeight(e.target.value)} placeholder="e.g., 175" />
            </div>
          </div>
          <div style={{marginTop:12}}>
            <button type="submit">Generate plan</button>
          </div>
        </form>
      </div>

      {res && (
        <div id="results" className="section">
          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
              <img src="/bmi.jpg" alt="BMI icon" style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover'}} />
              <div className="h2" style={{margin: 0}}>Your BMI</div>
            </div>
            <p style={{marginTop:6, marginBottom:8, fontSize:16}}>
              <strong>{res.bmi}</strong> — <span className="badge" style={{background:'#eef2ff', color: badgeColor(res.bmiCategory)}}>{res.bmiCategory}</span>
            </p>
            <small style={{color:'#64748b'}}>BMI = weight / (height²) where height is in meters.</small>
          </div>

          <div className="grid-2 section">
            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
                <img src="/fitness.jpg" alt="Workout plan icon" style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover'}} />
                <div className="h2" style={{margin: 0}}>Workout plan</div>
              </div>
              <ul>{res.workoutPlan?.map((x,i)=>(<li key={i}>{x}</li>))}</ul>
            </div>
            <div className="card">
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
                <img src="/meal.jpg" alt="Meal plan icon" style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover'}} />
                <div className="h2" style={{margin: 0}}>Meal plan</div>
              </div>
              <ul>{res.mealPlan?.map((x,i)=>(<li key={i}>{x}</li>))}</ul>
            </div>
          </div>

          <div className="card section">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
              <img src="/tips.jpg" alt="Tips icon" style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover'}} />
              <div className="h2" style={{margin: 0}}>Tips</div>
            </div>
            <ul>{res.tips?.map((x,i)=>(<li key={i}>{x}</li>))}</ul>
          </div>

          <div className="card section">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
              <div style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
                ⚡
              </div>
              <div className="h2" style={{margin: 0}}>Quick Health Challenge</div>
            </div>
            <div style={{textAlign: 'center', padding: '20px 0'}}>
              {loading ? (
                <div style={{color: '#667eea', fontSize: '16px'}}>Loading challenge...</div>
              ) : (
                <div style={{fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '16px'}}>
                  "{activity}"
                </div>
              )}
              <button 
                onClick={generateActivity} 
                disabled={loading}
                style={{
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  color: 'white',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Loading...' : 'Get New Challenge'}
              </button>
            </div>
          </div>

          <div className="card section">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '16px'}}>
              <img src="/quote.jpg" alt="Motivational quotes icon" style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover'}} />
              <div className="h2" style={{margin: 0}}>Motivational quotes</div>
            </div>
            <div className="grid-3">
              {res.quotes?.map((q,i)=>(<div className="quote" key={i}>{q}</div>))}
            </div>
            <button className="backtotop" onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}>↑ Back to top</button>
          </div>
        </div>
      )}

      <div className="footer">Swagger API: <a href="http://localhost:8080/swagger" target="_blank" rel="noreferrer">http://localhost:8080/swagger</a></div>
    </div>
  );
}
