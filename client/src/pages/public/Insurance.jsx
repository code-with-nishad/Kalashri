import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, Mail } from 'lucide-react';

export default function Insurance() {
    return (
        <div className="min-h-screen bg-white">
            <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center justify-center p-4 bg-blue-100 text-blue-600 rounded-full mb-6">
                        <ShieldCheck size={32} />
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl font-display font-bold mb-6 text-gray-900">
                        Kalashri Insurance Services
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Secure your family's future with our trusted partners.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-card">
                            <h3 className="text-2xl font-bold mb-6">Aditya Birla Health Insurance</h3>
                            <p className="text-gray-600 mb-6">Comprehensive health coverage for you and your loved ones.</p>
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Request Consultation</button>
                        </div>
                        <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-card">
                            <h3 className="text-2xl font-bold mb-6">Axis Max Life & Term Insurance</h3>
                            <p className="text-gray-600 mb-6">Protect your financial future with robust life insurance plans.</p>
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">Submit Enquiry</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
