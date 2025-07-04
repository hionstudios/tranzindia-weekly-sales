"use client";

import { Box, Container } from "@mui/material";
import YouTube from "react-youtube";

export default function Youtupevideo() {
  return (
    <>
      <Container>
        <Box height="calc(100vh - 90px)" alignContent="center" pt={5}>
          <Box textAlign="center" display={{ xs: "none", md: "block" }}>
            <YouTube
              loading="eager"
              videoId="tjXsBWNJlYU"
              id="ytplayer"
              opts={{
                width: "100%",
                height: "600px",
                playerVars: {
                  autoplay: true,
                  modestbranding: 1,
                  controls: 0,
                  enablejsapi: 1,
                  rel: 0,
                },
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>{" "}
          <Box textAlign="center" display={{ xs: "block", md: "none" }}>
            <YouTube
              loading="eager"
              videoId="tjXsBWNJlYU"
              id="ytplayer"
              opts={{
                width: "100%",
                height: "400px",
                playerVars: {
                  autoplay: true,
                  modestbranding: 1,
                  controls: 0,
                  enablejsapi: 1,
                  rel: 0,
                },
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

//https://youtu.be/tjXsBWNJlYU
