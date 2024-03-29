import briefcaseImage from '../images/icons/briefcase.png';
import { useState } from 'react';

export default function Jobs() {
  const [j, setJ] = useState(true);
  return (

    <div class="jobs">

      <h1>Jobs</h1>

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5">
            <h2>Job Postings</h2>

            <div class="list-group">
              <a href="#" onClick={() => setJ(true)} class="list-group-item list-group-item-action active" aria-current="true">

                <h3>
                  <b>Software Engineer</b>
                </h3>
                <p>
                  Company A USA Inc. Place, NJ (Hybrid)
                  <br></br>
                  Full-time
                  <br></br>
                  Posted by <b>Remington Kim</b>
                </p>

              </a>
              <a href="#" onClick={() => setJ(false)} class="list-group-item list-group-item-action">

                <h3>
                  <b>Data Scientist</b>
                </h3>
                <p>
                  Company B USA Inc. Place, NJ (Fully Remote)
                  <br></br>
                  Part-time
                  <br></br>
                  Posted by <b>Kevin Liu</b>
                </p>

              </a>
              <a href="#" class="list-group-item list-group-item-action">

                <h3>
                  <b>Software Tester</b>
                </h3>
                <p>
                  Company C USA Inc. Place, NJ (In Person)
                  <br></br>
                  Full-time
                  <br></br>
                  Posted by <b>Hayun Jung</b>
                </p>

              </a>
            </div>
          </div>
          <div class="col-md-7">
            {j ? (
              <div class="job-info">
                <h2 class="job-title">Software Engineer</h2>
                <p class="job-location">Company A USA Inc. Place, NJ (Hybrid)</p>
                <div class="job-schedule">
                  <img id="job-info-icon" src={briefcaseImage} width="25" height="25" alt="Test"></img>
                  <p>
                    Full-time
                  </p>
                </div>

                <div class="job-description">
                  <p>Employee will be working alongside other software engineers to engineer software. Background in software engineering recommended.</p>
                </div>

                <button class="job-apply">
                  Apply Now
                </button>
                <a class="job-poster-link" href="/me">Remington Kim's Profile</a>

              </div>
            ) : (
              <div class="job-info">
                <h2 class="job-title">Data Scientist</h2>
                <p class="job-location">Company B USA Inc. Place, NJ (Hybrid)</p>
                <div class="job-schedule">
                  <img id="job-info-icon" src={briefcaseImage} width="25" height="25" alt="Test"></img>
                  <p>
                    Part-time
                  </p>
                </div>

                <div class="job-description">
                  <p>Employee will be working alongside other data scientists to science data. Background in statistics and data analysis recommended.</p>
                </div>

                <button class="job-apply">
                  Apply Now
                </button>
                <a class="job-poster-link" href="#">Kevin Liu's Profile</a>

              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}