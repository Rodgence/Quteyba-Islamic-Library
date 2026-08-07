import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  dir?: 'ltr' | 'rtl'
}

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'code-block'],
  ['link', 'image'],
  ['clean'],
]

export default function RichTextEditor({ value, onChange, placeholder, dir = 'ltr' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  // Tracks the last HTML we told the parent about, so the sync effect below
  // can tell "value changed because we typed it" apart from "value changed
  // because the parent loaded different content" and only reset the editor
  // (which would clobber in-progress typing) for the latter.
  const lastEmittedRef = useRef(value)

  useEffect(() => {
    if (!containerRef.current) return

    const editorEl = document.createElement('div')
    containerRef.current.appendChild(editorEl)

    const quill = new Quill(editorEl, {
      theme: 'snow',
      placeholder,
      modules: { toolbar: toolbarOptions },
    })

    quill.root.setAttribute('dir', dir)
    quill.root.style.textAlign = dir === 'rtl' ? 'right' : 'left'
    // Tell Grammarly (and similar writing-assistant extensions) to leave this
    // contenteditable area alone — they attach to exactly this kind of element
    // and a malfunctioning copy can corrupt what's being typed.
    quill.root.setAttribute('data-gramm', 'false')
    quill.root.setAttribute('data-gramm_editor', 'false')
    quill.root.setAttribute('data-enable-grammarly', 'false')
    quill.root.innerHTML = value
    lastEmittedRef.current = value
    quillRef.current = quill

    quill.on('text-change', () => {
      const html = quill.getText().trim() === '' ? '' : quill.root.innerHTML
      lastEmittedRef.current = html
      onChangeRef.current(html)
    })

    return () => {
      quillRef.current = null
      containerRef.current?.replaceChildren()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return
    if (value === lastEmittedRef.current) return
    quill.root.innerHTML = value
    lastEmittedRef.current = value
  }, [value])

  return <div ref={containerRef} className="rich-text-editor" />
}
