import { useTheme } from './components/ThemeProvider';
import { Button } from './components/Button';

export default function App() {
  const { setTheme } = useTheme();
  return (
    <main>
      <nav className='h-15 flex items-center border-b bg-default border-default'></nav>
      <div className='max-w-7xl   mx-auto px-4 sm:px-6 pt-8'>
        <div className='flex  items-center gap-2'>
          <Button onClick={() => setTheme('dark-theme')}>Primay</Button>
          <Button variant='secondary' onClick={() => setTheme('light')}>
            Secondary
          </Button>
          <Button variant='success' onClick={() => setTheme('dark-theme')}>
            Success
          </Button>
          <Button variant='danger' onClick={() => setTheme('light')}>
            Danger
          </Button>
        </div>
      </div>
    </main>
  );
}
