'use client'

export default function BackGround({
  theme,
  children,
}: {
  theme:
    | {
        id: number
        bgColor: string
        bgImg: string
        textColor: string
        outlineColor: string
        btnSearchBg: string
      }
    | undefined
  children: React.ReactNode
}) {
  if (!theme) {
    return null
  }
  return (
    <>
      <div
        className={`${theme.bgColor} fill-current ${theme.textColor} ${theme.btnSearchBg}`}
      >
        <div className={`bg-cover ${theme.bgImg}`}>{children}</div>
      </div>
    </>
  )
}
