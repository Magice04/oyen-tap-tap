import { Link } from "react-router-dom"

const variants = {
  orange: "bg-paw text-white shadow-card hover:bg-orange-600",
  blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  mint: "bg-green-100 text-green-700 hover:bg-green-200",
  purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
  danger: "bg-red-500 text-white shadow-card hover:bg-red-600",
  ghost: "bg-white text-stone-700 border border-orange-100 hover:bg-orange-50",
}

export default function ActionButton({ to, children, variant = "orange", className = "", ...props }) {
  const classes = `paw-button ${variants[variant] || variants.orange} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
