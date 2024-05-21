import React, { useState } from "react";
import { Box, Button, TextField, Typography, Modal } from "@mui/material";

function AddRewardModal({ open, onClose, onAddReward }) {
  const [startEnergy, setStartEnergy] = useState("");
  const [rewardValue, setRewardValue] = useState("");

  const handleAddReward = () => {
    if (startEnergy !== "" && rewardValue !== "") {
      onAddReward(parseInt(startEnergy, 10), parseInt(rewardValue, 10));
      setStartEnergy("");
      setRewardValue("");
      onClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-reward-modal-title"
      aria-describedby="add-reward-modal-description"
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
        <Typography id="add-reward-modal-title" variant="h6" component="h2">
          Add Reward
        </Typography>
        <TextField
          label="Start Energy"
          type="number"
          variant="outlined"
          fullWidth
          value={startEnergy}
          onChange={(e) => setStartEnergy(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
        <TextField
          label="Reward Value"
          type="number"
          variant="outlined"
          fullWidth
          value={rewardValue}
          onChange={(e) => setRewardValue(e.target.value)}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddReward}>
          Add Reward
        </Button>
      </Box>
    </Modal>
  );
}

export default AddRewardModal;
