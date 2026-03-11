'use client'
import { useEffect, useRef } from 'react'

export function Sparkline({ data, gain, height = 48 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !data || data.length < 2) return
    const ctx = canvas.getContext('2d')
    const w = canvas.offsetWidth
    const h = height
    canvas.width = w
    canvas.height = h

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    const pts = data.map((v, i) => ({
      x: (i / (data.length - 1)) * w,
      y: h - ((v - min) / range) * (h * 0.85) - h * 0.075,
    }))

    // Gradient fill
    const grad = ctx.createLinearGradient(0, 0, 0, h)
    const color = gain ? '0, 201, 122' : '255, 77, 106'
    grad.addColorStop(0, `rgba(${color}, 0.25)`)
    grad.addColorStop(1, `rgba(${color}, 0)`)

    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
    ctx.lineTo(pts[pts.length - 1].x, h)
    ctx.lineTo(pts[0].x, h)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.moveTo(pts[0].x, pts[0].y)
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
    ctx.strokeStyle = gain ? '#00c97a' : '#ff4d6a' // Using hex for canvas stroke
    ctx.lineWidth = 1.5
    ctx.stroke()
  }, [data, gain, height])

  return <canvas ref={canvasRef} style={{ width: '100%', height, display: 'block' }} />
}
