import {
  Menu,
  ChevronDown,
  Home,
  Unplug,
  Grid3x3,
  Search,
  Rocket,
  Users,
  FileText,
  BookOpenText,
  Code,
  Blocks,
  Activity,
  CircleHelp,
  Grip,
  ChevronRight,
} from 'lucide-react';

export const Header = () => {
  return (
    <div
      id="navbar"
      className="sticky top-0 left-0 w-full z-[101] bg-background-base header"
      style={{ top: '0px' }}
    >
      <div className="block md:hidden">
        <nav className="w-full h-16 bg-white border-b border-transparent">
          <div className="p-0 h-full bg-white py-2.5">
            <div className="max-w-7xl mx-auto px-6 flex justify-between h-full items-center">
              <a
                href="/"
                className="relative text-2xl text-left leading-none flex items-center hover:bg-white hover:text-black"
                aria-label="home page link"
              >
                <svg
                  height="20"
                  viewBox="0 0 278 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M161.632 53.2837H115.472C115.918 66.4186 125.061 72.7596 133.981 72.7596C142.9 72.7596 147.806 68.6833 150.371 62.682H160.851C158.064 73.2126 148.587 81.8182 133.981 81.8182C115.026 81.8182 104.545 68.0039 104.545 50C104.545 30.7506 117.256 18.4083 133.646 18.4083C151.931 18.4083 162.97 34.0343 161.632 53.2837ZM133.646 27.2404C124.615 27.2404 116.476 32.2226 115.584 44.4516H150.928C150.705 35.846 144.35 27.2404 133.646 27.2404Z"
                    fill="black"
                  ></path>
                  <path
                    d="M219.201 19.4274L198.797 48.528L221.208 80.3462H209.055L192.777 57.1336L176.61 80.3462H165.014L187.09 48.9809L166.352 19.4274H178.505L193.111 40.3753L207.829 19.4274H219.201Z"
                    fill="black"
                  ></path>
                  <path
                    d="M266.458 54.869V51.0191C248.061 52.944 236.354 55.6616 236.354 64.0408C236.354 69.8156 240.702 73.6655 247.949 73.6655C257.426 73.6655 266.458 69.2494 266.458 54.869ZM245.719 81.8182C234.458 81.8182 225.092 75.4772 225.092 64.2672C225.092 49.8868 241.036 45.6972 265.677 42.8664V41.3944C265.677 30.2976 259.545 26.561 252.075 26.561C243.712 26.561 238.806 31.2035 238.36 38.6768H227.88C228.883 25.5419 240.256 18.1818 251.963 18.1818C268.465 18.1818 275.935 26.2213 275.823 43.3193L275.712 57.3601C275.6 67.551 276.158 74.5713 277.273 80.3462H267.015C266.681 78.0815 266.346 75.5904 266.235 71.967C262.555 78.1948 256.311 81.8182 245.719 81.8182Z"
                    fill="black"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0H78.1818V7.46269L44.8165 50L78.1818 92.5373V100H0V0ZM39.5825 43.1172L66.6956 7.46269H12.4695L39.5825 43.1172ZM8.79612 16.3977V46.2687H31.5111L8.79612 16.3977ZM31.5111 53.7313H8.79612V83.6023L31.5111 53.7313ZM12.4695 92.5373L39.5825 56.8828L66.6956 92.5373H12.4695Z"
                    fill="#1F40ED"
                  ></path>
                </svg>
              </a>
              <button
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </nav>
        <div
          className="hidden fixed bg-white w-full h-[calc(100vh-64px)] left-0 z-[101] shadow-lg"
          style={{ top: '64px' }}
        >
          <div className="flex flex-col overflow-y-auto h-full">
            <div className="px-6 py-4">
              <div className="space-y-3">
                <a
                  href="https://dashboard.exa.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-black text-white font-medium text-base hover:bg-gray-800 transition-colors rounded"
                >
                  API Dashboard
                </a>
                <a
                  href="https://exa.ai/websets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 bg-gray-100 text-gray-900 font-medium text-base hover:bg-gray-200 transition-colors rounded"
                >
                  Try Websets
                </a>
              </div>
            </div>
            <div>
              <button className="w-full flex items-center justify-between px-6 py-[15px] text-left hover:bg-gray-50 transition-colors">
                <span className="text-base font-medium text-gray-900">
                  Products
                </span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
                <div className="pb-2">
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/exa-api"
                  >
                    <Unplug className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        API
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="https://websets.exa.ai/websets"
                  >
                    <Grid3x3 className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Websets
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/search"
                  >
                    <Search className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Search
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <button className="w-full flex items-center justify-between px-6 py-[15px] text-left hover:bg-gray-50 transition-colors">
                <span className="text-base font-medium text-gray-900">
                  Company
                </span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
                <div className="pb-2">
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/about"
                  >
                    <Rocket className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        About
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/careers"
                  >
                    <Users className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Careers
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          We're hiring
                        </span>
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/customers"
                  >
                    <FileText className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Case Studies
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/team"
                  >
                    <Users className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Team
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/contact"
                  >
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Contact
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/blog"
                  >
                    <BookOpenText className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Blog
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <button className="w-full flex items-center justify-between px-6 py-[15px] text-left hover:bg-gray-50 transition-colors">
                <span className="text-base font-medium text-gray-900">
                  Developers
                </span>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </button>
              <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0">
                <div className="pb-2">
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="https://dashboard.exa.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        API Dashboard
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="/demos"
                  >
                    <Blocks className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Demos
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="https://docs.exa.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpenText className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        Docs
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="https://github.com/exa-labs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        GitHub
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="https://status.exa.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Activity className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        API Status
                      </div>
                    </div>
                  </a>
                  <a
                    className="flex items-start px-6 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    href="https://docs.exa.ai/reference/faqs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CircleHelp className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-lg font-normal text-gray-900 flex items-center gap-2">
                        FAQ
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div>
              <a
                href="/pricing"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Pricing
              </a>
            </div>
            <div>
              <a
                href="/engineering"
                className="flex items-center px-6 py-4 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Engineering
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <nav className="w-full max-h-[var(--nav-height)] h-[var(--nav-height)] bg-white outline-b outline-transparent">
          <div className="p-0 h-full bg-white py-2.5">
            <div className="max-w-7xl mx-auto pl-2 pr-0 flex justify-between h-full items-center">
              <a
                href="/"
                className="relative text-2xl text-left leading-none pr-4 pl-0 flex items-center hover:bg-white hover:text-black"
                aria-label="home page link"
              >
                <svg
                  height="20"
                  viewBox="0 0 278 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M161.632 53.2837H115.472C115.918 66.4186 125.061 72.7596 133.981 72.7596C142.9 72.7596 147.806 68.6833 150.371 62.682H160.851C158.064 73.2126 148.587 81.8182 133.981 81.8182C115.026 81.8182 104.545 68.0039 104.545 50C104.545 30.7506 117.256 18.4083 133.646 18.4083C151.931 18.4083 162.97 34.0343 161.632 53.2837ZM133.646 27.2404C124.615 27.2404 116.476 32.2226 115.584 44.4516H150.928C150.705 35.846 144.35 27.2404 133.646 27.2404Z"
                    fill="black"
                  ></path>
                  <path
                    d="M219.201 19.4274L198.797 48.528L221.208 80.3462H209.055L192.777 57.1336L176.61 80.3462H165.014L187.09 48.9809L166.352 19.4274H178.505L193.111 40.3753L207.829 19.4274H219.201Z"
                    fill="black"
                  ></path>
                  <path
                    d="M266.458 54.869V51.0191C248.061 52.944 236.354 55.6616 236.354 64.0408C236.354 69.8156 240.702 73.6655 247.949 73.6655C257.426 73.6655 266.458 69.2494 266.458 54.869ZM245.719 81.8182C234.458 81.8182 225.092 75.4772 225.092 64.2672C225.092 49.8868 241.036 45.6972 265.677 42.8664V41.3944C265.677 30.2976 259.545 26.561 252.075 26.561C243.712 26.561 238.806 31.2035 238.36 38.6768H227.88C228.883 25.5419 240.256 18.1818 251.963 18.1818C268.465 18.1818 275.935 26.2213 275.823 43.3193L275.712 57.3601C275.6 67.551 276.158 74.5713 277.273 80.3462H267.015C266.681 78.0815 266.346 75.5904 266.235 71.967C262.555 78.1948 256.311 81.8182 245.719 81.8182Z"
                    fill="black"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0H78.1818V7.46269L44.8165 50L78.1818 92.5373V100H0V0ZM39.5825 43.1172L66.6956 7.46269H12.4695L39.5825 43.1172ZM8.79612 16.3977V46.2687H31.5111L8.79612 16.3977ZM31.5111 53.7313H8.79612V83.6023L31.5111 53.7313ZM12.4695 92.5373L39.5825 56.8828L66.6956 92.5373H12.4695Z"
                    fill="#1F40ED"
                  ></path>
                </svg>
              </a>
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <div className="relative flex gap-3 h-full">
                  <div className="flex items-center justify-center h-8 text-center cursor-pointer text-gray-700 hover:text-black px-3 py-1 text-[15px] font-normal leading-6 rounded-[4px] transition-colors hover:bg-gray-100">
                    <span className="flex items-center">
                      Products
                      <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-200" />
                    </span>
                  </div>
                  <div className="flex items-center justify-center h-8 text-center cursor-pointer text-gray-700 hover:text-black px-3 py-1 text-[15px] font-normal leading-6 rounded-[4px] transition-colors hover:bg-gray-100">
                    <span className="flex items-center">
                      Company
                      <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-200" />
                    </span>
                  </div>
                  <div className="flex items-center justify-center h-8 text-center cursor-pointer text-gray-700 hover:text-black px-3 py-1 text-[15px] font-normal leading-6 rounded-[4px] transition-colors hover:bg-gray-100">
                    <span className="flex items-center">
                      Developers
                      <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-200" />
                    </span>
                  </div>
                  <a
                    href="/engineering"
                    className="flex items-center justify-center h-8 text-center cursor-pointer text-gray-700 hover:text-black px-3 py-1 text-[15px] font-normal leading-6 rounded-[4px] transition-colors hover:bg-gray-100"
                  >
                    Engineering
                  </a>
                  <a
                    href="/pricing"
                    className="flex items-center justify-center h-8 text-center cursor-pointer text-gray-700 hover:text-black px-3 py-1 text-[15px] font-normal leading-6 rounded-[4px] transition-colors hover:bg-gray-100"
                  >
                    Pricing
                  </a>
                  <div
                    className="absolute top-full left-1/2 z-50 transition-all duration-300 ease-in-out opacity-0 pointer-events-none"
                    style={{
                      width: '600px',
                      transform:
                        'translateX(-50%) perspective(1000px) rotateX(-15deg)',
                      transformOrigin: 'center top',
                    }}
                  >
                    <div className="w-full h-[5px] relative z-10"></div>
                    <div className="bg-white shadow-lg border border-gray-200 overflow-hidden rounded-[6px]">
                      <div
                        className="relative transition-all duration-300 ease-in-out"
                        style={{ height: '200px' }}
                      >
                        <div
                          className="flex h-full px-[10px]"
                          style={{ transform: 'translateX(0px)' }}
                        >
                          <div
                            className="flex-shrink-0 px-0 transition-opacity duration-300 ease-in-out py-[10px]"
                            style={{
                              width: '650px',
                              opacity: 0,
                              pointerEvents: 'none',
                            }}
                          >
                            <div className="w-full h-full"></div>
                          </div>
                          <div
                            className="flex-shrink-0 px-0 transition-opacity duration-300 ease-in-out py-[10px]"
                            style={{
                              width: '580px',
                              opacity: 0,
                              pointerEvents: 'none',
                            }}
                          >
                            <div className="w-full h-full"></div>
                          </div>
                          <div
                            className="flex-shrink-0 px-0 transition-opacity duration-300 ease-in-out py-[10px]"
                            style={{
                              width: '580px',
                              opacity: 0,
                              pointerEvents: 'none',
                            }}
                          >
                            <div className="w-full h-full"></div>
                          </div>
                          <div
                            className="flex-shrink-0 px-0 transition-opacity duration-300 ease-in-out py-[10px]"
                            style={{
                              width: '600px',
                              opacity: 0,
                              pointerEvents: 'none',
                            }}
                          >
                            <div className="w-full h-full"></div>
                          </div>
                          <div
                            className="flex-shrink-0 px-0 transition-opacity duration-300 ease-in-out py-[10px]"
                            style={{
                              width: '450px',
                              opacity: 0,
                              pointerEvents: 'none',
                            }}
                          >
                            <div className="w-full h-full"></div>
                          </div>
                          <div
                            className="flex-shrink-0 px-0 transition-opacity duration-300 ease-in-out py-[10px]"
                            style={{
                              width: '580px',
                              opacity: 0,
                              pointerEvents: 'none',
                            }}
                          >
                            <div className="w-full h-full"></div>
                          </div>
                          <div
                            className="flex-shrink-0 px-0 transition-opacity duration-300 ease-in-out py-[10px]"
                            style={{
                              width: '580px',
                              opacity: 0,
                              pointerEvents: 'none',
                            }}
                          >
                            <div className="w-full h-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://cal.com/team/exa/exa-intro-chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block group-hover-link px-3 py-1.5 bg-white border border-gray-200 text-gray-700 font-medium font-['ABCDiatype'] text-[15px] hover:bg-gray-100 transition-colors rounded-[6px] flex items-center gap-1"
                >
                  Contact sales
                </a>
                <a
                  href="https://dashboard.exa.ai"
                  target="_blank"
                  className="inline-block group-hover-link px-3 py-1.5 bg-black text-white font-['ABCDiatype'] font-medium text-[15px] hover:bg-gray-800 transition-colors rounded-[6px] flex items-center gap-1"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
