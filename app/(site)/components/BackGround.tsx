'use client'

export default function BackGround({
  theme,
  children,
}: {
  theme:
  | {
    bgColor: string
    bgImg: string
    textColor: string
    outlineColor: string
    btnSearchBg: string
    hoverSearchBg: string
    logoColor: string
  },
  children: React.ReactNode
}) {

  return (
    <>
      {/* Rock slice BG with blur/focus animation */}
      <div className="relative overflow-hidden min-h-screen">
        <div
          className={`fixed -inset-16 bg-cover bg-center ${theme.bgImg} animate-focus`}
          style={{
            zIndex: -1,
            transform: 'scale(1.1)', // Extra scale for blur coverage
            filter: 'blur(0px)', // Ensure blur starts at 0 if not set in animation
          }}
        ></div>
        <div className={`relative ${theme.textColor}`} style={{ zIndex: 10 }}>
          {children}
        </div>
      </div>
    </>
  )
}
