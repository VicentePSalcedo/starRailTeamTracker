import './App.css'
import CardHolder from './component/CardHolder'

function App() {
  const TEAM_SIZE = 4;

  return (
    <div className='App'>
        <CardHolder teamSize={TEAM_SIZE}/>
    </div>
  )
}

export default App
