import { cn } from '~/utils/';

export default function GPTIcon({
  size = 25,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  const unit = '41';
  const height = size;
  const width = size;
  return (
    <div
      style={{
        width: width,
        height: height,
        overflow: 'hidden',
      }}
      className={cn(className, '')}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Leaf_1_web.jpg/250px-Leaf_1_web.jpg"
        alt="Leaf icon"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </div>
  );
}
