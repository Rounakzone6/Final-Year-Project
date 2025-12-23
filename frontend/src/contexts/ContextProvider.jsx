import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "./AppContext";
import axios from "axios";

const ContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const mapId = import.meta.env.VITE_GOOGLE_MAPID;
  const googleApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const [loading, setLoading] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [hostelList, setHostelList] = useState([]);
  const [pgList, setPgList] = useState([]);
  const [messList, setMessList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [stateRes, cityRes, collegeRes, hostelRes, pgRes, messRes] =
          await Promise.all([
            axios.get(`${backendUrl}/state`),
            axios.get(`${backendUrl}/city`),
            axios.get(`${backendUrl}/college`),
            axios.get(`${backendUrl}/hostel`),
            axios.get(`${backendUrl}/pg`),
            axios.get(`${backendUrl}/mess`),
          ]);
        if (stateRes.data.success) {
          setStateList(stateRes.data.states);
        }
        if (cityRes.data.success) {
          setCityList(cityRes.data.cities);
        }
        if (collegeRes.data.success) {
          setCollegeList(collegeRes.data.colleges);
        }
        if (hostelRes.data.success) {
          setHostelList(hostelRes.data.hostels);
        }
        if (pgRes.data.success) {
          setPgList(pgRes.data.pgs);
        }
        if (messRes.data.success) {
          setMessList(messRes.data.mess);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (backendUrl) loadData();
  }, [backendUrl]);

  const value = useMemo(
    () => ({
      backendUrl,
      loading,
      mapId,
      googleApiKey,
      cityList,
      collegeList,
      hostelList,
      stateList,
      pgList,
      messList,
      location,
      setMessList,
      setPgList,
      navigate,
      setLoading,
      setStateList,
      setCityList,
      setCollegeList,
      setHostelList,
    }),
    [
      backendUrl,
      pgList,
      loading,
      mapId,
      messList,
      googleApiKey,
      stateList,
      cityList,
      collegeList,
      hostelList,
      location,
      navigate,
    ]
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
