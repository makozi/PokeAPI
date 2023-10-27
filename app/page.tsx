import Hero from '@/components/Hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pokemon App',
  description: 'Pokemon App using Poke API',
  // other metadata
};

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
