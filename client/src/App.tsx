import rocketLogo from '@/assets/img/rocket.png'

import { useAuthContext } from './context/AuthContext';
import MenuComp from './components/menu/menu';

import './App.scss'

function App() {

  const ctx = useAuthContext();

  const username = ctx ? ctx.user.username : 'anon';

  return (
    <>
      <MenuComp/>
      <div
        className="container"
        >
        <img src={rocketLogo} className="logo" alt="Discord" />
        <h1>Hello, @{username} !</h1>
      </div>
    </>
  )
}

export default App
