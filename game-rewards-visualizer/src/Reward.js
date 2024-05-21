import React from "react";
import { Box } from "@mui/material";

function Reward({ reward, rowIndex, chestTypeEnergyMap }) {
  let backgroundColor = "rgba(25, 118, 210, 0.5)";
  let text = `${reward.rewardValue} Energy`;
  let width = `${reward.width}px`;

  switch (reward.type) {
    case "ExactHard":
      backgroundColor = "rgba(255, 0, 0, 0.5)";
      text = `Gems: ${reward.rewardValue}`;
      break;
    case "ExactSoft":
      backgroundColor = "rgba(255, 215, 0, 0.5)";
      text = `Coins: ${reward.rewardValue / 1000000}M`;
      break;
    default:
      if (reward.type.includes("Chest")) {
        backgroundColor = "rgba(0, 0, 255, 0.5)";
        text = reward.type;
      }
      break;
  }

  return (
    <Box
      className="reward"
      sx={{
        position: "absolute",
        left: `${reward.startEnergy}px`,
        width: width,
        top: `${rowIndex * 30}px`,
        height: "20px",
        backgroundColor: backgroundColor,
        border: "1px solid #1976d2",
        textAlign: "center",
        lineHeight: "20px",
        color: "#fff",
        fontSize: "12px",
      }}
    >
      {text}
    </Box>
  );
}

export default Reward;
