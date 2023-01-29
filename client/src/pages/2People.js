import { useState } from 'react';
import briefcaseImage from '../images/icons/briefcase.png';
import gradImage from '../images/icons/grad.png';
import personImage1 from '../images/person1.png';
import personImage2 from '../images/person2.png';
import personImage3 from '../images/person3.png';



export default function Profile() {
  const [id, setId] = useState(0);
  const lorem = "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const info = [
    <div class="job-info">
              <h2 class="job-title">Hayun Jung</h2>
              <div class="job-schedule">
                <img id="job-info-icon" src={gradImage} width="25" height="25" alt="Test"></img>
                <p>
                 ATCS, 2023
                </p>
              </div>
              <div class="job-schedule">
                <img id="job-info-icon" src={briefcaseImage} width="25" height="25" alt="Test"></img>
                <p>
                 @ Tesla Motors
                </p>
              </div>
              <div class='row'>
                <div class="col-md-6">
                  <div class="job-description">
                    <p>{lorem}</p>
                  </div>
                  <a href='/messages'>
                    <button class="job-apply">
                      Contact
                    </button>
                  </a>
                </div>
                <div class="col-md-5">
                  <img src={personImage1} className='rounded-md'/>
                </div>
              </div>
              
            </div>, 
      <div class="job-info">
      <h2 class="job-title">John Doe</h2>
      <div class="job-schedule">
        <img id="job-info-icon" src={gradImage} width="25" height="25" alt="Test"></img>
        <p>
         AVPA, 2019
        </p>
      </div>
      <div class="job-schedule">
        <img id="job-info-icon" src={briefcaseImage} width="25" height="25" alt="Test"></img>
        <p>
         @ Google
        </p>
      </div>
      <div class='row'>
                <div class="col-md-6">
                  <div class="job-description">
                    <p>{lorem}</p>
                  </div>
                  <a href='/messages'>
                    <button class="job-apply">
                      Contact
                    </button>
                  </a>
                </div>
                <div class="col-md-5">
                  <img src={personImage2} className='rounded-md'/>
                </div>
              </div>
    </div>,
    <div class="job-info">
    <h2 class="job-title">Alice Smith</h2>
    <div class="job-schedule">
      <img id="job-info-icon" src={gradImage} width="25" height="25" alt="Test"></img>
      <p>
       AAST, 2014
      </p>
    </div>
    <div class="job-schedule">
      <img id="job-info-icon" src={briefcaseImage} width="25" height="25" alt="Test"></img>
      <p>
       @ Microsoft
      </p>
    </div>
    <div class='row'>
                <div class="col-md-6">
                  <div class="job-description">
                    <p>{lorem}</p>
                  </div>
                  <a href='/messages'>
                    <button class="job-apply">
                      Contact
                    </button>
                  </a>
                </div>
                <div class="col-md-5">
                  <img src={personImage3} className='rounded-md'/>
                </div>
              </div>
  </div>

  ]  
  return (
      <div class="jobs">

      <h1>People</h1>

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5">
            <h2>Directory</h2>
            <form>   
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div class="relative">
                  <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-blue border border-blue rounded-lg bg-white focus:ring-blue focus:border-blue dark:bg-blue dark:border-blue dark:placeholder-blue dark:text-cream dark:focus:blue dark:focus:blue" placeholder="Search for alumni"/>
                  <button type="submit" class="text-cream absolute right-2.5 bottom-2.5 bg-blue hover:bg-hover-blue focus:ring-4 focus:outline-none focus:blue font-medium rounded-lg text-sm px-4 py-2 dark:blue dark:hover:hover-blue dark:focus:blue">Search</button>
              </div>
            </form>
            
            <div class="list-group">
              <a href="#" onClick={() => setId(0)} class="list-group-item list-group-item-action" aria-current="true">

                <h3>
                  <b>Hayun Jung</b>
                </h3>
                <p>
                  ATCS, 2023
                  <br></br>
                  Paris, France
                </p>

              </a>
              <a href="#" onClick={() => setId(1)} class="list-group-item list-group-item-action">
              <h3>
                  <b>John Doe</b>
                </h3>
                <p>
                  AVPA, 2019
                  <br></br>
                  New York, NY
                  <br></br>
                </p>

              </a>
              <a href="#" onClick={() => setId(2)} class="list-group-item list-group-item-action">
                
                <h3>
                  <b>Alice Smith</b>
                </h3>
                <p>
                  AAST, 2014
                  <br></br>
                  Dallas, TX
                  <br></br>
                </p>

              </a>
              <a href="#" onClick={() => setId(2)} class="list-group-item list-group-item-action">
                
                <h3>
                  <b>Jacob James</b>
                </h3>
                <p>
                  AAST, 2010
                  <br></br>
                  Los Angeles, CA
                  <br></br>
                </p>

              </a>
              <a href="#" onClick={() => setId(2)} class="list-group-item list-group-item-action">
                
                <h3>
                  <b>Bernard Oshie</b>
                </h3>
                <p>
                  AMST, 2016
                  <br></br>
                  Austin, TX
                  <br></br>
                </p>

              </a>
              <a href="#" onClick={() => setId(2)} class="list-group-item list-group-item-action">
                
                <h3>
                  <b>Sidney Crosby</b>
                </h3>
                <p>
                  AEDT, 2014
                  <br></br>
                  Hackensack, NJ
                  <br></br>
                </p>

              </a>
            </div>
          </div>
          <div class="col-md-7">
              {info[id]}
          </div>
        </div>
      </div>
    </div>
      );
  }