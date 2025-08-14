import './globals.css'

export const metadata = {
  title: 'Azadi Ke Asli Hero - Discover Forgotten Freedom Fighters',
  description: 'AI-powered app to discover India\'s forgotten freedom fighters',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}