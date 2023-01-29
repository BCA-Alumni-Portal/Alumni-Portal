import * as React from 'react';
import { NestedMenuItem } from 'mui-nested-menu';
import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import List from "../components/SearchBar";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Label } from 'flowbite-react/lib/cjs/components/Label';


function People() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e = React.MouseEvent) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);


  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  return (
    <div className="main">
      <h1>React Search</h1>
      <div className="search">
        <TextInput
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          placeholder="Search Name"
        />
      </div>
      <div>
        <button
          className="bg-defaultblue inline-block block border border-blue rounded py-2 px-4  text-cream hover:bg-hover-blue py-2 px-4"
          onClick={handleClick}
        >
          Filters:
        </button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <NestedMenuItem
            label="Academy"
            parentMenuOpen={open}
          >
            <MenuItem >
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="AAST" />
                <FormControlLabel control={<Checkbox />} label="AMST" />
                <FormControlLabel control={<Checkbox />} label="AVPA" />
                <FormControlLabel control={<Checkbox />} label="ABF" />
                <FormControlLabel control={<Checkbox />} label="ATCS" />
                <FormControlLabel control={<Checkbox />} label="ACAHA" />
                <button className="bg-defaultblue inline-block block border border-blue rounded  text-base text-cream hover:bg-hover-blue py-1 px-2">Apply</button>
              </FormGroup>
            </MenuItem>
          </NestedMenuItem>


          <NestedMenuItem
            label="Year"
            parentMenuOpen={open}
          >
            <MenuItem>
              <form>
                <div>
                  <div className="mb-2 block">
                    <Label
                      value="Graduation Year:"
                    />
                  </div>
                  <TextInput
                    placeholder="2023"
                    shadow={true}
                  />
                </div>
                <div>
                  <br></br>
                  <button className="bg-defaultblue inline-block block border text-base border-blue rounded text-cream hover:bg-hover-blue py-1 px-4">
                    Apply
                  </button>
                </div>
              </form>
            </MenuItem>
          </NestedMenuItem>
        </Menu>
      </div>
      <List input={inputText} />
    </div>
  );
}


export default People;
