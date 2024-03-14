import './App.css'
import SideBar from './components/Sidebar'
import MapContainer from './components/MapContainer'


function App() {
  

  return (
    <>
      <div className='m-0 p-0 w-full h-screen bg-gray-900 flex flex-row'>
        <SideBar />
        <MapContainer />
      </div>
    </>
  )
}

export default App
