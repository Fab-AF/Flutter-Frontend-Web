import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/auth/authSlice';
import { RiHotelLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { MdSportsMartialArts } from "react-icons/md";

const MetricCard = ({ icon: Icon, title, value, loading }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
      <Icon className="text-gray-800 size-6 dark:text-white/90" />
    </div>
    <div className="flex items-end justify-between mt-5">
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </span>
        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
          {loading ? 'Loading...' : value}
        </h4>
      </div>
    </div>
  </div>
);

export default function EcommerceMetrics() {
  const dispatch = useDispatch();
  const { usersLoading } = useSelector((state) => state.auth);
  const [counts, setCounts] = useState({
    clubs: 0,
    doctors: 0,
    sportsPersons: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchAllUsers());
        if (result.payload?.users) {
          const newCounts = {
            clubs: result.payload.users.clubs?.length || 0,
            doctors: result.payload.users.doctors?.length || 0,
            sportsPersons: result.payload.users.sportspersons?.length || 0
          };
          setCounts(newCounts);
        } else {
          setCounts({ clubs: 0, doctors: 0, sportsPersons: 0 });
        }
      } catch (error) {
        setCounts({ clubs: 0, doctors: 0, sportsPersons: 0 });
      }
    };

    fetchData();
  }, [dispatch]);

  const metrics = useMemo(() => [
    {
      icon: RiHotelLine,
      title: 'Total Clubs',
      value: counts.clubs
    },
    {
      icon: FaUserDoctor,
      title: 'Total Doctors',
      value: counts.doctors
    },
    {
      icon: MdSportsMartialArts,
      title: 'Total Sportsperson',
      value: counts.sportsPersons
    }
  ], [counts]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          icon={metric.icon}
          title={metric.title}
          value={metric.value}
          loading={usersLoading}
        />
      ))}
    </div>
  );
}
