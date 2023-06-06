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
import castData from "../src/cast.json";

function Menu() {
  const [formNumber, setFormNumber] = useState(0);

  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = moviesData.map((movie) => {
    return { value: movie.title, label: movie.title };
  });

  const genreList = [
    { value: "Action", label: "Action" },
    { value: "Adventure", label: "Adventure" },
    { value: "Animated", label: "Animated" },
    { value: "Biography", label: "Biography" },
    { value: "Comedy", label: "Comedy" },
    { value: "Crime", label: "Crime" },
    { value: "Dance", label: "Dance" },
    { value: "Disaster", label: "Disaster" },
    { value: "Documentary", label: "Documentary" },
    { value: "Drama", label: "Drama" },
    { value: "Erotic", label: "Erotic" },
    { value: "Family", label: "Family" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Found Footage", label: "Found Footage" },
    { value: "Historical", label: "Historical" },
    { value: "Horror", label: "Horror" },
    { value: "Independent", label: "Independent" },
    { value: "Legal", label: "Legal" },
    { value: "Live Action", label: "Live Action" },
    { value: "Martial Arts", label: "Martial Arts" },
    { value: "Musical", label: "Musical" },
    { value: "Mystery", label: "Mystery" },
    { value: "Noir", label: "Noir" },
    { value: "Performance", label: "Performance" },
    { value: "Political", label: "Political" },
    { value: "Romance", label: "Romance" },
    { value: "Satire", label: "Satire" },
    { value: "Science Fiction", label: "Science Fiction" },
    { value: "Short", label: "Short" },
    { value: "Silent", label: "Silent" },
    { value: "Slasher", label: "Slasher" },
    { value: "Sport", label: "Sport" },
    { value: "Sports", label: "Sports" },
    { value: "Spy", label: "Spy" },
    { value: "Superhero", label: "Superhero" },
    { value: "Supernatural", label: "Supernatural" },
    { value: "Suspense", label: "Suspense" },
    { value: "Teen", label: "Teen" },
    { value: "Thriller", label: "Thriller" },
    { value: "War", label: "War" },
    { value: "Western", label: "Western" },
  ];

  const castList = castData.map((actor) => {
    return { value: actor.Cast, label: actor.Cast };
  });

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }

  //Genre kısmı
  const [selectedOptionsGenre, setSelectedOptionsGenre] = useState();
  function handleSelectGenre(data) {
    setSelectedOptionsGenre(data);
  }
  const handleNextClick = () => {
    setFormNumber(formNumber + 1);
  };

  //Oyuncular kısmı
  const [selectedOptionsCast, setSelectedOptionsCast] = useState();
  function handleSelectCast(data) {
    setSelectedOptionsCast(data);
  }

  return (
    <div className="app">
      <div>
        <h1 style={{ marginTop: "20%", fontSize: "50px", textAlign: "center" }}>
          {" "}
          Mowizard
        </h1>
        {formNumber === 0 && (
          <div>
            <p className="form">
              Sizi tanımamız için kısa bir anketi cevaplamanız gerekiyor.
            </p>
            <Button
              style={{ marginTop: 10 }}
              variant="contained"
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ marginLeft: 3 }}>Boş bırakabilirsiniz.</p>
                <Button
                  style={{ marginTop: 10, marginRight: 10 }}
                  variant="outlined"
                  onClick={handleNextClick}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
        {formNumber === 3 && (
          <div style={{ marginTop: "40%" }} className="form">
            <h2>Hangi tarz film izlemek istersiniz.</h2>
            <div style={{ width: 470 }}>
              <Select
                options={genreList}
                placeholder="Film türleri"
                value={selectedOptionsGenre}
                onChange={handleSelectGenre}
                isSearchable={true}
                isMulti={true}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ marginLeft: 3 }}>Boş bırakabilirsiniz.</p>
                <Button
                  style={{ marginTop: 10, marginRight: 10 }}
                  variant="outlined"
                  onClick={handleNextClick}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
        {formNumber === 4 && (
          <div style={{ marginTop: "40%" }} className="form">
            <h2>Favori oyuncularınızı seçiniz.</h2>
            <div style={{ width: 470 }}>
              <Select
                options={castList}
                placeholder="Oyuncular"
                value={selectedOptionsCast}
                onChange={handleSelectCast}
                isSearchable={true}
                isMulti={true}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ marginLeft: 3 }}>Boş bırakabilirsiniz.</p>
                <Button
                  style={{ marginTop: 10, marginRight: 10 }}
                  variant="outlined"
                  onClick={handleNextClick}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
