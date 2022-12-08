import NavBar from "./NavBar";

function about() {
    // const pizza = 56;
    const mylink = "/App.js";
    return (
      <div className="about">
        <header className="about-header">
           <p className="text-center">Information to be added.</p>
        </header>
        <NavBar link={mylink}></NavBar>
      </div>
    );
  }
  
  export default about;
