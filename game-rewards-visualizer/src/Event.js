import React, { useState, useEffect } from "react";
import Reward from "./Reward";
import { Box } from "@mui/material";
import "./App.css";

function Event({ event, setEvents, chestTypeEnergyMap }) {
  const [containerHeight, setContainerHeight] = useState(60);
  const [containerWidth, setContainerWidth] = useState(1000);

  useEffect(() => {
    const rows = getRewardRows(event.rewards);
    setContainerHeight(rows.length * 20 + 4); // Adjust height calculation
    if (event.rewards.length > 0) {
      const maxRewardEnd = Math.max(
        ...event.rewards.map((r) => r.startEnergy + r.width)
      );
      setContainerWidth(maxRewardEnd + 200); // 200 for the control sidebar
    }
  }, [event.rewards]);

  const getRewardRows = (rewards) => {
    const rows = [];

    for (let i = 0; i < rewards.length; i++) {
      const reward = rewards[i];
      let placed = false;
      console.log(
        `Placing reward: startEnergy=${reward.startEnergy}, width=${reward.width}`
      );

      // Check each row from top to bottom
      for (let j = 0; j < rows.length; j++) {
        const row = rows[j];
        let overlap = false;
        console.log(`Checking row ${j}`);

        // Check if this reward overlaps with any reward in the current row
        for (let k = 0; k < row.length; k++) {
          const r = row[k];
          console.log(
            `Comparing with reward in row: startEnergy=${r.startEnergy}, width=${r.width}`
          );
          if (
            !(
              reward.startEnergy + reward.width <= r.startEnergy ||
              reward.startEnergy >= r.startEnergy + r.width
            )
          ) {
            overlap = true;
            console.log("Overlap detected");
            break;
          }
        }

        // If no overlap, place the reward in this row
        if (!overlap) {
          row.push(reward);
          placed = true;
          console.log(`Placed in row ${j}`);
          break;
        }
      }

      // If placed is still false, create a new row for the reward
      if (!placed) {
        rows.push([reward]);
        console.log("Created new row");
      }
    }

    console.log("Final row structure:", rows);
    return rows;
  };

  return (
    <Box
      className="event"
      sx={{
        marginBottom: 2,
        height: containerHeight,
        width: containerWidth,
        display: "flex",
      }}
    >
      {getRewardRows(event.rewards).map((row, rowIndex) =>
        row.map((reward, rewardIndex) => (
          <Reward
            key={`${rowIndex}-${rewardIndex}`}
            reward={reward}
            rowIndex={rowIndex}
            chestTypeEnergyMap={chestTypeEnergyMap}
          />
        ))
      )}
    </Box>
  );
}

export default Event;
