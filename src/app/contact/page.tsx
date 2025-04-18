'use client';

import Container from "@/app/components/container";
import { useState } from "react";
import React from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id === 'first-name' ? 'firstName' : 
       id === 'last-name' ? 'lastName' : id]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: '', isError: false });
    
    try {
      // You can replace this with your actual form submission endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      
      setStatus({ 
        message: 'Thank you! Your message has been sent successfully.', 
        isError: false 
      });
      
      // Reset form
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      
    } catch (error) {
      setStatus({ 
        message: 'Sorry, there was an error sending your message. Please try again later.', 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen py-28">
        <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
        <div className="border-b-2 w-24 mx-auto mb-16 border-red-600"></div>
        
        <div className="w-full max-w-2xl">
                 <div className="grid md:grid-cols-2"> 
                  <p className="font-bold text-lg text-center mb-12">
                      Phone: 406-407-5072 </p>
                    <p className="font-bold text-lg text-center mb-12">
                      Email: Office@swisshaus.com
                    </p>
                    </div>
                    <p className="text-lg text-center mb-12">
                      We'd love to hear about your project. Please give us a call or fill out the form below and we'll be in touch soon.
                    </p>
                    
          {status.message && (
            <div className={`p-4 mb-6 rounded-md ${status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {status.message}
            </div>
          )}
          
          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  value={formState.firstName}
                  onChange={handleChange}
                  required
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
                  value={formState.lastName}
                  onChange={handleChange}
                  required
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
                value={formState.email}
                onChange={handleChange}
                required
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
                value={formState.phone}
                onChange={handleChange}
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
                value={formState.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-md transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}