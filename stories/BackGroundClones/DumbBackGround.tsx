interface Props {
theme : {
  phase: string
  bgValue: string,
  textValue: string,
  bgImg: string,
}
}
export default function DumbBackGround( {theme}: Props) {

    return (
      <>
        <div className={`${theme.bgValue} ${theme.textValue} h-full`}>
          <div className={`bg-cover ${theme.bgImg}`}></div>
        </div>
      </>
    )
  }

