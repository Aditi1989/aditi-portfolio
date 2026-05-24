"use client"

const socials = [
  { icon: "fas fa-envelope", href: "https://mail.google.com/mail/?view=cm&fs=1&to=01aditimukherjee@gmail.com", label: "Email" },
  { icon: "fas fa-phone", href: "tel:+917091622071", label: "Phone" },
  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/aditi-mukherjee", label: "LinkedIn" },
  { icon: "fab fa-github", href: "https://github.com/Aditi1989", label: "GitHub" },
  { icon: "fab fa-instagram", href: "https://www.instagram.com/_aditi._.ie/", label: "Instagram" },
]

export default function Footer() {
  return (
    <footer className="py-10 sm:py-12 text-center border-t border-white/30 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex gap-4 justify-center mb-5 flex-wrap">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel={s.label === "Email" ? "noopener noreferrer" : "noopener"}
              aria-label={s.label}
              className="w-11 h-11 rounded-full border border-zinc-300 dark:border-white/[0.06] flex items-center justify-center text-base text-zinc-500 dark:text-[#a0a0b8] hover:text-[#7c73ff] dark:hover:text-[#8b83ff] hover:border-[#7c73ff] dark:hover:border-[#8b83ff] hover:-translate-y-1 hover:shadow-[0_0_15px_var(--primary-glow)] transition-all wiggle-hover"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
        <p className="text-sm text-zinc-500 dark:text-[#a0a0b8]">
          &copy; {new Date().getFullYear()} Aditi Mukherjee. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
