import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-perylene-500 to-perylene-700 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Mind Saathi</h3>
                <p className="text-sm text-gray-400">Mental Wellness Companion</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Supporting college students through their mental wellness journey with comprehensive resources and community support.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-perylene-500" />
              <span>Made with care for students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Home
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors duration-200">
                About Us
              </Link>
              <Link to="/assessment/phq-9" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Mental Health Assessment
              </Link>
              <Link to="/auth" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Student Login
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Help Center
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Crisis Support
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-perylene-500" />
                <span className="text-gray-400">support@mindsaathi.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-perylene-500" />
                <span className="text-gray-400">+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-perylene-500 mt-1" />
                <span className="text-gray-400">Available across Indian colleges and universities</span>
              </div>
            </div>
            
            {/* Emergency Notice */}
            <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-sm text-red-300 font-medium">
                Emergency? Call 112 or contact your local emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Mind Saathi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
