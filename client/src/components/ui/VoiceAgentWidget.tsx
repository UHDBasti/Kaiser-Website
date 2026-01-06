import { useEffect, useRef } from "react";

export function VoiceAgentWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!document.querySelector('script[src*="elevenlabs/convai-widget"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }

    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", "agent_2301kbv0mxnqfr3vhzzw6n2p0abh");
    containerRef.current.appendChild(widget);

    return () => {
      if (containerRef.current && widget.parentNode === containerRef.current) {
        containerRef.current.removeChild(widget);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed bottom-6 left-6 z-50" />;
}
