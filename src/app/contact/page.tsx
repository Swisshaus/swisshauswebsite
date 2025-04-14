import Container from "@/app/components/container";
import { CMS_NAME } from "@/lib/constants";

export const metadata = {
  title: `Contact Us | ${CMS_NAME}`,
  description: 'Get in touch with Swisshaus Design & Build for your custom home project in Kalispell, MT.',
};

export default function Contact() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen py-28">
        <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
        <div className="border-b-2 w-24 mx-auto mb-16 border-red-600"></div>
        
        <div className="w-full max-w-2xl">
          <p className="text-lg text-center mb-12">
            We'd love to hear about your project. Please fill out the form below and we'll be in touch soon.
          </p>
          
          {/* Contact Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}