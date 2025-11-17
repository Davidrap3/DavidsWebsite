import './App.css';
import RoutesDM from './routing/RoutesDM';
import Header from './components/header';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
   <ErrorBoundary>
      <Header />
      <main>
        <RoutesDM />
      </main>
   </ErrorBoundary>
  );
}

export default App;
