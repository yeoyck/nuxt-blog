export default function () {
  const breakpoint = useBreakpoints({
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  })
  const windowSize = useWindowSize()
  return { breakpoint, windowSize }
}