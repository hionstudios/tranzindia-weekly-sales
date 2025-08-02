"use client";
import { Box, Container } from "@mui/material";
import { useEffect } from "react";

export default function LocalVideo() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container position= "relative"
    >
      <Box width="100%">
        <iframe
          src="https://player.vimeo.com/video/1106686382?&dnt=1"
          frameBorder="0"
          allow="autoplay;"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          title="Tranzindia"   
            
        ></iframe>
      </Box>
    </Container>
  );
}
