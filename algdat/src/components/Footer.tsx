import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white p-4 mb-0">
            <div className="container mx-auto text-center">
                © {new Date().getFullYear()} Petter Dalhaug
                <div className="mt-2">
                    <a href="https://github.com/petdalh" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center hover:text-gray-400">
                        <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.091.682-.217.682-.483 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.349-1.088.634-1.338-2.222-.253-4.556-1.111-4.556-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.276.098-2.657 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.839c.85.004 1.705.114 2.504.335 1.909-1.294 2.747-1.025 2.747-1.025.547 1.381.203 2.404.1 2.657.642.698 1.028 1.591 1.028 2.682 0 3.841-2.336 4.687-4.564 4.935.359.309.678.918.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .27.18.579.688.481C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                        </svg>
                        My GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;