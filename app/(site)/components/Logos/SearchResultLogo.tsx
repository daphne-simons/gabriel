interface Props {
  logoColor: string
}

export default function SearchResultLogo({ logoColor }: Props) {
  return (
    <h1 className={`font-gramercy`}>
      <span
        className={`absolute mx-auto flex blur ${logoColor} bg-clip-text text-3xl box-content text-transparent text-center select-none`}
      >
        Gabriel
      </span>
      <span
        className={`relative top-0 justify-center flex items-center ${logoColor} bg-clip-text text-3xl text-transparent text-center select-auto my-variable-text`}
      >
        Gabriel
      </span>
    </h1>
  )
}
