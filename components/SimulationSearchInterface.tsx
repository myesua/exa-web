import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Filter,
  Database,
  Loader,
  SearchCode,
  ListStartIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

type SearchResult = {
  id: number;
  title: string;
  snippet: string;
  sourceType: 'Blog' | 'Academic' | 'Code Repo' | 'News' | 'Forum';
  topicCluster: 'AI' | 'Finance' | 'Engineering' | 'Health' | 'Art';
};

const SOURCE_TYPES: SearchResult['sourceType'][] = [
  'Blog',
  'Academic',
  'Code Repo',
  'News',
  'Forum',
];
const TOPIC_CLUSTERS: SearchResult['topicCluster'][] = [
  'AI',
  'Finance',
  'Engineering',
  'Health',
  'Art',
];
const SHORT_DELAY_MS = 12000;
const LONG_DELAY_MS = 600000;
const LOREM_IPSUM_SNIPPET =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.';

const MOCK_SEARCH_RESULTS: SearchResult[] = Array.from(
  { length: 10000 },
  (_, i) => ({
    id: i + 1,
    title: `Result Title #${i + 1}`,
    snippet: LOREM_IPSUM_SNIPPET,
    sourceType: SOURCE_TYPES[i % SOURCE_TYPES.length],
    topicCluster: TOPIC_CLUSTERS[i % TOPIC_CLUSTERS.length],
  })
);

const SYNTHETIC_ANSWER = `Based on the 10,000 sources analyzed, the primary consensus indicates a significant trend towards decentralized technologies in the finance sector, driven by advancements in AI-powered predictive models. Engineering disciplines are increasingly adopting machine learning for structural analysis, while the health sector sees major breakthroughs in personalized medicine through genomic data.
This synthesis highlights a cross-disciplinary convergence, where computational methods, particularly from AI and data science, are becoming foundational to innovation across all analyzed fields. The implications are vast, suggesting a future where predictive accuracy and automation redefine professional standards and capabilities. Further exploration into specific clusters, such as 'Academic' sources on 'AI', can provide deeper, more technical insights into these emerging paradigms.`;

const fetchResults = (delay: number): Promise<SearchResult[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SEARCH_RESULTS);
    }, delay);
  });
};

