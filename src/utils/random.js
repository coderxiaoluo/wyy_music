export function randomMusic(startNumber, endNumber) {
  return Math.floor(Math.random() * (Math.max(startNumber, endNumber) - Math.min(startNumber, endNumber) + 1)) + Math.min(startNumber, endNumber)
}