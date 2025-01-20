import clsx from 'clsx';

interface IAuthImagePattern {
  title: string;
  subtitle: string;
}

export const AuthImagePattern = ({ title, subtitle }: IAuthImagePattern) => {
  return (
    <div className="flex items-center justify-center bg-base-200 p-12 pt-20">
      <div className="max-w-md text-center">
        <div className="mb-4 grid grid-cols-3 gap-3">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={clsx('aspect-square rounded-2xl bg-primary/10', {
                'animate-pulse': i % 2 === 0,
              })}
            />
          ))}
        </div>
        <h2 className="mb-2 text-2xl font-bold">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};
