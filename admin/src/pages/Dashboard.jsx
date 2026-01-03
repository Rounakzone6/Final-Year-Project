import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AppContext from "@/contexts/AppContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const {
    role,
    stateList,
    cityList,
    collegeList,
    hostelList,
    pgList,
    messList,
    ownerList,
    adminList,
  } = useContext(AppContext);

  const chartData = {
    labels: ["Colleges", "Hostels", "PGs", "Mess"],
    datasets: [
      {
        data: [
          collegeList.length,
          hostelList.length,
          pgList.length,
          messList.length,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
        hoverOffset: 20,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 11 },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const items = [
    {
      text: "States",
      data: stateList.length,
      accent: "border-b-blue-500",
      textColor: "text-blue-600",
    },
    {
      text: "Cities",
      data: cityList.length,
      accent: "border-b-green-500",
      textColor: "text-green-600",
    },
    {
      text: "Colleges",
      data: collegeList.length,
      accent: "border-b-purple-500",
      textColor: "text-purple-600",
    },
    {
      text: "Hostels",
      data: hostelList.length,
      accent: "border-b-sky-500",
      textColor: "text-sky-600",
    },
    {
      text: "Flats/PGs",
      data: pgList.length,
      accent: "border-b-orange-500",
      textColor: "text-orange-600",
    },
    {
      text: "Canteens",
      data: messList.length,
      accent: "border-b-gray-500",
      textColor: "text-gray-600",
    },
    {
      text: "Pending",
      data: ownerList.length,
      accent: "border-b-red-500",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-dvh">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Real-time statistics of your platform.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={`bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border-b-4 ${item.accent} transition-transform active:scale-95 md:hover:-translate-y-1`}
          >
            <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-wider">
              {item.text}
            </p>
            <p
              className={`text-2xl md:text-3xl font-black mt-1 md:mt-2 ${item.textColor}`}
            >
              {item.data}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6">
            Inventory Distribution
          </h2>
          <div className="h-64 md:h-80 w-full">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-6">
            Platform Health
          </h2>
          <div className="space-y-5">
            <StatRow label="States" value={stateList.length} />
            <StatRow label="Cities" value={cityList.length} />
            <StatRow label="Requests" value={ownerList.length} highlight />
            {role === "superadmin" && (
              <StatRow label="Admins" value={adminList?.length || 0} />
            )}
          </div>
          <button className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, highlight = false }) => (
  <div className="flex justify-between items-center group">
    <span className="text-slate-500 text-sm md:text-base font-medium group-hover:text-slate-900 transition-colors">
      {label}
    </span>
    <span
      className={`text-base md:text-lg font-bold ${
        highlight ? "text-red-600" : "text-slate-900"
      }`}
    >
      {value}
    </span>
  </div>
);

export default Dashboard;
