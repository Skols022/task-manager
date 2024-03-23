import { Provider } from 'react-redux';
import BoardSettings from './components/BoardSettings';
import Board from './components/Board';
import Layout from './components/UI/Layout';
import { useFetchTasksData } from './hooks/useFetchTasksData';
import { useFetchCollaboratorsData } from './hooks/useFetchCollaboratorsData';
import { store } from './app/store';

function App() {
  const { data: tasksData, isLoading: isTasksDataLoading } = useFetchTasksData();
  const { data: collaboratorsData, isLoading: isCollaboratorsDataLoading } = useFetchCollaboratorsData();

  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
