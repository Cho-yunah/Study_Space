import Counter from './Counter';
import Users from './Users';
import { UsersProvider } from './UsersContext';

function App() {
  return (<>
    <UsersProvider>
      <Users/>
    </UsersProvider>
    <Counter/>
    </>
  );
}

export default App;
