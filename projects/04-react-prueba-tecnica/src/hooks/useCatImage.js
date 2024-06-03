import { useEffect, useState } from 'react'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?json=true`)
      .then(res => res.json())
      .then(data => {
        const { _id } = data;
        setImageUrl(`${_id}/says/${threeFirstWords}?fontSize=50&fontColor=white`)
      })

  }, [fact])

  return { imageUrl : `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}