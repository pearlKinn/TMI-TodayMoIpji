import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast, { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();
const notify = () => toast('Here is your toast.');
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <button onClick={notify}>Make me a toast</button>
          <main>
            <Outlet />
          </main>
          <Toaster />
        </div>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </>
  );
}

export default App;
