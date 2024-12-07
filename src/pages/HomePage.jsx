import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=trending&type=video&key=${import.meta.env.VITE_KEY}`
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="home">
      <Typography variant="h4" gutterBottom>
        Trending Videos
      </Typography>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
            <Link to={`/video/${video.id.videoId}`} className="video-link">
              <Card>
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="video-thumbnail"
                />
                <CardContent>
                  <Typography variant="h6">{video.snippet.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {video.snippet.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default HomePage;