const LoadingComponent: React.FC<{ step: number }> = ({ step }) => {
  const stepIndex = step % 3;
  const messages = [
    {
      icon: <ListStartIcon className="h-6 w-6" />,
      text: 'Step 1/3: Analyzing query intent...',
    },
    {
      icon: <Database className="h-6 w-6" />,
      text: 'Step 2/3: Scanning billions of sources...',
    },
    {
      icon: <FileText className="h-6 w-6" />,
      text: 'Step 3/3: Synthesizing core answer...',
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <div className="relative h-10 w-10">
        <AnimatePresence>
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-blue-500"
          >
            {messages[stepIndex].icon}
          </motion.div>
        </AnimatePresence>
      </div>
      <p
        className="text-lg font-medium text-foreground animate-fade-in-out"
        key={stepIndex}
      >
        {messages[stepIndex].text}
      </p>
    </div>
  );
};

const SkeletonUI = () => (
  <div className="w-full">
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      <div className="lg:col-span-3 space-y-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      </div>
      <aside className="hidden lg:block lg:col-span-1">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Skeleton className="h-5 w-1/3 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-1/3 mb-3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  </div>
);

const FilterSidebar: React.FC<{
  filterCounts: {
    sourceTypes: Record<string, number>;
    topicClusters: Record<string, number>;
  };
  activeFilters: { sourceType: string | null; topicCluster: string | null };
  onFilterChange: (
    type: 'sourceType' | 'topicCluster',
    value: string | null
  ) => void;
}> = ({ filterCounts, activeFilters, onFilterChange }) => {
  const renderFilterGroup = (
    title: string,
    filterType: 'sourceType' | 'topicCluster',
    counts: Record<string, number>
  ) => (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-foreground">{title}</h3>
      <div className="space-y-2">
        {Object.entries(counts).map(([value, count]) => (
          <button
            key={value}
            onClick={() =>
              onFilterChange(
                filterType,
                activeFilters[filterType] === value ? null : value
              )
            }
            className={cn(
              'w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-sm transition-colors duration-200 cursor-pointer accent',
              activeFilters[filterType] === value ? 'active' : ''
            )}
          >
            <span>{value}</span>
            <Badge
              variant={
                activeFilters[filterType] === value ? 'default' : 'secondary'
              }
              className="badge"
            >
              {count.toLocaleString()}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion
          type="multiple"
          defaultValue={['source-types', 'topic-clusters']}
          className="w-full"
        >
          <AccordionItem value="source-types">
            <AccordionTrigger className="text-lg font-semibold text-foreground">
              Source Types
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              {renderFilterGroup('', 'sourceType', filterCounts.sourceTypes)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="topic-clusters">
            <AccordionTrigger className="text-lg font-semibold text-foreground">
              Topic Clusters
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              {renderFilterGroup(
                '',
                'topicCluster',
                filterCounts.topicClusters
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export function SearchInterface() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [simulatedDuration, setSimulatedDuration] = useState(SHORT_DELAY_MS);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    sourceType: string | null;
    topicCluster: string | null;
  }>({
    sourceType: null,
    topicCluster: null,
  });
  const [showAllSources, setShowAllSources] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const formatDuration = (ms: number) => {
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const startSearch = useCallback((delay: number) => {
    setIsLoading(true);
    setLoadingStep(0);
    setResults([]);

    const intervalTime = 3000;
    let isLatestSearch = true;

    const runLoadingLoop = () => {
      setLoadingStep((prev) => prev + 1);
      timeoutRef.current = window.setTimeout(runLoadingLoop, intervalTime);
    };

    timeoutRef.current = window.setTimeout(runLoadingLoop, intervalTime);

    fetchResults(delay).then((data) => {
      if (!isLatestSearch) {
        return;
      }
      setResults(data);
      setIsLoading(false);
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      setLoadingStep((prev) => prev - (prev % 3) + 2);
    });

    return () => {
      isLatestSearch = false;
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const delay =
      simulatedDuration === SHORT_DELAY_MS ? SHORT_DELAY_MS : LONG_DELAY_MS;
    Promise.resolve().then(() => {
      const cleanup = startSearch(delay);
      (window as unknown as { __searchCleanup?: () => void }).__searchCleanup =
        cleanup;
    });
    return () => {
      const cleanup = (window as unknown as { __searchCleanup?: () => void })
        .__searchCleanup;
      if (cleanup) cleanup();
      delete (window as unknown as { __searchCleanup?: () => void })
        .__searchCleanup;
    };
  }, [startSearch, simulatedDuration]);

  const filterCounts = useMemo(() => {
    const counts = {
      sourceTypes: {} as Record<string, number>,
      topicClusters: {} as Record<string, number>,
    };
    for (const result of results) {
      counts.sourceTypes[result.sourceType] =
        (counts.sourceTypes[result.sourceType] || 0) + 1;
      counts.topicClusters[result.topicCluster] =
        (counts.topicClusters[result.topicCluster] || 0) + 1;
    }
    return counts;
  }, [results]);

  const filteredResults = useMemo(() => {
    if (
      !activeFilters.sourceType &&
      !activeFilters.topicCluster &&
      !showAllSources
    ) {
      return [];
    }
    return results.filter((result) => {
      const sourceTypeMatch =
        !activeFilters.sourceType ||
        result.sourceType === activeFilters.sourceType;
      const topicClusterMatch =
        !activeFilters.topicCluster ||
        result.topicCluster === activeFilters.topicCluster;
      return sourceTypeMatch && topicClusterMatch;
    });
  }, [results, activeFilters, showAllSources]);

  const handleFilterChange = (
    type: 'sourceType' | 'topicCluster',
    value: string | null
  ) => {
    setShowAllSources(false);
    setActiveFilters((prev) => ({ ...prev, [type]: value }));
  };

  const handleViewAll = () => {
    setActiveFilters({ sourceType: null, topicCluster: null });
    setShowAllSources(true);
  };

  const handleRunFullConstraint = () => {
    setSimulatedDuration(LONG_DELAY_MS);
    // startSearch(LONG_DELAY_MS);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-4 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <SearchCode className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Aura Search</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">
            The future of high-latency search.
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-10 lg:py-12">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-12">
              <LoadingComponent step={loadingStep} />
              <p className="text-lg text-muted-foreground">
                Simulating extreme search time of{' '}
                {formatDuration(simulatedDuration)}.
              </p>

              {simulatedDuration === SHORT_DELAY_MS && (
                <Button
                  size="lg"
                  onClick={handleRunFullConstraint}
                  className="mt-4 btn-primary"
                >
                  <Loader className="h-4 w-4 mr-2 animate-spin-slow" />
                  Run Full 10-Minute Constraint Simulation
                </Button>
              )}

              <SkeletonUI />
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-4 lg:gap-8 lg:items-start">
              <div className="lg:col-span-3 space-y-8">
                <Card className="animate-fade-in shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      Synthetic Answer
                    </CardTitle>
                    <CardDescription>
                      Generated from 10,000 sources (Search Duration:{' '}
                      {formatDuration(simulatedDuration)}).
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-foreground/90 leading-relaxed">
                      {SYNTHETIC_ANSWER}
                    </p>
                  </CardContent>
                </Card>
                <AnimatePresence>
                  {filteredResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle>
                            Sources ({filteredResults.length.toLocaleString()})
                          </CardTitle>
                          <CardDescription>
                            {showAllSources
                              ? 'Showing all sources.'
                              : 'Filtered sources based on your selection.'}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {filteredResults.slice(0, 50).map((result) => (
                            <div
                              key={result.id}
                              className="border-b pb-4 last:border-b-0 last:pb-0"
                            >
                              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                {result.title}
                              </h3>
                              <p className="text-muted-foreground mt-1">
                                {result.snippet}
                              </p>
                              <div className="mt-2 flex gap-2">
                                <Badge variant="outline">
                                  {result.sourceType}
                                </Badge>
                                <Badge variant="outline">
                                  {result.topicCluster}
                                </Badge>
                              </div>
                            </div>
                          ))}
                          {filteredResults.length > 50 && (
                            <p className="text-center text-muted-foreground">
                              ...and {filteredResults.length - 50} more results.
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
                {filteredResults.length === 0 && (
                  <div className="text-center py-12">
                    <Button size="lg" onClick={handleViewAll}>
                      <FileText className="h-5 w-5 mr-2" />
                      View All 10,000 Sources
                    </Button>
                    <p className="text-muted-foreground mt-4">
                      Select a filter or view all sources to begin exploring.
                    </p>
                  </div>
                )}
              </div>
              <aside className="lg:col-span-1 mt-8 lg:mt-0">
                <FilterSidebar
                  filterCounts={filterCounts}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </aside>
            </div>
          )}
        </div>
      </main>
      <footer className="py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
          <p>Just a search with set time out 😎</p>
        </div>
      </footer>
    </div>
  );
}
