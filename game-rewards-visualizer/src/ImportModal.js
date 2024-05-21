import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";

function ImportModal({
  open,
  onClose,
  onImport,
  energyPerPoint,
  chestTypeEnergyMap,
}) {
  const [importData, setImportData] = useState("");

  const handleImport = () => {
    try {
      const data = JSON.parse(importData);
      const newRewards = [];
      let previousStartEnergy = 0;
      data.forEach((item) => {
        item.rewards.forEach((reward) => {
          let startEnergy =
            previousStartEnergy + item.pointsTarget / energyPerPoint;
          let rewardValue = 20;
          let type = reward.rewardAppItem;
          let width = rewardValue;

          switch (reward.rewardAppItem) {
            case "ExactEnergy":
              rewardValue = reward.rewardItemAmount;
              width = rewardValue;
              break;
            case "ExactHard":
              rewardValue = reward.rewardItemAmount;
              width = 100; // Default width for ExactHard
              break;
            case "ExactSoft":
              rewardValue = reward.rewardItemAmount;
              width = 100; // Default width for ExactSoft
              break;
            default:
              if (reward.rewardAppItem.includes("Chest")) {
                rewardValue = chestTypeEnergyMap[reward.rewardAppItem] || 50;
                width = rewardValue;
              }
              break;
          }

          newRewards.push({ startEnergy, rewardValue, width, type });
          previousStartEnergy = startEnergy;
        });
      });
      onImport(newRewards);
      onClose();
      setImportData("");
    } catch (error) {
      console.error("Invalid JSON data:", error);
      alert("Invalid JSON data");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="import-modal-title"
      aria-describedby="import-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="import-modal-title" variant="h6" component="h2">
          Import JSON Data
        </Typography>
        <TextField
          id="import-modal-description"
          label="JSON Data"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleImport}>
          Import
        </Button>
      </Box>
    </Modal>
  );
}

export default ImportModal;
