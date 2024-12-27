import Image from 'next/image'

interface Props {
  handleClickSelection: (index: number) => void
}
export default function SelectedProject({ handleClickSelection }: Props) {
  return (
    <div className="h-[600px] rounded-xl text-white bg-[#171717] flex flex-col">
      <section className="flex flex-row justify-end gap-4 py-4 px-6">
        {/* Left Arrow button */}
        <button className="text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="#BDC1C5"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </button>
        {/* Right Arrow button */}
        <button className="text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="#BDC1C5"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </button>
        {/* Close button  */}
        <button onClick={() => handleClickSelection(0)} className=" text-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#BDC1C5"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </section>
      {/* Button closes selection - back to showing all works */}
      <section className="flex bg-black h-full">
        <div className="w-full h-full relative ">
          {/* TODO: Make this img dynamic and filtered. If user clicks arrow, show the next project */}
          <Image
            src="/uncomfortable-silence.png"
            // src="/outcome-uncertain.png"
            alt="book"
            layout="fill"
            objectFit="contain"
          />
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
          <button className="bg-[#8AB4F7] flex flex-row items-center rounded-full text-[#303134] text-sm px-3 py-2">
            <p className="px-2 ">Visit</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="#303134"
            >
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  )
}
