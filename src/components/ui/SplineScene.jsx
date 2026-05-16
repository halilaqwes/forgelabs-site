'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export function SplineScene({ scene, className }) {
  return (
    <Suspense 
      fallback={
        <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif'}}>Yükleniyor...</span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        style={{width: '100%', height: '100%'}}
      />
    </Suspense>
  )
}
