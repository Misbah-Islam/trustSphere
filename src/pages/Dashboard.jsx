import React, { useMemo } from "react";
import { useApp } from "../context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Core brand palette mappings for Recharts
const COLORS = ["#1e3a5f", "#f0a500", "#3b82f6", "#10b981", "#8b5cf6"];

export const Dashboard = () => {
  const { donations, beneficiaries, events, theme } = useApp();

  // ----- Metrics Definitions -----

  const totalDonations = useMemo(
    () => donations.reduce((sum, d) => sum + Number(d.amount || 0), 0),
    [donations],
  );
  const upcomingEvents = useMemo(
    () =>
      events.filter((e) => (e.date ? new Date(e.date) >= new Date() : true))
        .length,
    [events],
  );

  const isDonationsEmpty = donations.length === 0;
  const isBeneficiariesEmpty = beneficiaries.length === 0;

  const monthlyDonations = useMemo(() => {
    if (isDonationsEmpty) {
      return [
        { name: "Jan", amount: 2400 },
        { name: "Feb", amount: 1398 },
        { name: "Mar", amount: 9800 },
        { name: "Apr", amount: 3908 },
        { name: "May", amount: 4800 },
        { name: "Jun", amount: 3800 },
      ];
    }
    const data = {};
    donations.forEach((d) => {
      const date = new Date(d.date || Date.now());
      const month = date.toLocaleString("default", { month: "short" });
      data[month] = (data[month] || 0) + Number(d.amount || 0);
    });
    return Object.keys(data).map((key) => ({ name: key, amount: data[key] }));
  }, [donations, isDonationsEmpty]);

  const beneficiaryCategories = useMemo(() => {
    if (isBeneficiariesEmpty) {
      return [
        { name: "Education", value: 40 },
        { name: "Healthcare", value: 30 },
        { name: "Housing", value: 20 },
        { name: "Food Support", value: 10 },
      ];
    }
    const data = {};
    beneficiaries.forEach((b) => {
      const category = b.category || "Other";
      data[category] = (data[category] || 0) + 1;
    });
    return Object.keys(data).map((key) => ({ name: key, value: data[key] }));
  }, [beneficiaries, isBeneficiariesEmpty]);

  const recentDonations = useMemo(() => {
    if (isDonationsEmpty) {
      return [
        {
          id: 1,
          donor: "Michael Johnson",
          amount: 1500,
          date: "2023-10-12",
          campaign: "Winter Relief",
        },
        {
          id: 2,
          donor: "Sarah Williams",
          amount: 250,
          date: "2023-10-11",
          campaign: "Education Fund",
        },
        {
          id: 3,
          donor: "Global Tech LLC",
          amount: 5000,
          date: "2023-10-09",
          campaign: "General Fund",
        },
        {
          id: 4,
          donor: "David Brown",
          amount: 100,
          date: "2023-10-08",
          campaign: "Food Drive",
        },
        {
          id: 5,
          donor: "Anonymous",
          amount: 500,
          date: "2023-10-05",
          campaign: "Winter Relief",
        },
      ];
    }
    return [...donations]
      .sort(
        (a, b) =>
          new Date(b.date || Date.now()) - new Date(a.date || Date.now()),
      )
      .slice(0, 5);
  }, [donations, isDonationsEmpty]);

  const StatCard = ({ title, value, subtitle, icon, colorClass }) => (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 sm:gap-6 hover:shadow-md dark:shadow-black/50 transition-shadow">
      <div
        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${colorClass} bg-opacity-10 dark:bg-opacity-20 shrink-0`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 truncate">
          {title}
        </p>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900  truncate">
          {value}
        </h3>
        {subtitle && (
          <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-8 animate-fade-in-up pb-8 mt-2">
      {/* Header Profile */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-trust-blue dark:text-blue-400">
          Organization Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
          Welcome back! Here is a high-level overview of your operations.
        </p>
      </div>

      {/* Stats Grid Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Donations"
          value={`$${isDonationsEmpty ? "23,406" : totalDonations.toLocaleString()}`}
          subtitle={
            isDonationsEmpty ? "+14% from last month" : "Lifetime aggregation"
          }
          colorClass="bg-trust-gold text-trust-gold"
          icon={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          }
        />
        <StatCard
          title="Beneficiaries"
          value={isBeneficiariesEmpty ? "1,240" : beneficiaries.length}
          subtitle="Registered families & individuals"
          colorClass="bg-trust-blue text-trust-blue"
          icon={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          }
        />
        <StatCard
          title="Upcoming Events"
          value={
            upcomingEvents === 0 && events.length === 0 ? "3" : upcomingEvents
          }
          subtitle="Scheduled for this month"
          colorClass="bg-purple-500 text-purple-600"
          icon={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
          }
        />
        <StatCard
          title="Active Volunteers"
          value="142"
          subtitle="Available for dispatch"
          colorClass="bg-emerald-500 text-emerald-600"
          icon={
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          }
        />
      </div>

      {/* Chart Integrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analytics: Donations Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-gray-800  mb-4 sm:mb-6">
            Donation Trends
          </h2>
          <div className="h-[250px] sm:h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyDonations}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF" }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  cursor={{ fill: theme === "dark" ? "#7b92a7" : "#f3f4f6" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    backgroundColor: theme === "dark" ? "#d8e2f1" : "#fff",
                    color: theme === "dark" ? "#000" : "#000",
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="#1e3a5f"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Analytics: Beneficiary Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col min-w-0">
          <h2 className="text-base sm:text-lg font-bold text-gray-800  mb-2">
            Category Demographics
          </h2>
          <div className="h-[250px] sm:h-[300px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={beneficiaryCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={115}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {beneficiaryCategories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    backgroundColor: theme === "dark" ? "#d8e2f1" : "#fff",
                    color: theme === "dark" ? "#fff" : "#000",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Deep Layout: Recent Activity List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden min-w-0">
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">
            Recent Donations
          </h2>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-white font-medium whitespace-nowrap">
            Last 5 records
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-600 text-[10px] sm:text-xs uppercase tracking-wider">
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b border-gray-100 dark:border-gray-700">
                  Donor Name
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b border-gray-100 dark:border-gray-700">
                  Contribution
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b border-gray-100 dark:border-gray-700">
                  Attached Campaign
                </th>
                <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b border-gray-100 dark:border-gray-700">
                  Date Logged
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentDonations.map((tx, idx) => (
                <tr
                  key={tx.id || idx}
                  className="group hover:bg-gray-50/80 dark:hover:bg-gray-400/50 transition-colors"
                >
                  {/* Donor Name */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-trust-blue text-white flex items-center justify-center font-bold text-xs sm:text-sm mr-3 sm:mr-4 shadow-sm">
                        {tx.donor ? tx.donor.charAt(0) : "?"}
                      </div>

                      {/* ✅ ALWAYS BLACK */}
                      <span className="font-semibold text-sm sm:text-base text-black">
                        {tx.donor || "Anonymous"}
                      </span>
                    </div>
                  </td>

                  {/* Contribution */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="font-bold text-sm sm:text-base text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 inline-block px-2 sm:px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                      ${Number(tx.amount).toLocaleString()}
                    </div>
                  </td>

                  {/* Campaign */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                      {tx.campaign || "General Pool"}
                    </span>
                  </td>

                  {/* Date Logged */}
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-500 dark:text-gray-400 group-hover:text-white font-medium text-xs sm:text-sm transition-colors">
                    {tx.date
                      ? new Date(tx.date).toLocaleDateString()
                      : "Unknown Timestamp"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentDonations.length === 0 && (
            <div className="px-6 py-10 text-center text-gray-500 dark:text-gray-400 font-medium bg-gray-50/30 dark:bg-gray-900/30">
              No recent donation transactions found on the ledger.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
