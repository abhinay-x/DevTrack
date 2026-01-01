export const Skeleton = ({ className = '', variant = 'default' }) => {
  const base = 'animate-pulse rounded bg-theme';
  const variants = {
    default: base,
    text: `${base} h-4 w-3/4`,
    title: `${base} h-6 w-1/2`,
    card: `${base} h-32 w-full`,
    circle: `${base} h-10 w-10 rounded-full`,
    avatar: `${base} h-12 w-12 rounded-full`,
  };
  return <div className={variants[variant] || base + ' ' + className} />;
};
