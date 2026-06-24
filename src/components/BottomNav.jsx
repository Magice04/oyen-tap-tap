import { NavLink } from "react-router-dom"

const items = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/owner/cats", label: "Cats", icon: "🐾" },
  { to: "/owner/reports", label: "Reports", icon: "📋" },
  { to: "/owner/journal", label: "Journal", icon: "📘" },
  { to: "/catgram", label: "Catgram", icon: "💜" },
]

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-[430px] border-t border-orange-100 bg-white/95 px-3 py-2 shadow-soft backdrop-blur">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-2xl px-2 py-2 text-center text-[11px] font-semibold transition ${
                isActive ? "bg-orange-100 text-paw" : "text-stone-500 hover:bg-orange-50"
              }`
            }
          >
            <span className="block text-base leading-none">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
