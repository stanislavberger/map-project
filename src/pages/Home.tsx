import '../App.css'
import HeroButton from '../ui/Button';

function Home() {

  return (
    <>
      <div className='m-0 p-0 w-full h-screen bg-gray-900 flex md:flex-row sm:flex-col-reverse md:overflow-hidden'>
          <div className='content'>
              <div className='hero'>
                  <img src='https://center-media.com/img/2022/zveri.jpg'/>
                  <h1 className='text-6x1'>Планировщик размещения наружной рекламы</h1>
                  <div>
                    <HeroButton />
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Home;
