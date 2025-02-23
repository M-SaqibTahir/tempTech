import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";

const EVENT_TYPES = ["Conference", "Meeting", "Dining", "Studying", "Working", "Other"];

const EventForm = ({ open, onClose, onAddEvent }) => {
  const [eventData, setEventData] = useState({
    "Event Name": "",
    Location: "",
    Address: "",
    "Organizer Name": "",
    "Event Date": "",
    "Event Time": "",
    "Event Type": "Conference",
  });

const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
  
    if (response.ok) {
      onAddEvent(eventData); 
      onClose(); 
      setEventData({
        "Event Name": "",
        Location: "",
        Address: "",
        "Organizer Name": "",
        "Event Date": "",
        "Event Time": "",
        "Event Type": "Conference",
      });
    } else {
      console.error("Failed to save event to CSV");
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const boxStyle={
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="add-event-modal">
      <Box
        sx={boxStyle}
      >
        <Typography id="add-event-modal" variant="h5" fontWeight="bold" textAlign="center">
          Add New Event
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Name"
                name="Event Name"
                value={eventData["Event Name"]}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                name="Location"
                value={eventData.Location}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="Address"
                value={eventData.Address}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Organizer Name"
                name="Organizer Name"
                value={eventData["Organizer Name"]}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                name="Event Date"
                value={eventData["Event Date"]}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="time"
                name="Event Time"
                value={eventData["Event Time"]}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <Select
                fullWidth
                name="Event Type"
                value={eventData["Event Type"]}
                onChange={handleChange}
                required
              >
                {EVENT_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Add Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EventForm;
