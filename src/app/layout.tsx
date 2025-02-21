import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/variables.scss';
import '@/styles/mixins.scss';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* OneTrust Cookie Consent Script */}
        <Script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          charSet="UTF-8"
          data-domain-script="01943f2c-a1d3-7171-85dd-298a315038f4-test"
          strategy="afterInteractive"
        />

        {/* Inline OptanonWrapper Function */}
        <Script
          id="optanon-wrapper"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function OptanonWrapper() { }
            `,
          }}
        />
        <Header />
        {children}
        <FooterSection />
      </body>
      {process.env.NEXT_PUBLIC_ENV === 'production' && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />}
    </html>
  );
}
