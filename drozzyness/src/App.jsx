import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [heartRate, setHeartRate] = useState("");
  const [spo2, setSpo2] = useState("");
  const [tilt, setTilt] = useState('Straight');
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
      <div className="flex justify-center">
        <div className="w-[90vw] h-[100vh] bg-gray-900 text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold mb-8 text-sky-400 tracking-wide">
            Drozzyness Detection
          </h1>

          <div className="flex gap-10 mb-8">
            <div className="bg-gray-800 px-6 py-4 rounded-2xl shadow-md text-center">
              <h2 className="text-lg text-gray-400">Heart Rate</h2>
              <p className="text-4xl font-semibold text-red-400">{heartRate} bpm</p>
            </div>
            <div className="bg-gray-800 px-6 py-4 rounded-2xl shadow-md text-center">
              <h2 className="text-lg text-gray-400">SpO₂</h2>
              <p className="text-4xl font-semibold text-blue-400">{spo2}%</p>
            </div>
          </div>

          <div className="flex flex-col items-center mb-10">
            <div
              className={`w-32 h-32 border-8 border-gray-700 rounded-full flex items-center justify-center 
              ${alert !== "Safe driving" ? "animate-none opacity-60" : "animate-spin-slow"}
              bg-gray-800`}
              style={{ borderTopColor: alert !== "Safe driving" ? "#f87171" : "#38bdf8" }}
            >
              <span className="text-sm text-gray-400">Tire</span>
            </div>

           

            {alert !== "Safe driving" && (
              <p className="mt-2 text-red-500 font-bold animate-pulse">
                🚨 {alert}
              </p>
            )}
          </div>

          <div className="flex gap-6">
            {leds.map((on, index) => (
              <div
  key={index}
  className={`w-10 h-10 rounded-full shadow-lg transition-all duration-1000 
  ${on ? "bg-yellow-400 shadow-green-400/50 animate-blink" : "bg-gray-700"}`}
></div>

            ))}
          </div>
        </div>

        <iframe
          src={`https://maps.google.com/maps?q=${gps[0]},${gps[1]}&z=15&output=embed`}
          className="w-full h-[100vh] rounded-2xl border-4 border-gray-800 shadow-lg"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}

export default App;
