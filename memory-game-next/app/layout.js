import "./globals.css";

export const metadata = {
  title: "memory",
  description: "Juego de memoria",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
