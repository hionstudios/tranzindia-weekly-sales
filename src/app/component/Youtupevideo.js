"use client";

import { Box, Container, Button } from "@mui/material";
import { useRef, useState, useEffect } from "react";

export default function LocalVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPause(false);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFsChange = () => {
      const isFs =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;

      setIsFullscreen(!!isFs);
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    document.addEventListener("webkitfullscreenchange", handleFsChange);
    document.addEventListener("msfullscreenchange", handleFsChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      document.removeEventListener("webkitfullscreenchange", handleFsChange);
      document.removeEventListener("msfullscreenchange", handleFsChange);
    };
  }, []);

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
        onMouseEnter={() => setShowPause(true)}
        onMouseLeave={() => setShowPause(false)}
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
            objectFit: isFullscreen ? "contain" : "cover",
            backgroundColor: "black", // so black bars show
          }}
        />
        {!isPlaying && (
          <Button
            variant="contained"
            onClick={handlePlay}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              borderRadius: "50%",
              width: 60,
              height: 60,
              minWidth: 0,
              backgroundColor: "rgba(255, 0, 0, 0.7)", // Semi-transparent red
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.9)", // More opaque red on hover
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              padding: 0,
            }}
          >
            ▶
          </Button>
        )}
        {isPlaying && showPause && (
          <Button
            variant="contained"
            color="info"
            onClick={handlePause}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              borderRadius: "50%", // Makes it circular
              width: 60, // Fixed width
              height: 60, // Fixed height
              minWidth: 0, // Override default minimum width
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker on hover
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            ❚❚
          </Button>
        )}

        {isPlaying && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleFullscreen}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
              borderRadius: 2,
              px: 2,
            }}
          >
            ⛶
          </Button>
        )}
      </Box>
    </Container>
  );
}
