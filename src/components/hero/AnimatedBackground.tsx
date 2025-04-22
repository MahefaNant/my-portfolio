"use client";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M20,20c0,0,30,40,60,10s20,-50,5,-55s-35,15,-50,25S20,20,20,20z"
          fill="hsla(260, 90%, 60%, 0.15)"
          filter="blur(10px)"
          className="dark:opacity-100 opacity-90"
        />
        
        <path
          d="M50,60c0,0,20,20,40,-5s5,-40,-15,-30s-25,25,-30,35S50,60,50,60z"
          fill="hsla(190, 100%, 50%, 0.12)"
          filter="blur(8px)"
          className="dark:opacity-100 opacity-80"
        />
        
        <path
          d="M70,30c0,0,15,30,25,5s-10,-35,-25,-20S70,30,70,30z"
          fill="hsla(330, 100%, 60%, 0.1)"
          filter="blur(6px)"
          className="dark:opacity-100 opacity-70"
        />
      </svg>

      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => {
          const size = Math.random() > 0.9 ? 2 : 1;
          const isColored = Math.random() > 0.5;
          const color = isColored 
            ? `hsl(${Math.random() * 60 + 200}, 100%, 50%)` 
            : "currentColor";
            
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: color,
                opacity: isColored ? 0.8 : 0.5,
                color: "var(--text-primary)"
              }}
            />
          );
        })}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent dark:via-black/5" />
    </div>
  );
}