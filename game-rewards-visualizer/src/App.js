import React, { useState, useEffect } from "react";
import Event from "./Event";
import { Box, Button, TextField, Typography } from "@mui/material";
import ImportModal from "./ImportModal";
import AddRewardModal from "./AddRewardModal";
import "./App.css";

const chestTypeEnergyMap = {
  Chest1: 100,
  Chest2: 200,
  Chest3: 300,
  // Add more chest types and their corresponding energy values here
};

function App() {
  const [events, setEvents] = useState([]);
  const [appHeight, setAppHeight] = useState(200);
  const [maxEnergy, setMaxEnergy] = useState(1000); // Global max energy for the ruler
  const [openImport, setOpenImport] = useState(false);
  const [openAddReward, setOpenAddReward] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  useEffect(() => {
    setAppHeight(events.length * 200 + 100);
    if (events.length > 0) {
      const maxRewardEnd = Math.max(
        0,
        ...events.flatMap((event) =>
          event.rewards.map((r) => r.startEnergy + r.width)
        )
      );
      setMaxEnergy(maxRewardEnd || 1000);
    }
  }, [events]);

  const addEvent = () => {
    setEvents([
      ...events,
      { id: events.length, rewards: [], energyPerPoint: 1 },
    ]);
  };

  const handleOpenImport = (eventId) => {
    setCurrentEventId(eventId);
    setOpenImport(true);
  };

  const handleOpenAddReward = (eventId) => {
    setCurrentEventId(eventId);
    setOpenAddReward(true);
  };

  const handleImport = (newRewards) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === currentEventId ? { ...e, rewards: newRewards } : e
      )
    );
    setOpenImport(false);
  };

  const handleAddReward = (startEnergy, rewardValue) => {
    const rewardWidth = rewardValue; // Assuming ExactEnergy type here
    setEvents((prevEvents) =>
      prevEvents.map((e) => {
        if (e.id === currentEventId) {
          const newReward = {
            startEnergy,
            rewardValue,
            width: rewardWidth,
            type: "ExactEnergy",
          };
          const updatedRewards = [...e.rewards, newReward];
          return { ...e, rewards: updatedRewards };
        }
        return e;
      })
    );
    setOpenAddReward(false);
  };

  const markCount = Math.ceil(maxEnergy / 100); // 100 energy per mark
  const adjustedMarkCount = Math.min(markCount, 1000); // Prevent excessively large arrays

  return (
    <Box className="App" sx={{ padding: 2, height: appHeight }}>
      <Box
        className="energy-ruler"
        sx={{
          position: "relative",
          height: "40px",
          borderBottom: "2px solid #1976d2",
          marginBottom: 2,
          marginLeft: "200px",
        }}
      >
        {[...Array(adjustedMarkCount)].map((_, i) => (
          <Box
            key={i}
            className="energy-mark-container"
            sx={{
              position: "absolute",
              top: 0,
              textAlign: "center",
              left: `${i * 100}px`,
            }}
          >
            <Box
              className="energy-mark"
              sx={{ width: "2px", height: "20px", background: "#1976d2" }}
            />
            <Typography
              variant="caption"
              sx={{ marginTop: 1, color: "#1976d2" }}
            >
              {i * 100}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: "200px", marginRight: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={addEvent}
            sx={{ marginBottom: 2 }}
          >
            Add Event
          </Button>
          {events.map((event) => (
            <Box key={event.id} sx={{ marginBottom: 2 }}>
              <TextField
                type="number"
                label="Energy per point"
                variant="outlined"
                size="small"
                value={event.energyPerPoint}
                onChange={(e) => {
                  const energyPerPoint = parseFloat(e.target.value);
                  if (energyPerPoint >= 0 && energyPerPoint <= 1) {
                    setEvents((prevEvents) =>
                      prevEvents.map((ev) =>
                        ev.id === event.id ? { ...ev, energyPerPoint } : ev
                      )
                    );
                  }
                }}
                sx={{ marginBottom: 1 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleOpenImport(event.id)}
              >
                I
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenAddReward(event.id)}
                sx={{ marginLeft: 1 }}
              >
                +
              </Button>
            </Box>
          ))}
        </Box>
        <Box id="event-container" sx={{ flexGrow: 1 }}>
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              setEvents={setEvents}
              chestTypeEnergyMap={chestTypeEnergyMap}
            />
          ))}
        </Box>
      </Box>
      <ImportModal
        open={openImport}
        onClose={() => setOpenImport(false)}
        onImport={handleImport}
        energyPerPoint={
          events.find((e) => e.id === currentEventId)?.energyPerPoint || 1
        }
        chestTypeEnergyMap={chestTypeEnergyMap}
      />
      <AddRewardModal
        open={openAddReward}
        onClose={() => setOpenAddReward(false)}
        onAddReward={handleAddReward}
      />
    </Box>
  );
}

export default App;
