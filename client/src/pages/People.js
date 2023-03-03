import * as React from 'react';
import ReactDOM from 'react-dom/client'
import { Toast } from 'flowbite-react/lib/cjs/components/Toast';
// import { TextInput } from 'flowbite-react/lib/cjs/components/TextInput';
import List from "../components/SearchBar";
// import { Label } from 'flowbite-react/lib/cjs/components/Label';

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

  function Year_filter() {
    const inputYear = document.getElementsByClassName("year").value;
    const tag = (
      <Toast>
        <div className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-lg bg-amber-300">
        </div>
        <div className="ml-3 text-black text-xs">
          <p>{inputYear} </p>
        </div>
        <Toast.Toggle />
      </Toast>
    );
    ReactDOM.render(tag, document.getElementById('tag-area'));

  };



  return (
    <div className="container-fluid">

      <div className="columns-2 gap-8 block divide-x-8">
        <div className="overflow-auto">
          <h2 className="py-3 text-lg">Directory</h2>
          <div className="search px-10">
            <input type="search" onChange={inputHandler} placeholder="Text" className="input input-bordered input-info w-full max-w-xs focus:border-sky-400 focus:ring-0"></input>
            <br className="space-y-8"></br>
            <br className="space-y-1"></br>
            <div className="px-10 flex grid grid-cols-3 gap-1 place-content-center">
              <div>
                <ul className="block menu menu-horizontal bg-base-100 border border border-1 border-amber-300">
                  <li tabIndex="0">
                    <span className="text-sm">Graduation Year</span>
                    <ul>
                      <div className="bg-base-100 border border-1 border-amber-300">
                        <form className="px-2 py-3">
                          <input type="text" placeholder="2023" className="year text-xs input input-bordered input-warning w-full max-w-xs focus:border-amber-400 focus:ring-0"></input>
                          <div>
                            <br></br>
                            <button onClick={(e) => Year_filter(e)} className="drop-shadow-md border-2 text-xs bg-amber-200 border border-amber-300 rounded hover:bg-amber-300 py-2 px-10">
                              Add
                            </button>
                          </div>
                        </form>
                      </div>

                    </ul>
                  </li>
                </ul>
              </div>
              <br className="space-x-4"></br>
              <div>
                <ul className="block menu menu-horizontal bg-base-100 w-30 align-self-left">
                  <li tabIndex="0">
                    <span className="text-sm border border-1 border-red-300">Academy</span>
                    <ul className="menu bg-base-100 w-30 border border-1 border-red-300">
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-6 ">
                            <p className="text-xs">AAST</p>
                            <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-5 ">
                            <p className="text-xs">AMST</p>
                            <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-6 ">
                            <p className="text-xs">AVPA</p>
                            <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-8 ">
                            <p className="text-xs">ABF</p>
                            <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-6 ">
                            <p className="text-xs">ATCS</p>
                            <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <li className="hover:bg-stone-200 focus:none">
                        <div className="hover:bg-stone-200 text-black hover:border-stone-100">
                          <label className="flex space-x-3 ">
                            <p className="text-xs">ACAHA</p>
                            <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error"></input>
                          </label>
                        </div>
                      </li>
                      <button className="drop-shadow-lg border-2 text-xs border  py-2 px-2 bg-red-300 hover:bg-red-400 border-red-300 hover:text-white hover:border-red-400">Add</button>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-8 " id="tag-area">

            </div>

            <br className="space-y-8"></br>
            <List input={inputText} />
          </div>
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