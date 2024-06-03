

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="text-sm">
                            &copy; {new Date().getFullYear()} My Company. All rights reserved.
                        </div>
                        <div className="space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-gray-400">
                        Built with Tailwind CSS and ShadCN UI
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;