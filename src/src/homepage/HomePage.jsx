import ItemsDisplay from '../itemsdisplay/ItemsDisplay'
import PromoBanners from './PromoBanners'
import Categories from './Categories'
import './homepage.css'

export default function App() {

  return (
    <>
      <div className=''>
        <PromoBanners />
        <Categories />
        <div className='flex-row justify-center'>
          <div className='items-display'>
            <ItemsDisplay API='/api/v1/most-recent' />
          </div>

        </div>
      </div>
    </>
  )
}
