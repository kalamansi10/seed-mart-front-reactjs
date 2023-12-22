import { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import './items-display.css'

export default function ItemsDisplay() {
  const [items, setItems] = useState()

  const [searchParams] = useSearchParams('keyword=')
  const location = useLocation()

  const navigate = useNavigate()

  const itemCount = useRef()
  const page = useRef(1)
  useEffect(() => {
    setItems(null)
    fetch('/api/v1/search?' + searchParams.toString())
      .then(response => response.json())
      .then(items => {
        itemCount.current = items.item_count
        setItems(mapItems(items.item_list))
      })
  }, [searchParams])

  function mapItems(item_list) {
    return item_list.map((item) =>
      <Link to={'/show/' + item.id} key={item.id}>
        <div className="item-card flex-column justify-between box-shadow">
          <div>
            <img src={item.image_links[0]} alt="placeholder" />
            <div className='item-padding'>
              <h4>{item.name}</h4>
              <span>{item.price.toLocaleString("en-US", { style: "currency", currency: "PHP" })}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  function mapPages() {
    let result = []
    let pages = itemCount.current / 20
    for (let i = 1; i < pages + 1; i++) {
      let render = i == page.current ? <span key={i}>{i}</span> : <button onClick={handlePageClick} key={i}>{i}</button>
      result.push(render)
    }
    return result
  }

  function handlePageClick(e) {
    page.current = Number(e.target.textContent)
    movePage()
  }

  function handleNextPrev(increment) {
    page.current = page.current + increment
    movePage()
  }

  function movePage() {
    searchParams.delete('offset')
    searchParams.append('offset', ((page.current - 1) * 20))
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    navigate('/results?' + searchParams.toString())
  }

  function handleSortChange(e) {
    searchParams.delete('sort_by')
    if (e.target.value != "most-recent") {
      searchParams.append('sort_by', e.target.value)
    }
    page.current = 1
    searchParams.delete('offset')
    navigate('/results?' + searchParams.toString())
  }

  function renderDisplayItems() {
    if (location.pathname == '/results') {
      return (
        <>
          <div className='sorter-wrapper'>
            <select onChange={handleSortChange} value={searchParams.get('sort_by') || 'most_recent'}>
              <option value="most-recent">most recent</option>
              <option value="price-lowest">price: lowest</option>
              <option value="price-highest">price: highest</option>
            </select>
          </div>
          {renderItemList()}
          {renderPages()}
        </>
      )
    } else {
      return renderItemList()
    }
  }

  function renderItemList() {
    if (!items) {
      return (
        <div className='flex-row justify-center'>
          <div className="loading-indicator"></div>
        </div>
      )
    } else {
      return (
        <div className='items-container'>
          {items}
        </div>
      )
    }
  }

  function renderPages() {
    if (items) {
      return (
        <div className='pages-container flex-row justify-center'>
          {page.current > 1 && <button onClick={() => handleNextPrev(-1)}>{'prev'}</button>}
          {mapPages()}
          {page.current < (itemCount.current / 20) && <button onClick={() => handleNextPrev(1)}>{'next'}</button>}
        </div>
      )
    }
  }

  return (
    <div className="display-items">
      {renderDisplayItems()}
    </div>
  )
}
