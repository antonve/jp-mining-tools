import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import BookImporter from '../src/BookImporter'
import BookNavigation from '../src/BookNavigation'
import BookPage from '../src/BookPage'
import {
  Book,
  fetchOcr,
  OcrResult,
  FocusWord,
  createPendingCard,
  CardType,
  getRawTextForBlock,
} from '../src/domain'
import Transcript from '../src/Transcript'

const Home: NextPage<{}> = () => {
  const [book, setBook] = useState<Book>()
  const [page, setPage] = useState(0)
  const [canvasData, setCanvasData] = useState<string>('')
  const [ocr, setOcr] = useState<OcrResult>()
  const [focusWord, setFocusWord] = useState<FocusWord>()

  const exportWord = (cardType: CardType) => {
    if (!focusWord) {
      return Promise.reject()
    }

    const prefix = 'data:image/jpeg;base64,'

    return createPendingCard({
      id: undefined,
      language_code: 'zho',
      token: focusWord.word.text,
      source_image: canvasData.slice(prefix.length),
      meta: {
        sentence: getRawTextForBlock(focusWord.block),
        card_type: cardType,
        hanzi_traditional: focusWord.cedict?.hanzi_traditional,
        hanzi_simplified: focusWord.cedict?.hanzi_simplified,
        pinyin: focusWord.cedict?.pinyin.toLowerCase(),
        pinyin_tones: focusWord.cedict?.pinyin_tones.toLowerCase(),
        meanings: focusWord.cedict?.meanings ?? [],
      },
    })
  }

  useEffect(() => setOcr(undefined), [page])

  const loadTranscript = () => {
    if (!book) {
      return
    }

    fetchOcr(book.pages[page]).then(res => {
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
      <div className="w-1/2 h-screen flex flex-col overflow-auto">
        <BookPage
          book={book}
          index={page}
          ocr={ocr}
          focusWord={focusWord}
          setCanvasData={setCanvasData}
        />
      </div>
      <div className="w-1/2 flex-1 border-l-2 border-gray-200 flex flex-col">
        <BookNavigation book={book} page={page} setPage={setPage} />
        <div className="p-8 min-h-0 flex-1 overflow-auto">
          <div className="flex flex-row">
            <h2
              className="text-xl font-bold cursor-pointer"
              onClick={loadTranscript}
              title="Click to load transcript"
            >
              Transcript
            </h2>
          </div>
          <Transcript
            ocr={ocr}
            focusWord={focusWord}
            setFocusWord={setFocusWord}
            exportWord={exportWord}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
