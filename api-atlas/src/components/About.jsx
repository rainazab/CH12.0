export default function About() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">About Rho</h1>
        
        <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
          <p>
            Rho is revolutionizing how developers discover and integrate APIs. Like Google Flights for APIs, we help you compare thousands of services side-by-side to find the perfect fit for your project.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Our Mission</h2>
            <p>
              We believe that choosing the right API shouldn't be overwhelming. Our mission is to empower developers with intelligent tools that make API discovery, comparison, and integration seamless and efficient.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Why Rho?</h2>
            <p>
              The API landscape is vast and constantly evolving. With thousands of options available, developers spend countless hours researching, comparing, and evaluating APIs. We've built Rho to eliminate that friction—giving you the intelligence you need to make the right choice quickly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Powered by AI</h2>
            <p>
              Our AI-powered recommendation engine learns from millions of data points to provide personalized API recommendations. We analyze documentation quality, community feedback, integration complexity, and performance metrics to give you insights you won't find anywhere else.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Built by Developers, for Developers</h2>
            <p>
              The Rho team includes experienced developers who understand the pain points of API integration. We've built our platform with developer experience at the forefront, ensuring every feature is intuitive and valuable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Our Vision</h2>
            <p>
              We envision a future where API discovery and integration is so seamless that developers can focus on building incredible products. Rho is just the beginning of this transformation.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-8">Built at CalHacks 12.0</h2>
            <p className="mb-8">
              Rho was built by four developers at CalHacks 12.0 in 2025. Meet the team:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Raina Zab */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <img 
                    src="/rain.jpg" 
                    alt="Raina Zab" 
                    className="w-32 h-32 rounded-full object-cover border-2 border-cyan-400"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Raina Zab</h3>
                <div className="flex flex-col space-y-2">
                  <a 
                    href="https://www.linkedin.com/in/rainazab" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition text-sm"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href="https://www.rainazab.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition text-sm"
                  >
                    Website
                  </a>
                </div>
              </div>

              {/* Matilda Verdejo */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <img 
                    src="/matilda.JPG" 
                    alt="Matilda Verdejo" 
                    className="w-32 h-32 rounded-full object-cover border-2 border-cyan-400"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Matilda Verdejo</h3>
                <a 
                  href="https://www.linkedin.com/in/matildaverdejo/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition text-sm"
                >
                  LinkedIn
                </a>
              </div>

              {/* Maria Fernanda Palacios */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <img 
                    src="/fern.jpg" 
                    alt="Maria Fernanda Palacios" 
                    className="w-32 h-32 rounded-full object-cover border-2 border-cyan-400"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Maria Fernanda Palacios</h3>
                <a 
                  href="https://www.linkedin.com/in/maria-fernanda-palacios/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition text-sm"
                >
                  LinkedIn
                </a>
              </div>

              {/* Sarah Hoang */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-2 border-cyan-400">
                    <span className="text-3xl font-bold text-white">SH</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Sarah Hoang</h3>
                <a 
                  href="https://www.linkedin.com/in/sarah-hoang-compsci/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

