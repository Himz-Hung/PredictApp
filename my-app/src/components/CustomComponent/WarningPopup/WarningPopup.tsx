import { useRef, useState, useEffect } from "react";

export default function WarningPopup({ onClose }: { onClose: () => void }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const [translate, setTranslate] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (el && el.scrollHeight > el.clientHeight + 10) {
      setShowScrollHint(true);
    }
  }, []);

  const onScrollHideHint = () => {
    setShowScrollHint(false);
  };

  const startDrag = (clientX: number) => {
    dragging.current = true;
    startX.current = clientX - translate;
  };

  const moveDrag = (clientX: number) => {
    if (!dragging.current || !sliderRef.current) return;

    const sliderWidth = sliderRef.current.offsetWidth;
    const knobWidth = sliderWidth * 0.22;
    const max = sliderWidth - knobWidth;

    let next = clientX - startX.current;
    if (next < 0) next = 0;
    if (next > max) next = max;

    requestAnimationFrame(() => setTranslate(next));

    if (next >= max * 0.85) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-lg rounded-xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-center text-[#FF8C42] mb-4">
          Important Notice
        </h2>

        <div
          ref={contentRef}
          onScroll={onScrollHideHint}
          className="max-h-[70vh] overflow-y-auto pr-1 text-sm leading-relaxed text-[#333] dark:text-gray-200"
        >
          <p>
            Please note that all predictions are informational and indicative
            only. No outcome is ever guaranteed, and final decisions should be
            made at your own discretion.
          </p>

          <br />

          <p className="font-semibold">By continuing, you acknowledge that:</p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>
              Analytical insights may contain uncertainties or inaccuracies.
            </li>
            <li>
              You are solely responsible for any decisions made based on the
              information provided.
            </li>
            <li>
              Certain forms of wagering or betting may be restricted or
              prohibited in your jurisdiction.
            </li>
          </ul>

          <br />

          <p>
            If such activities are not permitted where you reside, please ensure
            you comply with all local laws.
          </p>

          <br />

          <p>Thank you for using our service responsibly.</p>
        </div>

        {showScrollHint && (
          <div className="relative mt-2">
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            <p className="text-center text-xs mt-2 text-gray-400 animate-pulse">
              ↓ Scroll to read more
            </p>
          </div>
        )}

        <div
          ref={sliderRef}
          className="mt-6 w-full h-14 rounded-full bg-gray-300 dark:bg-gray-700 relative overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-700 dark:text-gray-300 pointer-events-none">
            Slide to accept →
          </div>

          <div
            ref={knobRef}
            onPointerDown={e => startDrag(e.clientX)}
            onPointerMove={e => moveDrag(e.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            className="absolute top-1/2 
                       bg-[#FF8C42] w-[22%] h-[80%] 
                       rounded-full shadow-md flex items-center justify-center
                       text-white font-bold touch-none select-none cursor-pointer"
            style={{
              transform: `translate(${translate}px, -50%)`,
              transition: dragging.current ? "none" : "transform 0.25s ease",
            }}
          >
            ➤
          </div>
        </div>
      </div>
    </div>
  );
}
