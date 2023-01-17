import personImage2 from '../images/person2.png';
import { useAuth0 } from '@auth0/auth0-react';

export default function Me() {
    const lorem = "Deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return(
        <div className="profile-box">
            <div className="row">
                <div className="col-md-6">
                    <img src={personImage2} className='rounded-md'/>
                    <div className="job-description me-button">
                        <button className="bg-blue hover:bg-hover-blue text-xl text-cream font-semibold py-2 px-4 rounded-ful">Upload Photo</button>
                    </div>
                </div>
                <div className="remington-kim col-md-6">
                    <div class='inline-flex'>
                        <p>Name:&nbsp;</p>
                        <p contentEditable>{user.name}</p>
                    </div>
                    <div class='inline-flex'>
                        <p>Academy, Year:&nbsp;</p>
                        <p contentEditable>ATCS, 2023</p>
                    </div>
                    <div class='inline-flex'>
                        <p>Email:&nbsp;</p>
                        <p contentEditable>{user.email}</p>
                    </div>
                </div>
                <p contentEditable  className="job-description">{lorem}</p>
                <div className="job-description me-button">
                    <button className="bg-blue hover:bg-hover-blue text-xl text-cream font-semibold py-2 px-4 rounded-ful">Save</button>
                </div>
            </div>
        </div>
    )
}