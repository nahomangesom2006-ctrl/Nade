import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, MailOpen, Clock, Volume2, VolumeX, Flower2 } from 'lucide-react';
import ReactPlayerImport from 'react-player';
const ReactPlayer = ReactPlayerImport as any;

const LETTER_TEXT = `I’m not even gonna lie, you’ve been different to me from the start.

You’ve been my crush since grade 8, and somehow now I got you… that still feels crazy to me.

I really appreciate you — not just how you look, but how you move, how you think, how you make me feel when we talk.

You got this energy that just pulls me in, and I can’t fake that.

I’m grateful for you, for real.

Having you in my life means more than I say sometimes, but just know it’s real with me. I got you, always.

You make things feel easy, natural. I don’t feel like I gotta force anything with you or pretend to be someone else… and that means a lot to me.

You bring a different kind of peace and excitement at the same time — not everyone can do that.

I’m genuinely grateful for you.

I respect you, I value you… and I’m glad it’s you.

And I’m not even gonna lie…  
the way you got me feeling sometimes? yeah… you’re dangerous like that.

I know I’m not the best at writing… but I mean all of this.

And yeah… I love you. ❤️`;

const LilyIcon = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M12 22C12 22 12 18 10 14C8 10 2 10 2 10C2 10 8 10 10 6C10.5 5 10.5 2 12 2C13.5 2 13.5 5 14 6C16 10 22 10 22 10C22 10 16 10 14 14C12 18 12 22 12 22Z" 
      fill="currentColor"
    />
    <circle cx="12" cy="10" r="1.5" fill="white" fillOpacity="0.5" />
  </svg>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isTyping && displayedText.length < LETTER_TEXT.length) {
      setIsTyping(true);
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(LETTER_TEXT.slice(0, i + 1));
        i++;
        if (i >= LETTER_TEXT.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 35);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedText]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[var(--bg-dark)] pattern-bg">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Lilies */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`lily-${i}`}
            className="absolute text-white/10"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "110%",
              scale: Math.random() * 0.8 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: "-15%",
              rotate: 360 + Math.random() * 180,
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            <LilyIcon size={60} />
          </motion.div>
        ))}

        {/* Falling Red Petals */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute text-red-600/20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "-10%",
              rotate: 0 
            }}
            animate={{ 
              y: "110%",
              x: (Math.random() * 100 + (Math.sin(i) * 10)) + "%",
              rotate: 720
            }}
            transition={{ 
              duration: Math.random() * 8 + 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          >
            <Heart size={20} fill="currentColor" className="rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Music Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: hasInteracted ? 1 : 0 }}
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-6 right-6 z-50 p-3 bg-black/40 backdrop-blur-xl rounded-full shadow-2xl text-[var(--accent-red)] hover:bg-black/60 transition-all border border-red-900/30"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
      </motion.button>

      {/* Hidden Audio Player */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-[0.02]">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=0yW7w8F2TVA"
          playing={isOpen && !isMuted}
          muted={false}
          loop={true}
          volume={0.8}
          width="1px"
          height="1px"
          config={{
            youtube: {
              playerVars: { 
                autoplay: 1, 
                controls: 0, 
                modestbranding: 1, 
                rel: 0 
              }
            }
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "brightness(2) blur(20px)" }}
            className="z-10 text-center"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black/40 backdrop-blur-2xl p-16 rounded-[60px] shadow-[0_0_100px_rgba(225,29,72,0.1)] cursor-pointer border border-white/5 flex flex-col items-center gap-8 relative group overflow-hidden"
              onClick={handleOpen}
            >
              {/* Internal glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 p-4 rounded-full text-white shadow-[0_0_30px_rgba(225,29,72,0.5)]">
                <LilyIcon size={32} />
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl text-white font-bold tracking-tighter">
                For <span className="text-red-500 italic">Ephrata</span>
              </h1>
              
              <div className="flex flex-col items-center gap-4">
                <p className="text-gray-500 font-display tracking-[0.3em] uppercase text-xs">
                  A midnight message
                </p>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="p-4 rounded-full bg-white/5 border border-white/10"
                >
                  <MailOpen size={30} className="text-red-500" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            className="w-full max-w-2xl bg-[#0d0d0d] rounded-3xl shadow-[0_0_100px_rgba(0,0,0,1)] p-8 md:p-16 border border-white/5 relative"
          >
            {/* Elegant corner details */}
            <div className="absolute top-4 left-4 text-red-900/40"><LilyIcon size={40} /></div>
            <div className="absolute bottom-4 right-4 text-red-900/40 rotate-180"><LilyIcon size={40} /></div>

            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3 text-red-500/60 text-xs font-display uppercase tracking-[0.4em]">
                <Flower2 size={16} />
                <span>Eternal Grace</span>
              </div>
              <Sparkles className="text-red-500/40 animate-pulse" size={24} />
            </div>

            <div 
              ref={scrollRef}
              className="font-fancy text-3xl md:text-5xl leading-[1.4] text-red-600 whitespace-pre-wrap max-h-[60vh] overflow-y-auto pr-6 scrollbar-hide selection:bg-red-900/30"
              style={{ textShadow: '0 0 20px rgba(225,29,72,0.2)' }}
            >
              {displayedText}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-10 bg-red-700 ml-2"
                />
              )}
            </div>

            {displayedText.length === LETTER_TEXT.length && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-16 pt-12 border-t border-white/5 flex flex-col items-center gap-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart fill="#e11d48" className="text-red-600 scale-[2]" />
                </motion.div>
                
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setDisplayedText("");
                  }}
                  className="text-gray-600 hover:text-red-500 transition-all font-display text-[10px] tracking-[0.5em] uppercase"
                >
                  Close & Reflect
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute bottom-6 text-white/10 text-[9px] tracking-[1em] uppercase font-display">
        Whispers of the Heart
      </footer>
    </div>
  );
}
