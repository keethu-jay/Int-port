import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

export interface MouseState {
  x: number
  y: number
  normX: number
  normY: number
}

const defaultMouse: MouseState = { x: 0, y: 0, normX: 0, normY: 0 }

const MouseContext = createContext<{
  mouse: MouseState
  mouseRef: React.MutableRefObject<{ x: number; y: number; normX: number; normY: number }>
}>({
  mouse: defaultMouse,
  mouseRef: { current: { x: 0, y: 0, normX: 0, normY: 0 } },
})

export function MouseProvider({ children }: { children: ReactNode }) {
  const [mouse, setMouse] = useState<MouseState>(defaultMouse)
  const mouseRef = useRef({ x: 0, y: 0, normX: 0, normY: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = 1 - (e.clientY / window.innerHeight) * 2
      mouseRef.current = { x: e.clientX, y: e.clientY, normX, normY }
      setMouse({ x: e.clientX, y: e.clientY, normX, normY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return <MouseContext.Provider value={{ mouse, mouseRef }}>{children}</MouseContext.Provider>
}

export function useMouse() {
  return useContext(MouseContext)
}
