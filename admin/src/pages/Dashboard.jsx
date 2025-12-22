import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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
        backgroundColor: [
          "#3b82f6", // Blue
          "#10b981", // Green
          "#f59e0b", // Amber
          "#ef4444", // Red
        ],
        hoverOffset: 15,
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { position: "bottom" },
    },
    // cutout: "50%",
    maintainAspectRatio: false,
  };

  const items = [
    { text: "Users Visited", data: hostelList.length, color: "bg-pink-500" },
    { text: "Active Users", data: hostelList.length, color: "bg-red-500" },
    { text: "States", data: stateList.length, color: "bg-blue-500" },
    { text: "Cities", data: cityList.length, color: "bg-green-500" },
    { text: "Colleges", data: collegeList.length, color: "bg-purple-500" },
    { text: "Hostels", data: hostelList.length, color: "bg-sky-500" },
    { text: "Flats/PGs", data: pgList.length, color: "bg-orange-500" },
    { text: "Canteens/Mess", data: messList.length, color: "bg-gray-500" },
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {items.map((item, index) => (
          <div
            key={index}
            className={`${item.color} p-6 rounded-2xl shadow-lg text-white`}
          >
            <p className="text-sm font-medium opacity-80">{item.text}</p>
            <p className="text-4xl font-bold mt-2">{item.data}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 w-full">
            Inventory Distribution
          </h2>
          <div className="h-64 w-full">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Total States</span>
              <span className="font-bold">{stateList.length}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Total Cities</span>
              <span className="font-bold">{cityList.length}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Total Owners</span>
              <span className="font-bold">{ownerList.length}</span>
            </div>
            {role === "superadmin" ? (
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Total Admins</span>
                <span className="font-bold">{ownerList.length}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
