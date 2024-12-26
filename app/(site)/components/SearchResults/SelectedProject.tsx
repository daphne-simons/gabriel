interface Props {
  handleClickSelection: (index: number) => void
}
export default function SelectedProject({ handleClickSelection }: Props) {
  return (
    <div className="flex flex-row text-white">
      <p>Solo work</p>
      {/* Button closes selection - back to showing all works */}
      <button onClick={() => handleClickSelection(0)} className="px-4 text-md">
        X
      </button>
    </div>
  )
}
