"use client";

import React, { useState } from "react";
import {
  X,
  Map,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  Users,
  BedDouble,
  Calendar,
  CreditCard,
  CheckCircle,
  Loader,
  ArrowLeft,
} from "lucide-react";
import api from "../utils/api";

/* =========================================
   CONSTANTS FOR CTA / NAV SIZING
   ========================================= */
const CTA_HEIGHT = 72;
const BOTTOM_NAV_HEIGHT = 64;

export default function ItineraryCard({ reel, onClose, isMobile }) {
  /* ----------------------------------------------------------
     FIXED: Use correct key from Prisma (itinerary_days)
  -----------------------------------------------------------*/
  const days =
    reel?.itinerary ||
    reel?.itineraryDays ||
    reel?.itinerary_days || [];

  const scrollPaddingBottom = isMobile
    ? CTA_HEIGHT + BOTTOM_NAV_HEIGHT + 28
    : CTA_HEIGHT + 24;

  const stopScroll = (e) => e.stopPropagation();

  /* --- BOOKING STATE --- */
  const [view, setView] = useState("itinerary"); // "itinerary", "booking", "payment", "success"
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const totalPrice = (reel.price || 0) * guests;

  /* --- HANDLERS --- */
  const handleStartBooking = () => setView("booking");
  const handleBackToItinerary = () => setView("itinerary");
  const handleToPayment = () => {
    if (!date) return alert("Please select a date first.");
    setView("payment");
  };
  const handleBackToBooking = () => setView("booking");

  const handlePayment = async () => {
    setLoading(true);
    setBookingError(null);
    try {
      // Simulate Payment Delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create Booking API
      await api.post("/bookings", {
        reelId: reel.id,
        guests,
        bookingDate: date,
        totalPrice,
      });

      setView("success");
    } catch (err) {
      console.error("Booking failed:", err);
      setBookingError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* --- SUB-COMPONENTS (INLINE FOR SIMPLICITY) --- */

  /* 1. BOOKING DETAILS VIEW */
  const renderBookingDetails = () => (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-6">Trip Details</h3>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Select Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* Guests Selection */}
      <div className="mb-8">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Guests
        </label>
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
          <span className="text-sm font-medium text-gray-600">How many?</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span className="font-bold text-lg w-4 text-center">{guests}</span>
            <button
              onClick={() => setGuests(guests + 1)}
              className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 hover:bg-indigo-200"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>₹{reel.price} x {guests} guests</span>
          <span>₹{totalPrice}</span>
        </div>
        <div className="flex justify-between mb-2 text-sm text-gray-600">
          <span>Service Fee</span>
          <span>₹0</span>
        </div>
        <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
      </div>
    </div>
  );

  /* 2. PAYMENT VIEW */
  const renderPayment = () => (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-6">Payment</h3>

      <div className="bg-indigo-600 text-white rounded-xl p-6 mb-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
        <div className="relative z-10">
          <CreditCard className="mb-6" size={32} />
          <div className="font-mono text-lg tracking-widest mb-4">**** **** **** 4242</div>
          <div className="flex justify-between text-xs opacity-80 uppercase">
            <span>Card Holder</span>
            <span>Expires</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Amit Kumar</span>
            <span>12/25</span>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mb-6">
        This is a simulated payment. No actual charge will be made.
      </div>

      {bookingError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4">
          {bookingError}
        </div>
      )}
    </div>
  );

  /* 3. SUCCESS VIEW */
  const renderSuccess = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <CheckCircle size={48} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-500 mb-8">
        You're going to <strong>{reel.place}</strong>!<br />
        Check your profile for booking details.
      </p>
      <button
        onClick={onClose}
        className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition"
      >
        Done
      </button>
    </div>
  );

  /* --- RENDER MAIN CONTENT --- */
  return (
    <div
      className="w-full h-full bg-white text-gray-900 flex flex-col relative overflow-hidden rounded-none md:rounded-2xl"
      onWheel={stopScroll}
      onTouchMove={stopScroll}
      onClick={stopScroll}
    >
      {/* HEADER (Dynamic based on view) */}
      <div className="p-4 md:p-5 border-b border-gray-100 flex justify-between items-center shrink-0 bg-white z-10 shadow-sm">
        {view === "itinerary" ? (
          <div className="flex-1">
             <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-1">{reel.title}</h3>
          </div>
        ) : view !== "success" ? (
          <button onClick={view === "payment" ? handleBackToBooking : handleBackToItinerary} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
        ) : (
           <div className="flex-1"></div>
        )}
        
        {view !== "success" && (
           <button
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               onClose();
             }}
             className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer shrink-0"
           >
             <X size={20} />
           </button>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar" style={{ paddingBottom: view === 'itinerary' ? `${scrollPaddingBottom}px` : '20px' }}>
        {view === "itinerary" && (
          <div className="p-4 md:p-5">
             {/* Highlights */}
              {reel.highlights && (
                <div className="mb-6">
                  <h4 className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {reel.highlights.map((tag, i) => (
                      <span key={i} className="px-2 py-1 md:px-3 bg-indigo-50 text-indigo-600 text-[10px] md:text-xs font-bold rounded-lg border border-indigo-100 whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              <div className="w-full h-28 md:h-32 bg-indigo-50 rounded-xl mb-6 border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center shrink-0">
                <Map className="text-indigo-400 mb-2" size={24} />
                <span className="text-indigo-600 font-bold text-xs">Interactive Map View</span>
              </div>

              {/* Itinerary List */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">Daily Itinerary</h4>
                <div className="space-y-6 pl-2">
                  {days.length === 0 ? (
                    <div className="text-center text-gray-400 text-sm">Itinerary details coming soon.</div>
                  ) : (
                    days.map((dayData, index) => {
                      const title = dayData.title || dayData.day || `Day ${index + 1}`;
                      const desc = dayData.desc || (dayData.activities ? `Experience ${dayData.activities.slice(0, 2).join(" & ")}` : "Explore the city");
                      return (
                        <div key={index} className="relative pl-6 border-l-2 border-gray-100 last:border-0">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white shadow-sm" />
                          <div className="mb-1">
                            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-0.5">Day {index + 1}</span>
                            <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
                          </div>
                          <p className="text-xs text-gray-500 mb-3 leading-relaxed">{desc}</p>
                           <div className="space-y-2">
                             {(dayData.activities || []).map((act, i) => (
                               <div key={i} className="bg-gray-50 p-2 rounded-lg border border-gray-100 flex gap-2 items-center">
                                 <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-gray-400"><MapPin size={12} /></div>
                                 <span className="font-semibold text-xs text-gray-700">{act}</span>
                               </div>
                             ))}
                           </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

               {/* Stay */}
               {reel.stay && (
                 <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm"><BedDouble size={16} className="text-indigo-500" /> Where you'll stay</h4>
                    <div className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                            <img src={reel.stay.image} alt="hotel" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-gray-900 truncate">{reel.stay.name}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{reel.stay.desc}</p>
                             <div className="flex items-center gap-1 mt-1 text-xs font-bold text-yellow-600">
                                <Star size={10} fill="currentColor" /> {reel.stay.rating}
                             </div>
                        </div>
                    </div>
                 </div>
               )}
          </div>
        )}

        {view === "booking" && renderBookingDetails()}
        {view === "payment" && renderPayment()}
        {view === "success" && renderSuccess()}
      </div>

      {/* FOOTER CTA (Only for Itinerary and Booking steps) */}
      {view !== "success" && (
        <div
            className="absolute left-0 w-full p-4 bg-white border-t border-gray-100 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]"
            style={{
            bottom: isMobile
                ? `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`
                : `env(safe-area-inset-bottom)`,
            }}
        >
            {view === "itinerary" && (
                <>
                    <div className="flex justify-between items-end mb-3 px-1">
                        <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Price</span>
                            <span className="text-2xl font-black text-gray-900 leading-none">₹{reel.price}</span>
                            <span className="text-xs text-gray-400 font-medium"> / person</span>
                        </div>
                        <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">Free Cancellation</span>
                    </div>
                    <button onClick={handleStartBooking} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg cursor-pointer active:scale-[0.98]">
                        Book This Trip <ChevronRight size={16} />
                    </button>
                </>
            )}

            {view === "booking" && (
                <button onClick={handleToPayment} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg cursor-pointer active:scale-[0.98]">
                    Continue to Payment <ChevronRight size={16} />
                </button>
            )}

            {view === "payment" && (
                <button disabled={loading} onClick={handlePayment} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg cursor-pointer active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                    {loading ? <Loader className="animate-spin" size={20} /> : `Pay ₹${totalPrice}`}
                </button>
            )}
        </div>
      )}
    </div>
  );
}
