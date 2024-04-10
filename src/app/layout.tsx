import { Providers } from "./providers";
import "@/app/globals.css";
export const metadata = {
  title: "/BRIDGE",
};
import { NavBar } from "../components/NavBar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Providers>
          <NavBar />

          {children}
        </Providers>
      </body>
    </html>
  );
}
