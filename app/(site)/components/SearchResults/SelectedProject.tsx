interface Props {
  handleClickSelection: (index: number) => void
}
export default function SelectedProject({ handleClickSelection }: Props) {
  return (
    <div className="h-full rounded-xl text-white bg-[#171717] flex flex-col">
      <section className="flex flex-row justify-end gap-4 py-4 px-6">
        <button className="text-md">{' < '}</button>
        <button className="text-md">{' > '}</button>
        <button onClick={() => handleClickSelection(0)} className=" text-md">
          X
        </button>
      </section>
      {/* Button closes selection - back to showing all works */}
      <section className="flex bg-black h-[75%]">
        <div>
          <img src="" alt="" />
        </div>
      </section>
      <section className="flex flex-row gap-4 py-4 px-6 justify-between">
        <div>
          <h2 className={`text-xl font-medium text-[#8AB4F7]`}>
            Title of the Project
          </h2>
          <p className="w-5/6 text-sm text-[#BDC1C5]">Brief Detail.</p>
        </div>
        <div className="flex items-center">
          <button className="bg-[#8AB4F7] rounded-full text-[#171717] text-sm px-4 py-2">
            Visit{' > '}
          </button>
        </div>
      </section>
    </div>
  )
}
