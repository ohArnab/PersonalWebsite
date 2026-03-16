import { useState, useEffect } from 'react';

const cubeFrames = [
  [
    "      +------+",
    "     /|     /|",
    "    +------+ |",
    "    | |    | |",
    "    | +----|-+",
    "    |/     |/ ",
    "    +------+  ",
  ],
  [
    "     +------+ ",
    "    /|     /| ",
    "   +------+ | ",
    "   | |    | | ",
    "   | +----|-+ ",
    "   |/     |/  ",
    "   +------+   ",
  ],
  [
    "    +------+  ",
    "   /|     /|  ",
    "  +------+ |  ",
    "  | |    | |  ",
    "  | +----|-+  ",
    "  |/     |/   ",
    "  +------+    ",
  ],
  [
    "   +------+   ",
    "  /|     /|   ",
    " +------+ |   ",
    " | |    | |   ",
    " | +----|-+   ",
    " |/     |/    ",
    " +------+     ",
  ],
  [
    "    +------+  ",
    "   /|     /|  ",
    "  +------+ |  ",
    "  | |    | |  ",
    "  | +----|-+  ",
    "  |/     |/   ",
    "  +------+    ",
  ],
];

const AsciiCube = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % cubeFrames.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className="text-terminal-green crt-glow text-sm leading-tight select-none">
      {cubeFrames[frame].join('\n')}
    </pre>
  );
};

export default AsciiCube;
