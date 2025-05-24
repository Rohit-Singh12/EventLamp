export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              PartyBook is your one-stop solution for booking the perfect venue
              for your events. We offer a wide range of venues, from mandaps to
              hotels and private plots.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/mandap" className="text-gray-400 hover:text-blue-600">
                  Mandap
                </a>
              </li>
              <li>
                <a href="/hotel" className="text-gray-400 hover:text-blue-600">
                  Hotel
                </a>
              </li>
              <li>
                <a
                  href="/private-plot"
                  className="text-gray-400 hover:text-blue-600"
                >
                  Private Plot
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Email: support@partybook.com</li>
              <li>Phone: +91 123 456 7890</li>
              <li>Address: 123 Party Street, Mumbai, India</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} PartyBook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
