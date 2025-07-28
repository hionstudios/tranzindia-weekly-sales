
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
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          paddingTop: "56.25%", 
          position: "relative",
        }}
      >
        <iframe
          src="https://player.vimeo.com/video/1105070124?badge=0&autopause=0&player_id=0&app_id=58479&loop=1"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          title="Tranzindia BBS"
        ></iframe>
      </Box>
    </Container>
  );
}
