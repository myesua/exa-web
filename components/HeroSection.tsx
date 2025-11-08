'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUp, ArrowUpRight, Grip, Search } from 'lucide-react';

const endpoint = 'https://exa.ai/api/search';
const DynamicSearchNetwork = dynamic(
  () =>
    import('@/components/GlobalSearchNetwork').then(
      (mod) => mod.GlobalSearchNetwork
    ),
  { ssr: false }
);
const DynamicPulseOverlay = dynamic(
  () =>
    import('@/components/PulsatingCore').then((mod) => mod.PulsatingCoreOnly),
  { ssr: false }
);

interface SearchResult {
  author: string | null;
  id: string;
  publishedDate: string;
  score: number;
  title: string;
  url: string;
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const active = (e.target as HTMLButtonElement).ownerDocument.querySelector(
      '.group button.active'
    );
    const searchToken = 'bg-blue-50 text-blue-500 border-blue-500 active';
    const defaultToken = 'text-gray-600 hover:text-gray-900 border-transparent';

    if (active && active != target) {
      active.classList.remove(...searchToken.split(' '));
      active.classList.add(...defaultToken.split(' '));
      target.classList.remove(...defaultToken.split(' '));
      target.classList.add(...searchToken.split(' '));
    } else {
      target.classList.remove(...defaultToken.split(' '));
      target.classList.add(...searchToken.split(' '));
    }
  };

  const handleSearchSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    try {
      //   const res = await fetch(endpoint, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       query: searchQuery?.trim(),
      //       type: 'fast',
      //       livecrawl: 'never',
      //       num_result: 8,
      //     }),
      //   });
      //   if (!res.ok) {
      //     console.error('Network response was not ok:', res.statusText);
      //     throw new Error('Network response was not ok');
      //   }
      //   const data = await res.json();
      //   console.log(data);
      const data = {
        results: [
          {
            id: 'https://www.gv.com/news/roboflow',
            title: 'Roboflow: Making the (Real) World Programmable',
            url: 'https://www.gv.com/news/roboflow',
            publishedDate: '2024-11-19T00:00:00.000Z',
            author: 'Synchronized',
            score: 0.38326603174209595,
          },
          {
            id: 'https://fortune.com/2024/11/19/exclusive-roboflow-vision-ai-startup-raises-40-million-series-b',
            title:
              'Exclusive: Roboflow, vision AI startup, raises $40 million Series B | Fortune',
            url: 'https://fortune.com/2024/11/19/exclusive-roboflow-vision-ai-startup-raises-40-million-series-b',
            publishedDate: '2024-11-19T00:00:00.000Z',
            author: 'Allie Garfinkle',
            score: 0.3752293288707733,
          },
          {
            id: 'https://blog.roboflow.com/series-b',
            title:
              'We Raised $40M to Invest In Enterprise and Open Source Vision AI',
            url: 'https://blog.roboflow.com/series-b',
            publishedDate: '2024-11-19T00:00:00.000Z',
            author: 'Joseph Nelson',
            score: 0.36842307448387146,
          },
          {
            id: 'https://techcrunch.com/2024/04/05/robovision-computer-vision-belgium/',
            title:
              'Belgian computer vision startup Robovision eyes US expansion to address labor shortages',
            url: 'https://techcrunch.com/2024/04/05/robovision-computer-vision-belgium/',
            publishedDate: '2024-04-05T00:00:00.000Z',
            author: 'Anna Heim',
            score: 0.3673623502254486,
          },
          {
            id: 'https://www.luxonis.com/',
            title: 'Robotic Vision Made Simple - Luxonis',
            url: 'https://www.luxonis.com/',
            publishedDate: '2025-01-01T00:00:00.000Z',
            author: null,
            score: 0.37189996242523193,
          },
          {
            id: 'https://alwaysai.co/',
            title: 'Computer Vision Solutions for Enterprises | alwaysAI',
            url: 'https://alwaysai.co/',
            publishedDate: '2025-04-29T00:00:00.000Z',
            author: null,
            score: 0.3623880445957184,
          },
          {
            id: 'https://tracxn.com/d/artificial-intelligence/ai-startups-in-computer-vision/__2V4BFBIWT6w7-9X1Rdfp-mEhEz1AFmkXfZkZwi_lux4/companies',
            title:
              'Top Artificial Intelligence Companies in Computer Vision globally (Mar, 2025) - Tracxn',
            url: 'https://tracxn.com/d/artificial-intelligence/ai-startups-in-computer-vision/__2V4BFBIWT6w7-9X1Rdfp-mEhEz1AFmkXfZkZwi_lux4/companies',
            publishedDate: '2025-03-24T00:00:00.000Z',
            author: null,
            score: 0.3577744960784912,
          },
          {
            id: 'https://www.prophesee.ai/',
            title: 'PROPHESEE | Metavision for Machines',
            url: 'https://www.prophesee.ai/',
            publishedDate: '2024-06-10T00:00:00.000Z',
            author: null,
            score: 0.38364315032958984,
          },
        ],
      };
      setSearchResults(data?.results || []);
    } catch (error) {
      console.error('Error redirecting to search page:', error);
    }
  };
  return (
    <div className="relative w-full bg-white overflow-hidden flex items-center justify-center mt-[48px]">
      <div className="absolute inset-0 z-0">
        <DynamicSearchNetwork />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 !w-[879px] !h-[auto] my-0 mx-auto bg-white">
        <div className="relative z-10 flex flex-col items-center text-center mt-6 w-full">
          <div className="absolute -z-1">
            <DynamicPulseOverlay />
          </div>
          <div className="text-center">
            <h1 className="text-black mb-2 text-[2rem] md:text-[4rem]">
              Search built for AI
            </h1>
            <p className="mb-4 text-base md:text-lg text-[#58544e] max-w-[28ch] md:max-w-2xl">
              One API to connect your products to powerful web search
            </p>
          </div>
          <div className="flex space-x-4 mb-10">
            <Button className="btn-primary">
              <a
                href="https://dashboard.exa.ai/?_gl=1*wakizv*_gcl_au*NTU5NjgyOTUzLjE3NjIzNjMzODk.*FPAU*MTQ0NjYzNjQxLjE3NjIzNjMzOTA.*_ga*MTcyNzQ2MjcwNi4xNzYyMzYzMzg5*_ga_CPMTFL65Z3*czE3NjI1MzMzNjgkbzckZzAkdDE3NjI1MzMzNjgkajYwJGwwJGgxNDEyODE3MDQ2*_fplc*cEwwOVRMdSUyRmlhY1JCTlhvUXBJSG8wOTdndGY3U1BBb05zekklMkZQbm8lMkIwWjd0eFpLMWVBZVRBOFhVOW9LTnJDdVVUaGFvb0slMkI3REhZRHZma2FQeUFOZm5hY0ZaVk95R3phVEttJTJGY0NQMEhRNk4yOWQ1c3FpclpreXdCMVBmQSUzRCUzRA.."
                target="_blank"
                rel="noopener noreferrer"
                className="group-hover-link"
              >
                Try API for free
              </a>
            </Button>
            <Button variant="outline" className="btn-secondary">
              <a className="group-hover-link flex justify-between items-center gap-[5px]">
                Try Websets
                <span className="hidden md:block">
                  <span className="relative w-4 h-4 flex items-center justify-center  ">
                    <ArrowRight />
                  </span>
                </span>
              </a>
            </Button>
          </div>
          <div className="w-full max-w-2xl relative bg-white shadow-md rounded-[12px] border-[1px] border-solid border-[rgba(0, 0, 0, 0.08)] pt-3 pb-4 flex flex-col ml-1">
            <input
              type="text"
              placeholder="Find anything..."
              className="flex-grow p-3 text-md text-gray-700 focus:outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex justify-between items-center px-3 pb-4">
              <div className="flex text-sm font-medium bg-gray-100 cursor-pointer rounded-lg p-0.5">
                <div className="relative group search">
                  <Button
                    size="sm"
                    className={`px-2 pr-3 py-1 rounded-md transition-all duration-200 flex flex-row items-center border bg-blue-50 text-blue-500 border-blue-500 active cursor-pointer`}
                    onClick={handleBtnClick}
                  >
                    <Search /> Search
                  </Button>
                </div>
                <div className="relative group webset">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`px-2 py-1 pr-1.5 rounded-md transition-all duration-200 flex flex-row items-center border text-gray-600 hover:text-gray-900 border-transparent cursor-pointer`}
                    onClick={handleBtnClick}
                  >
                    <Grip />
                    Websets
                    <span className="bg-blue-100 text-blue-500 px-1 py-0.5 text-xs">
                      New
                    </span>
                  </Button>
                </div>
              </div>
              <Button
                size="icon"
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 ${
                  searchQuery?.length
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-gray-400'
                } cursor-pointer`}
                aria-label="Search"
                role="submit"
                onClick={handleSearchSubmit}
              >
                <ArrowUp color="#ffffff" />
              </Button>
            </div>
            {searchResults?.length ? (
              <div className="border-t border-gray-200"></div>
            ) : null}
            <div
              className={'overflow-hidden'}
              style={{
                height: 'auto',
                opacity: searchResults.length > 0 ? 1 : 0,
              }}
            >
              <div className="flex flex-col max-h-[30em] min-h-0">
                <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div style={{ opacity: searchResults.length > 0 ? 1 : 0 }}>
                    {searchResults.length > 0 &&
                      searchResults?.map((x) => (
                        <div key={x?.id}>
                          <div className="group px-6 py-4 hover:bg-gray-50 transition-colors max-w-full">
                            <a
                              href={x?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="text-left space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="flex-shrink-0">
                                    <img
                                      alt=""
                                      fetchPriority="high"
                                      width="16"
                                      height="16"
                                      decoding="async"
                                      data-nimg="1"
                                      className="rounded-sm aspect-square object-cover"
                                      src={`https://www.google.com/s2/favicons?domain=${
                                        x?.url
                                          ?.split('https://')[1]
                                          ?.split('/')[0]
                                      }&amp;sz=16`}
                                      style={{ color: 'transparent' }}
                                    />
                                  </div>
                                  <h3 className="text-base font-sans text-gray-900 group-hover:text-blue-600 transition-colors    whitespace-nowrap overflow-hidden text-ellipsis">
                                    {x?.title}
                                  </h3>
                                </div>
                                <p className="text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                                  {x?.id}
                                </p>
                              </div>
                            </a>
                          </div>
                          <div className="border-b border-gray-200"></div>
                        </div>
                      ))}
                  </div>
                </div>
                {searchResults?.length > 0 ? (
                  <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <div className="flex items-center gap-1 px-4">
                      <button
                        type="button"
                        className="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 bg-black text-white"
                      >
                        Visual
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-gray-600 hover:bg-gray-200"
                      >
                        Code
                      </button>
                    </div>
                    <button
                      type="button"
                      className="w-fit text-black hover:bg-gray-100 font-medium py-3.5 px-4 transition-colors duration-200 text-sm flex items-center gap-1"
                    >
                      Open in API playground
                      <ArrowUpRight />
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
