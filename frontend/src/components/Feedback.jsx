import { FaUserCircle, FaStar, FaQuoteLeft } from "react-icons/fa";

const Feedback = () => {
  const testimonials = [
    {
      name: "Sweta Yadav",
      role: "Student, BBDU",
      text: "Found my perfect home away from home! Nestify made it so easy to find a safe and studious environment right next to my campus. Best PG discovery platform ever!",
      tags: "#SafeStay #CollegeLife",
    },
    {
      name: "Rounak Gupta",
      role: "Engineering Student",
      text: "The mess filtering is a lifesaver. I was tired of bad food, but Nestify helped me find a mess with home-like taste within walking distance of my flat.",
      tags: "#GoodFood #Nestify",
    },
    {
      name: "Samriddhi Verma",
      role: "PG Resident",
      text: "Verified owners and transparent pricing. I didn't have to deal with middlemen or hidden charges. The map view made choosing the location so simple.",
      tags: "#Verified #StudentFriendly",
    },
  ];

  return (
    <div className="py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Loved by <span className="text-blue-600">Thousands</span> of
            Students
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Don't just take our word for it. Here is what the student community
            has to say about their experience with Nestify.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative"
            >
              <FaQuoteLeft className="absolute top-6 right-8 text-slate-100 text-5xl group-hover:text-blue-50 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-6 relative z-10 italic">
                "{item.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaUserCircle size={32} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">
                    {item.name}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-blue-500/70">
                  {item.tags}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
