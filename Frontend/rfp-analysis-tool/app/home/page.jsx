import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-800 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Side - Hero Content */}
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
                  AI-Powered RFP Analysis
                </span>
                <br />
                <span className="text-gray-800">Made Simple</span>
              </h1>
              <p className="text-xl text-gray-600">
                Automate compliance checks, risk analysis, and submission preparation with our intelligent platform that saves you time and reduces errors.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#demo">
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    Request Demo
                  </button>
                </Link>
                <Link href="#features">
                  <button className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    Explore Features
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="lg:w-1/2 relative">
            <div className="relative w-full h-[500px]">
  <Image
     src="/assets/WhatsApp Image 2025-04-05 at 8.56.21 PM.jpeg"
    alt="Dashboard"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
    style={{
      objectFit: 'contain',
      filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))'
    }}
    priority
  />
</div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-8">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="opacity-60 hover:opacity-100 transition-opacity">
                <Image
                  src={`/assets/logo-${i}.png`}
                  alt={`Client Logo ${i}`}
                  width={120}
                  height={60}
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Zig Zag Pattern */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Streamline Your RFP Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with intuitive design to simplify every step.
            </p>
          </div>

          {/* Feature 1 - Left */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="lg:w-1/2 relative h-96 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/assets/feature-compliance.jpg"
                alt="Automated Compliance Checks"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
                Compliance
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Automated Compliance Verification
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Our AI instantly verifies eligibility, licenses, and certifications against RFP requirements, reducing manual review time by 80%.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Real-time SAM.gov validation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">State-specific license checks</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Certification tracking</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 - Right */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24">
            <div className="lg:w-1/2 relative h-96 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/assets/feature-risk.jpg"
                alt="Risk Analysis"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium mb-4">
                Risk Management
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Intelligent Clause Risk Analysis
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Identify problematic contract terms and get AI-powered negotiation suggestions to protect your organization's interests.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Termination clause analysis</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Payment term evaluation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Liability assessment</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 - Left */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="lg:w-1/2 relative h-96 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/assets/feature-checklist.jpg"
                alt="Checklist Generator"
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                Submission
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Smart Checklist Generator
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Automatically extract all submission requirements into an organized, trackable checklist with deadlines and assignments.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Document requirements</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Formatting specifications</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Team assignment tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How RFP IntelliCheck Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your RFP process in just four simple steps
            </p>
          </div>

          <div className="relative">
            {/* Timeline Bar */}
            <div className="hidden lg:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-600 transform -translate-x-1/2"></div>
            
            {/* Steps */}
            <div className="space-y-12 lg:space-y-24">
              {/* Step 1 */}
              <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-24">
                <div className="lg:w-1/2 lg:pr-24 order-1 lg:order-1">
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl mr-4">
                        1
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Upload Your RFP</h3>
                    </div>
                    <p className="text-gray-600">
                      Simply drag and drop your RFP document in PDF format. Our system will automatically extract and analyze the text.
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2 order-2 lg:order-2">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/step-upload.jpg"
                      alt="Upload RFP"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-24">
                <div className="lg:w-1/2 order-2 lg:order-1">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/step-analyze.jpg"
                      alt="Analyze Requirements"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pl-24 order-1 lg:order-2">
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-xl mr-4">
                        2
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">AI Analysis</h3>
                    </div>
                    <p className="text-gray-600">
                      Our AI processes the document, identifying key requirements, compliance needs, and potential risks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-24">
                <div className="lg:w-1/2 lg:pr-24 order-1 lg:order-1">
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white font-bold text-xl mr-4">
                        3
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Generate Reports</h3>
                    </div>
                    <p className="text-gray-600">
                      Receive comprehensive reports including compliance status, risk analysis, and submission checklists.
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2 order-2 lg:order-2">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/step-reports.jpg"
                      alt="Generate Reports"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-24">
                <div className="lg:w-1/2 order-2 lg:order-1">
                  <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/step-submit.jpg"
                      alt="Submit Proposal"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="lg:w-1/2 lg:pl-24 order-1 lg:order-2">
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-600 text-white font-bold text-xl mr-4">
                        4
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Submit & Track</h3>
                    </div>
                    <p className="text-gray-600">
                      Complete your submission with confidence and track progress through our dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium mb-4">
              Client Success
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organizations across sectors are transforming their RFP processes with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "RFP IntelliCheck reduced our compliance review time by 75%, allowing us to submit more competitive bids.",
                name: "Sarah Johnson",
                title: "Director of Contracts, GovSolutions Inc.",
                avatar: "/assets/avatar1.jpg"
              },
              {
                quote: "The risk analysis feature alone has saved us from several potentially costly contract terms.",
                name: "Michael Chen",
                title: "Legal Counsel, TechNova Systems",
                avatar: "/assets/avatar2.jpg"
              },
              {
                quote: "We've increased our win rate by 30% since implementing RFP IntelliCheck's recommendations.",
                name: "Emily Rodriguez",
                title: "Business Development, UrbanTech",
                avatar: "/assets/avatar3.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Revolutionize Your RFP Process?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join hundreds of organizations using RFP IntelliCheck to save time, reduce risk, and win more contracts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:-translate-y-1">
                Schedule a Demo
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}