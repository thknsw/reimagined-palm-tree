declare module 'canvas-confetti' {
  interface Options {
    particleCount?: number
    angle?: number
    spread?: number
    origin?: { x?: number; y?: number }
    colors?: string[]
    scalar?: number
    drift?: number
    gravity?: number
    ticks?: number
    shapes?: Array<'square' | 'circle'>
    zIndex?: number
    disableForReducedMotion?: boolean
  }

  interface ConfettiFunction {
    (options?: Options): Promise<null>
    reset(): void
    create(canvas: HTMLCanvasElement, options?: { resize?: boolean; useWorker?: boolean }): ConfettiFunction
  }

  const confetti: ConfettiFunction
  export default confetti
}
