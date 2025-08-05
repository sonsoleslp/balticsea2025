import React from 'react'
import { useDrag } from 'react-dnd'

export default function DraggableImage({ id, src, width }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'image',
    item: { id },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <img
      ref={dragRef}
      src={src}
      alt=""
      style={{
        width: width || '8vw',
        height: "auto",
        margin: '10px',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        transition: 'transform 0.3s',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)'
      }}
    />
  )
}
