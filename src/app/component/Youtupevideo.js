"use client";

import { Box, Container } from "@mui/material";
import YouTube from "react-youtube";

export default function Youtupevideo() {
  return (
    <>
      <Container>
        <Box height="calc(100vh - 92px)" alignContent="center">
          <Box textAlign="center">
            <YouTube
              loading="eager"
              videoId="tjXsBWNJlYU"
              id="ytplayer"
              opts={{
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
