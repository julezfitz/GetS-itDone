export const introAnimation = (timeline, marqueeRefs) => {
  timeline.to(marqueeRefs, {
    y: 0,
    opacity: 1,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
  })
}