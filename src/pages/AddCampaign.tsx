import '../App.css'
import SideBar from '../components/Sidebar'
import MapContainer from '../components/MapContainer'

function AddCampaign() {
  

  return (
    <>
      <div className='m-0 p-0 w-full h-screen bg-gray-900 flex md:flex-row sm:flex-col-reverse md:overflow-hidden'>
          <SideBar />
          <MapContainer />
      </div>
    </>
  )
}

export default AddCampaign;
