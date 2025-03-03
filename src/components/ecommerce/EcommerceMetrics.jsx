import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/auth/authSlice';
import { RiHotelLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { MdSportsMartialArts } from "react-icons/md";

export default function EcommerceMetrics() {
  const dispatch = useDispatch();
  const { users, usersLoading, usersError } = useSelector((state) => state.auth);
  const [totalClubs, setTotalClubs] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalSportsPersons, setTotalSportsPersons] = useState(0);

  useEffect(() => {
    dispatch(fetchAllUsers())
      .then((result) => {
        if (result.payload?.users) {
          setTotalClubs(result.payload.users.clubs?.length || 0);
          setTotalDoctors(result.payload.users.doctors?.length || 0);
          setTotalSportsPersons(result.payload.users.sportsPersons?.length || 0);
        } else {
          console.error('Invalid data format:', result.payload);
          setTotalClubs(0);
          setTotalDoctors(0);
          setTotalSportsPersons(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setTotalClubs(0);
        setTotalDoctors(0);
        setTotalSportsPersons(0);
      });
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {/* Total Clubs */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <RiHotelLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Clubs
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {usersLoading ? 'Loading...' : totalClubs}
            </h4>
          </div>
        </div>
      </div>

      {/* Total Doctors */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <FaUserDoctor className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Doctors
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {usersLoading ? 'Loading...' : totalDoctors}
            </h4>
          </div>
        </div>
      </div>

      {/* Total Sportsperson */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <MdSportsMartialArts className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Sportsperson
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {usersLoading ? 'Loading...' : totalSportsPersons}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
