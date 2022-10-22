import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import BookImporter from '../src/BookImporter'
import BookNavigation from '../src/BookNavigation'
import BookPage from '../src/BookPage'
import { Book, getOcr, OcrResult } from '../src/domain'
import Transcript from '../src/Transcript'

const Home: NextPage<{}> = () => {
  const [book, setBook] = useState<Book>()
  const [page, setPage] = useState(0)
  const [ocr, setOcr] = useState<OcrResult>()

  useEffect(() => setOcr(undefined), [page])

  const fetchOcr = () => {
    if (!book) {
      return
    }

    getOcr(book.pages[page]).then(res => {
      setOcr(res)
    })
  }

  if (!book) {
    return (
      <div className="w-screen h-screen flex flex-col">
        <BookImporter setBook={setBook} />
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex">
      <div className="flex-grow h-screen flex flex-col">
        <BookPage book={book} index={page} ocr={ocr} />
      </div>
      <div className="w-1/2 flex-shrink-0 p-8 border-l-2 border-gray-200">
        <BookNavigation book={book} page={page} setPage={setPage} />
        <div className="flex flex-row">
          <h2
            className="text-xl font-bold my-4 cursor-pointer"
            onClick={fetchOcr}
            title="Click to load transcript"
          >
            Transcript
          </h2>
        </div>
        <Transcript ocr={ocr} />
      </div>
    </div>
  )
}

export default Home
