import React from "react";
import { Link } from "react-router-dom";
import { Menu, Calendar as CalendarIcon, Phone, MessageCircle, MapPin, Check, Star, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)] font-sans">
      
      {/* Floating Action Menu (Right Side - Desktop Only) */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 p-2">
        <a href="tel:+919876543210" className="bg-[var(--color-surface-card)]/90 hover:bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-accent)] p-3 rounded-l-xl flex flex-col items-center justify-center gap-1 transition-all backdrop-blur-sm group shadow-lg">
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-text-secondary)]">Call Us</span>
        </a>
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="bg-[var(--color-surface-card)]/90 hover:bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-accent)] p-3 rounded-l-xl flex flex-col items-center justify-center gap-1 transition-all backdrop-blur-sm group shadow-lg">
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-text-secondary)]">WhatsApp</span>
        </a>
        <a href="#" className="bg-[var(--color-surface-card)]/90 hover:bg-[var(--color-surface-3)] border border-[var(--color-border)] text-[var(--color-accent)] p-3 rounded-l-xl flex flex-col items-center justify-center gap-1 transition-all backdrop-blur-sm group shadow-lg">
          <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-text-secondary)]">Directions</span>
        </a>
      </div>

      {/* Mobile + Desktop Hero Section */}
      <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop" 
            alt="Kalashri Bride" 
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1110] via-[#1a1110]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1110] via-transparent to-transparent md:hidden"></div>
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
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/90 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Link to="/" className="text-[#d4af37] border-b-2 border-[#d4af37] pb-1 whitespace-nowrap">Home</Link>
            <Link to="/fashion" className="hover:text-[#d4af37] transition-colors whitespace-nowrap">Fashion</Link>
            <Link to="/beauty" className="hover:text-[#d4af37] transition-colors whitespace-nowrap">Beauty</Link>
            <Link to="/gallery" className="hover:text-[#d4af37] transition-colors whitespace-nowrap">Gallery</Link>
            <Link to="/offers" className="hover:text-[#d4af37] transition-colors whitespace-nowrap">Offers</Link>
            <Link to="/about" className="hover:text-[#d4af37] transition-colors whitespace-nowrap">About</Link>
          </div>

          {/* Nav Actions */}
          <div className="flex flex-wrap items-center gap-3 absolute top-6 right-4 md:relative md:top-0 md:right-0">
            <Link to="/book" className="hidden sm:inline-flex items-center gap-2 btn-luxury-outline px-5 py-2.5 text-sm">
              Book Appointment
            </Link>
            <button className="md:hidden text-white hover:text-[#d4af37]">
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 pb-10 max-w-7xl mx-auto w-full">
          <div className="max-w-3xl md:max-w-2xl mt-8 md:mt-0">
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
              Premium Nauvari Saree Specialist, Designer Blouse Stitching, Aari Work, and Custom Dress Stitching in Maharashtra.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/services" className="btn-luxury-primary px-8 py-3.5 flex items-center gap-2">
                Explore Services <span className="text-xl">→</span>
              </Link>
              <Link to="/book" className="btn-luxury-outline px-8 py-3.5 flex items-center gap-2 bg-transparent text-white border-white/30 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                Book Appointment <CalendarIcon className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white/90 text-sm font-medium">
              <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10">
                <span className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] text-xl">♔</span>
                <div>
                  <p className="font-semibold text-white">Premium Quality</p>
                  <p className="text-xs text-white/60">Materials</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10">
                <span className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Users className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">Expert Professionals</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10">
                <span className="w-10 h-10 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
                  <Check className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">100% Customer Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-[var(--color-surface)] py-20 px-8 border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
              <span className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold">Services We Offer</span>
              <div className="h-[1px] w-12 bg-[#d4af37]"></div>
            </div>
            <h2 className="font-display text-4xl text-white font-bold">Complete Solutions for Your Style & Beauty</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Fashion Card */}
            <div className="card-luxury relative overflow-hidden group min-h-[400px] flex p-0">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 hidden md:block">
                <img src="/images/bharti-hero.jpg" alt="Fashion Boutique in Maharashtra" className="w-full h-full object-cover object-left opacity-80 transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1610030469983-98e550d615ef?q=80&w=800&auto=format&fit=crop"; }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-card)] via-[var(--color-surface-card)]/80 to-transparent"></div>
              </div>
              
              <div className="relative z-10 p-10 flex flex-col justify-center w-full md:w-[65%]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[var(--color-surface-3)] border border-[var(--color-border)] rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">👗</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white">Fashion &<br/><span className="text-[#d4af37]">Tailoring</span></h3>
                </div>
                
                <p className="text-[var(--color-text-secondary)] mb-8 text-sm leading-relaxed pr-4">
                  Custom stitching, designer wear, aari work & traditional outfits crafted with perfection.
                </p>
                
                <ul className="space-y-3 mb-10 text-sm font-medium text-[var(--color-text-secondary)]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Nauvari Saree Stitching</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Blouse Stitching</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Custom Dresses</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Aari Work & Embroidery</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Alterations & More</li>
                </ul>

                <Link to="/fashion" className="btn-luxury-outline px-6 py-3 w-max">
                  Explore Fashion →
                </Link>
              </div>
            </div>

            {/* Beauty Card */}
            <div className="card-luxury relative overflow-hidden group min-h-[400px] flex p-0">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 z-0 hidden md:block">
                <img src="/images/hero-girl.png" alt="Beauty" className="w-full h-full object-cover object-left opacity-80 transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1516975080661-460d3fcb6215?q=80&w=800&auto=format&fit=crop"; }} />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-card)] via-[var(--color-surface-card)]/80 to-transparent"></div>
              </div>
              
              <div className="relative z-10 p-10 flex flex-col justify-center w-full md:w-[65%]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[var(--color-surface-3)] border border-[var(--color-border)] rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-2xl">🪷</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white">Beauty<br/><span className="text-[#d4af37]">Parlour</span></h3>
                </div>
                
                <p className="text-[var(--color-text-secondary)] mb-8 text-sm leading-relaxed pr-4">
                  Pamper yourself with our premium beauty & salon services.
                </p>
                
                <ul className="space-y-3 mb-10 text-sm font-medium text-[var(--color-text-secondary)]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Bridal Makeup</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Hair Styling</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Skin & Hair Care</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Mehendi</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#d4af37]" /> Packages & More</li>
                </ul>

                <Link to="/beauty" className="btn-luxury-outline px-6 py-3 w-max">
                  Explore Beauty →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Awards Section (Replacing Stats) */}
      <div className="border-y border-[var(--color-border)] bg-[var(--color-surface-2)] py-12 overflow-hidden">
        <div className="text-center mb-8">
          <p className="text-[#d4af37] uppercase tracking-[0.2em] text-xs font-bold mb-2">Recognized for Excellence</p>
          <h3 className="font-display text-3xl font-bold text-white">Our Awards & Achievements</h3>
        </div>
        <div className="w-full relative flex items-center h-32">
          {/* Fading Edges for the marquee effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--color-surface-2)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--color-surface-2)] to-transparent z-10" />
          
          <div className="flex animate-[scroll-horizontal_20s_linear_infinite] whitespace-nowrap items-center hover:[animation-play-state:paused]">
            {[
              { title: "Best Bridal Makeup 2023", org: "Beauty & Wellness Awards" },
              { title: "Excellence in Fashion Design", org: "Maharashtra Fashion Week" },
              { title: "Top Nauvari Specialist", org: "Traditional Wear Expo" },
              { title: "Outstanding Customer Service", org: "Local Business Awards 2022" },
              // Duplicate for infinite scroll illusion
              { title: "Best Bridal Makeup 2023", org: "Beauty & Wellness Awards" },
              { title: "Excellence in Fashion Design", org: "Maharashtra Fashion Week" },
              { title: "Top Nauvari Specialist", org: "Traditional Wear Expo" },
              { title: "Outstanding Customer Service", org: "Local Business Awards 2022" },
            ].map((award, i) => (
              <div key={i} className="inline-flex items-center gap-4 px-12 border-l border-[var(--color-border)] first:border-0 h-16">
                <span className="w-12 h-12 flex items-center justify-center border-2 border-[#d4af37]/30 bg-[#d4af37]/10 rounded-full text-[#d4af37] text-2xl shrink-0">🏆</span>
                <div className="flex flex-col">
                  <p className="text-lg font-display font-bold text-white leading-tight">{award.title}</p>
                  <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider">{award.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="bg-[var(--color-surface-3)] py-20 px-8">
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
            <Link to="/gallery" className="inline-flex items-center gap-2 btn-luxury-outline px-8 py-3">
              <span className="text-lg">❖</span> View All Gallery <span className="text-lg">❖</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[var(--color-surface-2)] py-20 px-8 relative overflow-hidden">
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
              <div key={i} className="card-luxury relative">
                <span className="text-5xl text-[var(--color-accent)] opacity-20 font-display absolute top-4 left-6">"</span>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed relative z-10 mb-8 min-h-[80px]">
                  {review.text}
                </p>
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-surface-3)] overflow-hidden">
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

      {/* FAQ Section */}
      <div className="bg-[var(--color-surface)] py-20 px-8 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-white font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-[var(--color-text-secondary)]">Everything you need to know about our services.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "What are the blouse stitching charges?", a: "Blouse stitching starts from ₹300. Designer and premium blouses depend on the complexity and customization required." },
              { q: "Do you stitch designer blouses?", a: "Yes, we specialize in stitching all types of fashionable, designer and customized blouses tailored perfectly to your measurements." },
              { q: "Can I bring my own design?", a: "Absolutely! We love bringing your custom designs to life. Just show us a reference picture." },
              { q: "Do you provide Aari work?", a: "Yes, we offer premium Aari work for Blouses, Dresses, Sarees, and Bridal Wear starting from ₹1200." },
              { q: "Do you stitch Nauvari sarees?", a: "Yes, we are Nauvari Specialists. We stitch all styles including Brahmani, Peshawai, Mastani, Rajlaxmi, and more." },
              { q: "How long does stitching take?", a: "Standard stitching usually takes 3-5 days. For bridal or heavily customized work, we recommend booking 2 weeks in advance." },
              { q: "Do you take custom measurements?", a: "Yes, we take precise custom measurements to ensure a 100% perfect fit for every garment." }
            ].map((faq, i) => (
              <details key={i} className="group card-luxury border border-[var(--color-border)] rounded-xl open:border-[var(--color-accent)]/30 transition-all duration-300">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-semibold text-white/90 group-open:text-white">
                  {faq.q}
                  <span className="text-[var(--color-accent)] transition-transform duration-300 group-open:rotate-180">▼</span>
                </summary>
                <div className="px-5 pb-5 text-[var(--color-text-secondary)] text-sm leading-relaxed border-t border-[var(--color-border)] pt-4 mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[var(--color-surface)] py-12 px-8 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div className="flex items-center gap-6 flex-1 card-luxury border border-[var(--color-border)]">
            <div className="text-5xl">🎁</div>
            <div>
              <h3 className="text-xl font-display font-bold text-[#d4af37] mb-1">Special Offers Just For You!</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4 max-w-sm">Grab the best deals on fashion & beauty services. Limited time only!</p>
              <Link to="/offers" className="btn-luxury-outline px-6 py-2 text-sm inline-block">View Offers →</Link>
            </div>
          </div>

          <div className="flex-1 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to Experience <span className="text-[#d4af37]">the Best?</span></h2>
            <p className="text-[var(--color-text-secondary)] text-sm mb-6 max-w-sm mx-auto">Book your appointment now and let us bring out the most beautiful you!</p>
            <Link to="/book" className="btn-luxury-primary px-8 py-3 inline-block">
              Book Appointment Now
            </Link>
          </div>

          <div className="flex-1 space-y-4 text-sm text-[var(--color-text-secondary)] card-luxury border border-[var(--color-border)]">
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
