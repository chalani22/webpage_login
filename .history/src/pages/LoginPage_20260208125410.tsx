import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
// import { signInWithGoogle } from "../firebase/auth"; // (use this when you plug firebase)

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const fieldSx = useMemo(
    () => ({
      "& .MuiOutlinedInput-root": {
        borderRadius: 999,
        height: 46,
        backgroundColor: "transparent",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D6D6D6",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#BDBDBD",
      },
      "& .MuiInputBase-input": {
        fontSize: 14,
      },
    }),
    []
  );

  const onSubmit = async (data: FormValues) => {
    // No backend login needed. Just show that validation works.
    console.log("login form data:", data);
  };

  const handleGoogle = async () => {
    // When you connect Firebase:
    // const { googleAccessToken } = await signInWithGoogle();
    // sessionStorage.setItem("accessToken", googleAccessToken);
    // navigate("/token");

    // Temporary (so UI flow works even before firebase):
    sessionStorage.setItem("accessToken", "DEMO_ACCESS_TOKEN");
    navigate("/token");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 1180,
          borderRadius: 6,
          overflow: "hidden",
          border: "1px solid #F0F0F0",
        }}
      >
        <Grid container>
          {/* LEFT: FORM */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              px: { xs: 3, sm: 6 },
              py: { xs: 4, sm: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box sx={{ maxWidth: 420, mx: "auto", width: "100%" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 34, sm: 40 },
                  lineHeight: 1.1,
                  letterSpacing: -0.5,
                  mb: 1,
                }}
              >
                Welcome back!
              </Typography>

              <Typography
                sx={{
                  color: "#7A7A7A",
                  fontSize: 13,
                  lineHeight: 1.6,
                  mb: 3.5,
                }}
              >
                Simplify your workflow and boost your productivity
                <br />
                with Tuga&apos;s App. Get started for free.
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  placeholder="Username"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={fieldSx}
                />

                <Box sx={{ height: 14 }} />

                <TextField
                  fullWidth
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={fieldSx}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword((s) => !s)}
                        sx={{ color: "#9A9A9A" }}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        ) : (
                          <VisibilityOutlinedIcon fontSize="small" />
                        )}
                      </IconButton>
                    ),
                  }}
                />

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                  <Link
                    href="#"
                    underline="none"
                    sx={{ fontSize: 12, color: "#7A7A7A" }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    mt: 2.2,
                    height: 48,
                    borderRadius: 999,
                    backgroundColor: "#0B0B0B",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#000000" },
                  }}
                >
                  Login
                </Button>

                <Box sx={{ mt: 3 }}>
                  <Divider
                    sx={{
                      "&::before, &::after": { borderColor: "#E6E6E6" },
                    }}
                  >
                    <Typography sx={{ fontSize: 12, color: "#8A8A8A", px: 1 }}>
                      or continue with
                    </Typography>
                  </Divider>
                </Box>

                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2.5 }}>
                  <IconButton
                    onClick={handleGoogle}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "#0B0B0B",
                      color: "#FFFFFF",
                      "&:hover": { backgroundColor: "#000000" },
                    }}
                  >
                    <GoogleIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "#0B0B0B",
                      color: "#FFFFFF",
                      "&:hover": { backgroundColor: "#000000" },
                    }}
                  >
                    <AppleIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "#0B0B0B",
                      color: "#FFFFFF",
                      "&:hover": { backgroundColor: "#000000" },
                    }}
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Typography
                  sx={{
                    mt: 4,
                    fontSize: 12.5,
                    color: "#7A7A7A",
                    textAlign: "center",
                  }}
                >
                  Not a member?{" "}
                  <Link href="#" underline="none" sx={{ color: "#4EA36A", fontWeight: 700 }}>
                    Register now
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT: ILLUSTRATION PANEL */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              backgroundColor: "#F4F8F0",
              px: { xs: 3, sm: 6 },
              py: { xs: 4, sm: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: isMdUp ? 650 : 420,
              position: "relative",
            }}
          >
            {/* Replace this with your own image in /public or src/assets */}
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1520975958225-5b6f4f8f7f1b?auto=format&fit=crop&w=900&q=80"
              alt="illustration"
              sx={{
                width: { xs: "100%", sm: "78%" },
                maxWidth: 520,
                borderRadius: 6,
                objectFit: "cover",
                opacity: 0.9,
                mb: 3,
              }}
            />

            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: 16, sm: 18 },
                color: "#1E1E1E",
                maxWidth: 420,
                lineHeight: 1.5,
              }}
            >
              Make your work easier and organized <br />
              with <Box component="span" sx={{ fontWeight: 800 }}>Tuga&apos;s App</Box>
            </Typography>

            {/* Carousel dots */}
            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: 999, backgroundColor: "#D8D8D8" }} />
              <Box sx={{ width: 18, height: 6, borderRadius: 999, backgroundColor: "#0B0B0B" }} />
              <Box sx={{ width: 6, height: 6, borderRadius: 999, backgroundColor: "#D8D8D8" }} />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
