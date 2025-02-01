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
        hoverSearchBg: string
      }
    | undefined
  children: React.ReactNode
}) {
  if (!theme) {
    return null
  }
  return (
    <>
      {/* OLD DYNAMIC MOON BG COLOR and BG IMG */}
      {/* <div
        className={`${theme.bgColor} fill-current ${theme.textColor} ${theme.btnSearchBg}`}
      >
        <div className={`bg-cover ${theme.bgImg}`}>{children}</div>
      </div> */}
      {/* NEW - ROCK SAMPLE BG */}
      <div>
        <div className={`fill-current ${theme.textColor} ${theme.btnSearchBg}`}>
          <div className={`bg-cover bg-rock-2 animate-focus`}>{children}</div>
        </div>
      </div>
    </>
  )
}
