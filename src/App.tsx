import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import BoardSettings from './components/BoardSettings';
import Board from './components/Board';
import Layout from './components/UI/Layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <header>
          <BoardSettings />
        </header>
        <main>
          <div className='mt-[20px]'>
            <section className='w-full'>
              <Board />
            </section>
          </div>
        </main>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
