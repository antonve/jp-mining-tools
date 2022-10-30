import { useState } from 'react'
import Button from '@app/components/Button'
import Modal from '@app/components/Modal'
import { TextArea, Label } from '@app/components/Form'
import { Language } from '@app/domain'

interface Props {
  addWords: (words: string[]) => void
  language: Language
}

const AddWordsButton = ({ addWords }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [words, setWords] = useState('')

  const saveWords = () => {
    const newWords = words.split('\n')
    addWords(newWords)
    setWords('')
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Words</Button>
      <Modal
        title="Add Words"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <form onSubmit={saveWords}>
          <div className="mb-4 w-96">
            <Label htmlFor="words">Words (one per line)</Label>
            <TextArea
              id="words"
              rows={20}
              value={words}
              onChange={setWords}
              autoFocus={true}
            />
          </div>

          <div className="flex justify-end gap-x-4">
            <Button
              onClick={() => {
                setWords('')
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button primary type="submit">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddWordsButton
