interface Props {
  handleClickSelection: (index: number) => void
}
export default function Gallery({ handleClickSelection }: Props) {
  return (
    <div
      id="gallery-grid"
      className="w-full h-full grid grid-cols-8 grid-rows-4 gap-1"
    >
      {/* TODO - Add Images to Gallery */}
      {/* TODO: each img should have a unique id, AND this ID is attached to a handleClick event. 
      This will trigger a state to display the image and work details */}
      {/* Gallery Item1 */}
      <div
        // Toggles to show selected work
        onClick={() => handleClickSelection(1)}
        id="1"
        className="bg-blue-200 col-span-4 row-span-4 rounded-tl-xl"
      ></div>
      {/* Gallery Item2 */}
      <div
        onClick={() => handleClickSelection(1)}
        id="2"
        className="bg-blue-300 col-span-3 row-span-2"
      ></div>
      {/* Gallery Item3 */}
      <div
        onClick={() => handleClickSelection(1)}
        id="3"
        className="bg-blue-400 col-span-1 row-span-2 rounded-tr-xl"
      ></div>
      {/* Gallery Item4 */}
      <div
        onClick={() => handleClickSelection(1)}
        id="4"
        className="bg-blue-500 col-span-2 row-span-2"
      ></div>
      {/* Gallery Item5 */}
      <div
        onClick={() => handleClickSelection(1)}
        id="5"
        className="bg-blue-600 col-span-2 row-span-2"
      ></div>
    </div>
  )
}
