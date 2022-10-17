const BookImporter = ({ setBook }: { setBook: (book: any) => void }) => {
  return (
    <div className="border-4 border-indigo-400 border-dashed p-16 m-16 text-indigo-400 opacity-6 text-4xl text-center hover:opacity-50 cursor-move relative">
      Drag book to import
      <input
        type="file"
        className="absolute left-0 right-0 top-0 bottom-0 opacity-0"
        accept=".epub"
        onChange={e => {
          const book = e.target.files?.[0]

          if (!book) {
            return
          }

          const reader = new FileReader()
          reader.onload = async e => {
            const buf = e.target?.result
            setBook(buf)
          }
          reader.readAsArrayBuffer(book)
        }}
      />
    </div>
  )
}

export default BookImporter
