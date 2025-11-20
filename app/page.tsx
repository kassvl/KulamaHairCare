import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    { icon: <Star className="w-6 h-6 text-[#ff69b4]" />, title: "Premium Quality", desc: "Top quality synthetic and natural hair products." },
    { icon: <ShieldCheck className="w-6 h-6 text-[#ff69b4]" />, title: "Secure Payment", desc: "Payments protected by 256-bit SSL certificate." },
    { icon: <Truck className="w-6 h-6 text-[#ff69b4]" />, title: "Fast Delivery", desc: "Shipping to all over Poland in 1-3 business days." },
  ];

  return (
    <div className="space-y-24 pb-24 bg-white">
      <Hero />

      {/* Features Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl flex flex-col items-center text-center gap-4 border border-pink-100 hover:shadow-xl hover:shadow-pink-50 transition-all duration-300">
              <div className="p-4 bg-pink-50 rounded-full text-[#ff69b4]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Preview */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Popular Products</h2>
            <p className="text-gray-500">Most preferred braid models of the season.</p>
          </div>
          <Link href="/magaza" className="hidden md:flex items-center gap-2 text-[#ff69b4] hover:text-pink-700 transition-colors font-medium">
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 relative shadow-md group-hover:shadow-xl transition-all duration-300">
                 <img 
                  src={`https://images.unsplash.com/photo-${item === 1 ? '1595476108010-b4eb647f3bfa' : item === 2 ? '1519699047748-a86dd009a682' : item === 3 ? '1583743814966-8936f5b7be1a' : '1623601019319-30a21450610d'}?q=80&w=800&auto=format&fit=crop`}
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                /> 
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <button className="absolute bottom-4 right-4 bg-white text-[#ff69b4] p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#ff69b4] transition-colors">X-Pression Braid Hair</h3>
                <p className="text-gray-500 text-sm">50.00 PLN</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <Link href="/magaza">
            <Button variant="outline" className="w-full">View All</Button>
           </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
             <img 
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop" 
              alt="CTA" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100 via-white/50 to-transparent" />
          </div>
          
          <div className="relative z-10 p-12 md:p-24 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Time to Get Your <br />
              <span className="text-[#ff69b4]">Dream Hair.</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Meet our expert team in Wroclaw and let's determine the most suitable braid model for you together. 
              Create your appointment immediately.
            </p>
            <Link href="/iletisim">
              <Button size="lg" className="shadow-lg shadow-pink-200">Get Appointment</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
