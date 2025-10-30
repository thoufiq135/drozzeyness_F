import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [heartRate, setHeartRate] = useState("");
  const [spo2, setSpo2] = useState("");
  const [leds, setLeds] = useState([false, false, false, false]);
  const [gps, setGps] = useState([0, 0]);
  const [alert, setAlert] = useState("");

  async function fetchData() {
    console.log("Trying to fetch data...");
    try {
      const response = await fetch("https://resberripi-nodemailer.vercel.app/get_data");
      const res = await response.json();
      console.log(res);

      setHeartRate(res.heartrate ?? "");
      setSpo2(res.spo2 ?? res.spo2s ?? "");
      setLeds(res.led ?? [false, false, false, false]);
      setGps([res.lat ?? 0, res.log ?? 0]);
      setAlert(res.alerts ?? "");
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-900 text-white p-4 gap-6">
     
        <div className="w-full lg:w-[45vw] bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-sky-400 tracking-wide text-center">
            Drowsiness Detection
          </h1>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-gray-900 px-6 py-4 rounded-2xl shadow-md text-center w-[140px] sm:w-[180px]">
              <h2 className="text-base text-gray-400">Heart Rate</h2>
              <p className="text-3xl sm:text-4xl font-semibold text-red-400">
                {heartRate} bpm
              </p>
            </div>
            <div className="bg-gray-900 px-6 py-4 rounded-2xl shadow-md text-center w-[140px] sm:w-[180px]">
              <h2 className="text-base text-gray-400">SpO₂</h2>
              <p className="text-3xl sm:text-4xl font-semibold text-blue-400">
                {spo2}%
              </p>
            </div>
          </div>

  
          <div className="flex flex-col items-center mb-10">
            <div
              className={`w-24 h-24 sm:w-32 sm:h-32 border-8 border-gray-700 rounded-full flex items-center justify-center 
              ${alert !== "Safe driving" ? "animate-none opacity-60" : "animate-spin-slow"}
              bg-gray-900`}
              style={{ borderTopColor: alert !== "Safe driving" ? "#f87171" : "#38bdf8" }}
            >
              <span className="text-sm text-gray-400">Tire</span>
            </div>

            {alert !== "Safe driving" && (
              <p className="mt-3 text-red-500 font-bold animate-pulse text-center">
                🚨 {alert}
              </p>
            )}
          </div>

       
          <div className="flex justify-center gap-4 sm:gap-6">
            {leds.map((on, index) => (
              <div
                key={index}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg transition-all duration-500 
                ${on ? "bg-yellow-400 shadow-green-400/50 animate-blink" : "bg-gray-700"}`}
              ></div>
            ))}
          </div>
        </div>

       
        <div className="w-full lg:w-[45vw] h-[60vh] lg:h-[100vh] rounded-2xl overflow-hidden border-4 border-gray-800 shadow-lg">
          <iframe
            src={`https://maps.google.com/maps?q=${gps[0]},${gps[1]}&z=15&output=embed`}
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default App;
