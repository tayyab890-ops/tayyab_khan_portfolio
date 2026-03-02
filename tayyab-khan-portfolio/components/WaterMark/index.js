import React, { useEffect } from 'react'

const consoleMyName = () => {
    console.log(`
  ╔════════════════════════════════════════╗
  ║   Tayyab Khan                          ║
  ║   Full Stack Developer                 ║
  ║   Next.js & PostgreSQL                 ║
  ║   © 2026 All Rights Reserved           ║
  ╚════════════════════════════════════════╝
  `)
  }

const WaterMark = () => {
    useEffect(consoleMyName, [])
    return <></>
}

export default React.memo(WaterMark)
