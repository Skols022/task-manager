import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import BoardSettings from './components/BoardSettings';
import Button from './components/UI/Button';
import TaskList from './components/TaskList';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <BoardSettings />
      </header>
      <main>
        <div>
          <section>
            <Button />
            <TaskList />
          </section>
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default App
