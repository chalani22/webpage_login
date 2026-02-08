import React, { useMemo, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TokenPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const token = useMemo(() => {
    return sessionStorage.getItem("accessToken") || "";
  }, []);

  const displayToken = token || "No token found. Please login with Google again.";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundColor: "#FAFAFA",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 900,
          borderRadius: 4,
          border: "1px solid #EDEDED",
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 20, mb: 2 }}>
          User Access Token
        </Typography>

        <Box
          component="pre"
          sx={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            m: 0,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            border: "1px solid #EDEDED",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          {displayToken}
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate("/")} sx={{ textTransform: "none" }}>
            Back to Login
          </Button>

          <Button
            variant="outlined"
            onClick={handleCopy}
            disabled={!token}
            sx={{ textTransform: "none" }}
          >
            {copied ? "Copied!" : "Copy Token"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
