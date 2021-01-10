import { BrowserRouter, Route } from 'react-router-dom'

//components
import Header from './header'
import HomePage from './home'
import UserPage from './userPage'
import Selected from './pages/selected'
import Rejected from './pages/rejected'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route path='/' exact component={HomePage} />
        <Route path='/user/:id' exact component={UserPage} />
        <Route path='/selected' exact component={Selected} />
        <Route path='/rejected' exact component={Rejected} />
      </BrowserRouter>
    </div>
  );
}

export default App;
