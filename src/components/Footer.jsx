export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-charcoal/60 md:flex-row">
        <p className="font-display text-base text-ink">Rhythm</p>
        <p>Small routines, kept daily, become a healthier life.</p>
        <p>&copy; {new Date().getFullYear()} Rhythm. Built with React &amp; Supabase.</p>
      </div>
    </footer>
  )
}
