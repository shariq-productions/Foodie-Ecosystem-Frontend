
import {Navbar} from './Components/Navbar'
import {Home} from './Components/Home'
import {OrderPage} from './Components/OrderPage'
import { Route, Routes } from 'react-router'
import { SignUp,Login } from './Components/Verifiers'
import { CheckoutPage } from './Components/CheckoutPage'
import { TrackPage} from './Components/TrackPage'
import {Admin} from './Admin/Admin'

function App() {
  return (
    <div>
      <Navbar/>
      <div className='Central_Default relative mx-[5%]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/trackOrders" element={<TrackPage/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </div>
      </div>
  );
} 

export default App
