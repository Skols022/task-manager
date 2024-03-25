import BoardSettings from './components/BoardSettings';
import Board from './components/Board';
import Layout from './components/UI/Layout';
import { useFetchTasksData } from './hooks/useFetchTasksData';
import Skeleton from './components/Skeleton';
import { useSelector } from 'react-redux';
import { unknownData } from './utils/api';
import { useEffect } from 'react';

function App() {
  const { data, isLoading, setRefetch } = useFetchTasksData();
  const status = useSelector((state: unknownData) => state.tasks.status);
  
  useEffect(() => {
      status === 'loading' && setRefetch(true);
      status === 'succeeded' && setRefetch(false);
  }, [status, setRefetch, data]);

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
