import { NavBar } from './_components/navbar';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <main className='container mx-auto px-4 md:px-6 lg:px-8'>{children}</main>
    </div>
  );
}
