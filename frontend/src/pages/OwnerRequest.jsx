import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaPhoneAlt, FaPaperPlane, FaShieldAlt } from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";

const OwnerRequest = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { loading, setLoading, backendUrl } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      return toast.error("Please fill in all details");
    }
    if (phone.length < 10) {
      return toast.error("Please enter a valid phone number");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${backendUrl}/owner/request`, {
        name,
        phone,
      });

      if (res.data.success) {
        toast.success("Request sent successfully! We will contact you soon.");
        setName("");
        setPhone("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <FaShieldAlt size={30} />
          </div>
          <h2 className="text-2xl font-bold">Partner with Us</h2>
          <p className="text-blue-100 text-sm mt-2">
            Register your property and reach thousands of students.
          </p>
        </div>
        <form onSubmit={onSubmitHandler} className="p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FaUser size={14} />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <FaPhoneAlt size={14} />
                </div>
                <input
                  type="tel"
                  placeholder="00000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane size={16} />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>
          <p className="text-center text-slate-400 text-[11px] mt-6 leading-relaxed">
            By submitting, you agree to our Terms of Service. Our team will
            verify your details within 24-48 hours.
          </p>
        </form>
      </div>
    </div>
  );
};

export default OwnerRequest;
