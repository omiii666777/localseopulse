import './globals.css';

export const metadata = {
  title: 'LocalSeoPulse - Local SEO SaaS Platform',
  description: 'Locked tenant dashboards, automated audits, and local rank tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#090A0F] text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
