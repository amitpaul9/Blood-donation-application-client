import { Heart, Clock, Shield, Users, Droplet, Award } from 'lucide-react';

const Featured = () => {
    const features = [
        {
            icon: Heart,
            title: 'Save Lives',
            description: 'Each blood donation can save up to three lives. Be a hero in someone\'s story.'
        },
        {
            icon: Clock,
            title: 'Quick Process',
            description: 'Simple registration and fast matching with patients in need of your blood type.'
        },
        {
            icon: Shield,
            title: 'Safe & Secure',
            description: 'All donations follow strict medical protocols ensuring safety for donors and recipients.'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Join thousands of generous donors making a real difference in our community.'
        }
    ];



    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Why Donate Blood?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                        Your generous donation makes a life-saving impact on patients in need
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-red-50 to-white p-6 sm:p-8 rounded-xl border border-red-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center mb-4 sm:mb-5">
                                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Featured;
