import { Cancel, UploadFile } from "@mui/icons-material";
import { Box, CircularProgress, Container, IconButton } from "@mui/material";
import React, { useId, useState } from "react";

type Props = {};

export default function UploadM({}: Props) {
  const [loading, setLoading] = useState(false);
  const id = useId();
  return (
    <Container>
      <Box>
        <label htmlFor={id}></label>
        {loading && (
          <Box>
            <CircularProgress />
            <Box>
              <IconButton>
                <Cancel />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}
