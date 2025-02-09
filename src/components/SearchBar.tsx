import React, { useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (event: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = React.memo(
  ({ searchQuery, setSearchQuery, handleSearch }) => {
    const handleClear = useCallback(() => {
      setSearchQuery("");
    }, [setSearchQuery]);

    return (
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <TextField
          label="Search for topic, location and more"
          variant="outlined"
          size="medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: "500px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            transition: "0.3s ease-in-out",
            "&:hover": {
              borderColor: "#fff",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchQuery && (
                  <IconButton onClick={handleClear} edge="end">
                    <CloseIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            margin: "10px",
            padding: "16px",
            textAlign: "center",
            transition: "0.5s",
            backgroundImage: "linear-gradient(90deg, #132130 0%, #303030 100%)",
            backgroundSize: "200% auto",
            color: "white",
            borderRadius: "10px",
            display: "block",
            "&:hover": {
              backgroundPosition: "right center",
              color: "#fff",
              textDecoration: "none",
            },
          }}
        >
          Search
        </Button>
      </Box>
    );
  }
);

export default SearchBar;
