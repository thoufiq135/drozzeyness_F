  import { useState, useEffect, useRef } from "react";
  import "./App.css";

  function MetricCard({ title, value, unit, color }) {
    return (
      <div className="bg-gray-900 px-5 py-4 rounded-xl shadow-md text-center w-[140px] sm:w-[170px]">
        <h2 className="text-sm text-gray-400">{title}</h2>
        <p className={`text-2xl font-bold ${color}`}>
          {value} <span className="text-sm">{unit}</span>
        </p>
      </div>
    );
  }

  function App() {
    const [data, setData] = useState({});
    const [gps, setGps] = useState([0, 0]);
    const lastGpsUpdateRef = useRef(0);

    async function fetchData() {
      try {
        const res = await fetch(
          "https://resberripi-nodemailer.vercel.app/get_data"
        );
        const json = await res.json();
        setData(json);

        const now = Date.now();
        if (now - lastGpsUpdateRef.current >= 10000) {
          setGps([json.lat ?? 0, json.log ?? 0]);
          lastGpsUpdateRef.current = now;
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    useEffect(() => {
      fetchData();
      const i = setInterval(fetchData, 2000);
      return () => clearInterval(i);
    }, []);

    const {
  
      alerts = "Safe driving",
      led = [],
      ibi = 0,
      rmssd = 0,
      sdnn = 0,
      pns = 0,
      sns = 0,
      stress = 0,
    } = data;

    return (
      // <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white p-4 gap-6">

      //   {/* LEFT PANEL */}
      //   <div className="w-full lg:w-[45vw] bg-gray-800 rounded-2xl p-6 flex flex-col items-center">

      //     <h1 className="text-2xl font-bold text-sky-400 mb-6 text-center">
      //       Drowsiness & Health Monitor
      //     </h1>

      //     {/* CORE METRICS */}
      //     <div className="flex flex-wrap justify-center gap-4 mb-6">
            
      //       <MetricCard title="IBI" value={ibi} unit="ms" color="text-purple-400" />
      //     </div>

      //     {/* HRV */}
      //     <div className="flex flex-wrap justify-center gap-4 mb-6">
      //       <MetricCard title="RMSSD" value={rmssd} unit="ms" color="text-green-400" />
      //       <MetricCard title="SDNN" value={sdnn} unit="ms" color="text-yellow-400" />
      //     </div>

      //     {/* AUTONOMIC */}
      //     <div className="flex flex-wrap justify-center gap-4 mb-8">
      //       <MetricCard title="PNS" value={pns} unit="" color="text-emerald-400" />
      //       <MetricCard title="SNS" value={sns} unit="" color="text-orange-400" />
      //       <MetricCard title="Stress" value={stress} unit="%" color="text-rose-500" />
      //     </div>

      //     {/* ALERT */}
      //     <div className="mb-6 text-center">
      //       {alerts !== "Safe driving" ? (
      //         <p className="text-red-500 font-bold animate-pulse text-lg">
      //           🚨 {alerts}
      //         </p>
      //       ) : (
      //         <p className="text-green-400 font-semibold">
      //           ✅ Safe Driving
      //         </p>
      //       )}
      //     </div>

      //     {/* LED STATUS */}
      //     <div className="flex gap-4">
      //       {led.map((on, i) => (
      //         <div
      //           key={i}
      //           className={`w-8 h-8 rounded-full transition-all ${
      //             on ? "bg-yellow-400 animate-pulse" : "bg-gray-700"
      //           }`}
      //         />
      //       ))}
      //     </div>
      //   </div>

      //   {/* MAP */}
      //   <div className="w-full lg:w-[45vw] h-[60vh] lg:h-[100vh] rounded-2xl overflow-hidden border-4 border-gray-800">
      //     <iframe
      //       src={`https://maps.google.com/maps?q=${gps[0]},${gps[1]}&z=15&output=embed`}
      //       className="w-full h-full"
      //       loading="lazy"
      //     />
      //   </div>
      // </div>
      <>
      <h1>temporary out of service</h1>
      </>
    );
  }

  export default App;
