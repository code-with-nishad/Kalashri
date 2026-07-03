import React from "react";
import { Link } from "react-router-dom";
import { Menu, Calendar as CalendarIcon, Phone, MessageCircle, MapPin, Check, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)] font-sans">
      
      {/* Floating Action Menu (Right Side - Desktop Only) */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 p-2">
        <a href="tel:+919876543210" className="bg-[#241a18]/90 hover:bg-[#3d2b28] border border-[#d4af37]/30 text-[#d4af37] p-3 rounded-l-xl flex flex-col items-center justify-center gap-1 transition-all backdrop-blur-sm group">
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Call Us</span>
        </a>
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="bg-[#241a18]/90 hover:bg-[#3d2b28] border border-[#d4af37]/30 text-[#d4af37] p-3 rounded-l-xl flex flex-col items-center justify-center gap-1 transition-all backdrop-blur-sm group">
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">WhatsApp</span>
        </a>
        <a href="#" className="bg-[#241a18]/90 hover:bg-[#3d2b28] border border-[#d4af37]/30 text-[#d4af37] p-3 rounded-l-xl flex flex-col items-center justify-center gap-1 transition-all backdrop-blur-sm group">
          <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold">Directions</span>
        </a>
      </div>

      {/* Mobile + Desktop Hero Section */}
      <div className="relative w-full min-h-screen bg-[#1a1110] overflow-hidden flex flex-col">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop" 
            alt="Kalashri Bride" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1110] via-[#1a1110]/80 to-transparent"></div>
        </div>

        {/* Top Navbar */}
        <nav className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between px-4 sm:px-6 md:px-8 py-6 w-full max-w-7xl mx-auto gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border border-[#d4af37] flex items-center justify-center">
              <span className="font-display text-[#d4af37] text-xl font-bold">K</span>
            </div>
            <div>
              <h1 className="font-display text-[#d4af37] text-lg sm:text-xl font-bold tracking-widest uppercase">Kalashri</h1>
              <p className="text-white/60 text-[10px] tracking-widest uppercase">Fashion & Beauty Studio</p>
            </div>
          </div>

          {/* Primary Links */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white/90 w-full md:w-auto">
            <Link to="/" className="text-[#d4af37] border-b-2 border-[#d4af37] pb-1">Home</Link>
            <Link to="/fashion" className="hover:text-[#d4af37] transition-colors">Fashion</Link>
            <Link to="/beauty" className="hover:text-[#d4af37] transition-colors">Beauty</Link>
            <Link to="/gallery" className="hover:text-[#d4af37] transition-colors">Gallery</Link>
            <Link to="/offers" className="hover:text-[#d4af37] transition-colors">Offers</Link>
            <Link to="/about" className="hover:text-[#d4af37] transition-colors">About</Link>
          </div>

          {/* Nav Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/book" className="inline-flex items-center gap-2 border border-[#d4af37] text-[#d4af37] px-4 py-2.5 rounded hover:bg-[#d4af37] hover:text-black transition-all font-semibold text-sm">
              Book Appointment
            </Link>
            <button className="lg:hidden text-white hover:text-[#d4af37]">
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 pb-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl md:max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">Welcome to Kalashri</span>
              <div className="h-[1px] w-8 bg-[#d4af37]"></div>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Where Tradition <br/>
              <span className="text-[#d4af37]">Meets Elegance</span>
            </h2>
            
            <p className="text-white/80 text-lg mb-10 max-w-lg leading-relaxed">
              From timeless ethnic wear to stunning makeovers, we bring out the best in you.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/services" className="bg-[#d4af37] text-black px-8 py-3.5 rounded font-bold hover:bg-[#ebd576] transition-colors flex items-center gap-2">
                Explore Services <span className="text-xl">→</span>
              </Link>
              <Link to="/book" className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded font-bold hover:border-[#d4af37] hover:text-[#d4af37] transition-colors flex items-center gap-2">
                Book Appointment <CalendarIcon className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white/80 text-sm font-medium">
              <div className="flex items-start gap-3 bg-white/5 rounded-3xl p-4 border border-white/10">
                <span className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] text-xl">♔</span>
                <div>
                  <p className="font-semibold">Premium Quality</p>
                  <p className="text-xs text-white/70">Materials</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 rounded-3xl p-4 border border-white/10">
                <span className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Users className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold">Expert Professionals</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 rounded-3xl p-4 border border-white/10">
                <span className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Check className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold">100% Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-[#faf7f2] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">Services We Offer</span>
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
            </div>
            <h2 className="font-display text-4xl text-gray-900 font-bold">Complete Solutions for Your Style & Beauty</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fashion Card */}
            <div className="relative rounded-2xl overflow-hidden group bg-[#3d0c34] text-white min-h-[400px] flex">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0">
                <img src="https://images.unsplash.com/photo-1610030469983-98e550d615ef?q=80&w=800&auto=format&fit=crop" alt="Fashion" className="w-full h-full object-cover object-left opacity-90 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d0c34] via-[#3d0c34]/80 to-transparent"></div>
              </div>
              
              <div className="relative z-10 p-10 flex flex-col justify-center w-full md:w-[65%]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-[#3d0c34] text-2xl">👗</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-[#d4af37]">Fashion &<br/>Tailoring</h3>
                </div>
                
                <p className="text-white/80 mb-8 text-sm leading-relaxed pr-4">
                  Custom stitching, designer wear, aari work & traditional outfits crafted with perfection.
                </p>
                
                <ul className="space-y-3 mb-10 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Nauvari Saree Stitching</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Blouse Stitching</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Custom Dresses</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Aari Work & Embroidery</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Alterations & More</li>
                </ul>

                <Link to="/fashion" className="bg-[#f3e5ab] text-[#3d0c34] px-6 py-3 rounded font-bold w-max hover:bg-white transition-colors">
                  Explore Fashion →
                </Link>
              </div>
            </div>

            {/* Beauty Card */}
            <div className="relative rounded-2xl overflow-hidden group bg-[#1a1a1a] text-white min-h-[400px] flex">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0">
                <img src="https://images.unsplash.com/photo-1516975080661-460d3fcb6215?q=80&w=800&auto=format&fit=crop" alt="Beauty" className="w-full h-full object-cover object-left opacity-80 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/90 to-transparent"></div>
              </div>
              
              <div className="relative z-10 p-10 flex flex-col justify-center w-full md:w-[65%]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-[#1a1a1a] text-2xl">🪷</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-[#d4af37]">Beauty<br/>Parlour</h3>
                </div>
                
                <p className="text-white/80 mb-8 text-sm leading-relaxed pr-4">
                  Pamper yourself with our premium beauty & salon services.
                </p>
                
                <ul className="space-y-3 mb-10 text-sm">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Bridal Makeup</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Hair Styling</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Skin & Hair Care</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Mehendi</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Packages & More</li>
                </ul>

                <Link to="/beauty" className="bg-[#f3e5ab] text-[#1a1a1a] px-6 py-3 rounded font-bold w-max hover:bg-white transition-colors">
                  Explore Beauty →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-gray-200 bg-white py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-8 divide-x-0 md:divide-x divide-gray-200">
          <div className="flex items-center gap-4 px-8 w-full md:w-auto justify-center">
            <Users className="w-12 h-12 text-[#d4af37]" strokeWidth={1} />
            <div>
              <p className="text-3xl font-display font-bold text-gray-900">5000+</p>
              <p className="text-sm text-gray-500 font-medium">Happy Customers</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-8 w-full md:w-auto justify-center">
            <Star className="w-12 h-12 text-[#d4af37]" strokeWidth={1} />
            <div>
              <p className="text-3xl font-display font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-500 font-medium">Expert Professionals</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-8 w-full md:w-auto justify-center">
            <span className="w-12 h-12 flex items-center justify-center border-2 border-[#d4af37] rounded-full text-[#d4af37] text-xl">🎖</span>
            <div>
              <p className="text-3xl font-display font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-500 font-medium">Quality Service</p>
            </div>
          </div>
          <div className="flex items-center gap-4 px-8 w-full md:w-auto justify-center">
            <span className="w-12 h-12 flex items-center justify-center border-2 border-[#d4af37] rounded-full text-[#d4af37] text-xl">☺</span>
            <div>
              <p className="text-3xl font-display font-bold text-gray-900">4.9/5</p>
              <p className="text-sm text-gray-500 font-medium">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="bg-[#faf7f2] py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">Our Featured Collections</span>
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {[
              { title: "Nauvari Sarees", img: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop" },
              { title: "Designer Blouses", img: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
              { title: "Custom Dresses", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
              { title: "Aari Work", img: "https://plus.unsplash.com/premium_photo-1682089872205-dbbb4af4bf52?w=400&fit=crop" },
              { title: "Bridal Makeup", img: "https://images.unsplash.com/photo-1516975080661-460d3fcb6215?w=400&fit=crop" },
              { title: "Hair Styling", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&fit=crop" }
            ].map((col, i) => (
              <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer">
                <img src={col.img} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-sm text-center w-full drop-shadow-md">{col.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/gallery" className="inline-flex items-center gap-2 bg-[#3d0c34] text-white px-8 py-3 rounded font-bold hover:bg-black transition-colors">
              <span className="text-lg">❖</span> View All Gallery <span className="text-lg">❖</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#2a0e24] py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#d4af37 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">What Our Clients Say</span>
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "Kalashri made my bridal look absolutely perfect! The makeup, hairstyle and outfit everything was beyond my expectations.", name: "Priyanka S." },
              { text: "The stitching quality is amazing. They understand exactly what we want. Highly recommended!", name: "Snehal M." },
              { text: "Very professional service and staff. I always love their work and the way they treat customers.", name: "Anjali K." }
            ].map((review, i) => (
              <div key={i} className="bg-[#381631] border border-white/10 rounded-2xl p-8 relative">
                <span className="text-5xl text-[#d4af37] opacity-20 font-display absolute top-4 left-6">"</span>
                <p className="text-white/80 text-sm leading-relaxed relative z-10 mb-8 min-h-[80px]">
                  {review.text}
                </p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-500 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={review.name} />
                    </div>
                    <span className="text-white font-medium text-sm">{review.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-10">
            <div className="w-3 h-3 rounded-full bg-[#d4af37]"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="bg-[#111] text-white py-12 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div className="flex items-center gap-6 flex-1 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="text-5xl">🎁</div>
            <div>
              <h3 className="text-xl font-display font-bold text-[#d4af37] mb-1">Special Offers Just For You!</h3>
              <p className="text-sm text-white/60 mb-4 max-w-sm">Grab the best deals on fashion & beauty services. Limited time only!</p>
              <Link to="/offers" className="bg-[#f3e5ab] text-black px-6 py-2 rounded font-bold text-sm hover:bg-white inline-block">View Offers →</Link>
            </div>
          </div>

          <div className="flex-1 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Ready to Experience <span className="text-[#d4af37]">the Best?</span></h2>
            <p className="text-white/60 text-sm mb-6 max-w-sm mx-auto">Book your appointment now and let us bring out the most beautiful you!</p>
            <Link to="/book" className="bg-[#d4af37] text-black px-8 py-3 rounded font-bold hover:bg-[#ebd576] transition-colors inline-block">
              Book Appointment Now
            </Link>
          </div>

          <div className="flex-1 space-y-4 text-sm text-white/70 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-[#d4af37] shrink-0" />
              <p>123, Kalashri Plaza, Main Road,<br/>Your City, Maharashtra - 411001</p>
            </div>
            <div className="flex gap-3">
              <Phone className="w-5 h-5 text-[#d4af37] shrink-0" />
              <p>+91 98765 43210</p>
            </div>
            <div className="flex gap-3">
              <MessageCircle className="w-5 h-5 text-[#d4af37] shrink-0" />
              <p>info@kalashristudio.com</p>
            </div>
            <div className="flex gap-3">
              <CalendarIcon className="w-5 h-5 text-[#d4af37] shrink-0" />
              <p>Mon - Sun: 9:00 AM - 8:00 PM</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
