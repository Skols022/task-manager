import BoardSettings from './components/BoardSettings';
import Board from './components/Board';
import Layout from './components/UI/Layout';
import { useFetchTasksData } from './hooks/useFetchTasksData';
import Skeleton from './components/Skeleton';

function App() {
  const { data, isLoading } = useFetchTasksData();

  return (
    <Layout>
      {isLoading ? <Skeleton /> : (
        <>
          <header>
            <BoardSettings />
          </header>
          <main>
            <div className='mt-[20px]'>
              <section className='w-full'>
                <Board data={data} />
              </section>
            </div>
          </main>
        </>
      )}
    </Layout>
  )
}

export default App
