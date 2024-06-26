import React, { useState, useEffect } from 'react'
import './App.css';

function App() {

  const[otp, setOtp] = useState("")
  const[minutes, setMinutes] = useState(0)
  const[seconds, setSeconds] = useState(5)

  // Resend OTP
  const resendOTP = () => {
    setMinutes(0)
    setSeconds(5)
  }

  // Timer countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [seconds])
  

  return (
    <>
      <div className="container">
        <div className="card">
          <h4>OTP Verification</h4>
          <input placeholder="Enter OTP" value={otp} onChange={ ({ target }) => {setOtp( target.value ) }}/>

          <div className="countText">
            <p>
              Time Remaining = {" "}
              <span style={{fontWeight:600}}>
                {minutes < 10 ? `0${minutes}` : minutes} :
                {seconds < 10 ? `0${seconds}` : seconds} 
              </span>
            </p>

            <button 
                disabled={seconds > 0 || minutes > 0}
                style={{
                  color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                }} 
                onClick={resendOTP}>
                Resend OTP
            </button>

          </div>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </>
  );
}

export default App;
