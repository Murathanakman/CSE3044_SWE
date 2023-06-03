import React, { useState } from "react";
import "./Menu.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

function Menu() {
  const [formNumber, setFormNumber] = useState(0);

  const handleNextClick = () => {
    setFormNumber(formNumber + 1);
  };

  return (
    <div className="app">
      <div>
        <h1 style={{ marginTop: "20%", fontSize: "50px" }}> Mowizard</h1>
        {formNumber === 0 && (
          <div>
            <p>Sizi tanımamız için kısa bir anketi cevaplamanız gerekiyor.</p>
            <Button
              style={{ marginTop: 10 }}
              variant="outlined"
              onClick={handleNextClick}
            >
              Ankete Başla
            </Button>
          </div>
        )}
        {formNumber === 1 && (
          <div style={{ marginTop: "100%" }} className="form">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              <Button
                style={{ marginTop: 10 }}
                variant="outlined"
                onClick={handleNextClick}
              >
                Next
              </Button>
            </FormControl>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
