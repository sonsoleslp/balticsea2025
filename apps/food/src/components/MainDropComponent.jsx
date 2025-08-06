import React, { useState } from 'react'


import DropZone from './Dropzone.jsx'
import DraggableImage from './DraggableImage.jsx'

import { DndProvider } from 'react-dnd'
import { MultiBackend, TouchTransition, PointerTransition } from 'react-dnd-multi-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

const DND_BACKEND = MultiBackend

const DND_OPTIONS = {
  backends: [
    {
      backend: HTML5Backend,
      transition: PointerTransition,
    },
    {
      backend: TouchBackend,
      options: {
        enableMouseEvents: true, // so you can use mouse + touch
      },
      preview: true,
      transition: TouchTransition,
    }
  ]
}

export default function MainDropComponent(props) {

  const {leftImages, rightImages, centerImages, setCenterImages, setLeftImages, setRightImages} = props;

  const removeFromAll = (id) => {
    setCenterImages(prev => prev.filter(img => img.id !== id))
    setLeftImages(prev => prev.filter(img => img.id !== id))
    setRightImages(prev => prev.filter(img => img.id !== id))
  }

  const handleDrop = (zone, item) => {
    const image = [...centerImages, ...leftImages, ...rightImages].find(i => i.id === item.id)
    if (!image) return

    // Remove it from all zones first
    removeFromAll(image.id)

    // Then add to the correct one
    if (zone === 'center') {
      setCenterImages(prev => [...prev, image])
    } else if (zone === 'left') {
      setLeftImages(prev => [...prev, image])
    } else if (zone === 'right') {
      setRightImages(prev => [...prev, image])
    }
  }

  return (
    <DndProvider backend={DND_BACKEND} options={DND_OPTIONS}>
      <div className="container">
        <DropZone
          passed = {props.passed} 
          title = "Potentially safe"
          side="left"
          images={leftImages}
          onDrop={item => handleDrop('left', item)}
        />
        <DropZone
          passed = {props.passed} 
          side="center"
          images={centerImages}
          onDrop={item => handleDrop('center', item)}
          center
        />
        <DropZone
          passed = {props.passed} 
          title = "Potentially dangerous"
          side="right"
          images={rightImages}
          onDrop={item => handleDrop('right', item)}
        />
      </div>
    </DndProvider>
  )
}
