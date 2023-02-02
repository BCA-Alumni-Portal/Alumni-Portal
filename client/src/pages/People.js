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

  //search bar filtering 
  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  return (
    <div className="container-fluid">

      <div className="columns-2 gap-8 block min-h-screen">
        <h2 className="py-3">Directory</h2>
        <div className="overflow-auto">
          <div className="search">
            <TextInput
              type="search"
              onChange={inputHandler}
              placeholder="Search Name"
              className="bg-defaultblue border border-defaultblue placeholder-defaultblue rounded-lg focus:ring-defaultblue focus:border-defaultblue block w-full"
            />
          </div>
          <div>
            <div className="py-1">
            <button
              id="align-left"
              className="focus:outline-none bg-defaultblue inline-block block border border-defaultblue rounded py-2 px-4  text-cream hover:bg-hover-defaultblue "
              onClick={handleClick}
            >
              Filters:
            </button>
            </div>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <NestedMenuItem
                label="Academy"
                parentMenuOpen={open}
              >
                <MenuItem>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="AAST" />
                    <FormControlLabel control={<Checkbox />} label="AMST" />
                    <FormControlLabel control={<Checkbox />} label="AVPA" />
                    <FormControlLabel control={<Checkbox />} label="ABF" />
                    <FormControlLabel control={<Checkbox />} label="ATCS" />
                    <FormControlLabel control={<Checkbox />} label="ACAHA" />
                    <button className=" focus:outline-none bg-defaultblue inline-block block border border-defaultblue rounded border-r-4 text-base text-cream hover:bg-hover-defaultblue py-1 px-2">Apply</button>
                  </FormGroup>
                </MenuItem>
              </NestedMenuItem>


              <NestedMenuItem
                label="Year"
                parentMenuOpen={open}
              >
                <MenuItem className=" ">
                  <form>
                    <div>
                      <div className="mb-2 block">
                        <Label
                          value="Graduation Year:"
                        />
                      </div>
                      <TextInput
                        type="search"
                        placeholder="2023"
                        className="bg-defaultblueborder border-defaultblue placeholder-defaultblue rounded-lg focus:ring-defaultblue focus:border-defaultblue block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <br></br>
                      <button className="focus:outline-none bg-defaultblue inline-block block border text-base border-defaultblue rounded text-cream hover:bg-hover-defaultblue py-1 px-4">
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


        {/* where the rest of directory will be implemented */}
        <h2 className="py-3">Information</h2>
        <div className="">

        </div>
      </div>
    </div>


  );
}


export default People;