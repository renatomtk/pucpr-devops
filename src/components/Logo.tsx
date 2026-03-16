const Logo = () => (
  <div className="flex items-center gap-3">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="16" height="16" rx="3" className="stroke-primary" strokeWidth="2" fill="none" />
      <rect x="10" y="6" width="16" height="16" rx="3" className="fill-primary/20 stroke-primary" strokeWidth="2" />
    </svg>
    <span className="text-sm font-semibold tracking-tight text-foreground">API Playground</span>
  </div>
);

export default Logo;
