/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

interface Article {
  source: {
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

const NEWS_API_KEY = "ebba6c3df668485984f78d1b349c2cbc";
const WEATHER_API_KEY = "fb2de9d1e855a11283a74a41b832c82f";
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Indore&units=metric&appid=${WEATHER_API_KEY}`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const NewsCategory = [
  { value: 10, label: "All News" },
  { value: 20, label: "Sports" },
  { value: 30, label: "India" },
  { value: 40, label: "Technology" },
  { value: 50, label: "AI" },
  { value: 60, label: "Stock" },
  { value: 70, label: "Space" },
];

const NewsSources = [
  { value: "", label: "All Sources" },
  { value: "bbc-news", label: "BBC News" },
  { value: "cnn", label: "CNN" },
  { value: "the-verge", label: "The Verge" },
  { value: "techcrunch", label: "TechCrunch" },
  { value: "espn", label: "ESPN" },
];

const List: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  const fetchNews = useCallback(
    async (
      query: string,
      category: string = "",
      source: string = "",
      _date: string = "",
      author: string = ""
    ) => {
      setLoading(true);
      try {
        let apiURL = "";

        if (query) {
          apiURL = `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;
        } else if (source) {
          apiURL = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${NEWS_API_KEY}`;
        } else if (category) {
          apiURL = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${NEWS_API_KEY}`;
        } else if (author) {
          apiURL = `https://newsapi.org/v2/everything?q=${author}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;
        } else {
          apiURL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;
        }

        const response = await axios.get(apiURL);
        setArticles((response.data as { articles: Article[] }).articles);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(WEATHER_API_URL);
        const data = await response.json();
        const temp = data.main.temp;
        setWeather(`${temp}°C`);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setWeather("Unable to fetch weather");
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    fetchNews("");
  }, [fetchNews]);

  const handleSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      fetchNews(searchQuery.trim(), "", "", "", "");
    },
    [fetchNews, searchQuery]
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const selectedCategory = event.target.value;
      setAge(selectedCategory);

      const categoryMapping: { [key: string]: string } = {
        "10": "",
        "20": "sports",
        "30": "general",
        "40": "technology",
        "50": "ai",
        "60": "business",
        "70": "science",
      };

      const category = categoryMapping[selectedCategory] || "";
      fetchNews("", category);
    },
    [fetchNews]
  );

  const handleSourceChange = useCallback(
    (event: SelectChangeEvent) => {
      const selectedSource = event.target.value;
      setAge(selectedSource);
      fetchNews("", "", selectedSource);
    },
    [fetchNews]
  );

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = event.target.value;
      setSelectedDate(newDate);

      fetchNews("", "", "", newDate);
    },
    [fetchNews]
  );

  const handleAuthorChange = useCallback(
    (event: SelectChangeEvent) => {
      const author = event.target.value;
      setSelectedAuthor(author);
      fetchNews("", "", "", "", author);
    },
    [fetchNews]
  );

  const memoizedArticles = useMemo(() => articles, [articles]);

  return (
    <div style={{ padding: "50px" }}>
      <Box sx={{ width: "100%", padding: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "10px",
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
          </Box>

          <Box sx={{ minWidth: 150, width: { xs: "100%", sm: "auto" } }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Category"
                onChange={handleChange}
                sx={{
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "0.3s ease-in-out",
                  "&:hover": { borderColor: "#fff" },
                }}
              >
                {NewsCategory.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              minWidth: 150,
              marginLeft: { xs: 0, sm: 2 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="source-select-label">Source</InputLabel>
              <Select
                labelId="source-select-label"
                id="source-select"
                value={age}
                label="Source"
                onChange={handleSourceChange}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "0.3s ease-in-out",
                  "&:hover": { borderColor: "#fff" },
                }}
              >
                {NewsSources.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              minWidth: 150,
              marginLeft: { xs: 0, sm: 2 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel shrink sx={{ color: "#e6e6e6", fontSize: "16px" }}>
                Date
              </InputLabel>
              <InputBase
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                sx={{
                  width: "100%",
                  color: "#e6e6e6",
                  padding: "10px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "0.3s ease-in-out",
                  "&:hover": { borderColor: "#fff" },
                  "&:focus-within": {
                    borderColor: "#1976d2",
                    background: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              minWidth: 120,
              marginLeft: { xs: 0, sm: 2 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="author-select-label">Author</InputLabel>
              <Select
                labelId="author-select-label"
                id="author-select"
                value={selectedAuthor}
                label="Author"
                onChange={handleAuthorChange}
                sx={{
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "0.3s ease-in-out",
                  "&:hover": { borderColor: "#fff" },
                }}
              >
                <MenuItem value="">All Authors</MenuItem>
                <MenuItem value="John Doe">John Doe</MenuItem>
                <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                <MenuItem value="Michael Johnson">Michael Johnson</MenuItem>
                <MenuItem value="Emily Davis">Emily Davis</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-evenly",
              marginBottom: "12px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            <motion.div variants={containerVariants}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "left",
                }}
              >
                <Typography sx={{ color: "#e6e6e6", fontSize: "34px" }}>
                  Your briefing
                </Typography>
                <Typography sx={{ color: "#babab8", fontSize: "16px" }}>
                  {new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  }).format(new Date())}
                </Typography>
              </Box>
            </motion.div>

            <motion.div variants={containerVariants}>
              <Box
                sx={{
                  background: "rgba(1, 6, 24, 0.5)",
                  padding: "20px",
                  borderRadius: "25px",
                  width: { xs: "auto", sm: "auto" },
                  marginTop: { xs: "10px", sm: "0" },
                }}
              >
                <Typography
                  sx={{
                    color: "#e6e6e6",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Your Local Weather
                </Typography>
                <Typography sx={{ color: "#babab8", fontSize: "16px" }}>
                  {weather
                    ? `Today's Weather: ${weather}`
                    : "Loading weather..."}
                </Typography>
                <a
                  style={{ color: "#babab8", fontSize: "15px" }}
                  href="https://openweathermap.org/"
                >
                  weather.com
                </a>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Box>

      {loading ? (
        <div className="spinner"></div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            padding: 2,
          }}
        >
          {memoizedArticles.map((article, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                maxWidth: 345,
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 32px)",
                  md: "1 1 calc(33.333% - 32px)",
                },
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  background:
                    " linear-gradient(to right, rgba(1, 6, 24, 0.5), rgba(11, 7, 2, 0.5))",
                  overflow: "hidden",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {article.urlToImage && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={article.urlToImage}
                    alt={article.title}
                    sx={{
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#e5e5e5",
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description || "No description available."}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    mt={2}
                    sx={{
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                    }}
                  >
                    Source: {article.source.name || "Unknown"}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                    }}
                  >
                    Author: {article.author || "Unknown"}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                    }}
                  >
                    Published At: {article.publishedAt || "Unknown"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      margin: "10px",
                      padding: "6px",
                      textAlign: "center",
                      transition: "0.5s",
                      backgroundImage:
                        "linear-gradient(90deg, #132130 0%, #303030 100%)",
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
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
};

export default React.memo(List);
