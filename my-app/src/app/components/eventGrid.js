import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

const EventGrid = ({ events }) => {

    const cardStyle={
          boxShadow: 3,
          borderRadius: 2,
          p: 2, 
          backgroundColor: "#f5f5f5",
          height: "280px" 
    }
    const typoStyle={
        mt: 3, color: "gray" 
    }
  if (!events.length) {
    return (
      <Typography variant="h6" textAlign="center" sx={typoStyle}>
        No events found
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {events.map((event, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {event["Event Name"]}
              </Typography>
              <Typography><strong>Location:</strong> {event.Location}</Typography>
              <Typography><strong>Address:</strong> {event.Address}</Typography>
              <Typography><strong>Organizer:</strong> {event["Organizer Name"]}</Typography>
              <Typography>
                <strong>Date:</strong> {format(new Date(event["Event Date"]), "MMMM d, yyyy")}
              </Typography>
              <Typography><strong>Time:</strong> {event["Event Time"]}</Typography>
              <Typography><strong>Type:</strong> {event["Event Type"]}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default EventGrid;
