import React from 'react'
import { useDrop } from 'react-dnd'
import DraggableImage from './DraggableImage.jsx'

export default function DropZone({ side, onDrop, images, center = false, title = false, passed }) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'image',
    drop: (item) => onDrop(item),
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }))

  return (

    <div
      ref={dropRef}
      className={`dropzone ${side}`}
      style={{
        pointerEvents: passed ? "none" : "all",
        backgroundColor: side != "center" ? (isOver ? '#e0e0f088' : '#f0f0f088') : "transparent"
      }}
    >{title && <h2 className="dropzone-title">{title}</h2>}
      {images.map(img => (
        <DraggableImage key={img.id} id={img.id} src={img.src} width={img.width} title={img.title}/>
      ))}
    </div>
  )
}
