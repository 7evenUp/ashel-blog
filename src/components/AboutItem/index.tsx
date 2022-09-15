import React from 'react'
import { AboutItemType } from '../../types/AboutItemType'

export default function AboutItem({heading, body, link}: AboutItemType) {
  return (
    <>
      {link !== undefined ? (
        <a href={link}>
          <h2 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
            {heading}
          </h2>
          <p>
            {body}
          </p>
        </a>
      ) : (
        <div>
          <h2 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
            {heading}
          </h2>
          <p>
            {body}
          </p>
        </div>
      )}
    </>
    
  )
}
