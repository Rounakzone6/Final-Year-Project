import React, { useState } from "react";
import { FaUserCircle, FaStar, FaQuoteLeft } from "react-icons/fa";
import ReviewForm from "./ReviewForm";

const Review = ({ reviews }) => {
  const [review, setReview] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative"
          >
            <FaQuoteLeft className="absolute top-6 right-8 text-slate-100 text-5xl group-hover:text-blue-50 transition-colors" />
            <div className="flex gap-2 items-center">
              <p>{item.rating}</p>
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-2 relative z-10 italic">
              "{item.text}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                <FaUserCircle size={28} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">
                  {item.name}
                </h4>
              </div>
            </div>

            <div className="mt-2 border-t border-slate-50">
              <span className="text-xs font-bold text-blue-500/70">
                {item.tags}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setReview(true)}
        className="px-3 py-2 bg-blue-400 rounded-2xl text-white text-lg font-medium mt-2 cursor-pointer"
      >
        Write your reviews
      </button>
      {review && <ReviewForm />}
    </div>
  );
};

export default Review;
