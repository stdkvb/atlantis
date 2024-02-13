import { Header } from '../components/Header';
import { CookieConsent } from '../components/CookieConsent';
import RoiStatScript from '../components/RoiStatScript';
import SectionProvider from '../components/SectionProvider';

import './globals.scss';

export const metadata = {
  title: 'Атлантис',
  description: 'Гармония жизни у воды',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ru'>
      <body>
        <SectionProvider>
          <Header />
          <main>{children}</main>
        </SectionProvider>
        <RoiStatScript />
      </body>
      <CookieConsent />
    </html>
  );
}
