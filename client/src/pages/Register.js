import { useState } from 'react';
import briefcaseImage from '../images/icons/briefcase.png';
import gradImage from '../images/icons/grad.png';
import personImage1 from '../images/person1.png';
import personImage2 from '../images/person2.png';
import personImage3 from '../images/person3.png';

export default function Register() {
    const [j, setJ] = useState(true);
    return (
        /*

        REGISTERPAGE: 
        Create fields for 
        - academy, 
        - graduation year, 
        - pronouns, 
        - profile picture, 
        - job, 
        - picture, 
        - social media

        */
        <div class="register-info">
            <h2 class="register-name">Jonathon Dough</h2>
            <div class="register-academy">
                <img src={gradImage} width="25" height="25" alt="Test"></img>
                <p>
                    ATCS, 2023
                </p>
            </div>
            <div class="register-job">
                <img src={briefcaseImage} width="25" height="25" alt="Test"></img>
                <p>
                    @ Tesla Motors
                </p>
            </div>
            <div class='row'>
                <div class="col-md-6">
                    <div class="job-description">
                        {/* <p>{lorem}</p> */}
                    </div>
                    <a href='/messages'>
                        <button class="job-apply">
                            Contact
                        </button>
                    </a>
                </div>
                <div class="col-md-5">
                    <img src={personImage1} className='rounded-md' />
                </div>
            </div>
        </div>
    );
}