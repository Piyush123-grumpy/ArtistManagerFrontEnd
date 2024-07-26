const Navbar = () => {
    return (
      <nav className="bg-white flex flex-row justify-between items-center p-2">
        <div>
          <span>Agency Dashboard</span>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <span className="w-8 h-8 rounded-full relative">
            <i className="fa-regular fa-comments"></i>
          </span>
          <span className="w-8 h-8 rounded-full relative">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span className="w-2 h-2 bg-primary inline-block absolute rounded-full"></span>
          </span>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  