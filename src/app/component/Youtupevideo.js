// "use client";

// import { Box, Container, Button } from "@mui/material";
// import { useRef, useState, useEffect } from "react";

// export default function LocalVideo() {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showPause, setShowPause] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const handlePlay = () => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(console.error);
//       setIsPlaying(true);
//     }
//   };

//   const handlePause = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//       setShowPause(false);
//     }
//   };

//   const handleFullscreen = () => {
//     if (videoRef.current) {
//       if (!isFullscreen) {
//         if (videoRef.current.requestFullscreen) {
//           videoRef.current.requestFullscreen();
//         } else if (videoRef.current.webkitRequestFullscreen) {
//           videoRef.current.webkitRequestFullscreen();
//         } else if (videoRef.current.msRequestFullscreen) {
//           videoRef.current.msRequestFullscreen();
//         }
//       } else {
//         if (document.exitFullscreen) {
//           document.exitFullscreen();
//         } else if (document.webkitExitFullscreen) {
//           document.webkitExitFullscreen();
//         } else if (document.msExitFullscreen) {
//           document.msExitFullscreen();
//         }
//       }
//     }
//   };

//   // Listen for fullscreen changes
//   useEffect(() => {
//     const handleFsChange = () => {
//       const isFs =
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.msFullscreenElement;
//       setIsFullscreen(!!isFs);
//     };

//     document.addEventListener("fullscreenchange", handleFsChange);
//     document.addEventListener("webkitfullscreenchange", handleFsChange);
//     document.addEventListener("msfullscreenchange", handleFsChange);

//     return () => {
//       document.removeEventListener("fullscreenchange", handleFsChange);
//       document.removeEventListener("webkitfullscreenchange", handleFsChange);
//       document.removeEventListener("msfullscreenchange", handleFsChange);
//     };
//   }, []);

  
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       video::-webkit-media-controls {
//         display: none !important;
//       }
//       video::-webkit-media-controls-enclosure {
//         display: none !important;
//       }
//       video::-webkit-media-controls-panel {
//         display: none !important;
//       }
//       video::-webkit-media-controls-play-button {
//         display: none !important;
//       }
//       video::-webkit-media-controls-timeline {
//         display: none !important;
//       }
//       video::-webkit-media-controls-current-time-display {
//         display: none !important;
//       }
//       video::-webkit-media-controls-time-remaining-display {
//         display: none !important;
//       }
//       video::-webkit-media-controls-timeline-container {
//         display: none !important;
//       }
//       video::-webkit-media-controls-volume-slider {
//         display: none !important;
//       }
//       video::-webkit-media-controls-mute-button {
//         display: none !important;
//       }
//       video::-webkit-media-controls-fullscreen-button {
//         display: none !important;
//       }
//     `;
//     document.head.appendChild(style);
    
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   return (
//     <Container
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         position: "relative",
//       }}
//     >
//       <Box
//         sx={{
//           position: "relative",
//           width: "100%",
//           overflow: "hidden",
//         }}

//         onMouseEnter={() => setShowPause(true)}
//         onMouseLeave={() => setShowPause(false)}
//       >
//         <video
//           ref={videoRef}
//           src="/video.mp4"
//           preload="auto"
//           controls={false}
//           playsInline
//           loop
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: isFullscreen ? "contain" : "cover",
//             cursor: "pointer",
//           }}
//           onClick={isPlaying ? handlePause : handlePlay}
//         />

//         {!isPlaying && (
//           <Button
//             variant="contained"
//             onClick={handlePlay}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               zIndex: 10,
//               borderRadius: "50%",
//               width: 60,
//               height: 60,
//               minWidth: 0,
//               backgroundColor: "rgba(255, 0, 0, 0.7)",
//               color: "white",
//               "&:hover": {
//                 backgroundColor: "rgba(255, 0, 0, 0.9)",
//               },
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "1.5rem",
//               padding: 0,
//             }}
//           >
//             ▶
//           </Button>
//         )}

//         {isPlaying && showPause && (
//           <Button
//             variant="contained"
//             color="info"
//             onClick={handlePause}
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               zIndex: 10,
//               borderRadius: "50%",
//               width: 60,
//               height: 60,
//               minWidth: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               color: "white",
//               "&:hover": {
//                 backgroundColor: "rgba(0, 0, 0, 0.7)",
//               },
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontSize: "1.5rem",
//             }}
//           >
//             ❚❚
//           </Button>
//         )}

//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={handleFullscreen}
//           sx={{
//             position: "absolute",
//             bottom: "20px",
//             right: "20px",
//             zIndex: 10,
//             borderRadius: 2,
//             px: 2,
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "rgba(0, 0, 0, 0.7)",
//             },
//           }}
//         >
//           {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//         </Button>
//       </Box>
//     </Container>
//   );
// }
"use client";

import { Box, Container, Button } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

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
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          videoRef.current.msRequestFullscreen();
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
    }
  };

  // Listen for fullscreen changes
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

  
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      video::-webkit-media-controls {
        display: none !important;
      }
      video::-webkit-media-controls-enclosure {
        display: none !important;
      }
      video::-webkit-media-controls-panel {
        display: none !important;
      }
      video::-webkit-media-controls-play-button {
        display: none !important;
      }
      video::-webkit-media-controls-timeline {
        display: none !important;
      }
      video::-webkit-media-controls-current-time-display {
        display: none !important;
      }
      video::-webkit-media-controls-time-remaining-display {
        display: none !important;
      }
      video::-webkit-media-controls-timeline-container {
        display: none !important;
      }
      video::-webkit-media-controls-volume-slider {
        display: none !important;
      }
      video::-webkit-media-controls-mute-button {
        display: none !important;
      }
      video::-webkit-media-controls-fullscreen-button {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
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
            cursor: "pointer",
          }}
          onClick={isPlaying ? handlePause : handlePlay}
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
              backgroundColor: "rgba(255, 0, 0, 0.7)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.9)",
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
              borderRadius: "50%",
              width: 60,
              height: 60,
              minWidth: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
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

        <Button
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
            <FullscreenExitIcon sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
          ) : (
            <FullscreenIcon sx={{ fontSize: { xs: "1rem", sm: "1.5rem" } }} />
          )}
        </Button>
      </Box>
    </Container>
  );
}