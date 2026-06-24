import BottomNav from "./BottomNav"

export function PhoneLayout({ children, showNav = true }) {
  return (
    <main className="phone-frame">
      {children}
      {showNav ? <BottomNav /> : null}
    </main>
  )
}

export function OwnerLayout({ children }) {
  return (
    <main className="owner-frame">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  )
}
