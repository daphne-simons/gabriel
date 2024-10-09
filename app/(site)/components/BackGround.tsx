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
      }
    | undefined
  children: React.ReactNode
}) {
  if (theme)
    return (
      <>
        <div className={`${theme.bgColor} fill-current ${theme.textColor} `}>
          <div className={`bg-cover ${theme.bgImg}`}>{children}</div>
        </div>
      </>
    )
}
