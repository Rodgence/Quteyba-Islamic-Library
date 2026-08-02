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
    quill.root.innerHTML = value
    quillRef.current = quill

    quill.on('text-change', () => {
      const html = quill.getText().trim() === '' ? '' : quill.root.innerHTML
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
    const currentHtml = quill.getText().trim() === '' ? '' : quill.root.innerHTML
    if (value !== currentHtml) {
      quill.root.innerHTML = value
    }
  }, [value])

  return <div ref={containerRef} className="rich-text-editor" />
}
