"use client";
import { Box, Container, Button } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

export default function LocalVideo() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pauseTimeout, setPauseTimeout] = useState(null);

  const isIOS = /iPhone|iPad|iPod/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );

  const handlePlay = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handlePause = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPause(false);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    }
  };

  const handleFullscreen = async () => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    if (isIOS && video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
      return;
    }

    if (!isFullscreen) {
      try {
        if (container.requestFullscreen) {
          await container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          await container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) {
          await container.msRequestFullscreen();
        }

        if (screen.orientation?.lock) {
          await screen.orientation.lock("landscape").catch(() => {});
        }
      } catch (err) {
        console.error("Fullscreen failed:", err);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // fullscreen
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

  // Block  arrow key
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keysToBlock = [
        " ",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "k",
        "K",
        "m",
        "M",
        "f",
        "F",
      ];
      if (keysToBlock.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  //  iOS controls  romove this code
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      video::-webkit-media-controls {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  //  5 sec
  useEffect(() => {
    if (!isFullscreen || !isPlaying || isIOS) {
      if (pauseTimeout) clearTimeout(pauseTimeout);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const showAndHidePause = () => {
      setShowPause(true);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      const timeout = setTimeout(() => {
        setShowPause(false);
      }, 5000);
      setPauseTimeout(timeout);
    };

    showAndHidePause();
    container.addEventListener("mousemove", showAndHidePause);
    container.addEventListener("touchstart", showAndHidePause);

    return () => {
      container.removeEventListener("mousemove", showAndHidePause);
      container.removeEventListener("touchstart", showAndHidePause);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [isFullscreen, isPlaying]);

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
        ref={containerRef}
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
        onMouseEnter={() => {
          if (!isFullscreen) setShowPause(true);
        }}
        onMouseLeave={() => {
          if (!isFullscreen) setShowPause(false);
        }}
      >
        <video
          ref={videoRef}
          src="/video.mp4"
          preload="auto"
          controls={false}
          playsInline
          loop
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          tabIndex={0}
          style={{
            width: "100%",
            height: "100%",
            objectFit: isFullscreen ? "contain" : "cover",
            cursor: "pointer",
          }}
          onClick={isPlaying ? handlePause : handlePlay}
        />

        {!isPlaying && ( //play button
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
              backgroundColor: "rgba(255, 0, 0, 0.7)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.9)",
              },
              fontSize: "1.5rem",
            }}
          >
            ▶
          </Button>
        )}

        {isPlaying &&
          showPause && ( // pause button
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
                borderRadius: "50%",
                width: 60,
                height: 60,
                minWidth: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
                fontSize: "1.5rem",
              }}
            >
              ❚❚
            </Button>
          )}

        <Button // fullscreen button
          variant="outlined"
          color="primary"
          onClick={handleFullscreen}
          sx={{
            position: "absolute",
            bottom: { xs: "10px", sm: "20px" },
            right: { xs: "10px", sm: "20px" },
            zIndex: 10,
            borderRadius: "50%",
            width: { xs: 40, sm: 50 },
            height: { xs: 40, sm: 50 },
            minWidth: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          {isFullscreen ? (
            <FullscreenExitIcon
              sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }}
            />
          ) : (
            <FullscreenIcon sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
          )}
        </Button>
      </Box>
    </Container>
  );
}
