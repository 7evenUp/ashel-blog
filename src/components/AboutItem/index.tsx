import React from 'react'
import { AboutItemType } from '../../types/AboutItemType'

export default function AboutItem({heading, body, link}: AboutItemType) {
  return (
    <a href={link} className="group flex justify-between gap-10">
      <div className="border-b">
        <h2 className="font-serif text-5xl text-white drop-shadow-[0_0_1px_rgb(0,0,0)] w-[322px]">
          {heading}
        </h2>
      </div>
      
      <p className="text-lg leading-7 grow shrink border-b xl:w-[700px]">
        {body}
      </p>
    </a>
  )
}
