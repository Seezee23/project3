import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import DrinksPage from '../DrinksPage/DrinksPage';
import NavBar from '../../components/NavBar/NavBar';
import { Routes, Route} from 'react-router-dom'

function App() {
  const [state, setState] = useState(null)
  const [user, setUser ] = useState(null)

  const fetchState = async () => {
    try {
      const response = await fetch('/api/test')
      const data = await response.json()
      setState(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchState()
  }, [])
  
  return (
    <main className="App">
      {
        user ?
        <>
          <NavBar />
          <Routes>
            <Route path="/drinks" element={<DrinksPage />} />
            <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} />} />
            <Route path="/orders" element={<OrderHistoryPage user={user} setUser={setUser} />} />
            <Route path="/" element={<NewOrderPage user={user} setUser={setUser} />}/>
          </Routes>
        </>
         :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;