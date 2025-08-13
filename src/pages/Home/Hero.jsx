/* eslint-disable react/prop-types */

import { Search } from 'lucide-react';
const Hero = ({ handleSearch }) => {
  return (
     <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop")'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-orange-900/80" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your
            <span className="block bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Dream Home
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Discover the perfect property that fits your lifestyle and budget
          </p>
          
          {/* Enhanced Search */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for properties by location, type, or price..."
                onChange={handleSearch}
                className="w-full px-6 py-4 pl-12 text-lg bg-white/95 backdrop-blur-sm rounded-2xl border-0 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 placeholder-gray-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-200">
                Search
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/70">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-white/70">Locations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99%</div>
              <div className="text-white/70">Satisfied</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
