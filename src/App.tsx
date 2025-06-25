import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { useThreadsApi } from './hooks/useThreadsApi';
import { useTheme } from './hooks/useTheme';

function App() {
  const { loading, data, error, fetchThreadsData, clearData } = useThreadsApi();
  const { theme } = useTheme();
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    // Simulate loading time for the app initialization
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (url: string) => {
    clearData();
    fetchThreadsData(url);
  };

  const handleErrorDismiss = () => {
    clearData();
  };

  return (
    <>
      <LoadingScreen isVisible={showLoadingScreen} theme={theme} />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-manrope flex flex-col">
        <Header />
        
        <main className="flex-1 py-8 sm:py-12 pb-4">
          <InputSection onSubmit={handleSubmit} loading={loading} />
          
          <div className="mt-8">
            {loading && <LoadingSpinner />}
            
            {error && (
              <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <ErrorMessage message={error} onDismiss={handleErrorDismiss} />
              </div>
            )}
            
            {data && <ResultsSection data={data} />}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export default App;