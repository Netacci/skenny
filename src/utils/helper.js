export const formatDate = (date)=> {
  const d = new Date(date)
  const options = {
    year: 'numeric',
    month: 'short', // "Apr"
    day: 'numeric', // "8"
  }
  return d.toLocaleDateString('en-US', options)
}