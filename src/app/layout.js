import './globals.css';
import { Sidebar } from '../components/ui/Sidebar';
import { TopBar } from '../components/ui/TopBar';

export const metadata = {
  title: 'Antigravity — Markets',
  description: 'Real-time stock intelligence platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-base antialiased">
        <div className="app-shell">
          <Sidebar />
          <main className="main-content">
            <TopBar />
            <div className="page-body">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
