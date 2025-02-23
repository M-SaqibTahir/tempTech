"use client";
import { useState, useEffect } from "react";
import { Container, Grid, TextField, Typography, Paper, Button } from "@mui/material";
import Papa from "papaparse";
import EventGrid from "./eventGrid";
import EventForm from "./eventForm";

function Body() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false); 

useEffect(() => {
    fetch("data/events.csv") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch CSV");
        }
        return response.text();
      })
      .then((csv) => {
        const results = Papa.parse(csv, { header: true });
  
        setEvents(results.data);
        setFilteredEvents(results.data);
  
        localStorage.setItem("events", JSON.stringify(results.data));
      })
      .catch((error) => {
        console.error("Error loading CSV, falling back to localStorage:", error);
  
        const storedEvents = localStorage.getItem("events");
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents);
          setEvents(parsedEvents);
          setFilteredEvents(parsedEvents);
        }
      });
  }, []);
   
    const handleCityChange = (e) => {
    const city = e.target.value.toLowerCase();
    setCityFilter(city);
    filterEvents(city, searchTerm);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterEvents(cityFilter, term);
  };

  const filterEvents = (city, term) => {
    let filtered = [...events];

    if (city) {
      filtered = filtered.filter((event) =>
        event.Location?.toLowerCase().includes(city)
      );
    }

    if (term) {
      filtered = filtered.filter((event) =>
        event["Event Name"]?.toLowerCase().includes(term)
      );
    }

    setFilteredEvents(filtered);
  };

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const paperStyle={
    p: 3, backgroundColor: "#f5f5f5" 
  }
  
   return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={paperStyle}>
      <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Enter city name..."
              variant="outlined"
              value={cityFilter}
              onChange={handleCityChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search events..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Grid>

          <Grid item xs={12} textAlign={"center"} mt ={2}>
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              Add Event
            </Button>
          </Grid>
        </Grid>

        <EventGrid events={filteredEvents} />
      </Paper>

      <EventForm open={openModal} onClose={() => setOpenModal(false)} onAddEvent={handleAddEvent} />
    </Container>
  );
}

export default Body;
