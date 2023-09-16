import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <main>
            <Outlet />
          </main>
        </div>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
