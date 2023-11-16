import React from 'react'
import filterModule from '../general/filterModule'

export default function ItemBanner({ item }) {

  function mapSpecs() {
    return Object.keys(filterModule).map(specLabel =>
      <div className='flex-row justify-between'>
        <span>{mapSpecLabel(specLabel) + ': '}</span>
        <span>{item[specLabel]}</span>
      </div>
    )
  }

  function mapSpecLabel(specLabel) {
    result = ''
    specLabel.split('_').forEach(word => {
      result = result + word.charAt(0).toUpperCase() + word.slice(1) + ' '
    })
    return result.slice(0, -1)
  }

  return (
    <div className='description-container flex-column'>
      <div>
        <h2>{item.name}</h2>
      </div>
      <div className='flex-row'>
        <div>
          {'rating'}
        </div>
        <div>
          {'rating'}
        </div>
        <div>
          {'sold'}
        </div>
      </div>
      <div>
        {'PHP ' + item.price}
      </div>
      <div>
        <h3>Amount:</h3>
        <div className='flex-row'>
          <button>-</button>
          <input type="number" />
          <button>+</button>
        </div>
      </div>
      <div>
        <button>Add to cart</button>
        <button>Buy now</button>
      </div>
      <div className='specsContainer'>
        {mapSpecs()}
      </div>
    </div>
  )
}