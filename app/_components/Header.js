import Navigation from '@/app/_components/Navigation';
import Logo from '@/app/_components/Logo';

function Header() {
  return (
    <header className='border-b border-primary-900 px-8 py-5'>
      <div className='flex md:justify-between md:items-center max-w-7xl mx-auto max-sm:flex-col justify-start items-start'>
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
