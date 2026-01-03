import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AppContext from "./AppContext";

const ContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [hostelList, setHostelList] = useState([]);
  const [pgList, setPgList] = useState([]);
  const [messList, setMessList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && role) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [token, role]);

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

  useEffect(() => {
    if (!token) return;
    if (role === "superadmin") {
      const loadData = async () => {
        try {
          const res = await axios.get(`${backendUrl}/admin/list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.data.success) {
            setAdminList(res.data.adminList);
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error("Error loading admin list");
        }
      };
      loadData();
    }
    const loadData = async () => {
      try {
        const response = await axios(`${backendUrl}/owner`);
        if (response.data.success) {
          setOwnerList(response.data.owners);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    loadData();
  }, [token, role, backendUrl]);

  const value = useMemo(
    () => ({
      token,
      role,
      backendUrl,
      loading,
      cityList,
      collegeList,
      adminList,
      ownerList,
      stateList,
      hostelList,
      pgList,
      messList,
      setMessList,
      setPgList,
      setStateList,
      setHostelList,
      setOwnerList,
      setAdminList,
      navigate,
      setCityList,
      setCollegeList,
      setLoading,
      setToken,
      setRole,
    }),
    [
      token,
      role,
      stateList,
      hostelList,
      ownerList,
      backendUrl,
      adminList,
      pgList,
      messList,
      loading,
      cityList,
      collegeList,
      navigate,
    ]
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
