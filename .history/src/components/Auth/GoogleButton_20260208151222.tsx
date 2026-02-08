import { IconButton } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

export default function GoogleButton({ onClick, disabled }: Props) {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label="Continue with Google"
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
  );
}
