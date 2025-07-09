"use client";

import { Box, Container, Button } from "@mui/material";
import { useRef, useState } from "react";

export default function LocalVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Play error:", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src="/video.mp4"
          preload="auto"
          controls={false}
          playsInline
          loop
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {!isPlaying && (
          <Button
            variant="contained"
            color="error"
            onClick={handlePlay}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              borderRadius: 2,
              px: 2,
            }}
          >
            ▶
          </Button>
        )}
      </Box>
    </Container>
  );
}
