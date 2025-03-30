import { MainLayout } from "@/app/components/layout/main-layout";
import { HeroSection } from "@/app/components/ui/hero-section";
import { Section } from "@/app/components/ui/section";
import { OrganizationCard } from "@/app/components/ui/organization-card";
import { organizationTypes } from "@/app/data/mockData";
import { ArrowRight, ArrowLeft, CheckCircle, Zap, Shield, UserPlus, Info, Settings, Database, Code, Layers, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection
        title="Build tailored AI assistants for your organization"
        subtitle="The Next Wilson platform creates custom AI assistants based on your needs. Our experts handle the technical configuration while you focus on your business."
        ctaText="Get started"
        ctaLink="/demo"
        secondaryText="Learn more"
        secondaryLink="/about"
      />

      <Section
        title="Choose your organization type"
        description="We offer specialized AI assistants for various organization types. Select yours to see relevant options and templates."
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizationTypes.map((org) => (
            <OrganizationCard key={org.id} organization={org} />
          ))}
        </div>
      </Section>

      <Section
        title="Why choose The Next Wilson?"
        description="Our platform offers unique benefits that set us apart from generic AI solutions."
        centered
        tinted
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
              <Zap className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Rapid deployment</h3>
            <p className="text-gray-600">
              Get up and running quickly with pre-built templates tailored to your organization type.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
              <Shield className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy & security</h3>
            <p className="text-gray-600">
              Your data stays yours with our robust privacy controls and secure hosting options.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5">
              <UserPlus className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Human-centered design</h3>
            <p className="text-gray-600">
              AI assistants that feel approachable and helpful, creating positive user experiences.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tailored solutions without the technical hassle
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tell us your preferences through our simple wizard, and our team will handle all the technical implementation for you.
            </p>
            
            <ul className="mt-8 space-y-4">
              {[
                "Simple preference selection process",
                "Expert-configured AI solutions based on your needs",
                "Seamless integration with your existing systems",
                "Comprehensive analytics and reporting dashboards",
                "Ongoing support and optimizations from our team"
              ].map((item, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-10">
              <Button asChild variant="gradient">
                <Link href="/wizard" className="w-full h-full flex items-center justify-center">
                  Start your customization
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-10 lg:mt-0 relative">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
              {/* Intake Wizard UI mockup */}
              <div className="bg-white h-[400px] w-full relative">
                {/* Header */}
                <div className="bg-blue-50 border-b border-blue-100 p-4">
                  <div className="flex items-center">
                    <ArrowLeft className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-blue-600 text-sm">Back to assistant details</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col h-[350px]">
                  {/* Progress indicator */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">
                        Step 2 of 5
                      </span>
                      <span className="text-xs font-medium text-gray-500">
                        Integration preferences
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: '40%' }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Wizard content */}
                  <div className="p-4 flex-1 overflow-y-auto">
                    <h2 className="text-lg font-bold mb-3">Integration preferences</h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Tell us which systems you need your assistant to connect with.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="border border-blue-300 bg-blue-50 rounded-lg p-3 cursor-pointer">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">Email system</h3>
                            <p className="text-xs text-gray-500">Connect with your email provider</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-blue-200">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">Calendar</h3>
                            <p className="text-xs text-gray-500">Schedule and manage appointments</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-blue-200">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">CRM</h3>
                            <p className="text-xs text-gray-500">Connect with your customer database</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="p-4 border-t border-gray-100 flex justify-between">
                    <button className="px-4 py-2 border border-gray-300 rounded text-sm">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-4 py-2 shadow-md font-medium text-sm">
                User-friendly wizard
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="What our clients say"
        description="Hear from organizations that have transformed their operations with our AI assistants"
        centered
        tinted
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {/* Video Testimonial */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative aspect-video group cursor-pointer">
              {/* Achtergrond met transparante overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80')` 
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-indigo-700/50"></div>
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-white/85 flex items-center justify-center shadow-lg group-hover:bg-white transition-colors">
                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-blue-600 ml-1.5"></div>
                </div>
              </div>
              
              {/* Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="max-w-md text-white text-center p-6 drop-shadow-lg">
                  <h3 className="text-2xl font-bold mb-2">Succesverhalen van klanten</h3>
                  <p className="text-sm opacity-90">Ontdek hoe AI assistenten echte resultaten leveren</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How we reduced response time by 75%</h3>
              <p className="text-gray-600 mb-4">
                "The Next Wilson AI assistant has completely transformed how we handle customer inquiries. What used to take hours now happens in minutes."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 mr-3 overflow-hidden">
                  <div 
                    className="w-full h-full bg-center bg-cover" 
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80')"
                    }}
                  ></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Customer Service Director, Acme Corp</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Testimonials */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Implementing The Next Wilson AI assistant for our hotel was the best decision we made this year. Our guest satisfaction scores have increased by 35%."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 mr-3 overflow-hidden">
                  <div 
                    className="w-full h-full bg-center bg-cover" 
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80')"
                    }}
                  ></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Michael Chen</p>
                  <p className="text-sm text-gray-500">Operations Manager, Grand Hotel</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "We were skeptical at first, but The Next Wilson AI assistant has freed up our legal team's time by automating routine document processing. Now we focus on high-value work instead."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 mr-3 overflow-hidden">
                  <div 
                    className="w-full h-full bg-center bg-cover" 
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80')"
                    }}
                  ></div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Dr. Emily Rodriguez</p>
                  <p className="text-sm text-gray-500">Legal Department Head, Smith & Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        className="bg-blue-900 text-white"
        title="Ready to get started?"
        description="Join organizations that are already transforming their operations with our AI assistants."
        titleClassName="text-white"
        descriptionClassName="text-blue-100"
        centered
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
            <Link href="/demo" className="w-full h-full flex items-center justify-center">
              Book a demo
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
            <Link href="/contact" className="w-full h-full flex items-center justify-center">
              Contact us
            </Link>
          </Button>
        </div>
      </Section>
    </MainLayout>
  );
}
