import { TableRows, Window } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";

const ViewChanger = ({ isGridView, onClick }) => {
  const StyledIconButton = ({ icon, left, disabled }) => (
    <Tooltip title={left ? "List View" : "Grid View"}>
      <span>
        <IconButton
          sx={{
            "&:hover": {
              borderRadius: 3,
              borderTopLeftRadius: !left ? 0 : "auto",
              borderBottomLeftRadius: !left ? 0 : "auto",
              borderTopRightRadius: left ? 0 : "auto",
              borderBottomRightRadius: left ? 0 : "auto",
            },
          }}
          disabled={disabled}
          onClick={onClick}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );

  return (
    <Box w={1} display="flex" justifyContent={"flex-end"} mr={3} mb={2}>
      <Box
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "neutral.light",
          display: "flex",
        }}
      >
        <StyledIconButton disabled={!isGridView} left icon={<TableRows />} />
        <Box height={1} width="1px" bgcolor={"neutral.light"} />
        <StyledIconButton disabled={isGridView} icon={<Window />} />
      </Box>
    </Box>
  );
};

export default ViewChanger;
