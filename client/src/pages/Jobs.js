import briefcaseImage from '../images/icons/briefcase.png';

export default function Jobs() {
  return (

    <div class="jobs">

      <h1>Jobs</h1>

      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5">
            <h2>Job Postings</h2>

            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                The current link item
              </a>
              <a href="#" class="list-group-item list-group-item-action">A second link item</a>
              <a href="#" class="list-group-item list-group-item-action">A third link item</a>
              <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
              <a class="list-group-item list-group-item-action disabled">A disabled link item</a>
            </div>
          </div>
          <div class="col-md-7">
            <div class="job-info">
              <h2 class="job-title">Software Engineer</h2>
              <p class="job-location">TABACALERA USA Inc. Whippany, NJ (Hybrid)</p>
              <div class="job-schedule">
                <p>
                  <img src={briefcaseImage} width="25" height="25" alt="Test"></img>
                  Full-time

                </p>


              </div>
              <div class="job-employees">

              </div>
              <div class="job-description">

              </div>
              <img src="https://www.computerhope.com/cdn/computer-hope.jpg" width="200" height="40" alt="Computer Hope">

              </img>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}