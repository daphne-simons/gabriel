export default function Gallery() {
  return (
    <div
      id="gallery-grid"
      className="w-full h-full grid grid-cols-8 grid-rows-4 gap-1"
    >
      {/* TODO - Add Images to Gallery */}
      {/* Gallery Item1 */}
      <div className="bg-blue-200 col-span-4 row-span-4 rounded-tl-xl"></div>
      {/* Gallery Item2 */}
      <div className="bg-blue-300 col-span-3 row-span-2"></div>
      {/* Gallery Item3 */}
      <div className="bg-blue-400 col-span-1 row-span-2 rounded-tr-xl"></div>
      {/* Gallery Item4 */}
      <div className="bg-blue-500 col-span-2 row-span-2"></div>
      {/* Gallery Item5 */}
      <div className="bg-blue-600 col-span-2 row-span-2"></div>
    </div>
  )
}
