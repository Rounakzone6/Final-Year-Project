import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaRegStar, FaStar } from "react-icons/fa";
import axios from "axios";
import AppContext from "@/contexts/AppContext";
import ReCAPTCHA from "react-google-recaptcha";

const ReviewForm = () => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [captchaToken, setCaptchaToken] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    tag: "",
    captchaToken: "",
  });

  const recaptchaRef = useRef(null);
  const { backendUrl, location } = useContext(AppContext);
  const pathParts = location.pathname.split("/").filter(Boolean);
  const type = pathParts[0];
  const id = pathParts[pathParts.length - 1];

  const onCaptchaChange = (value) => {
    setCaptchaToken(value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.warning("Please select a star rating!");
    if (!captchaToken) {
      setLoading(false);
      return toast.error("Please verify reCAPTCHA");
    }
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/review/new`, {
        type,
        id,
        ...formData,
        rating,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: "", comment: "", tag: "" });
        setRating(0);
        setCaptchaToken("");
        recaptchaRef.current.reset();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      recaptchaRef.current.reset();
      setCaptchaToken("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 mt-2 rounded-4xl border border-slate-100 shadow-sm">
      <form className="space-y-5" onSubmit={onSubmitHandler}>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
            Overall Rating
          </label>
          <div className="flex gap-2 mt-1 text-amber-400">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <button
                  type="button"
                  key={starValue}
                  className="transition-transform hover:scale-125 focus:outline-none"
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  {starValue <= (hover || rating) ? (
                    <FaStar size={28} />
                  ) : (
                    <FaRegStar size={28} className="text-slate-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Display Name
            </label>
            <input
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
              Category/Tag
            </label>
            <input
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              placeholder="#HostelLife"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-slate-400 uppercase">
              Your Review
            </label>
            <span className="text-[10px] text-slate-400 font-bold">
              {formData.comment.length} / 500
            </span>
          </div>
          <textarea
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium min-h-30 resize-none"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Tell us about your experience..."
            maxLength={500}
            required
          />
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="scale-90 md:scale-100 origin-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={onCaptchaChange}
            />
          </div>
          <button
            className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-lg ${
              loading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </span>
            ) : (
              "Post Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
