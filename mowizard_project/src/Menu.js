import React, { useState } from "react";
import "./Menu.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Select from "react-select";
import moviesData from "../src/movies.json";

function Menu() {
  const [formNumber, setFormNumber] = useState(0);

  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = moviesData.reduce((uniqueOptions, movie) => {
    const isDuplicate = uniqueOptions.some(
      (option) => option.value === movie.title
    );
    if (!isDuplicate) {
      uniqueOptions.push({ value: movie.title, label: movie.title });
    }
    return uniqueOptions;
  }, []);

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }
  const handleNextClick = () => {
    setFormNumber(formNumber + 1);
  };

  return (
    <div className="app">
      <div>
        <h1 style={{ marginTop: "20%", fontSize: "50px", textAlign: "center" }}>
          {" "}
          Mowizard
        </h1>
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
          <div style={{ marginTop: "40%" }} className="form">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Son kaç yıl içinde yapılmış filmleri izlemek istersiniz.
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Son 5 yıl"
                />
                <FormControlLabel
                  value="10"
                  control={<Radio />}
                  label="Son 10 yıl"
                />
                <FormControlLabel
                  value="20"
                  control={<Radio />}
                  label="Son 20 yıl"
                />
                <FormControlLabel
                  value="50"
                  control={<Radio />}
                  label="Son 50 yıl"
                />
                <FormControlLabel
                  value="2023"
                  control={<Radio />}
                  label="Farketmez"
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
        {formNumber === 2 && (
          <div style={{ marginTop: "40%" }} className="form">
            <h2>Favori Filminizi seçiniz.</h2>
            <div style={{ width: 470 }}>
              <Select
                options={optionList}
                placeholder="Favori filminiz"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                isMulti={false}
              />
              <Button
                style={{ marginTop: 10, marginLeft: 180 }}
                variant="outlined"
                onClick={handleNextClick}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
