import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
// import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import CoffeesPage from '../CoffeesPage/CoffeesPage';
import NavBar from '../../components/NavBar/NavBar';
import { Routes, Route} from 'react-router-dom'

function App() {
  const [state, setState] = useState([])
  const [user, setUser ] = useState(null)

  const fetchState = async () => {
    try {
      const response = await fetch('/api/coffees/api')
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
            <Route path="/coffees" element={<CoffeesPage />} />
            <Route path="/orders/new" element={<NewOrderPage coffees={state} setState={setState}/>} />
            {/* <Route path="/orders" element={<OrderHistoryPage/>} /> */}
            <Route path="/" element={<NewOrderPage coffees={state}/>}/>
          </Routes>
        </>
         :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;